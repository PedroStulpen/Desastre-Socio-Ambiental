import {
  HTTP_INTERCEPTORS,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, filter, switchMap, take } from 'rxjs/operators';
import { AuthService } from './auth.service';

const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );

  constructor(    
    private authService: AuthService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<Object>> {
    let authReq = req;
    const token = this.authService.getToken();
    if (token != null) {
      authReq = this.addTokenHeader(req, token);
    }

    return next.handle(authReq).pipe(
      catchError((error) => {
        if (
          error instanceof HttpErrorResponse &&
          !authReq.url.includes('login') &&
          error.status === 401
        ) {
          // return this.handle401Error(authReq, next);
          this.authService.logout();
        }

        return throwError(error);
      })
    );
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      const token = this.authService.getRefreshToken();

      if (token)
        return this.authService.refreshToken().pipe(
          switchMap((token: any) => {
            this.isRefreshing = false;
            this.authService.saveToken(token);
            this.refreshTokenSubject.next(token.accessToken);
            return next.handle(this.addTokenHeader(request, token.accessToken));
          }),
          catchError((err) => {
            this.isRefreshing = false;
            this.authService.logout();
            return throwError(err);
          })
        );
    }

    return this.refreshTokenSubject.pipe(
      filter((token) => token !== null),
      take(1),
      switchMap((token) => next.handle(this.addTokenHeader(request, token)))
    );
  }

  private addTokenHeader(request: HttpRequest<any>, token: string) {    
    return request.clone({ headers: request.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token) });    
  }
}

export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
];
// import { HTTP_INTERCEPTORS, HttpEvent } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import {
//   HttpInterceptor,
//   HttpHandler,
//   HttpRequest,
// } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { AuthService } from './auth.service';

// const TOKEN_HEADER_KEY = 'Authorization';

// @Injectable()
// export class AuthInterceptor implements HttpInterceptor {
//   constructor(private token: AuthService) {}

//   intercept(
//     req: HttpRequest<any>,
//     next: HttpHandler
//   ): Observable<HttpEvent<any>> {
//     let authReq = req;
//     const token = this.token.getToken();
//     if (!req.url.includes('logar')) {
//       if (token != null) {
//         if (token !== 'undefined') {
//           authReq = req.clone({
//             headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token),
//           });
//         }
//       }
//     }
//     return next.handle(authReq);
//   }
// }

// export const authInterceptorProviders = [
//   { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
// ];
