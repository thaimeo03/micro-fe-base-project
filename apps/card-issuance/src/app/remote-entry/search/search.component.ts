import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { BidvTextfieldControllerModule } from '@bidv-ui/core';
import { BidvInputModule } from '@bidv-ui/kit';
import { provideTranslocoScope, TranslocoDirective } from '@jsverse/transloco';

@Component({
  selector: 'transaction-search',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BidvInputModule,
    BidvTextfieldControllerModule,
    TranslocoDirective,
  ],
  providers: [
    provideTranslocoScope({
      scope: 'transaction',
      alias: 'translate',
    }),
  ],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  readonly searchForm = new FormGroup({
    search: new FormControl(''),
  });
}
