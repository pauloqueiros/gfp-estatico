import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  if (typeof window !== 'undefined') {
    // Seu código que usa `window` aqui
    const token = window.localStorage.getItem('token');
    if (token) {
      return true;
    } else {
      window.location.href = '/login';
      return false;
    }
  } return false;
};
