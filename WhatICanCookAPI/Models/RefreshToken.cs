using System.ComponentModel.DataAnnotations;

public class RefreshToken
{
    [Required]
    public string ID { get; set; } = string.Empty;
    [Required]
    public DateTime ExpiresAt { get; set; }
    [Required]
    public byte[] Token { get; set; } = new byte[] {};
}