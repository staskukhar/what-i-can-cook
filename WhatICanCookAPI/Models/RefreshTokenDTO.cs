public class RefreshTokenDTO : RefreshToken
{
    public RefreshTokenDTO(
        byte[] token,
        byte daysToExpires,
        string userId
    )
    {
        Token = token;
        // UTC format is required cause there can be some type conflicts with HpgsqlType: timestamp with time zone
        ExpiresAt = DateTime.UtcNow.AddDays(daysToExpires);
        ID = userId;
    }
}