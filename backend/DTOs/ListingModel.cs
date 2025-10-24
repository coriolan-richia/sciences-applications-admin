namespace backend.DTOs
{
    public class ListingModel
    {
        public ListingModel()
        {

        }
        public string Id { get; set; } = string.Empty;
        public string BacNumber { get; set; } = string.Empty;
        public int BacYear { get; set; }
        public string PersonName { get; set; } = string.Empty;
        public string StudyBranch { get; set; } = string.Empty;
        public string StudyBranchAbbrev { get; set; } = string.Empty;
        public string PreregistrationDate { get; set; } = string.Empty;
        public string Status { get; set; } = string.Empty;
        
    }
}