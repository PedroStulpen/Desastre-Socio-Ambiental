import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ItemModel } from 'src/app/model/item';
import { ShowMessageService } from '../../compoments/show-message/show-message.service';
import { AdminItensService } from '../admin-itens.service';

@Component({
  selector: 'app-dialog-admin-item',
  templateUrl: './dialog-admin-item.component.html',
  styleUrls: ['./dialog-admin-item.component.css']
})
export class DialogAdminItemComponent implements OnInit {
  @Input()
  info: ItemModel = new ItemModel();

  erroNome = false;
  erroMensagem = '';
  erroInformacoes = false;

  listaItem: ItemModel[] = [];

  constructor(
    private showMessageService: ShowMessageService,
    public activeModal: NgbActiveModal,
    private spinner: NgxSpinnerService,
    private adminItensService: AdminItensService
  ) {}

  ngOnInit(): void {   
  }

  async salvar() {
    this.spinner.show();
    this.erroNome = false;
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

    if (!this.info.id) {
      await this.salvarInformacoes();
    } else {
      await this.editarInformacoes();
    }
  }

  private async salvarInformacoes() {
    this.adminItensService.salvar(this.info).subscribe(
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
    this.adminItensService.editar(this.info).subscribe(
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
    if (!this.info.nome) {
      this.erroNome = true;
      erro = true;
    }

    return erro;
  }
}

