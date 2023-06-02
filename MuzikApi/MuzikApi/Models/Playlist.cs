using System.Text.Json.Serialization;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MuzikApi.Models
{
    public class Playlist
    {
        [Key]
        public int Id { get; set; }
        public string? Name { get; set; }

        public int userId { get; set; }

        //[ForeignKey("userId")]
        [JsonIgnore]
        public User? user { get; set; }

        [JsonIgnore]
        public virtual List<PlaylistSong>? PlaylistSongs { get; set; }
    }
}
