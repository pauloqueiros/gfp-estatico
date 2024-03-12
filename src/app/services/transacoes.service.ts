import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TransacoesResponse } from '../interfaces/transacoes.interface';
import { DespesaResponse } from '../interfaces/despesas.interface';

@Injectable({
  providedIn: 'root'
})
export class TransacoesService {
  private endpointUril = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  listarTransacoes(tipoDespesa: number, tipoPeriodo: number): Observable<TransacoesResponse[]> {
    const parametros = {
      tipoDespesa:tipoDespesa,
      tipoPeriodo:tipoPeriodo
    }
    return this.http.post<TransacoesResponse[]>(`${this.endpointUril}/transacao`, parametros);
  }

  listarDespesas(): Observable<DespesaResponse[]> {
    return this.http.get<DespesaResponse[]>(`${this.endpointUril}/despesa`);
  }

}
