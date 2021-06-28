namespace API.Errors
{
    public class ApiException
    {
        public ApiException(int statusCode, string messages = null, string details = null)
        {
            StatusCode = statusCode;
            Message = messages;
            Details = details;
        }

        public int StatusCode { get; set; }
        public string Message { get; set; }
        public string Details { get; set; }
    }
}