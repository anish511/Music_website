using Microsoft.AspNetCore.Mvc;
using MuzikApi.Models;

namespace MuzikApi.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminAuthController : ControllerBase
    {
        private readonly IAdminAuthRepo _adminAuthRepo;

        public AdminAuthController(IAdminAuthRepo adminAuthRepo)
        {
            _adminAuthRepo = adminAuthRepo;
        }

        [HttpPost("Register")]
        public async Task<ActionResult<int>> Register(AdminRegisterDTO adminDTO)
        {
            var res = await _adminAuthRepo.Register(new Admin() {adminName = adminDTO.adminName, adminEmailAddress = adminDTO.adminEmailAddress }, adminDTO.Password);
            if (res == 0)
            {
                return BadRequest($"Cannot register {adminDTO.adminEmailAddress}");
            }
            return Ok($"User registered successfully!");
        }

        [HttpPost("Login")]
        public async Task<ActionResult> Login(AdminLoginDTO adminDTO)
        {
            var res = await _adminAuthRepo.Login(adminDTO.adminEmailAddress, adminDTO.Password);
            if (res == null)
            {
                return BadRequest($"Incorrect username or password!");
            }

            return Ok(res);
        }
    }
}
