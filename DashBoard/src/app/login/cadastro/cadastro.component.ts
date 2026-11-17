import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ShowMessageService } from 'src/app/admin/compoments/show-message/show-message.service';
import { UserModel } from 'src/app/model/user';
import { Veiculo } from 'src/app/model/veiculo';
import { CadastroService } from './cadastro.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css'],
})
export class CadastroComponent implements OnInit {
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  info: UserModel = new UserModel();

  erroPonto = false;
  erroResponsavel = false;
  erroCelular = false;
  erroEndereco = false;
  erroBairro = false;
  erroTipo = false;
  erroSenha = false;
  erroVeiculo = false;
  erroNome = false;
  erroMensagem = '';
  erroInformacoes = false;

  apoio: string = 'Ponto de Apoio';
  listaApoio: string[] = ['Ponto de Apoio', 'Voluntário'];
  listaVeiculos!: Veiculo[];
  veiculosControl = new FormControl();
  veiculosFiltrados!: Observable<Veiculo[]>;
  veiculosSelecionados: Veiculo[] = [];

  constructor(
    public activeModal: NgbActiveModal,
    private cadastroService: CadastroService,
    private showMessageService: ShowMessageService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.spinner.show()
    this.cadastroService.listarVeiculos().subscribe({
      next: (veiculos) => {
        this.listaVeiculos = veiculos
        this.veiculosFiltrados = this.veiculosControl.valueChanges.pipe(
          startWith(null),
          map(value => {
            const filterValue = value ? (value.hasOwnProperty('nome') ? value.nome : value).toLowerCase() : '';
            return this.listaVeiculos.filter(item => item.nome.toLowerCase().includes(filterValue) && !this.veiculosSelecionados.includes(item));
          }),
        );
        this.spinner.hide()
      },
      error: () => this.spinner.hide(),
    })
  }

  remove(v: Veiculo): void {
    const index = this.veiculosSelecionados.indexOf(v);

    if (index >= 0) {
      this.veiculosSelecionados.splice(index, 1);
      this.veiculosControl.setValue(null);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.veiculosSelecionados.push(event.option.value);
    this.veiculosControl.setValue(null);
    this.erroVeiculo = false;
    this.verificarErro();
  }

  tipoUsuario(event: any) {
    this.info = new UserModel();
    this.erroPonto = false;
    this.erroResponsavel = false;
    this.erroCelular = false;
    this.erroEndereco = false;
    this.erroBairro = false;
    this.erroTipo = false;
    this.erroSenha = false;
    this.erroVeiculo = false;
    this.erroNome = false;
  }

  async cadastrar() {
    this.erroPonto = false;
    this.erroResponsavel = false;
    this.erroCelular = false;
    this.erroEndereco = false;
    this.erroBairro = false;
    this.erroTipo = false;
    this.erroSenha = false;
    this.erroVeiculo = false;
    this.erroNome = false;
    this.erroMensagem = '';
    this.erroInformacoes = false;

    if (!await this.verificarErro()) {
      this.spinner.show();
      if (this.apoio == 'Ponto de Apoio') {
        this.info.veiculo = this.veiculosSelecionados.map(v => v.id);
        this.cadastroService.salvarApoio(this.info).subscribe(
          async () => {
            this.spinner.hide();
            this.activeModal.close('ok');
          },
          (err: any) => {
            this.spinner.hide();
            this.showMessageService.exibirMessage(err, true);
            this.erroMensagem = err;
            this.erroInformacoes = true;
          }
        );
      } else if (this.apoio == 'Voluntário') {
        this.cadastroService.salvarVoluntario(this.info).subscribe(
          async () => {
            this.spinner.hide();
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
    }
  }

  async verificarErro(): Promise<boolean> {
    let erro = false;
    if (!this.info.nome) {
      this.erroPonto = true;
      erro = true;
    }

    if (!this.info.celular) {
      this.erroCelular = true;
      erro = true;
    }

    if (!this.info.senha) {
      this.erroSenha = true;
      erro = true;
    }

    if (!this.info.senhaRepetir) {
      this.erroSenha = true;
      erro = true;
    }

    if (this.info.senha != this.info.senhaRepetir) {
      this.erroInformacoes = true;
      this.erroMensagem = 'As senhas são diferentes';
      this.erroSenha = true;
      erro = true;
    }

    if (this.apoio == 'Ponto de Apoio') {
      if (!this.info.responsavel) {
        this.erroResponsavel = true;
        erro = true;
      }

      if (!this.info.endereco) {
        this.erroEndereco = true;
        erro = true;
      }

      if (!this.info.bairro) {
        this.erroBairro = true;
        erro = true;
      }

      if (this.veiculosSelecionados.length < 1) {
        this.erroVeiculo = true;
        erro = true;
      }
    } 

    return erro;
  }
}
