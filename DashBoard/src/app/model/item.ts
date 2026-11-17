export class ItemModel {
  id: string;
  item: string;
  nome: string;
  quantidade: number;
  observacao!: string

  constructor() {
    this.id = ''; 
    this.item = '';
    this.quantidade = 0;  
    this.nome = '';  
  }
}
