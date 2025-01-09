import { Route } from '@angular/router';

export const PageRoutes: Route[] = [
  {
    path: 'list-customer',
    loadComponent: () =>
      import(
        './step-search-customer-page/step-search-customer-page.component'
      ).then((m) => m.ListCustommerPageComponent),
  },
  {
    path: 'detail-customer',
    loadComponent: () =>
      import(
        './step-detail-customer-page/step-detail-customer-page.component'
      ).then((m) => m.DetailCustommerPageComponent),
  },
  {
    path: 'register',
    loadComponent: () =>
      import(
        './step-register-component/step-register-component.component'
      ).then((m) => m.StepRegisterComponent),
  },
  {
    path: 'create-card',
    loadComponent: () =>
      import('./step-register-detail-component/page-container.component').then(
        (m) => m.PageContainerComponent,
      ),
  },
  {
    path: 'final-info-customer',
    loadComponent: () =>
      import(
        './step-final-info-customer-page/step-final-info-customer-page.component'
      ).then((m) => m.FinalInfoCustomerComponent),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'list-customer',
  },
];
