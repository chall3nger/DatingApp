using System.Threading.Tasks;
using API.Entities;

namespace API.InterFaces
{
    public interface ITokenService
    {
        Task<string> CreateToken(AppUser user);
    }
}