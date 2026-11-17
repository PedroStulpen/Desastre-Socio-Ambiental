export class Veiculo {
  id: number
  nome: string

  constructor(init:{
    id:number,
    nome:string
  }) {
    this.id = init.id
    this.nome = init.nome
  }
}