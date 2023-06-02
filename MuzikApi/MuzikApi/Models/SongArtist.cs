using System.Text.Json.Serialization;

namespace MuzikApi.Models
{
    public class SongArtist
    {
        public int SongArtistId { get; set; }
        public int SongId { get; set; }
        [JsonIgnore]
        public Song? song { get; set; }

        public int ArtistId { get; set; }
        [JsonIgnore]
        public Artist? artist { get; set; }

    }
}
