namespace backend.DTOs
{
    public class GetOnePreinscriptionResponse
    {
        public int Id { get; set; }
        public string FullName { get; set; } = string.Empty;
        public string BacNumber { get; set; } = string.Empty;
        public string BacYear { get; set; } = string.Empty;
        public string BacOption { get; set; } = string.Empty;
        public string StudyBranch { get; set; } = string.Empty;
        public string StudyBranchAbbrev { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public DateOnly PaymentDate { get; set; }
        public string PaymentReference { get; set; } = string.Empty;
        public string PaymentAgence { get; set; } = string.Empty;
        public string Status { get; set; } = string.Empty;

        public DateOnly? PreregistrationDate { get; set; }
    }

    public class GetOnePreinscriptionRequest
    {
        public int PreregistrationId { get; set; }
    }
}
