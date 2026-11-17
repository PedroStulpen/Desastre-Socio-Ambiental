import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ItemModel } from 'src/app/model/item';
import { DialogPerguntaGenericaComponent } from '../compoments/dialog-pergunta-generica/dialog-pergunta-generica.component';
import { ShowMessageService } from '../compoments/show-message/show-message.service';
import { AdminItensService } from './admin-itens.service';
import { DialogAdminItemComponent } from './dialog-admin-item/dialog-admin-item.component';


@Component({
  selector: 'app-admin-itens',
  templateUrl: './admin-itens.component.html',
  styleUrls: ['./admin-itens.component.css']
})
export class AdminItensComponent implements OnInit {

  displayedColumns: string[] = ['item', 'editar', 'excluir'];
  dataSource!: MatTableDataSource<ItemModel>;
  dados: ItemModel[] = [];
  vazio = false;

  // @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private spinner: NgxSpinnerService,
    private modalService: NgbModal,
    private showMessageService: ShowMessageService,
    private dataService: AdminItensService
  ) {}

  ngOnInit(): void {
    this.spinner.show();
    this.atualizaLista();
  }

  atualizaLista() {
    this.dados = [];
    this.dataService.listar().subscribe(
      (data: ItemModel[]) => {
        this.dados = data;
        this.dataSource = new MatTableDataSource(this.dados);
        // this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.sort.sortChange.emit(this.sort)
        this.vazio = this.dados.length == 0;
        this.spinner.hide();
        setTimeout(() => {
          this.spinner.hide();
        }, 1000);
      },
      (err: any) => {
        this.spinner.hide();
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  sortData(sort: Sort) {
    let data = [...this.dados];
    if (!sort.active || sort.direction === '') {
      this.dataSource = new MatTableDataSource(data);
      return;
    }
  
    data = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'nome': return this.compareString(a.nome, b.nome, isAsc);
        default: return 0;
      }
    });
    this.dataSource = new MatTableDataSource(data);
  }
  
  private compareString(a: string, b: string, isAsc: boolean) {
    return a.localeCompare(b) * (isAsc ? 1 : -1);
  }

  cadastrar() {
    const modalRef = this.modalService.open(DialogAdminItemComponent, {});
    modalRef.result.then(
      async (result) => {
        if (result == 'ok') {
          this.atualizaLista();
          this.showMessageService.exibirMessage(
            'Informações salvas com sucesso!'
          );
          this.spinner.hide();
        }
      },
      (reason) => {}
    );
  }

  editar(info: ItemModel) {
    const modalRef = this.modalService.open(DialogAdminItemComponent);
    modalRef.componentInstance.info = info;
    modalRef.result.then(
      async (result) => {
        if (result == 'ok') {
          this.atualizaLista();
          this.showMessageService.exibirMessage(
            'Informações salvas com sucesso!'
          );
          this.spinner.hide();
        }
      },
      (reason) => {}
    );
  }

  excluir(info: ItemModel) {
    const modalRef = this.modalService.open(DialogPerguntaGenericaComponent, {
      centered: true,
    });
    modalRef.componentInstance.titulo = 'Delete';
    (modalRef.componentInstance.texto =
      'Deseja realmente excluir a informação: ' + info.nome + '?'),
      modalRef.result.then(
        async (result) => {
          if (result == 'concordo') {
            this.spinner.show();
            this.dataService.excluir(info.id).subscribe(
              async () => {
                this.spinner.hide();
                this.atualizaLista();
                this.showMessageService.exibirMessage(
                  'Informação excluída com sucesso!'
                );
              },
              (err: any) => this.spinner.hide()
            );
          }
        },
        (reason) => {}
      );
  }
}