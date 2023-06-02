using System.Text.Json.Serialization;

namespace MuzikApi.Models
{
    public class PlaylistSong
    {
        public int PlaylistSongId { get; set; }

        public int playlistId { get; set; }
        [JsonIgnore]
        public Playlist? playlist { get; set; }

        public int songId { get; set; }
        [JsonIgnore]
        public Song? song { get; set; }
    }
}
