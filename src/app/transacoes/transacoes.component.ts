import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
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
import { CommonModule, DatePipe } from '@angular/common';
import { DespesaResponse } from '../interfaces/despesas.interface';
import { periodos } from '../interfaces/periodos.interfacece';
import {MatTableDataSource} from '@angular/material/table';


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
    DatePipe,
    CommonModule
  ],
})
export class TransacoesComponent implements AfterViewInit {
  displayedColumns = ['init', 'data', 'descricao', 'cartao', 'categoria', 'valor', 'tipoPagamento', 'despesa', 'contato', 'pago', 'acoes', 'final'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  transacoes: TransacoesResponse[] = [];
  despesas: DespesaResponse[] = [];
  selectedId: number | null = 5;
  periodos: periodos[] = [
    { value: '0', viewValue: 'Este Mês' },
    { value: '1', viewValue: 'Essa Semana' },
    { value: '2', viewValue: 'Hoje' },
  ];
  selectedPeriodo = this.periodos[0].value;
  dataSource = new MatTableDataSource<TransacoesResponse>();   
  
  constructor(private service: TransacoesService) { }
  ngAfterViewInit(): void {
    this.getTransacoes(this.selectedId ?? 5);
    this.getDespesas();
    this.dataSource.data = this.transacoes;
    this.dataSource.paginator = this.paginator;
  }

  getTransacoes(selectedId: number): void {
    this.service.listarTransacoes(selectedId).subscribe((res) => {
      this.transacoes = res;
    });
  }

  getDespesas(): void {
    this.service.listarDespesas().subscribe(despesas => this.despesas = despesas);
  }

  onButtonClick(id: number, nome: string): void {
    this.selectedId = id;
    console.log(id, nome);
  }

  date = new FormControl(new Date());
  serializedDate = new FormControl(new Date().toISOString());
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */



  isPago(indicador_pago: string): boolean {
    return indicador_pago === 'S' ? true : false;
  }

}
