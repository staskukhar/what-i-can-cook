using Microsoft.Win32.SafeHandles;

public class LoginResponse
{
    public LoginResponse(
        string accessToken,
        RefreshToken refreshToken,
        UserModel user
    )
    {
        AccessToken = accessToken;
        RefreshToken = refreshToken;
        User = user;
    }
    public string AccessToken { get; set; } = string.Empty;
    public RefreshToken RefreshToken { get; set; }
    public UserModel User { get; set; }
}