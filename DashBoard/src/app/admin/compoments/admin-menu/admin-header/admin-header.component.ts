import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent implements OnInit {  
  @Output() public sidenavToggle = new EventEmitter();
  isExpanded = true;
  element!: HTMLElement;

  imagemPerfil: string = 'assets/img/iconeUserSite.png';
  nomeUsuario: string = '';
  tipoUsuario: string = '';

  constructor(    
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const user = this.authService.getUser();
    this.nomeUsuario = user.nome;
    this.tipoUsuario = user.perfil;
    this.imagemPerfil = this.authService.getImagemPerfil();
  }

  public onToggleSidenav = () => {
    this.sidenavToggle.emit();   
  };

  toggleActive(event: any): void {
    event.preventDefault();
    if (this.element !== undefined) {
      this.element.style.backgroundColor = '#eeeeee';
    }
    const target = event.currentTarget;
    target.style.backgroundColor = '#a7bdda';
    this.element = target;      
  }

  sair(): void {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}
