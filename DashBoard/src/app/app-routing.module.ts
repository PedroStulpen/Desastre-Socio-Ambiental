import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ADMIN_ROUTES } from './admin/admin-routing.module';
import { AdminComponent } from './admin/admin.component';
import { AuthGuard } from './auth/auth.guard';
import { ListaExcedenteComponent } from './lista-excedente/lista-excedente.component';
import { ListaNecessidadesComponent } from './lista-necessidades/lista-necessidades.component';
import { CadastroComponent } from './login/cadastro/cadastro.component';
import { EsqueciSenhaComponent } from './login/esqueci-senha/esqueci-senha.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [ 
  {
    path: '',
    component: AdminComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Administrador',
      role: 'ADMIN'
    },
    children: ADMIN_ROUTES,
  }, 
  { path: 'lista-necessidade', component: ListaNecessidadesComponent},
  { path: 'lista-excedente', component: ListaExcedenteComponent},
  { path: 'login', component: LoginComponent}, 
  { path: 'esqueci-senha', component: EsqueciSenhaComponent},
  { path: 'cadastro', component: CadastroComponent},
  { path: '**', redirectTo: 'lista-necessidade' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
