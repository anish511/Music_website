using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace MuzikApi.Models
{
    public class Album
    {
        [Key]
        public int albumId { get; set; }
        public string? albumName { get; set; }
        public string? imageUrl { get; set; }

        [JsonIgnore]
        public virtual List<Song>? songs { get; set; }

    }
}
