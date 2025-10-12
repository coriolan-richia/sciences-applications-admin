namespace backend.DTOs
{
    public class ListingModel
    {
        public ListingModel()
        {

        }
        public string Id { get; set; } = string.Empty;
        public string BacNumber { get; set; } = string.Empty;
        public DateOnly BacYear { get; set; }
        public string BacOption { get; set; } = string.Empty;
        public string StudyBranch { get; set; } = string.Empty;
        public DateTime PreregistrationDate { get; set; }
        public string Email { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public DateTime PaymentDate { get; set; }
        public string PaymentReference { get; set; } = string.Empty;
        public string PaymentAgence { get; set; } = string.Empty;
        public string Status { get; set; } = string.Empty;
    }
}