import { Routes } from '@angular/router';
import { TransacoesComponent } from './transacoes/transacoes.component';
import { HomePageComponent } from './home-page/home-page.component';

export const routes: Routes = [
    { path: '', component: HomePageComponent },
    { path: 'transacoes', component: TransacoesComponent }
];
