public class TokenRepository : ITokenRepository
{
	WICCDBContext _dbContext;
    public TokenRepository(WICCDBContext context)
    {
		  _dbContext = context;
    }

	public RefreshToken GetRefreshTokenByID(string id)
	{
		return _dbContext.RefreshTokens.Where( t => t.ID == id).Single();
	}

	public void StoreRefreshToken(RefreshToken token)
	{
		_dbContext.RefreshTokens.Add(token);
		_dbContext.SaveChanges();
	}
} 