namespace PetropolisApi.Domain
{
    public class Veiculo
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public bool Ativo { get; set; }

        public Veiculo() { }

        public Veiculo(int id, string nome, bool ativo)
        {
            Id = id;
            Nome = nome;
            Ativo = ativo;
        }
    }
}
