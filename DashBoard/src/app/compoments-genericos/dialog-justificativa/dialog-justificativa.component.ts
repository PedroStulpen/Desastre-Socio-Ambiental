import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-dialog-justificativa',
  templateUrl: './dialog-justificativa.component.html',
  styleUrls: ['./dialog-justificativa.component.css'],
})
export class DialogJustificativaComponent implements OnInit {
  @Input()
  texto!: string;
  
  justificativa: string = '';

  constructor(
    public modalService: NgbModal,
    public activeModal: NgbActiveModal
  ) {}

  ngOnInit(): void {}

  justificar() {
    this.activeModal.close(this.justificativa);
  }
}
