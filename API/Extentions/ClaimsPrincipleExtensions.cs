using System.Security.Claims;

namespace API.Extentions
{
    public static class ClaimsPrincipleExtensions
    {
        public static string GetUsername(this ClaimsPrincipal user)
        {
            return user.FindFirst(ClaimTypes.Name)?.Value;
        }

        public static int GetUserId(this ClaimsPrincipal user)
        {
            var st = user.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var id = int.Parse(st);
            return  id;
        }
    }
}