using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

public class WICCDBContext : IdentityDbContext<UserModel>
{
    public WICCDBContext(DbContextOptions<WICCDBContext> options) : base(options) { }
}