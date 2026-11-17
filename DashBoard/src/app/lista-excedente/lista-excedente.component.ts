import { animate, state, style, transition, trigger } from '@angular/animations';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Demanda } from '../model/demanda';
import { ListaExcedenteService } from './lista-excedente.service';


@Component({
  selector: 'app-lista-excedente',
  templateUrl: './lista-excedente.component.html',
  styleUrls: ['./lista-excedente.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ListaExcedenteComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['bairro', 'item', 'veiculo', 'actions',];
  dataSource!: MatTableDataSource<any>;
  dados: any[] = [];
  vazio = false;
  expandedRow!: Demanda | null;
  
  // @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('input') filter!: ElementRef;

  constructor(
    private spinner: NgxSpinnerService,  
    private dataService: ListaExcedenteService,
    private router: Router,
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit () {
    this.spinner.show();
    this.router.routerState.root.queryParams.subscribe((params) =>
      this.atualizaLista(params["idItem"])
    );
  }

  atualizaLista(item:string) {
    this.dados = [];
    this.dataService.listar(item).subscribe(
      (data: any[]) => {
        this.dados = data;
        this.vazio = this.dados.length == 0;
        if (!this.vazio && this.sort) {
          this.dataSource = new MatTableDataSource(this.dados);
          // this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.sort.sortChange.emit(this.sort)
        }

        setTimeout(() => {
          this.spinner.hide();
        }, 0);
      },
      (err: any) => {
        this.vazio = true;
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
        case 'pontoApoioBairro': return this.compareString(a.pontoApoioBairro, b.pontoApoioBairro, isAsc);
        case 'itemNome': return this.compareString(a.itemNome, b.itemNome, isAsc);
        default: return 0;
      }
    });
    this.dataSource = new MatTableDataSource(data);
  }
  
  private compareString(a: string, b: string, isAsc: boolean) {
    return a.localeCompare(b) * (isAsc ? 1 : -1);
  }

  irPara(info: Demanda) {
    this.router.navigate(['/lista-necessidade'], { 
      queryParams: { idItem: info.itemId },
    });
  }

  limparFiltro() {
    this.router.navigate(['/lista-excedente']);
    this.filter.nativeElement.value = ''
    this.filter.nativeElement.dispatchEvent(new Event('keyup'))
  }
}
