using Flunt.Notifications;
using Flunt.Validations;

namespace PetropolisApi.Domain
{
    public class Item : Notifiable<Notification>
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public bool Ativo { get; set; }

        public Item() { }

        public Item(int id, string nome, bool ativo)
        {
            Id = id;
            Nome = nome;
            Ativo = ativo;

            var contract = new Contract<Excedente>()
               .IsNotNullOrEmpty(Nome, "Nome", "Nome é obrigatório");

            AddNotifications(contract);
        }

        public void Edita(string nome)
        {
            Nome = nome;

            var contract = new Contract<Excedente>()
               .IsNotNullOrEmpty(Nome, "Nome", "Nome é obrigatório");

            AddNotifications(contract);
        }
    }
}
