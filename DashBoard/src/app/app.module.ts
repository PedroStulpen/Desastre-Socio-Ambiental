import { CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CdkTableModule } from '@angular/cdk/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserModule } from '@angular/platform-browser';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { NgxMaskModule } from 'ngx-mask';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SanitizedHtmlPipe } from './utils/sanitized-html.pipe';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgOptionHighlightModule } from '@ng-select/ng-option-highlight';
import { NgxPrintModule } from 'ngx-print';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';

//Páginas
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import { LayoutComponent } from './admin/compoments/layout/layout.component';
import { AdminHeaderComponent } from './admin/compoments/admin-menu/admin-header/admin-header.component';
import { AdminMenuLateralComponent } from './admin/compoments/admin-menu/admin-menu-lateral/admin-menu-lateral.component';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { DialogPerguntaGenericaComponent } from './admin/compoments/dialog-pergunta-generica/dialog-pergunta-generica.component';
import { authInterceptorProviders } from './auth/auth.interceptor';
import { EsqueciSenhaComponent } from './login/esqueci-senha/esqueci-senha.component';
import { DataPtBrPipe, MoedaPipe } from './utils/formatInfo';
import { DialogJustificativaComponent } from './compoments-genericos/dialog-justificativa/dialog-justificativa.component';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { MaskInputDirective } from './utils/maskDataPiker';
import { CadastroComponent } from './login/cadastro/cadastro.component';
import { AdminListaExcedenteComponent } from './admin/admin-lista-excedente/admin-lista-excedente.component';
import { DialogExcedenteComponent } from './admin/admin-lista-excedente/dialog-excedente/dialog-excedente.component';
import { AdminListaNecessidadeComponent } from './admin/admin-lista-necessidade/admin-lista-necessidade.component';
import { DialogNecessidadeComponent } from './admin/admin-lista-necessidade/dialog-necessidade/dialog-necessidade.component';
import { ListaNecessidadesComponent } from './lista-necessidades/lista-necessidades.component';
import { AdminPerfilComponent } from './admin/admin-perfil/admin-perfil.component';
import { ListaExcedenteComponent } from './lista-excedente/lista-excedente.component';
import { AdminItensComponent } from './admin/admin-itens/admin-itens.component';
import { DialogAdminItemComponent } from './admin/admin-itens/dialog-admin-item/dialog-admin-item.component';

registerLocaleData(localePt);
@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    LoginComponent,
    LayoutComponent,
    AdminHeaderComponent,
    AdminMenuLateralComponent,
    AdminHomeComponent,
    DialogPerguntaGenericaComponent,
    EsqueciSenhaComponent,
    SanitizedHtmlPipe,
    DataPtBrPipe,
    MoedaPipe,
    DialogJustificativaComponent,
    MaskInputDirective, 
    CadastroComponent,    
    AdminListaExcedenteComponent,
    DialogExcedenteComponent,
    DialogNecessidadeComponent,
    AdminListaNecessidadeComponent,
    ListaNecessidadesComponent,
    AdminPerfilComponent,
    ListaExcedenteComponent,
    AdminItensComponent,
    DialogAdminItemComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxSpinnerModule,
    FlexLayoutModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    CdkTableModule,
    MatPaginatorModule,
    MatSortModule,
    NgbModule,
    MatMenuModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatDividerModule,
    MatToolbarModule,
    MatSnackBarModule,
    NgSelectModule,
    NgOptionHighlightModule,
    AngularEditorModule,
    MatExpansionModule,
    MatCardModule,
    MatCheckboxModule,
    NgxPrintModule,
    MatSlideToggleModule,
    MatAutocompleteModule,
    MatChipsModule,
    NgxMaskModule.forRoot(),
  ],
  providers: [
    authInterceptorProviders,
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    { provide: LOCALE_ID, useValue: 'pt' },
    NgbActiveModal,
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
