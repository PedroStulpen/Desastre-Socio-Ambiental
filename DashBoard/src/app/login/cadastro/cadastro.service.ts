import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { ApiUrls } from 'src/app/utils/urls';
import { map, catchError } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';
import { ShowMessageService } from 'src/app/admin/compoments/show-message/show-message.service';
import { UserModel } from 'src/app/model/user';
import { Veiculo } from 'src/app/model/veiculo';

@Injectable({
  providedIn: 'root'
})
export class CadastroService {
  constructor(
    private http: HttpClient,
    private showMessageService: ShowMessageService,
    private spinner: NgxSpinnerService
  ) {}

  listarVeiculos() {
    return this.http.get<Veiculo[]>(ApiUrls.VEICULO);
  }

  salvarVoluntario(info: UserModel): Observable<any> {
    var dados = { 
      nome: info.nome, 
      celular: info.celular,
      senha: info.senha,
      IdTipoVeiculo: info.veiculo[0],
      contatoPrivado: info.contatoPrivado,
    };

    return this.http
      .post(ApiUrls.TRANSPORTE, dados, { observe: 'response' })
      .pipe(
        map((obj) => obj),
        catchError((e) => this.errorHandler(e))
      );
  }

  salvarApoio(info: UserModel): Observable<any> {
    var dados = { 
      nome: info.nome, 
      celular: info.celular,
      senha: info.senha,
      responsavel: info.responsavel,
      endereco: info.endereco,
      bairro: info.bairro,
      referencia: info.referencia,
      tiposVeiculos: info.veiculo,
      contatoPrivado: info.contatoPrivado,
    };

    return this.http
      .post(ApiUrls.APOIO, dados, { observe: 'response' })
      .pipe(
        map((obj) => obj),
        catchError((e) => this.errorHandler(e))
      );
  }

  // editar(info: UserModel) {
  //   var dados = { nome: info.nome, quantidade: info.qtd };
  //   return this.http
  //     .put(ApiUrls.EXCEDENTE + '/' + info.id, dados, {
  //       observe: 'response',
  //     })
  //     .pipe(
  //       map((obj) => obj),
  //       catchError((e) => this.errorHandler(e))
  //     );
  // }

  excluir(id: string): Observable<any> {
    return this.http.delete(ApiUrls.EXCEDENTE + '/' + id).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  errorHandler(e: any): Observable<any> {
    if (e.error.message) {
      this.showMessageService.exibirMessage(e.error.message, true);
      return throwError(e.error.message);
    } else if (e.error) {
      this.showMessageService.exibirMessage(e.error, true);
      return throwError(e.error);
    } else if (e.title) {
      this.showMessageService.exibirMessage(e.title, true);
      return throwError(e.title);
    } else {
      const mensagem =
        'Ocorreu um erro de conexão. Por favor tente mais tarde.';
      this.spinner.hide();
      this.showMessageService.exibirMessage(mensagem, true);
      return throwError(mensagem);
    }
  }
}