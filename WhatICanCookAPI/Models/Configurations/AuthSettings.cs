public class AuthSettings
{
    public string Issuer { get; set; } = string.Empty;
    public string Audience { get; set; } = string.Empty;
    public string IssuerSigningKey { get; set; } = string.Empty;
    public int ExpiresAt { get; set; }

}