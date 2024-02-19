import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-create-account',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule
  ],
  templateUrl: './create-account.component.html',
  styleUrl: './create-account.component.scss'
})
export class CreateAccountComponent {

  account = {
    nome: '',
    email: '',
    password: ''
  }

  onSubmit() {
    console.log(this.account);
  }

}
