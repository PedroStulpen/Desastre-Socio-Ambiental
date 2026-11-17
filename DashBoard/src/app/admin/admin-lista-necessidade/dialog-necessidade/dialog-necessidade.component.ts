import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ItemModel } from 'src/app/model/item';
import { ShowMessageService } from '../../compoments/show-message/show-message.service';
import { AdminListaNecessidadeService } from '../admin-lista-necessidade.service';


@Component({
  selector: 'app-dialog-necessidade',
  templateUrl: './dialog-necessidade.component.html',
  styleUrls: ['./dialog-necessidade.component.css']
})
export class DialogNecessidadeComponent implements OnInit {
  @Input()
  info: ItemModel = new ItemModel();

  erroItem = false;
  erroQuantidade = false;
  erroMensagem = '';
  erroInformacoes = false;

  listaItem: ItemModel[] = [];

  itemControl = new FormControl();
  itensFiltrados!: Observable<ItemModel[]>;

  constructor(
    private showMessageService: ShowMessageService,
    public activeModal: NgbActiveModal,
    private spinner: NgxSpinnerService,
    private adminListaNecessidadeService: AdminListaNecessidadeService
  ) {}

  ngOnInit(): void {
    this.spinner.show();
    this.adminListaNecessidadeService.listarItens().subscribe(
      async (data: ItemModel[]) => {
        this.listaItem = data;
        if (this.info.id) {
          var item = this.encontraItem(this.info.item)
          this.itemControl.setValue(item.nome)
        }
        this.spinner.hide();

        this.itensFiltrados = this.itemControl.valueChanges.pipe(
          startWith(''),
          map(value => {
            const filterValue = value.toLowerCase();
            return this.listaItem.filter(item => item.nome.toLowerCase().includes(filterValue));
          }),
        );
      },
      (err: any) => {
        this.spinner.hide();
      }
    );
  }

  async salvar() {
    this.spinner.show();
    this.erroItem = false;
    this.erroQuantidade = false;
    this.erroMensagem = '';
    this.erroInformacoes = false;

    if (await this.verificarErro()) {
      this.spinner.hide();
      this.showMessageService.exibirMessage(
        'Atenção: É necessário preencher os campos obrigatórios.',
        true
      );
      return;
    }

    this.info.nome = this.encontraItem(this.itemControl.value).id
    if (!this.info.id) {
      await this.salvarInformacoes();
    } else {
      await this.editarInformacoes();
    }
  }

  private encontraItem(nome: string) {
    return this.listaItem.find(i => i.nome == nome)!
  }

  private async salvarInformacoes() {
    this.adminListaNecessidadeService.salvar(this.info).subscribe(
      async (data: any) => {
        this.activeModal.close('ok');
      },
      (err: any) => {
        this.spinner.hide();
        this.showMessageService.exibirMessage(err, true);
        this.erroMensagem = err;
        this.erroInformacoes = true;
      }
    );
  }

  private async editarInformacoes() {
    this.adminListaNecessidadeService.editar(this.info).subscribe(
      async () => {
        this.activeModal.close('ok');
      },
      (err: any) => {
        this.spinner.hide();
        this.showMessageService.exibirMessage(err, true);
        this.erroMensagem = err;
        this.erroInformacoes = true;
      }
    );
  }

  async verificarErro(): Promise<boolean> {
    let erro = false;
    if (!this.itemControl.value) {
      this.erroItem = true;
      erro = true;
    }

    // if (!this.info.quantidade) {
    //   this.erroQuantidade = true;
    //   erro = true;
    // }

    return erro;
  }
}
