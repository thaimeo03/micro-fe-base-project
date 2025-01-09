import { Route } from '@angular/router';
import { addRouteHostDefault } from '@bidv-auth/router';

let appRoutes: Route[] = [
  {
    path: 'mfe',
    loadChildren: () => import('remote-mfe/Routes').then((m) => m.remoteRoutes),
  },
  {
    path: 'card-issuance',
    loadChildren: () => import('card-issuance/Routes').then((m) => m.remoteRoutes),
  },
  {
    path: '',
    redirectTo: 'card-issuance',
    pathMatch: 'full',
  },
];
appRoutes = addRouteHostDefault(appRoutes);
export { appRoutes };
