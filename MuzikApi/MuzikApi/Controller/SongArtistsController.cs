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
    [Authorize(Roles = "Admin")]
    [Route("api/[controller]")]
    [ApiController]
    public class SongArtistsController : ControllerBase
    {
        private readonly MuzikContext _context;

        public SongArtistsController(MuzikContext context)
        {
            _context = context;
        }

        // GET: api/SongArtists
        [AllowAnonymous]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SongArtist>>> GetSongsArtists()
        {
          if (_context.SongsArtists == null)
          {
              return NotFound();
          }
            return await _context.SongsArtists.ToListAsync();
        }

        // GET: api/SongArtists/5
        [HttpGet("{id}")]
        public async Task<ActionResult<SongArtist>> GetSongArtist(int id)
        {
          if (_context.SongsArtists == null)
          {
              return NotFound();
          }
            var songArtist = await _context.SongsArtists.FindAsync(id);

            if (songArtist == null)
            {
                return NotFound();
            }

            return songArtist;
        }

        // PUT: api/SongArtists/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSongArtist(int id, SongArtist songArtist)
        {
            if (id != songArtist.SongArtistId)
            {
                return BadRequest();
            }

            _context.Entry(songArtist).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SongArtistExists(id))
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

        // POST: api/SongArtists
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<SongArtist>> PostSongArtist(SongArtist songArtist)
        {
          if (_context.SongsArtists == null)
          {
              return Problem("Entity set 'MuzikContext.SongsArtists'  is null.");
          }
            _context.SongsArtists.Add(songArtist);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetSongArtist), new { id = songArtist.SongArtistId }, songArtist);
        }

        // DELETE: api/SongArtists/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSongArtist(int id)
        {
            if (_context.SongsArtists == null)
            {
                return NotFound();
            }
            var songArtist = await _context.SongsArtists.FindAsync(id);
            if (songArtist == null)
            {
                return NotFound();
            }

            _context.SongsArtists.Remove(songArtist);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool SongArtistExists(int id)
        {
            return (_context.SongsArtists?.Any(e => e.SongArtistId == id)).GetValueOrDefault();
        }
    }
}
