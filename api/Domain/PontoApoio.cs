using Flunt.Notifications;
using Flunt.Validations;

namespace PetropolisApi.Domain
{
    public class PontoApoio : Notifiable<Notification>, ILogavel
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string Responsavel { get; set; }
        public string Celular { get; set; }
        public string Endereco { get; set; }
        public string Bairro { get; set; }
        public string Referencia { get; set; }
        public string Senha { get; set; }
        public bool ContatoPrivado { get; set; }
        public string Perfil { get; } = "PontoApoio";

        public PontoApoio() { }

        public PontoApoio(
            int id,
            string nome,
            string responsavel,
            string celular,
            string endereco,
            string bairro,
            string referencia,
            string senha = "",
            bool contatoPrivado = false)
        {
            Id = id;
            Nome = nome;
            Responsavel = responsavel;
            Celular = celular;
            Endereco = endereco;
            Bairro = bairro;
            Referencia = referencia;
            Senha = senha;
            ContatoPrivado = contatoPrivado;

            var contract = new Contract<PontoApoio>()
               .IsNotNullOrEmpty(Nome, "Nome", "Nome é obrigatório")
               .IsNotNullOrEmpty(Responsavel, "Responsavel", "Responsavel é obrigatório")
               .IsNotNullOrEmpty(Celular, "Celular", "Celular é obrigatório")
               .IsNotNullOrEmpty(Endereco, "Endereco", "Endereco é obrigatório")
               .IsNotNullOrEmpty(Senha, "Senha", "Senha é obrigatória");

            AddNotifications(contract);
        }

        public void Edita(string nome, string responsavel, string celular, string endereco, string bairro, string referencia, bool contatoPrivado)
        {
            Nome = nome;
            Responsavel = responsavel;
            Celular = celular;
            Endereco = endereco;
            Bairro = bairro;
            Referencia = referencia;
            ContatoPrivado = contatoPrivado;

            var contract = new Contract<PontoApoio>()
               .IsNotNullOrEmpty(Nome, "Nome", "Nome é obrigatório")
               .IsNotNullOrEmpty(Responsavel, "Responsavel", "Responsavel é obrigatório")
               .IsNotNullOrEmpty(Celular, "Celular", "Celular é obrigatório")
               .IsNotNullOrEmpty(Endereco, "Endereco", "Endereco é obrigatório");

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

