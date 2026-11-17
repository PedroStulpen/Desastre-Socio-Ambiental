export class ClienteModel {
  Id: string;
  Nome: string;
  Celular: string;
  Telefone: string;
  Email: string;
  DataNascimento: string;
  DataCadastro: string;
  ativo: boolean;

  constructor() {
    this.Id = '';
    this.Nome = '';
    this.Telefone = '';
    this.Celular = '';
    this.Email = '';
    this.DataCadastro = '';
    this.DataNascimento = '';
    this.ativo = true;
  }
}
