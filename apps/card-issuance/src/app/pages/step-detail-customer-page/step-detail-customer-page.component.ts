import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { BidvPageContainerComponent, StepComponent } from '@libs/components';
import { issuanceRouter } from '../../constants/router';
import { Router } from '@angular/router';
import { BidvExpandModule, BidvSvgModule } from '@bidv-ui/core';
import { BidvBadgeModule } from '@bidv-ui/kit';
import { DetailCustommerCnComponent } from './step-detail-customer-cn-component/step-detail-cn-customer.component';
import { IdentifierComponent } from './component/identifier-list-component/identifier-list.component';
import { IssuanceServices } from '../../services/issuance.service';
import { UserInfo } from '../../models/step-detail-customer.model';

@Component({
  selector: 'app-step-detail-customer-page',
  standalone: true,
  imports: [
    CommonModule,
    BidvPageContainerComponent,
    StepComponent,
    BidvSvgModule,
    BidvBadgeModule,
    BidvExpandModule,
    DetailCustommerCnComponent,
    IdentifierComponent,
  ],
  templateUrl: './step-detail-customer-page.component.html',
  styleUrls: ['./step-detail-customer-page.component.less'],
})
export class DetailCustommerPageComponent {
  router = inject(Router);
  private issuanceService = inject(IssuanceServices);

  breadcrumbs = [
    { label: 'Quản lý giao dịch' },
    { label: 'Phê duyệt giao dịch' },
  ];
  title = 'Thông tin thụ hưởng';
  is_cn = true;

  userInfoData: UserInfo;

  constructor() {
    this.userInfoData = this.issuanceService.getFakedStep2Data();
  }

  onRowClick(value: any) {
    console.log(value);
  }
  onNextStep(stepKey: number) {
    this.router.navigate([issuanceRouter[stepKey]]);
  }
  onPreStep(stepKey: number) {
    this.router.navigate([issuanceRouter[stepKey]]);
  }
}
