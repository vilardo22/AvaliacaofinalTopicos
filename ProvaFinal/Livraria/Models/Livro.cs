namespace Livraria.Models;

public class Livro
{
    public int Id {get; set; }
    public string? Nome {get; set; }
    public string? Autor {get; set; }

    public int QtdEmprestimo {get; set; } = 0;
    public bool EstaDisponivel { get; set; } = true;
    public DateTime Criadoem {get; set; } = DateTime.Now;
}