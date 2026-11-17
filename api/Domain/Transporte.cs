using Flunt.Notifications;
using Flunt.Validations;

namespace PetropolisApi.Domain
{
    public class Transporte : Notifiable<Notification>, ILogavel
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string Celular { get; set; }
        public int VeiculoId { get; set; }
        public Veiculo? Veiculo { get; set; }
        public string Senha { get; set; }
        public bool ContatoPrivado { get; set; }
        public string Perfil { get; } = "Transporte";

        public Transporte() { }

        public Transporte(
            int id,
            string nome,
            string celular,
            int veiculoId,
            string senha = "",
            bool contatoPrivado = false)
        {
            Id = id;
            Nome = nome;
            Celular = celular;
            VeiculoId = veiculoId;
            Senha = senha;
            ContatoPrivado = contatoPrivado;

            var contract = new Contract<Transporte>()
               .IsNotNullOrEmpty(Nome, "Nome", "Nome é obrigatório")
               .IsNotNullOrEmpty(Celular, "Celular", "Celular é obrigatório")
               .IsNotNull(VeiculoId, "TipoVeiculo", "Tipo de veiculo é obrigatório")
               .IsNotNullOrEmpty(Senha, "Senha", "Senha é obrigatória");

            AddNotifications(contract);
        }

        public void Edita(string nome, string celular, int veiculoId, bool contatoPrivado)
        {
            Nome = nome;
            Celular = celular;
            VeiculoId = veiculoId;
            ContatoPrivado = contatoPrivado;

            var contract = new Contract<Transporte>()
               .IsNotNullOrEmpty(Nome, "Nome", "Nome é obrigatório")
               .IsNotNullOrEmpty(Celular, "Celular", "Celular é obrigatório")
               .IsNotNull(VeiculoId, "TipoVeiculo", "Tipo de veiculo é obrigatório");

            AddNotifications(contract);
        }

        public void EditaSenha(string novaSenha)
        {
            Senha = novaSenha;

            var contract = new Contract<Transporte>()
               .IsNotNullOrEmpty(Senha, "Senha", "Senha é obrigatória");

            AddNotifications(contract);
        }
    }

}
