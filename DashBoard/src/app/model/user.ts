export class UserModel {
  id: string;
  apoio: string;
  nome: string;
  responsavel: string;
  celular: string;
  endereco: string;
  bairro: string;
  referencia: string;
  tipoAcesso: string;
  senha: string;
  veiculo: number[];
  senhaRepetir: string;
  contatoPrivado: boolean;

  constructor() {
    this.id = '';
    this.apoio = '';
    this.nome = '';
    this.responsavel = '';
    this.celular = '';
    this.endereco = '';
    this.bairro = '';
    this.referencia = '';
    this.tipoAcesso = '';
    this.senha = '';
    this.veiculo = [];
    this.senhaRepetir = '';
    this.contatoPrivado = false;
  }
}
