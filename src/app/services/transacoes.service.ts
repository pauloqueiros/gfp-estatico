import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TransacoesResponse } from '../interfaces/transacoes.interface';

@Injectable({
  providedIn: 'root'
})
export class TransacoesService {
  private endpointUril = 'http://localhost:3000/api/transacao';

  constructor(private http: HttpClient) {   }

  listarTransacoes(): Observable<TransacoesResponse[]> {
    return this.http.get<TransacoesResponse[]>(this.endpointUril);
  }

}
