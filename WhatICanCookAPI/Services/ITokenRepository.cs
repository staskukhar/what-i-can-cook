public interface ITokenRepository
{
    public abstract RefreshToken GetRefreshTokenByID(string id);
    public abstract void StoreRefreshToken(RefreshToken token);
}