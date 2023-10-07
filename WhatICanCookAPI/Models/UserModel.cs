using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

public class UserModel : IdentityUser {
    [Required]
    public string Name { get; set; } = string.Empty;
    [Required]
    public string Surname { get; set; } = string.Empty;
}