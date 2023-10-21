public class RefreshTokenRequestModel
{
    public string Id { get; set; } = string.Empty;
    public byte[] refreshToken { get; set; } = new byte[] {};
}