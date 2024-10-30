using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace VentaProductos.Migrations
{
    /// <inheritdoc />
    public partial class MigrationInscripcionDetalle2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DetalleVentaVenta");

            migrationBuilder.AddColumn<int>(
                name: "ClienteId",
                table: "Ventas",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ProductoId",
                table: "DetalleVenta",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "VentaId",
                table: "DetalleVenta",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Ventas_ClienteId",
                table: "Ventas",
                column: "ClienteId");

            migrationBuilder.CreateIndex(
                name: "IX_DetalleVenta_ProductoId",
                table: "DetalleVenta",
                column: "ProductoId");

            migrationBuilder.CreateIndex(
                name: "IX_DetalleVenta_VentaId",
                table: "DetalleVenta",
                column: "VentaId");

            migrationBuilder.AddForeignKey(
                name: "FK_DetalleVenta_Productos_ProductoId",
                table: "DetalleVenta",
                column: "ProductoId",
                principalTable: "Productos",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_DetalleVenta_Ventas_VentaId",
                table: "DetalleVenta",
                column: "VentaId",
                principalTable: "Ventas",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Ventas_Clientes_ClienteId",
                table: "Ventas",
                column: "ClienteId",
                principalTable: "Clientes",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DetalleVenta_Productos_ProductoId",
                table: "DetalleVenta");

            migrationBuilder.DropForeignKey(
                name: "FK_DetalleVenta_Ventas_VentaId",
                table: "DetalleVenta");

            migrationBuilder.DropForeignKey(
                name: "FK_Ventas_Clientes_ClienteId",
                table: "Ventas");

            migrationBuilder.DropIndex(
                name: "IX_Ventas_ClienteId",
                table: "Ventas");

            migrationBuilder.DropIndex(
                name: "IX_DetalleVenta_ProductoId",
                table: "DetalleVenta");

            migrationBuilder.DropIndex(
                name: "IX_DetalleVenta_VentaId",
                table: "DetalleVenta");

            migrationBuilder.DropColumn(
                name: "ClienteId",
                table: "Ventas");

            migrationBuilder.DropColumn(
                name: "ProductoId",
                table: "DetalleVenta");

            migrationBuilder.DropColumn(
                name: "VentaId",
                table: "DetalleVenta");

            migrationBuilder.CreateTable(
                name: "DetalleVentaVenta",
                columns: table => new
                {
                    DetalleVentaId = table.Column<int>(type: "int", nullable: false),
                    VentaId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DetalleVentaVenta", x => new { x.DetalleVentaId, x.VentaId });
                    table.ForeignKey(
                        name: "FK_DetalleVentaVenta_DetalleVenta_DetalleVentaId",
                        column: x => x.DetalleVentaId,
                        principalTable: "DetalleVenta",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_DetalleVentaVenta_Ventas_VentaId",
                        column: x => x.VentaId,
                        principalTable: "Ventas",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_DetalleVentaVenta_VentaId",
                table: "DetalleVentaVenta",
                column: "VentaId");
        }
    }
}
