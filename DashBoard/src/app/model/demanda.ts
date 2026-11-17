export class Demanda {
  id: number
  quantidade: number
  itemId: number
  itemNome: string
  pontoApoioId: number
  pontoApoioNome: string
  pontoApoioEndereco: string
  pontoApoioBairro: string
  observacao: string
  veiculo: string[]

  constructor(init: {
    id: number
    quantidade: number
    itemId: number
    itemNome: string
    pontoApoioId: number
    pontoApoioNome: string
    pontoApoioEndereco: string
    pontoApoioBairro: string
    observacao: string
    veiculo: string[]
  }){
    this.id = init.id
    this.quantidade = init.quantidade
    this.itemId = init.itemId
    this.itemNome = init.itemNome
    this.pontoApoioId = init.pontoApoioId
    this.pontoApoioNome = init.pontoApoioNome
    this.pontoApoioEndereco = init.pontoApoioEndereco
    this.pontoApoioBairro = init.pontoApoioBairro
    this.observacao = init.observacao
    this.veiculo = init.veiculo
  }
}