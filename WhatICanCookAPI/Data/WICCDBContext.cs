using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Net.Http.Headers;

public class WICCDBContext : IdentityDbContext<UserModel>
{
    public WICCDBContext(DbContextOptions<WICCDBContext> options) : base(options) { }

    public virtual DbSet<RefreshToken> RefreshTokens { get; set; }
}