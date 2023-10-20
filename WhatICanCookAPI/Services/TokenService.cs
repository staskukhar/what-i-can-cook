using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;

public class TokenService : ITokenService
{
    private AuthSettings _authOptions;
    public TokenService(AuthSettings authOptions)
    {
        _authOptions = authOptions;
    }

    public string GetAcccessToken(UserModel user)
    {
        var credentials = CreateSigningCredentials();

        var jwtToken = new JwtSecurityToken(
            claims: GetUserClaims(user),
            expires: DateTime.Now.AddMinutes(_authOptions.ExpiresAt),
            signingCredentials: credentials
        );
        return new JwtSecurityTokenHandler().WriteToken(jwtToken);
    }
    public bool AreTokensEquals(byte[] originToken, byte[] foreignToken)
    {
        if(originToken.Length != foreignToken.Length)
        {
            return false;
        }

        for(int i = 0; i < originToken.Length; i++)
        {
            if(originToken[i] != foreignToken[i])
            {
                return false;
            }
        }
        
        return true;
    }
    private List<Claim> GetUserClaims(UserModel user)
    {
        var userClaims = new List<Claim>() 
        {
            new Claim(JwtRegisteredClaimNames.Iss, _authOptions.Issuer),
            new Claim(JwtRegisteredClaimNames.Aud, _authOptions.Audience),
            new Claim(ClaimTypes.Email, user.Email),
            new Claim(ClaimTypes.Name, user.Name),
            new Claim(ClaimTypes.Surname, user.Surname),
        };

        return userClaims;
    }
    private SigningCredentials CreateSigningCredentials()
        {
            return new SigningCredentials(
                new SymmetricSecurityKey(
                    Encoding.UTF8.GetBytes(_authOptions.IssuerSigningKey)
                ),
                SecurityAlgorithms.HmacSha256
            );
        }

    public bool IsRefreshTokenExpired(RefreshToken token)
    {
		int result = token.ExpiresAt.CompareTo(DateTime.UtcNow);

		if(result <= 0)
		{
			// token is gone 
			return true;
		}
		// case when token is still available
		return false;
    }
}