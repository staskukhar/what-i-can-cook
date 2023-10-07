using System.Net;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace WhatICanCookAPI.Controllers;

[ApiController]
[Route("[controller]")]
public class UserAuthController : ControllerBase 
{
    private readonly UserManager<UserModel> _userMananger;

    public UserAuthController(UserManager<UserModel> userManager)
    {
        _userMananger = userManager;
    }

    [HttpPost]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status409Conflict)]
    public  async Task<IActionResult> UserRegister([FromBody] RegisterUserModel user)
    {
        if(!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        } 

        var searchResults = await _userMananger.FindByEmailAsync(user.Email);

        if(searchResults != null)
        {
            ModelState.AddModelError("Email collusion", $"User by Email: {user.Email} already exist");

            return Conflict(ModelState);   
        }

        var registrationResults = await _userMananger.CreateAsync(
            new UserModel 
            {
                Name = user.Name,
                Surname = user.Surname,
                Email = user.Email,
            }, 
            user.Password);

        if(registrationResults.Succeeded)
        {
            return Ok("The user has registered");
        }

        foreach(var error in registrationResults.Errors)
        {
            ModelState.AddModelError("Unknown error", error.Description);
        }

        return BadRequest(ModelState);
    } 
}