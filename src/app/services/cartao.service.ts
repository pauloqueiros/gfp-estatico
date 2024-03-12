import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environment';
import { CartaoResponse } from '../interfaces/cartoes.interface';

@Injectable({
  providedIn: 'root'
})
export class CartaoService {

  constructor(private http: HttpClient) { }

  listarCartoes(): Observable<CartaoResponse[]> {
    return this.http.get<CartaoResponse[]>(`${environment.apiUrl}/cartoes`);
  }

}
