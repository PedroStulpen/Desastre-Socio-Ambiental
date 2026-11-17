namespace PetropolisApi.Domain
{
    public class PontoApoioVeiculo
    {
        public int Id { get; set; }
        public int VeiculoId { get; set; }
        public Veiculo Veiculo { get; set; }
        public int PontoApoioId { get; set; }
        public PontoApoio PontoApoio { get; set; }

        public PontoApoioVeiculo() { }

        public PontoApoioVeiculo(int veiculo, int pontoApoio)
        {
            VeiculoId = veiculo;
            PontoApoioId = pontoApoio;
        }
    }
}
