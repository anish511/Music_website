using System.Text.Json.Serialization;
using System.ComponentModel.DataAnnotations;

namespace MuzikApi.Models
{
    public class User
    {
        [Key]
        public int userId { get; set; }
        public string? firstName { get; set; }

        public string? lastName { get; set; }

        public string? Username { get; set; }

        public string? email { get; set; }
        public byte[] PasswordHash { get; set; } = Array.Empty<byte>();
        public byte[] PasswordSalt { get; set; } = Array.Empty<byte>();

        [JsonIgnore]
        public virtual List<Playlist>? playlists { get; set; }
    }
}
