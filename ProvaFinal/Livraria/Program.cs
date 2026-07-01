using Livraria.Models;
using Microsoft.AspNetCore.Mvc;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<AppDbContext>();
builder.Services.AddCors(options =>
{
    options.AddPolicy("PermitirTudo",
        builder => builder.AllowAnyOrigin()
                          .AllowAnyMethod()
                          .AllowAnyHeader());
});
var app = builder.Build();
// 2. Adicione isso LOGO APÓS o app.Build();
app.UseCors("PermitirTudo");

app.MapPost("/api/livro/cadastrar",  ([FromBody] Livro livro, [FromServices] AppDbContext ctx)=>
{
    Livro? resultado = ctx.Livros.FirstOrDefault(x => x.Nome == livro.Nome);
    if(resultado is null)
    {
        ctx.Livros.Add(livro);
        ctx.SaveChanges();

        return Results.Created("", livro);
    }
    return Results.Conflict("Este livro ja existe!");
});

app.MapGet("/api/livro/listar", ([FromServices] AppDbContext ctx ) =>
{
    if (ctx.Livros.Any())
    {
        return Results.Ok(ctx.Livros.ToList());
    }
    return Results.NotFound("Lista de livros vazia!");
});


app.MapGet("/api/livro/buscar/{nome}",
([FromRoute] string nome,
[FromServices] AppDbContext ctx) =>
{
    Livro? resultado = ctx.Livros.FirstOrDefault(x => x.Nome == nome);

    if(resultado is not null)
    {
        return Results.Ok(resultado);
    }
    return Results.NotFound("Livro não encontrado");
});

app.MapGet("/api/livro/maisemprestado", ([FromServices] AppDbContext ctx)=>
{
    Livro? maisEmprestado = ctx.Livros
    .OrderByDescending(l => l.QtdEmprestimo)
    .FirstOrDefault();
    if (maisEmprestado is not null)
    {
        return Results.Ok(maisEmprestado);
    }
    return Results.NotFound("Nenhum livro encontrado no banco de dados.");
});






app.MapPut("/api/livro/emprestar/{id}", ([FromRoute] int id, [FromServices] AppDbContext ctx) =>
{
    Livro? resultado = ctx.Livros.Find(id);

    if (resultado is not null)
    {
        if (resultado.EstaDisponivel == true)
        {
            resultado.EstaDisponivel = false;
            resultado.QtdEmprestimo++;
            ctx.Livros.Update(resultado);
            ctx.SaveChanges();
            return Results.Ok("Livro Emprestado");
        }
        return Results.Ok("O livro não está disponível");
    }
    return Results.NotFound("Livro não encontrado!");
});
app.MapPut("/api/livro/devolver/{id}", ([FromRoute] int id, [FromServices] AppDbContext ctx) =>
{
    Livro? resultado = ctx.Livros.Find(id);

    if (resultado is not null)
    {
        if (resultado.EstaDisponivel == false)
        {
            resultado.EstaDisponivel = true;
            ctx.Livros.Update(resultado);
            ctx.SaveChanges();
            return Results.Ok("Livro Devolvido");
        }
        return Results.Ok("O livro já está disponível");
    }
    return Results.NotFound("Livro não encontrado!");
});

//GET: /api/livro/disponiveis
app.MapGet("/api/livro/disponiveis",
    ([FromServices] AppDbContext ctx) =>
{
    if (ctx.Livros.Where(x => x.EstaDisponivel == true).Any())
    {
        //Configurar a resposta da requisição
        return Results.Ok(ctx.Livros.Where(x => x.EstaDisponivel == true).ToList());
    }
    return Results.NotFound("Lista de livros vazia!");
});
app.MapGet("/api/livro/emprestados",
    ([FromServices] AppDbContext ctx) =>
{
    if (ctx.Livros.Where(x => x.EstaDisponivel == false).Any())
    {
        //Configurar a resposta da requisição
        return Results.Ok(ctx.Livros.Where(x => x.EstaDisponivel == false).ToList());
    }
    return Results.NotFound("Lista de livros vazia!");
});
app.Run();


