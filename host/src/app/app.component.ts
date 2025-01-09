import { Component } from '@angular/core';
import { AuthService } from '@bidv-auth/cdk';
import { LayoutFacade } from '@bidv-auth/layout';

@Component({
  selector: 'bidv-app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'BIDV Framework Frontend';
  constructor(authService: AuthService, layoutFacade: LayoutFacade) {
    layoutFacade.setShowApps(false);
    layoutFacade.setApp('');
    layoutFacade.setLogoUrl('assets/logo.png');
    authService.urlApp = process.env['NX_ESB_ENDPOINT'] || '/';
  }
}
