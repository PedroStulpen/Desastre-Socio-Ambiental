import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { ApiUrls } from 'src/app/utils/urls';
import { map, catchError } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';
import { ShowMessageService } from '../admin/compoments/show-message/show-message.service';
import { Demanda } from '../model/demanda';

@Injectable({
  providedIn: 'root',
})
export class ListaNecessidadesService {
  constructor(
    private http: HttpClient,
    private showMessageService: ShowMessageService,
    private spinner: NgxSpinnerService
  ) {}

  listar(item: string): Observable<any[]> {
    return this.http
      .get<Demanda[]>(ApiUrls.NECESSIDADE_GERAL + (item ? '/' + item : '/0'))
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
}
