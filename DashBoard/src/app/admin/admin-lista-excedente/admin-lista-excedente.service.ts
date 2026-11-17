import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { ApiUrls } from 'src/app/utils/urls';
import { map, catchError } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';
import { ShowMessageService } from '../compoments/show-message/show-message.service';
import { ItemModel } from 'src/app/model/item';
import { UserModel } from 'src/app/model/user';
import { AuthService } from 'src/app/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AdminListaExcedenteService {
  constructor(
    private http: HttpClient,
    private showMessageService: ShowMessageService,
    private spinner: NgxSpinnerService,
    private authService: AuthService
  ) {}

  listar(): Observable<ItemModel[]> {
    const user = this.authService.getUser();
    return this.http.get<ItemModel[]>(ApiUrls.EXCEDENTE + '/' + user.id).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  listarItens(): Observable<ItemModel[]> {
    return this.http.get<ItemModel[]>(ApiUrls.ITEM).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  salvar(info: ItemModel): Observable<any> {
    const user = this.authService.getUser();
    var dados = {
      PontoApoioId: user.id,
      ItemId: info.nome,
      Quantidade: info.quantidade || 0,
      Observacao: info.observacao || ''
    };
    return this.http
      .post(ApiUrls.EXCEDENTE, dados, { observe: 'response' })
      .pipe(
        map((obj) => obj),
        catchError((e) => this.errorHandler(e))
      );
  }

  editar(info: ItemModel) {
    const user = this.authService.getUser();
    var dados = {
      Id:info.id,
      PontoApoioId:user.id,
      ItemId:info.nome,
      Quantidade:info.quantidade || 0,
      Observacao: info.observacao || ''
    };
    return this.http
      .put(ApiUrls.EXCEDENTE, dados, {
        observe: 'response',
      })
      .pipe(
        map((obj) => obj),
        catchError((e) => this.errorHandler(e))
      );
  }

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
