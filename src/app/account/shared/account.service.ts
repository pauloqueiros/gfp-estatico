import { Injectable } from '@angular/core';
import { environment } from '../../../../environment';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';

interface LoginResponse {
  token: string;
  // outras propriedades da resposta, se houver
}

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  url = `${environment.apiUrl}/login`;
  constructor(private httpClient: HttpClient) { }

  // login(user: any) {
  //   this.httpClient.post<LoginResponse>(this.url, { email: user.email, senha: user.senha }).subscribe(response => {
  //     if (response.token) {
  //       window.localStorage.setItem('token', response.token);
  //       return true;
  //     }
  //     return false;
  //   });
  // }

  login(user: any): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.httpClient.post<LoginResponse>(this.url, { email: user.email, senha: user.senha }).subscribe({
        next: response => {
          if (response && response.token) {
            window.localStorage.setItem('token', response.token);
            resolve(true);
          } else {
            resolve(false);
          }
        },
        error: error => {
          reject(error);
        }
      });
    });
  }

  createAccount(account: any) {
    return new Promise((resolve, reject) => {
      resolve(true);
    });
  }

}
