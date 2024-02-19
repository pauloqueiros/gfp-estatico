import { Component } from '@angular/core';
import { AccountService } from '../shared/account.service';
import { Router, RouterLink } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    CommonModule,
    HttpClientModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  login = {
    "email": "",
    "senha": ""
  }
  constructor(private accountService: AccountService, private router: Router, private _snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

 onSubmit() {
  this.accountService.login(this.login)
    .then(result => {
      console.log('result', result);
      this.router.navigate(['']);
    })
    .catch(error => {
      console.error('error', error);
      this.openSnackBar(error.error.error, 'X');
    });
}

}
