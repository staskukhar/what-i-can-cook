using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.AspNetCore.Authentication;

public interface ITokenService
{
    public abstract string GetAcccessToken(UserModel user);
    public abstract bool AreTokensEquals(byte[] originToken, byte[] foreignToken);
    public abstract bool IsRefreshTokenExpired(RefreshToken token);
}