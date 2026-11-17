import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { ApiUrls } from '../utils/urls';
import { of } from 'rxjs';
import { UserModel } from '../model/user';
import { catchError, map } from 'rxjs/operators';
import { ShowMessageService } from '../admin/compoments/show-message/show-message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

const TOKEN_KEY = 'auth-token';
const TOKEN_REFRESH_KEY = 'auth-token-refresh';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLogin = false;
  roleAs!: string;
  AUTH_API = ApiUrls.LOGIN_URL;

  constructor(
    private http: HttpClient,
    private showMessageService: ShowMessageService
  ) {}

  login(credentials: { username: string; password: string }): Observable<any> {
    // var formData: any = new FormData();
    // formData.append('login', credentials.username.trim());
    // formData.append('senha', credentials.password.trim());

    let info = {
      login: credentials.username.trim(),
      senha: credentials.password.trim(),
    };

    return this.http.post(this.AUTH_API, info).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  errorHandler(e: any): Observable<any> {
    if (e.error.message) {
      this.showMessageService.exibirMessage(e.error.message, true);
      return throwError(e.error.message);
    } else {
      const mensagem =
        'Ocorreu um erro de conexão. Por favor tente mais tarde.';
      this.showMessageService.exibirMessage(mensagem, true);
      return throwError(mensagem);
    }
  }

  // refreshToken(user: {
  //   username: any;
  //   email: any;
  //   password: any;
  // }): Observable<any> {
  //   return this.http.post(
  //     this.AUTH_API,
  //     {
  //       username: user.username,
  //       email: user.email,
  //       password: user.password,
  //     },
  //     httpOptions
  //   );
  // }

  isLoggedIn() {
    const loggedIn = localStorage.getItem('STATE');
    if (loggedIn == 'true') this.isLogin = true;
    else this.isLogin = false;
    return this.isLogin;
  }

  getRole() {
    this.roleAs = localStorage.getItem('ROLE')!;
    return this.roleAs;
  }

  public getRefreshToken(): string {
    return sessionStorage.getItem(TOKEN_REFRESH_KEY)!;
  }

  logout() {
    this.isLogin = false;
    this.roleAs = '';
    localStorage.setItem('STATE', 'false');
    localStorage.setItem('ROLE', '');
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.removeItem(TOKEN_REFRESH_KEY);
    window.sessionStorage.clear();
    return of({ success: this.isLogin, role: '' });
  }

  async setInformacoes(nomerole: string, data: any) {
    this.isLogin = true;
    this.roleAs = nomerole;
    localStorage.setItem('STATE', 'true');
    localStorage.setItem('ROLE', this.roleAs);
    window.sessionStorage.clear();
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.removeItem(TOKEN_REFRESH_KEY);

    const infoUser: UserModel = {} as UserModel;
    infoUser.nome = data.nome;
    infoUser.id = data.id

    window.sessionStorage.setItem(USER_KEY, JSON.stringify(infoUser));
    window.sessionStorage.setItem(TOKEN_KEY, data.token);
    window.sessionStorage.setItem(TOKEN_REFRESH_KEY, data.token);

    this.setImagemPerfil('assets/img/iconeUserSite.png');

    return of({ success: this.isLogin, role: this.roleAs });
  }

  async saveToken(data: any) {
    window.sessionStorage.clear();
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.removeItem(TOKEN_REFRESH_KEY);
    window.sessionStorage.setItem(TOKEN_REFRESH_KEY, data.body.refresh_token);
    window.sessionStorage.setItem(TOKEN_KEY, data.body.access_token);
  }

  async setImagemPerfil(imagem: string) {
    window.sessionStorage.removeItem('IMAGEM_PERFIL');
    window.sessionStorage.setItem('IMAGEM_PERFIL', imagem);
  }

  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY)!;
  }

  public getUser(): any {
    return JSON.parse(sessionStorage.getItem(USER_KEY)!);
  }

  public getImagemPerfil(): any {
    return sessionStorage.getItem('IMAGEM_PERFIL')!;
  }

  refreshToken(): Observable<any> {
    return this.http
      .post(ApiUrls.REFRESH_TOKEN_URL, { observe: 'response' })
      .pipe(
        map((obj) => obj),
        catchError((e) => this.errorHandler(e))
      );
  }
}
