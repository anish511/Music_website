namespace MuzikApi.Models
{
    public interface IAdminAuthRepo
    {
        Task<int> Register(Admin admin, string password);
        Task<string> Login(string adminEmailAddress, string password);
        Task<bool> AdminExists(string adminEmailAddress);
    }
}
