using Microsoft.AspNetCore.Mvc;
using MuzikApi.Models;

namespace MuzikApi.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthRepo _authRepo;

        public AuthController(IAuthRepo authRepo)
        {
            _authRepo = authRepo;
        }

        [HttpPost("Register")]
        public async Task<ActionResult<int>> Register(UserRegisterDTO userDTO)
        {
            var res = await _authRepo.Register(new User() {firstName = userDTO.firstName, lastName = userDTO.lastName, email=userDTO.email, Username = userDTO.Username }, userDTO.Password);
            if (res == 0)
            {
                return BadRequest($"Cannot register {userDTO.email}");
            }
            return Ok($"User registered successfully!");
        }

        [HttpPost("Login")]
        public async Task<ActionResult> Login(UserLoginDTO userDTO)
        {
            var res = await _authRepo.Login(userDTO.Email, userDTO.Password);
            if (res == null)
            {
                return BadRequest($"Incorrect username or password!");
            }

            return Ok(res);
        }
    }
}
