import { Routes } from '@angular/router';
import { TransacoesComponent } from './layout/transacoes/transacoes.component';
import { HomePageComponent } from './layout/home-page/home-page.component';
import { HomeComponent } from './layout/home/home.component';
import { AuthenticationComponent } from './layout/authentication/authentication.component';
import { LoginComponent } from './account/login/login.component';
import { CreateAccountComponent } from './account/create-account/create-account.component';
import { authGuard } from './account/shared/auth.guard';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        children: [
            { path: '', component: HomePageComponent },
            { path: 'transacoes', component: TransacoesComponent }
        ],
        canActivate: [authGuard]
    },
    {
        path: '',
        component: AuthenticationComponent,
        children: [ 
            { path: '', redirectTo: 'login', pathMatch: 'full' },
            { path: 'login', component: LoginComponent },
            { path: 'create-account', component: CreateAccountComponent }
        ]
    }
];