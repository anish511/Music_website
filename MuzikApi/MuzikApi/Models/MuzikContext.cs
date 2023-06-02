using Microsoft.EntityFrameworkCore;

namespace MuzikApi.Models
{
    public class MuzikContext : DbContext
    {
        public MuzikContext(DbContextOptions<MuzikContext> options): base(options)
        {

        }

        // protected override void OnModelCreating(ModelBuilder modelBuilder)
        // {
        //     modelBuilder.Entity<PlaylistSong>().HasKey(sc => new { sc.songId, sc.playlistId });
        //     modelBuilder.Entity<SongArtist>().HasKey(sc => new { sc.SongId, sc.ArtistId });
        // }

        public DbSet<Song> Songs => Set<Song>();
        public DbSet<Artist> Artists => Set<Artist>();

        public DbSet<Album> Albums => Set<Album>();
        public DbSet<SongArtist> SongsArtists => Set<SongArtist>();

        public DbSet<Admin> Admins => Set<Admin>();

        public DbSet<User> Users => Set<User>();

        public DbSet<Playlist> Playlists => Set<Playlist>();

        public DbSet<PlaylistSong> PlaylistsSongs => Set<PlaylistSong>();
    }
}
