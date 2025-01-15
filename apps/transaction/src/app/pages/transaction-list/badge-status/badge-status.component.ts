import { Component } from '@angular/core';
import { BidvBadgeModule } from '@bidv-ui/kit';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-badge-status',
  standalone: true,
  imports: [BidvBadgeModule],
  templateUrl: './badge-status.component.html',
  styleUrls: ['./badge-status.component.scss'],
})
export class BadgeStatusComponent implements ICellRendererAngularComp {
  customClass = 'badge-orange';
  label = 'Chờ duyệt';
  iconLeft = 'bidvIconClock';

  agInit(params: ICellRendererParams<any, any, any>): void {
    switch (params.value) {
      case 0:
        this.label = 'Chờ duyệt';
        this.customClass = 'badge-orange';
        this.iconLeft = 'bidvIconClock';
        break;

      case 1:
        this.label = 'Đã duyệt';
        this.customClass = 'badge-green';
        this.iconLeft = 'bidvIconCheck';
        break;

      case 2:
        this.label = 'Đã từ chối';
        this.customClass = 'badge-red';
        this.iconLeft = 'bidvIconClose';
        break;
    }
  }

  refresh(params: ICellRendererParams<any, any, any>): boolean {
    return false;
  }
}
