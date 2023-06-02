using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MuzikApi.Models;

namespace MuzikApi.Controller
{
    [Authorize(Roles = "User")]
    [Route("api/[controller]")]
    [ApiController]
    public class PlaylistSongsController : ControllerBase
    {
        private readonly MuzikContext _context;

        public PlaylistSongsController(MuzikContext context)
        {
            _context = context;
        }

        // GET: api/PlaylistSongs
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PlaylistSong>>> GetPlaylistsSongs()
        {
          if (_context.PlaylistsSongs == null)
          {
              return NotFound();
          }
            return await _context.PlaylistsSongs.ToListAsync();
        }

        // GET: api/PlaylistSongs/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PlaylistSong>> GetPlaylistSong(int id)
        {
          if (_context.PlaylistsSongs == null)
          {
              return NotFound();
          }
            var playlistSong = await _context.PlaylistsSongs.FindAsync(id);

            if (playlistSong == null)
            {
                return NotFound();
            }

            return playlistSong;
        }

        // PUT: api/PlaylistSongs/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPlaylistSong(int id, PlaylistSong playlistSong)
        {
            if (id != playlistSong.PlaylistSongId)
            {
                return BadRequest();
            }

            _context.Entry(playlistSong).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PlaylistSongExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/PlaylistSongs
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<PlaylistSong>> PostPlaylistSong(PlaylistSong playlistSong)
        {
          if (_context.PlaylistsSongs == null)
          {
              return Problem("Entity set 'MuzikContext.PlaylistsSongs'  is null.");
          }
            _context.PlaylistsSongs.Add(playlistSong);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetPlaylistSong), new { id = playlistSong.PlaylistSongId }, playlistSong);
        }

        // DELETE: api/PlaylistSongs/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePlaylistSong(int id)
        {
            if (_context.PlaylistsSongs == null)
            {
                return NotFound();
            }
            var playlistSong = await _context.PlaylistsSongs.FindAsync(id);
            if (playlistSong == null)
            {
                return NotFound();
            }

            _context.PlaylistsSongs.Remove(playlistSong);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PlaylistSongExists(int id)
        {
            return (_context.PlaylistsSongs?.Any(e => e.PlaylistSongId == id)).GetValueOrDefault();
        }
    }
}
