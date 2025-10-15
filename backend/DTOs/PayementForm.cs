namespace backend.DTOs
{
    public class PaymentForm
    {

        public required IFormFile File { get; set; }
        public required int IdUploader { get; set; } // olona ny uploader an'ilay fichier
        
    }
}