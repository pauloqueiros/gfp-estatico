import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTableModule, MatTable } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { TransacoesDataSource, TransacoesItem } from './transacoes-datasource';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDivider } from '@angular/material/divider';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { TransacoesService } from '../services/transacoes.service';
import { TransacoesResponse } from '../interfaces/transacoes.interface';
import { Observable } from 'rxjs';
import { DatePipe } from '@angular/common';

interface Food {
  value: string;
  viewValue: string;
}


@Component({
  selector: 'app-transacoes',
  templateUrl: './transacoes.component.html',
  styleUrl: './transacoes.component.scss',
  standalone: true,
  providers: [provideNativeDateAdapter(), TransacoesService],
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatCheckboxModule,
    MatIconModule,
    MatButtonModule,
    MatDivider,
    MatButtonModule,
    MatButtonModule,
    MatButtonToggleModule,
    DatePipe
  ],
})
export class TransacoesComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<TransacoesItem>;
  dataSource = new TransacoesDataSource();
  transacoes: TransacoesResponse[] = [];
  constructor(private service: TransacoesService) { }

  date = new FormControl(new Date());
  serializedDate = new FormControl(new Date().toISOString());
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['data', 'descricao', 'cartao', 'categoria', 'valor', 'tipoPagamento', 'despesa', 'contato', 'pago', 'acoes'];


  foods: Food[] = [
    { value: 'steak-0', viewValue: 'Steak' },
    { value: 'pizza-1', viewValue: 'Pizza' },
    { value: 'tacos-2', viewValue: 'Tacos' },
  ];

  isPago(indicador_pago: string): boolean {
    return indicador_pago === 'S' ? true : false;
  }

  ngAfterViewInit(): void {
    this.service.listarTransacoes().subscribe((res) => {
      this.transacoes = res;
    });
  // ngAfterViewInit(): void {
  //   this.service.listarTransacoe().subscribe((res: TransacoesResponse[]) => {
  //     this.transacoes = [];
  //     res.forEach(transacoesResponse => {
  //       transacoesResponse.response.forEach(transacao => {
  //         transacao.check = transacao.indicador_pago === 'S';
  //         this.transacoes.push(transacao);
  //       });
  //     });
  //   });


    this.dataSource.sort = this.sort;
this.dataSource.paginator = this.paginator;
this.table.dataSource = this.dataSource;
  }
}
