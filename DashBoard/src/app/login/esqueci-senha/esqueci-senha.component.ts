import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/auth/auth.service';
import { MessagemSnackerService } from 'src/app/utils/messagem-snacker.service';

@Component({
  selector: 'app-esqueci-senha',
  templateUrl: './esqueci-senha.component.html',
  styleUrls: ['./esqueci-senha.component.css'],
})
export class EsqueciSenhaComponent implements OnInit {
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
    private spinner: NgxSpinnerService
  ) {
    this.form = this.fb.group({
      email: ['', Validators.email],      
    });
  }

  async ngOnInit(): Promise<void> {
    if (this.authService.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.authService.getUser().perfil;
    }
  }

  async onSubmit(): Promise<void> {
    if (!this.form.valid) {
      this.messagemSnackerService.exibirMessage(
        'Atenção: É necessário preencher os campos obrigatórios.'
      );
      return;
    }
    // this.spinner.show();
    // this.authService.login(this.form.value).subscribe(
    //   async (data: any) => {
    //     this.isLoginFailed = false;
    //     this.isLoggedIn = true;
    //     this.authService.setInformacoes('ADMIN', data);
    //     this.spinner.hide();
    //     this.redirecionarPagina(data);
    //   },
    //   (err: { error: { message: string } }) => {
    //     this.spinner.hide();
    //     this.errorMessage = err.error.message;
    //     this.isLoginFailed = true;
    //   }
    // );
  }

  reloadPage(): void {
    window.location.reload();
  }

  redirecionarPagina(data: any) {
    if (data.perfil === '1000') {
      this.router.navigateByUrl('/admin-home');
    } else {
      this.router.navigateByUrl('/login');
    }
  }
}
