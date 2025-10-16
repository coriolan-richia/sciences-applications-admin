using backend.Context;
using Microsoft.AspNetCore.Mvc;
using OfficeOpenXml;
using backend.Models.Fac;
using System.Globalization;
using backend.DTOs;
using Microsoft.EntityFrameworkCore;


namespace backend.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class PaymentController(FacContext facDBContext) : ControllerBase
    {
        private readonly FacContext _facDBContext = facDBContext;

        [HttpPost("list-history")]
        public async Task<IActionResult> ListHistory()
        {
            try
            {
                List<HistoriquePaiement> historiquePaiements = await _facDBContext.HistoriquePaiements.ToListAsync();
                var result = historiquePaiements.Select(h => new HistoryPayment
                {
                    Id = h.IdHistorique.ToString(),
                    UploadDate = h.DateImportation?.ToString("dd/MM/yyyy hh:mm:ss") ?? "Date N/A",
                    Filename = Path.GetFileName(h.CheminFichier) ?? "Fichier inconnu",
                    RecordCount = h.NbrLigne ?? 0,
                    Status = h.EstImporte ?? true,
                }).ToList();
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest("Erreur interne du serveur: " + ex.Message);
            }
        }
        
        [HttpPost("list-all")]
        public async Task<IActionResult> ListAll()
        {
            try
            {
                List<Paiement> paiements = await _facDBContext.Paiements.ToListAsync();
                var result = paiements.Select( p=> new PaymentListingModel
                {
                    Id = p.IdPaiement.ToString(),
                    Date = p.DatePaiement?.ToString("dd/MM/yyyy") ?? "Date N/A",
                    Libelle = p.Libelle ?? "Libelle N/A",
                    Reference = p.Reference ?? "Référence N/A",
                    Valeur = p.Reference ?? "Date valeur N/A",
                    DebitCredit = p.Montant ?? 0,
                    Matched = p.IdPreinscription!=null,
                }
                ).ToList();
                return Ok(result);
            } 
            catch(Exception ex)
            {
                return BadRequest("Erreur interne du serveur: " + ex.Message);
            }
        }

        [HttpPost("upload-releve")]
        public async Task<IActionResult> UploadReleve([FromForm] PaymentForm request)
        {
            if (request.File == null || request.File.Length == 0)
                return BadRequest("Aucun fichier uploader");

            bool isUploaderExist = await _facDBContext.Utilisateurs.AnyAsync(u => u.IdUtilisateur== request.IdUploader);
            if (!isUploaderExist)
                return BadRequest("Cet utilisateur n'existe pas");

            var folder = Path.Combine(Directory.GetCurrentDirectory(), "Uploads");
            if (!Directory.Exists(folder))
                Directory.CreateDirectory(folder);

            string extension = Path.GetExtension(request.File.FileName);

            if (extension != ".xlsx")
                return BadRequest("Le fichier doit être au format .xlsx");

            string newFileName = GenerateRandomName(10) + extension;
            var filePath = Path.Combine(folder, newFileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await request.File.CopyToAsync(stream);
            }

            try
            {
                var (Success, Message) = await ImportReleveBancaire(filePath, request.IdUploader);
                if (!Success)
                    return BadRequest(Message);
                
                return Ok("Fichier importé avec succès");
            } catch(Exception ex)
            {
                return BadRequest("Erreur lors du traitement : " + ex.Message);
            }
        }
        
        private async Task<(bool Success, string Message)> ImportReleveBancaire(string filePath, int IdUploader)
        {
            using var package = new ExcelPackage(new FileInfo(filePath));
            OfficeOpenXml.ExcelWorksheet ws = package.Workbook.Worksheets[0];
            int totalRows = ws.Dimension.Rows;

            await InsertHistoriquePaiement(filePath, true, totalRows - 1);
            var result = await InsertPaiement(ws,totalRows,IdUploader);

            await _facDBContext.SaveChangesAsync();
            return result;
        }
        
        private static string GenerateRandomName(int lenght)
        {
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            var random = new Random();
            return new string([.. Enumerable.Repeat(chars, lenght).Select(s => s[random.Next(s.Length)])]);
        }

        private async Task<IActionResult> InsertHistoriquePaiement(string filePath, bool estImporte, int nombreDeLigne)
        {
            try
            {
                var historique = new HistoriquePaiement
                {
                    CheminFichier = filePath,
                    DateImportation = DateTime.UtcNow,
                    EstImporte = estImporte,
                    NbrLigne = nombreDeLigne
                };
                _facDBContext.HistoriquePaiements.Add(historique);
                await _facDBContext.SaveChangesAsync();
                return Ok("Table historique paiement écrit avec succès");
            }
            catch (Exception ex)
            {
                return BadRequest("Impossible d'écrire dans la table PaiementHistorique " + ex);
            }
        }
    
        private async Task<(bool Success, string Message)> InsertPaiement(OfficeOpenXml.ExcelWorksheet ws, int totalRows, int IdUploader)
        {

            try
            {
                List<string> existingReferences = [];
                for (int row = 2; row <= totalRows; row++)
                {
                    string dateText = ws.Cells[row, 1].Text.Trim();
                    string libelle = ws.Cells[row, 2].Text.Trim();
                    string reference = ws.Cells[row, 3].Text.Trim();
                    string valeurText = ws.Cells[row, 4].Text.Trim();
                    string debitText = ws.Cells[row, 5].Text.Trim();
                    string creditText = ws.Cells[row, 6].Text.Trim();
                    // 01/09/2025 REGLMT CHEQUE COMPENSE NO. 0000219 4413934 26/08/2025 300000

                    DateOnly? datePaiement = null;
                    DateOnly? valeur = null;

                    if (DateTime.TryParseExact(dateText, "dd/MM/yyyy", CultureInfo.InvariantCulture, DateTimeStyles.None, out var dt1))
                        datePaiement = DateOnly.FromDateTime(dt1);

                    if (DateTime.TryParseExact(valeurText, "dd/MM/yyyy", CultureInfo.InvariantCulture, DateTimeStyles.None, out var dt2))
                        valeur = DateOnly.FromDateTime(dt2);

                    int montant = 0;
                    if (!string.IsNullOrWhiteSpace(debitText))
                        montant = (int)decimal.Parse(debitText.Replace(" ", ""));
                    else if (!string.IsNullOrWhiteSpace(creditText))
                        montant = (int)decimal.Parse(creditText.Replace(" ", ""));

                    var paiementExist = await _facDBContext.Paiements.AnyAsync(pay=> pay.Reference==reference);
                    if (!paiementExist)
                    {
                        var paiement = new Paiement
                        {
                            NomPayeur = libelle,
                            NomBeneficiaire = "FACULTE DES SCIENCES",
                            Agence = "BOA Antananarivo A",
                            Reference = reference,
                            DatePaiement = datePaiement,
                            Valeur = valeur,
                            Montant = montant,
                            MotifPaiement = libelle,
                            Libelle = libelle,
                            IdUtilisateur = IdUploader, 
                        };
                        _facDBContext.Paiements.Add(paiement);
                    } else
                    {
                        existingReferences.Add(reference);
                    }
                    
                }
                await _facDBContext.SaveChangesAsync();

                // return Ok(new { });
                if(existingReferences.Count > 0)
                {
                    return (false, "Les références suivantes existent déjà : " + string.Join(", ", existingReferences));
                }
                else
                {
                    return (true, "OK");
                }

            }
            catch(Exception ex)
            {
                return (false,"Impossible d'accèder à la table Paiement" + ex.Message);
            }
        }
    }
}