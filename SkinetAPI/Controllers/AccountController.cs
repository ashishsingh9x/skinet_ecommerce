using Core.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using SkinetAPI.DTOs;

namespace SkinetAPI.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly SignInManager<AppUser> signInManager;

        public AccountController(SignInManager<AppUser> signInManager)
        {
            this.signInManager = signInManager;
        }

        [HttpPost("register")]
        public async Task<ActionResult> Register(RegisterDto registerDto)
        {
            var user = new AppUser
            {
                FirstName = registerDto.FirstName,
                LastName = registerDto.LastName,
                Email = registerDto.Email,
                UserName = registerDto.Email
            };

            var result = await signInManager.UserManager.CreateAsync(user, registerDto.Password);

            if (!result.Succeeded) return BadRequest();

            return Ok();
        }
    }
}
