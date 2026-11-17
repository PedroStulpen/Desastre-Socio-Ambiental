import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { NgxSpinnerService } from 'ngx-spinner';
import { AdminPerfilComponent } from 'src/app/admin/admin-perfil/admin-perfil.component';
import { AuthService } from 'src/app/auth/auth.service';
import { MessagemSnackerService } from 'src/app/utils/messagem-snacker.service';

@Component({
  selector: 'app-admin-menu-lateral',
  templateUrl: './admin-menu-lateral.component.html',
  styleUrls: ['./admin-menu-lateral.component.css'],
})
export class AdminMenuLateralComponent implements OnInit {
  @Output() sidenavClose = new EventEmitter();
  element!: HTMLElement;
  constructor(
    private authService: AuthService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private modalService: NgbModal,
    private messagemSnackerService: MessagemSnackerService
  ) {}

  ngOnInit() {}

  public onSidenavClose = () => {
    this.sidenavClose.emit();
  };

  toggleActive(event: any): void {
    event.preventDefault();
    if (this.element !== undefined) {
      this.element.style.backgroundColor = '#eeeeee';
    }
    const target = event.currentTarget;
    target.style.backgroundColor = '#a7bdda';
    this.element = target;
    this.sidenavClose.emit();
  }

  sair(): void {
    this.authService.logout();
    this.router.navigateByUrl('/lista-necessidade');
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
