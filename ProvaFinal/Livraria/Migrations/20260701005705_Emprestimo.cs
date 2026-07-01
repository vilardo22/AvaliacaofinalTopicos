using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Livraria.Migrations
{
    /// <inheritdoc />
    public partial class Emprestimo : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "EstaDisponivel",
                table: "Livros",
                type: "INTEGER",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EstaDisponivel",
                table: "Livros");
        }
    }
}
