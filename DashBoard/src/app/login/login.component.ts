import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from '../auth/auth.service';
import { MessagemSnackerService } from '../utils/messagem-snacker.service';
import { CadastroComponent } from './cadastro/cadastro.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  public loginInvalid = false;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles!: string;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private messagemSnackerService: MessagemSnackerService,
    private spinner: NgxSpinnerService,
    private modalService: NgbModal,
  ) {
    this.form = this.fb.group({
      username: ['', Validators.email],
      password: ['', Validators.required],
    });
  }

  async ngOnInit(): Promise<void> {
    // if (this.authService.getToken()) {
    //   this.isLoggedIn = true;
    //   this.roles = this.authService.getUser().perfil;
    // }
  }

  async onSubmit(): Promise<void> {
    // if (!this.form.valid) {
    //   this.messagemSnackerService.exibirMessage(
    //     'Atenção: É necessário preencher os campos obrigatórios.'
    //   );
    //   return;
    // }
    //this.router.navigateByUrl('/admin-home');
    this.spinner.show();
    this.authService.login(this.form.value).subscribe(
      async (data: any) => {
        //this.isLoginFailed = false;
        //this.isLoggedIn = true;
        if (data.perfil == 'PontoApoio') this.authService.setInformacoes('ADMIN', data);
        if (data.perfil == 'Transporte') this.authService.setInformacoes('VOLUNTARIO', data);       
        this.spinner.hide();
        this.redirecionarPagina(data);
      },
      (err: { error: { message: string } }) => {
        this.spinner.hide();
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  }

  reloadPage(): void {
    window.location.reload();
  }

  redirecionarPagina(data: any) {
    if (data.perfil === 'PontoApoio') {
      this.router.navigateByUrl('/admin-home');  
    } else if (data.perfil === 'Transporte') {
      this.router.navigateByUrl('/usuario-home');
    } else {
      this.router.navigateByUrl('/login');
    }
  }

  cadastro(){
    const modalRef = this.modalService.open( CadastroComponent, {size:'lg'} );
    modalRef.result.then(
      async (result) => {
        if (result == 'ok') {         
          this.messagemSnackerService.exibirMessage(
            'Cadastro realizado com sucesso.'
          );
          this.spinner.hide();
        }
      },
      (reason) => {}
    );
  }
}
