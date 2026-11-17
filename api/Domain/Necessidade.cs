using Flunt.Notifications;
using Flunt.Validations;

namespace PetropolisApi.Domain
{
    public class Necessidade : Notifiable<Notification>
    {
        public int Id { get; set; }
        public int PontoApoioId { get; set; }
        public PontoApoio? PontoApoio { get; set; }
        public int ItemId { get; set; }
        public Item? Item { get; set; }
        public int Quantidade { get; set; }
        public string Observacao { get; set; }
        public bool Ativo { get; set; }

        public Necessidade() { }

        public Necessidade(int id, int pontoApoio, int item, int quantidade, string observacao, bool ativo)
        {
            Id = id;
            PontoApoioId = pontoApoio;
            ItemId = item;
            Quantidade = quantidade;
            Observacao = observacao;
            Ativo = ativo;

            var contract = new Contract<Excedente>()
               .IsGreaterThan(PontoApoioId, 0, "Ponto de Apoio", "Ponto de Apoio é obrigatório")
               .IsGreaterThan(ItemId, 0, "Item", "Item é obrigatório")
               .IsLowerThan(Observacao.Length, 200, "Observação", "Observação não pode ter mais de 200 caracteres");
            //.IsGreaterThan(Quantidade, 0, "Quantidade", "Quantidade é obrigatória");

            AddNotifications(contract);
        }

        public void Edita(int itemId, int quantidade, string observacao)
        {
            ItemId = itemId;
            Item = null;
            Quantidade = quantidade;
            Observacao = observacao;

            var contract = new Contract<Excedente>()
               .IsGreaterThan(ItemId, 0, "Item", "Item é obrigatório")
               .IsLowerThan(Observacao.Length, 200, "Observação", "Observação não pode ter mais de 200 caracteres");
            //.IsGreaterThan(Quantidade, 0, "Quantidade", "Quantidade é obrigatória");

            AddNotifications(contract);
        }
    }

}
