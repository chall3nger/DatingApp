using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TestController : ControllerBase
    {
        public TestController()
        {
        }

        [HttpGet]

        public string printResult()
        {
            return "Hello World";
        }
       
    }
}