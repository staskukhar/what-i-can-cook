using System.Net;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace WhatICanCookAPI.Controllers;

[ApiController]
[Route("[controller]")]
public class UserAuthController : ControllerBase 
{
    private readonly UserManager<UserModel> _userMananger;
    private readonly ITokenService _tokenService;
    private readonly ITokenRepository _tokenRepository;

    public UserAuthController(
        UserManager<UserModel> userManager, 
        ITokenService tokenService,
        ITokenRepository tokenRepository)
    {
        _userMananger = userManager;
        _tokenService = tokenService;
        _tokenRepository = tokenRepository;

    }
    
    [Route("register")]
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
            return Conflict($"User by Email: {user.Email} already exist");   
        }

        var registrationResults = await _userMananger.CreateAsync(
            new UserModel 
            {
                Name = user.Name,
                Surname = user.Surname,
                Email = user.Email,
                UserName = string.Concat(user.Name, user.Surname),
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

    [Route("login")]
    [HttpPost]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    public async Task<IActionResult> UserLogin([FromBody] LoginUserModel loggingUser)
    {
        if(!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var user = await _userMananger.FindByEmailAsync(loggingUser.Email);

        if(user == null)
        {
            return BadRequest($"Seems like user by email: {loggingUser.Email} doesn't exist.");
        }

        if(! await _userMananger.CheckPasswordAsync(user, loggingUser.Password)) 
        {
            return Unauthorized("Ups, seems like your password is incorrect!");
        }
        // at the bottom is case when we have correctly logged user, who must receive access token
        var accessToken = _tokenService.GetAcccessToken(user);
        var refreshTokenResults = _userMananger.CreateSecurityTokenAsync(user);
        var refreshToken = new RefreshTokenDTO(refreshTokenResults.Result, 7, user.Id);

        _tokenRepository.StoreRefreshToken(refreshToken);

        return Ok(new LoginResponse(accessToken, refreshToken, user)); 
    }
    [HttpPost]
    [Route("RefreshToken")]
    public async Task<IActionResult> RefreshToken([FromBody] RefreshTokenRequestModel requestModel)
    {
        var tokenByID = _tokenRepository.GetRefreshTokenByID(requestModel.Id);

        var user = await _userMananger.FindByIdAsync(requestModel.Id);

        if(tokenByID == null || user == null)
        {
            return BadRequest($"Invalid id: {requestModel.Id}");
        }

        if(_tokenService.IsRefreshTokenExpired(tokenByID))
        {
            return BadRequest("Token is expired");
        }

        if(!_tokenService.AreTokensEquals(tokenByID.Token, requestModel.refreshToken))
        {
            return Unauthorized("The passed token isn't valid");
        }

        var accessToken = _tokenService.GetAcccessToken(user);

        return Ok(accessToken);
    }
}