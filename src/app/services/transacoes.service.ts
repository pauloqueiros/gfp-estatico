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

  constructor(private http: HttpClient) {   }

  listarTransacoes(selectedId: number): Observable<TransacoesResponse[]> {
    if(selectedId === 5){
      return this.http.get<TransacoesResponse[]>(`${this.endpointUril}/transacao`);
    }
    return this.http.get<TransacoesResponse[]>(`${this.endpointUril}/default`);
  }
  
  listarDespesas(): Observable<DespesaResponse[]> {
    return this.http.get<DespesaResponse[]>(`${this.endpointUril}/despesa`);
  }

}
