namespace backend.DTOs
{
    public class PaymentForm
    {
        public required IFormFile File { get; set; }
        public required int IdUploader { get; set; } // olona ny uploader an'ilay fichier

    }
    public class PaymentListingModel
    {
        public string Id { get; set; } = string.Empty;
        public string Date { get; set; } = string.Empty;
        public string Libelle { get; set; } = string.Empty;
        public string Reference { get; set; } = string.Empty;
        public string Valeur { get; set; } = string.Empty;
        public int DebitCredit { get; set; } = 0;
        public bool Matched { get; set; } = false;
    }
    public class HistoryPayment
    {
        public string Id { get; set; } = string.Empty;
        public string UploadDate { get; set; } = string.Empty;
        public string Filename { get; set; } = string.Empty;
        public int RecordCount { get; set; } = 0;
        public bool Status { get; set; }
    }
}