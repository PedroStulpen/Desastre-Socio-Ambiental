import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ItemModel } from 'src/app/model/item';
import { DialogPerguntaGenericaComponent } from '../compoments/dialog-pergunta-generica/dialog-pergunta-generica.component';
import { ShowMessageService } from '../compoments/show-message/show-message.service';
import { AdminListaNecessidadeService } from './admin-lista-necessidade.service';
import { DialogNecessidadeComponent } from './dialog-necessidade/dialog-necessidade.component';

@Component({
  selector: 'app-admin-lista-necessidade',
  templateUrl: './admin-lista-necessidade.component.html',
  styleUrls: ['./admin-lista-necessidade.component.css']
})
export class AdminListaNecessidadeComponent implements OnInit {

  displayedColumns: string[] = ['nome', 'qtd', 'observacao', 'editar', 'excluir'];
  dataSource!: MatTableDataSource<ItemModel>;
  dados: ItemModel[] = [];
  vazio = false;
  
  // @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private spinner: NgxSpinnerService,
    private modalService: NgbModal,
    private showMessageService: ShowMessageService,  
    private dataService: AdminListaNecessidadeService,
  ) {}

  ngOnInit(): void {
    this.spinner.show();
  }

  ngAfterViewInit() {
    this.atualizaLista();
  }

  atualizaLista() {
    this.dados = [];
    this.dataService.listar().subscribe(
      (data: ItemModel[]) => {
        this.dados = data;
        this.vazio = this.dados.length == 0;
        this.dataSource = new MatTableDataSource(this.dados);
        if (!this.vazio && this.sort) {
          // this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.sort.sortChange.emit(this.sort)
        }

        setTimeout(() => {
          this.spinner.hide();
        }, 0);
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
        case 'item': return this.compareString(a.item, b.item, isAsc);
        case 'quantidade': return this.compareNumber(a.quantidade, b.quantidade, isAsc);
        default: return 0;
      }
    });
    this.dataSource = new MatTableDataSource(data);
  }
  
  private compareNumber(a: number, b: number, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
  
  private compareString(a: string, b: string, isAsc: boolean) {
    return a.localeCompare(b) * (isAsc ? 1 : -1);
  }

  cadastrar() {
    const modalRef = this.modalService.open( DialogNecessidadeComponent, {} );
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
    const modalRef = this.modalService.open( DialogNecessidadeComponent );
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
    const modalRef = this.modalService.open(DialogPerguntaGenericaComponent, {centered: true});
    modalRef.componentInstance.titulo = 'Delete';
    (modalRef.componentInstance.texto =
      'Deseja realmente finalizar a necessidade: ' + info.item + '?'),
      modalRef.result.then(
        async (result) => {
          if (result == 'concordo') {
            this.spinner.show();
            this.dataService.excluir(info.id).subscribe(
              async () => {
                this.spinner.hide();
                this.atualizaLista();
                this.showMessageService.exibirMessage(
                  'Necessidade finalizada com sucesso!'
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