import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthFacade, BidvAuthTeleportModule } from '@bidv-auth/cdk';
import { LayoutFacade } from '@bidv-auth/layout';
import { BidvAuthModule } from '@bidv-auth/router';
import { provideTranslocoScope } from '@jsverse/transloco';
@Component({
  standalone: true,
  imports: [CommonModule, BidvAuthModule, RouterOutlet, BidvAuthTeleportModule],
  selector: 'app-entry',
  encapsulation: ViewEncapsulation.None,
  providers: [
    provideTranslocoScope({
      scope: 'transaction',
      alias: 'translate',
    }),
  ],
  styleUrls: ['./entry.component.css'],
  template: ` <router-outlet /> `,
})
export class RemoteEntryComponent {
  constructor(
    private authFacade: AuthFacade,
    private layoutFacade: LayoutFacade,
  ) {
    this.layoutFacade.setShowApps(true);
    this.layoutFacade.setLogoUrl('transaction/assets/logo.svg');
  }
}
