namespace backend.DTOs
{
    public class NewPreinscription
    {
        public string Email { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public string BacYear { get; set; } = string.Empty;
        public string BacNumber { get; set; } = string.Empty;
        public int IdStudyBranch { get; set; }
        public DateTime PreregistrationDate { get; set; }
        public string PaymentReference { get; set; } = string.Empty;
        public string PaymentAgence { get; set; } = string.Empty;
        public DateTime PaymentDate { get; set; } 
    }
}