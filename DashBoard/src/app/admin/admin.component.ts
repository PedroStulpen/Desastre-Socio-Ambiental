import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from '../auth/auth.service';
import { MessagemSnackerService } from '../utils/messagem-snacker.service';
import { AdminPerfilComponent } from './admin-perfil/admin-perfil.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  isExpanded = true;
  element!: HTMLElement;
  menu0 = false;
  menu1 = false;
  menu2 = false;
  menu3 = false;
  menu4 = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private modalService: NgbModal,
    private messagemSnackerService: MessagemSnackerService
  ) {}

  ngOnInit(): void {}

  toggleActive(event: any): void {
    event.preventDefault();
    if (this.element !== undefined) {
      this.element.style.backgroundColor = '#ebebeb';
    }
    const target = event.currentTarget;
    target.style.backgroundColor = '#e0e0e0';
    this.element = target;

    if (!this.menu1 && !this.menu0 && !this.menu2)
      this.element.style.backgroundColor = '#ebebeb';
  }

  sair(): void {
    this.authService.logout();
    this.router.navigateByUrl('/lista-necessidade');
  }

  toggle(index: number) {
    switch (index) {
      case 0:
        this.menu0 = this.menu0 ? false : true;
        this.menu1 = false;
        this.menu2 = false;
        this.menu3 = false;
        this.menu4 = false;
        break;
      case 1:
        this.menu1 = this.menu1 ? false : true;
        this.menu0 = false;
        this.menu2 = false;
        this.menu3 = false;
        this.menu4 = false;
        break;
      case 2:
        this.menu2 = this.menu2 ? false : true;
        this.menu1 = false;
        this.menu0 = false;
        this.menu3 = false;
        this.menu4 = false;
        break;
      case 3:
        this.menu3 = this.menu3 ? false : true;
        this.menu1 = false;
        this.menu0 = false;
        this.menu2 = false;
        this.menu4 = false;
        break;
      case 4:
        this.menu4 = this.menu4 ? false : true;
        this.menu1 = false;
        this.menu0 = false;
        this.menu3 = false;
        this.menu2 = false;
        break;
    }
  }

  perfil() {
    const modalRef = this.modalService.open(AdminPerfilComponent, {
      size: 'lg',
    });
    modalRef.result.then(
      async (result) => {
        if (result == 'ok') {
          this.messagemSnackerService.exibirMessage(
            'Informações Salvas com sucesso.'
          );
          this.spinner.hide();
        }
      },
      (reason) => {}
    );
  }
}
