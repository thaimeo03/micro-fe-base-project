import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AuthFacade } from '@bidv-auth/cdk';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-remote-mfe-entry',
  template: `<div class="bg-black">test</div>`,
})
export class RemoteEntryComponent {
  constructor(private authFacade: AuthFacade) {
    this.authFacade.user$.subscribe((user) => {
      console.log('mfe', user);
    });
  }
}
