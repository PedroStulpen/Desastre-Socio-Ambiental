using Microsoft.EntityFrameworkCore;
using PetropolisApi.Domain;
using Flunt.Notifications;

namespace PetropolisApi.Data
{
    public class AppDbContext : DbContext
    {
        public DbSet<Veiculo> Veiculos { get; set; }
        public DbSet<Transporte> Transportes { get; set; }
        public DbSet<PontoApoioVeiculo> PontosApoioVeiculos { get; set; }
        public DbSet<PontoApoio> PontosApoio { get; set; }
        public DbSet<Necessidade> Necessidades { get; set; }
        public DbSet<Excedente> Excedentes { get; set; }
        public DbSet<Item> Itens { get; set; }
        public DbSet<Carreto> Carretos { get; set; }

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.Ignore<Notification>();

            builder.Entity<PontoApoio>().ToTable("pontoApoio").HasKey(x => x.Id);

            builder.Entity<Transporte>().ToTable("transporte").HasKey(x => x.Id);
            builder.Entity<Transporte>().HasOne(x => x.Veiculo);
            builder.Entity<Transporte>().Property(x => x.VeiculoId).HasColumnName("idVeiculo");

            builder.Entity<PontoApoioVeiculo>().ToTable("pontoApoioVeiculo").HasKey(x => x.Id);
            builder.Entity<PontoApoioVeiculo>().HasOne(x => x.PontoApoio);
            builder.Entity<PontoApoioVeiculo>().Property(x => x.PontoApoioId).HasColumnName("idApoio");
            builder.Entity<PontoApoioVeiculo>().HasOne(x => x.Veiculo);
            builder.Entity<PontoApoioVeiculo>().Property(x => x.VeiculoId).HasColumnName("idVeiculo");

            builder.Entity<Necessidade>().ToTable("listaNecessidades").HasKey(x => x.Id);
            builder.Entity<Necessidade>().HasOne(x => x.PontoApoio);
            builder.Entity<Necessidade>().Property(x => x.PontoApoioId).HasColumnName("idPontoApoio");
            builder.Entity<Necessidade>().HasOne(x => x.Item);
            builder.Entity<Necessidade>().Property(x => x.ItemId).HasColumnName("idItem");
            builder.Entity<Necessidade>().Property(x => x.Quantidade).HasColumnName("qtd");

            builder.Entity<Excedente>().ToTable("listaExcedentes").HasKey(x => x.Id);
            builder.Entity<Excedente>().HasOne(x => x.PontoApoio);
            builder.Entity<Excedente>().Property(x => x.PontoApoioId).HasColumnName("idPontoApoio");
            builder.Entity<Excedente>().HasOne(x => x.Item);
            builder.Entity<Excedente>().Property(x => x.ItemId).HasColumnName("idItem");
            builder.Entity<Excedente>().Property(x => x.Quantidade).HasColumnName("qtd");

            builder.Entity<Item>().ToTable("listaItem").HasKey(x => x.Id);

            builder.Entity<Veiculo>().ToTable("veiculo").HasKey(x => x.Id);

            builder.Entity<Carreto>().ToTable("listaCarreto").HasKey(x => x.Id);
            builder.Entity<Carreto>().HasOne(x => x.Necessidade);
            builder.Entity<Carreto>().Property(x => x.NecessidadeId).HasColumnName("idNecessidade");
            builder.Entity<Carreto>().HasOne(x => x.Excedente);
            builder.Entity<Carreto>().Property(x => x.ExcedenteId).HasColumnName("idExcedente");
            builder.Entity<Carreto>().HasOne(x => x.Transporte);
            builder.Entity<Carreto>().Property(x => x.TransporteId).HasColumnName("idTransporte");
            builder.Entity<Carreto>().Property(x => x.Quantidade).HasColumnName("qtd");
            builder.Entity<Carreto>().Property(x => x.Saiu).HasColumnName("saida");
            builder.Entity<Carreto>().Property(x => x.Entrou).HasColumnName("chegada");
        }
    }
}
