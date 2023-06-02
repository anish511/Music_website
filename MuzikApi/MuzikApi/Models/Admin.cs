using System.ComponentModel.DataAnnotations;

namespace MuzikApi.Models
{
    public class Admin
    {
        [Key]
        public int adminId { get; set; }
        public string? adminName { get; set; }
        public byte[] PasswordHash { get; set; } = Array.Empty<byte>();
        public byte[] PasswordSalt { get; set; } = Array.Empty<byte>();
        public string? adminEmailAddress { get; set;}
    }
}
