import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-dialog-pergunta-generica',
  templateUrl: './dialog-pergunta-generica.component.html',
  styleUrls: ['./dialog-pergunta-generica.component.css'],
})
export class DialogPerguntaGenericaComponent implements OnInit {
  @Input()
  titulo!: string;
  @Input()
  texto!: string;

  constructor(
    public modalService: NgbModal,
    public activeModal: NgbActiveModal
  ) {}

  ngOnInit(): void {}
}
