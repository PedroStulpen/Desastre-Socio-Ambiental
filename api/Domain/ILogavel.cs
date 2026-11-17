namespace PetropolisApi.Domain
{
    public interface ILogavel
    {
        int Id { get; }
        string Celular { get; }
        string Senha { get; }
        string Perfil { get; }
        string Nome { get; }

        void EditaSenha(string novaSenha);
    }
}

