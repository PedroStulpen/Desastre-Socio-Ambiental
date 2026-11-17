import { Routes } from '@angular/router';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminItensComponent } from './admin-itens/admin-itens.component';
import { AdminListaExcedenteComponent } from './admin-lista-excedente/admin-lista-excedente.component';
import { AdminListaNecessidadeComponent } from './admin-lista-necessidade/admin-lista-necessidade.component';
import { AdminPerfilComponent } from './admin-perfil/admin-perfil.component';


export const ADMIN_ROUTES: Routes = [
  { path: 'admin-home', component: AdminListaNecessidadeComponent },
  { path: 'admin-necessidade', component: AdminListaNecessidadeComponent },
  { path: 'admin-excedente', component: AdminListaExcedenteComponent },
  { path: 'admin-perfil', component: AdminPerfilComponent },
  { path: 'admin-item', component: AdminItensComponent },
];
