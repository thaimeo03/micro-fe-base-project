import { Route } from '@angular/router';

export const PageRoutes: Route[] = [
  {
    path: 'list',
    loadComponent: () =>
      import('./transaction-list/transaction-list.component').then(
        (m) => m.TransactionListComponent,
      ),
  },
];
