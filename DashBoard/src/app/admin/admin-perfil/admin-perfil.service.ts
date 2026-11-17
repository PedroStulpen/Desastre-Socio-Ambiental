import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { ApiUrls } from 'src/app/utils/urls';
import { map, catchError } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';
import { ShowMessageService } from 'src/app/admin/compoments/show-message/show-message.service';
import { UserModel } from 'src/app/model/user';
import { AuthService } from 'src/app/auth/auth.service';
import { Veiculo } from 'src/app/model/veiculo';

@Injectable({
  providedIn: 'root',
})
export class AdminPerfilService {
  constructor(
    private http: HttpClient,
    private showMessageService: ShowMessageService,
    private spinner: NgxSpinnerService,
    private authService: AuthService
  ) {}

  listarVeiculos() {
    return this.http.get<Veiculo[]>(ApiUrls.VEICULO);
  }
  
  salvarVoluntario(info: UserModel): Observable<any> {
    var dados = {
      id: info.id,
      nome: info.nome,
      celular: info.celular,
      IdTipoVeiculo: info.veiculo[0],
      contatoPrivado: info.contatoPrivado
    };

    return this.http
      .put(ApiUrls.TRANSPORTE, dados, { observe: 'response' })
      .pipe(
        map((obj) => obj),
        catchError((e) => this.errorHandler(e))
      );
  }

  obter(): Observable<UserModel[]> {
    const user = this.authService.getUser();
    return this.http.get<UserModel>(ApiUrls.APOIO + '/' + user.id).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  salvarApoio(info: UserModel): Observable<any> {
    var dados = {
      id: info.id,
      nome: info.nome,
      celular: info.celular,
      responsavel: info.responsavel,
      endereco: info.endereco,
      bairro: info.bairro,
      referencia: info.referencia,
      tiposVeiculos: info.veiculo,
      contatoPrivado: info.contatoPrivado,
    };

    return this.http.put(ApiUrls.APOIO, dados, { observe: 'response' }).pipe(
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
