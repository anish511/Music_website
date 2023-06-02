using System.Text.Json.Serialization;
using System.ComponentModel.DataAnnotations;

namespace MuzikApi.Models
{
    public class Artist
    {
        [Key]
        public int artistId { get; set; }
        public string? artistName { get; set; }

        public string? artistType { get; set; }
        public string? imageUrl { get; set; }

        [JsonIgnore]
        public virtual List<SongArtist>? SongArtists { get; set; }

    }
}
