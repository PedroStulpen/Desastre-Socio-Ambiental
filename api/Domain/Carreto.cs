using Flunt.Notifications;
using Flunt.Validations;
using System;

namespace PetropolisApi.Domain
{
    public class Carreto : Notifiable<Notification>
    {
        public int Id { get; set; }
        public int ExcedenteId { get; set; }
        public Excedente? Excedente { get; set; }
        public int TransporteId { get; set; }
        public Transporte? Transporte { get; set; }
        public int NecessidadeId { get; set; }
        public Necessidade Necessidade { get; set; }
        public int Quantidade { get; set; }
        public DateTime DataCadastro { get; set; }
        public bool Saiu { get; set; }
        public bool Entrou { get; set; }

        public Carreto() { }

        public Carreto(
            int id,
            int transporte,
            int excedente,
            int necessidade,
            int quantidade,
            DateTime dataCadastro,
            bool saiu = false,
            bool entrou = false)
        {
            Id = id;
            TransporteId = transporte;
            ExcedenteId = excedente;
            NecessidadeId = necessidade;
            Quantidade = quantidade;
            DataCadastro = dataCadastro;
            Entrou = entrou;
            Saiu = saiu;

            var contract = new Contract<Transporte>()
                .IsGreaterThan(TransporteId, 0, "Transporte", "Transporte é obrigatório")
                .IsGreaterThan(ExcedenteId, 0, "Excedente", "Excedente é obrigatório")
                .IsGreaterThan(NecessidadeId, 0, "Necessidade", "Necessidade é obrigatória")
                .IsGreaterThan(Quantidade, 0, "Quantidade", "Quantidade é obrigatória");

            AddNotifications(contract);
        }
    }
}