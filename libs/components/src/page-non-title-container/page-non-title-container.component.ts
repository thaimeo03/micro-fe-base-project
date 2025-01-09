import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from '@angular/core';
import { RouterLink } from '@angular/router';

import { BidvLinkDirective, BidvScrollbarComponent } from '@bidv-ui/core';
import { BidvBreadcrumbsModule } from '@bidv-ui/kit';

@Component({
  standalone: true,
  selector: 'page-non-title-container',
  imports: [
    CommonModule,
    BidvBreadcrumbsModule,
    RouterLink,
    BidvLinkDirective,
    BidvScrollbarComponent,
  ],
  templateUrl: './page-non-title-container.component.html',
  styleUrls: ['./page-non-title-container.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [],
})
export class BidvPageContainerComponent {
  @Input()
  breadcrumbs?: BreadcrumbItem[] = [];
}

interface BreadcrumbItem {
  label: string;
  link?: string;
}
