export class LivroModel {
  Id: string;
  Nome: string;
  Autor: string;
  Ano: string;
  Editora: string;
  Descricao: string;
  DataCadastro: string;
  Ativo: boolean;
  ImagemCapa: string;
  ImagemVerso: string;
  IdCategoria: string;

  constructor() {
    this.Id = '';
    this.Nome = '';
    this.Autor = '';
    this.Ano = '';
    this.Editora = '';
    this.DataCadastro = '';
    this.Descricao = '';
    this.Ativo = true;
    this.ImagemCapa = '';
    this.ImagemVerso = '';
    this.IdCategoria = '';
  }
}
