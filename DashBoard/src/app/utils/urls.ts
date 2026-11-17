import { environment } from 'src/environments/environment';
export class ApiUrls {
  static BASE_URL: any = environment.urlBase;
  static LOGIN_URL: string = ApiUrls.BASE_URL + '/login';
  static CADASTRAR_USUARIO_URL: string = ApiUrls.BASE_URL + '/login/registrar';
  static VALIDAR_EMAIL_URL: string = ApiUrls.BASE_URL + '/login/registrar';
  static REFRESH_TOKEN_URL: string = ApiUrls.BASE_URL + '/refresh';  

  static EXCEDENTE: string = ApiUrls.BASE_URL + '/excedente';
  static EXCEDENTE_GERAL: string = ApiUrls.BASE_URL + '/excedente/geral';  
  static NECESSIDADE: string = ApiUrls.BASE_URL + '/necessidade';
  static NECESSIDADE_GERAL: string = ApiUrls.BASE_URL + '/necessidade/geral'; 
  static TRANSPORTE: string = ApiUrls.BASE_URL + '/transporte';
  static APOIO: string = ApiUrls.BASE_URL + '/pontoapoio';
  static ITEM: string = ApiUrls.BASE_URL + '/item';
  static VEICULO: string = ApiUrls.BASE_URL + '/veiculo';
}
