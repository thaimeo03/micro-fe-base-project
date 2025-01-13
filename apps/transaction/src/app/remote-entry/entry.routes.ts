import { Route } from '@angular/router';
import { AuthGuard } from '@bidv-auth/router';
import { RemoteEntryComponent } from './entry.component';
import { RouteCustomData } from '@bidv-auth/cdk';

export const remoteRoutes: Route[] = [
  {
    path: '',
    component: RemoteEntryComponent,
    canActivate: [AuthGuard],
    data: {
      appId: 'SMT',
      limitByCurrentRole: true,
    } as RouteCustomData,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('../pages/page.routes').then((m) => m.PageRoutes),
        title: 'transaction',
      },
    ],
  },
];
