import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { ApiUrls } from 'src/app/utils/urls';
import { map, catchError } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';
import { ShowMessageService } from '../admin/compoments/show-message/show-message.service';
import { Router } from '@angular/router';
import { Demanda } from '../model/demanda';

@Injectable({
  providedIn: 'root',
})
export class ListaExcedenteService {
  constructor(
    private http: HttpClient,
    private showMessageService: ShowMessageService,
    private spinner: NgxSpinnerService,
    private router: Router
  ) {}

  listar(item: string): Observable<any[]> {
    return this.http
      .get<Demanda[]>(ApiUrls.EXCEDENTE_GERAL + (item ? '/' + item : '/0'))
      .pipe(
        map((obj) => obj),
        catchError((e) => this.errorHandler(e))
      );
  }

  errorHandler(e: any): Observable<any> {
    if (e.error.message) {
      this.showMessageService.exibirMessage(e.error.message, true);
      return throwError(e.error.message);
    } else if (e.error) {
      this.showMessageService.exibirMessage(
        'Ocorreu um erro de conexão. Por favor tente mais tarde.',
        true
      );
      return throwError(
        'Ocorreu um erro de conexão. Por favor tente mais tarde.'
      );
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

  visualizar(info: any) {
    window.sessionStorage.setItem(
      'ticketId',
      info.agrupamento_id == '0' ? info.id : info.agrupamento_id
    );
    this.router.navigate(['/gestor-ticket']);
  }
}
