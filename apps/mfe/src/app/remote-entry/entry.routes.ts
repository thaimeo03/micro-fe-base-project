import { Route } from '@angular/router';
import { AuthGuard } from '@bidv-auth/router';
import { RemoteEntryComponent } from './entry.component';

export const remoteRoutes: Route[] = [
  {
    path: '',
    component: RemoteEntryComponent,
    canActivate: [AuthGuard],
    data: {
      appId: 'SMT',
    },
  },
];
