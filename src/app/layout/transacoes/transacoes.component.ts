import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableModule, MatTable } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDivider } from '@angular/material/divider';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { TransacoesService } from '../../services/transacoes.service';
import { TransacoesResponse } from '../../interfaces/transacoes.interface';
import { CommonModule, DatePipe } from '@angular/common';
import { DespesaResponse } from '../../interfaces/despesas.interface';
import { periodos } from '../../interfaces/periodos.interfacece';
import { MatTableDataSource } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { catchError, throwError } from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';


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
    MatButtonToggleModule,
    DatePipe,
    CommonModule,
    MatTooltipModule
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
  showFormFields = false;

  transacaoForm = new FormGroup({
    data: new FormControl(''),
    descricao: new FormControl(''),
    cartao: new FormControl(''),
    categoria: new FormControl(''),
    valor: new FormControl(''),
    tipoPagamento: new FormControl(''),
    despesa: new FormControl(''),
    contato: new FormControl(''),
    pago: new FormControl(''),
  });

  constructor(private service: TransacoesService, private _snackBar: MatSnackBar) { }
  ngAfterViewInit(): void {
    this.getTransacoes(this.selectedId ?? 5);
    this.getDespesas();    
  }

  getTransacoes(selectedId: number): void {
    this.service.listarTransacoes(selectedId).pipe(
      catchError((error) => {
        console.error('Erro ao listar transações:', error);
        this.openSnackBar(error.error.message, 'X');
        return throwError(() => new Error(error)); // Add this line to return an Observable
      })
    ).subscribe((res) => {
      this.transacoes = res;
      this.dataSource.data = this.transacoes;
      this.dataSource.paginator = this.paginator;
      console.log(this.transacoes);
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  getDespesas(): void {
    this.service.listarDespesas().subscribe(despesas => this.despesas = despesas);
  }

  onButtonClick(id: number, nome: string): void {
    this.selectedId = id;
    console.log(id, nome);
  }

  submit(): void {
    console.log(this.transacaoForm.value);
  }

  date = new FormControl(new Date());
  serializedDate = new FormControl(new Date().toISOString());
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */



  isPago(indicador_pago: string): boolean {
    return indicador_pago === 'S' ? true : false;
  }

}
