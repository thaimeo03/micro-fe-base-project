import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { BidvPageContainerComponent, StepComponent } from '@libs/components';
import { issuanceRouter } from '../../constants/router';
import { Router } from '@angular/router';
import { BidvExpandModule, BidvSvgModule } from '@bidv-ui/core';
import { BidvBadgeModule } from '@bidv-ui/kit';
import { IssuanceServices } from '../../services/issuance.service';
import { DetailCustommerCnComponent } from '../step-detail-customer-page/step-detail-customer-cn-component/step-detail-cn-customer.component';
import { FinalMainCardComponent } from './final-main-card/final-main-card.component';
import { FinalSubCardComponent } from './final-sub-card/final-sub-card.component';
import { FinalFeeCollectionComponent } from './final-fee-collection/final-fee-collection.component';

@Component({
  selector: 'app-step-final-info-customer-page',
  standalone: true,
  imports: [
    CommonModule,
    BidvPageContainerComponent,
    StepComponent,
    BidvSvgModule,
    BidvBadgeModule,
    BidvExpandModule,
    DetailCustommerCnComponent,
    FinalMainCardComponent,
    FinalSubCardComponent,
    FinalFeeCollectionComponent,
  ],
  templateUrl: './step-final-info-customer-page.component.html',
  styleUrls: ['./step-final-info-customer-page.component.less'],
})
export class FinalInfoCustomerComponent implements OnInit {
  router = inject(Router);
  issuanceService = inject(IssuanceServices);

  breadcrumbs = [
    { label: 'Quản lý giao dịch' },
    { label: 'Phê duyệt giao dịch' },
  ];
  title = 'Thông tin KH';
  is_cn = true;

  userInfoData!: any;
  mainCardData!: any;
  subCardData!: any;
  feeCollectionData!: any;

  ngOnInit(): void {
    this.issuanceService.stepData$.subscribe((data) => {
      // if (!data['step-2']) this.router.navigate([issuanceRouter[1]]);
      // if (
      //   (!data['step-4-main'] && !data['step-4-sub']) ||
      //   !data['step-4-fee']
      // ) {
      //   this.router.navigate([issuanceRouter[3]]);
      // }

      console.info(data);

      this.userInfoData = data['step-2'];
      this.mainCardData = data['step-4-main'];
      this.subCardData = data['step-4-sub'];
      this.feeCollectionData = data['step-4-fee'];
    });
  }

  onPreStep(stepKey: number) {
    this.router.navigate([issuanceRouter[stepKey]]);
  }
}
