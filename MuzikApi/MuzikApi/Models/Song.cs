using System.Text.Json.Serialization;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MuzikApi.Models
{
    public class Song
    {
        [Key]
        public int songId { get; set; }
        public string? songName { get; set; }

        public string? audioUrl { get; set; }

        public string? songType { get; set; }

        public int AlbumId { get; set; }

        //[ForeignKey("AlbumId")]
        [JsonIgnore]
        public Album? album { get; set; }

        [JsonIgnore]
        public virtual List<PlaylistSong>? PlaylistSongs { get; set; }

        [JsonIgnore]
        public virtual List<SongArtist>? SongArtists { get; set; }
    }
}
