import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BidvExpandModule, BidvSvgModule } from '@bidv-ui/core';
import { BidvBadgeModule } from '@bidv-ui/kit';
import { BidvPageContainerComponent, StepComponent } from '@libs/components';
import { TransactionService } from '../../services/transaction.service';
import { DetailCustomerCnComponent } from './detail-customer-cn/detail-customer-cn.component';
import { DetailMainCardComponent } from './detail-main-card/detail-main-card.component';
import { CardFormType } from '../../models/step-register-detail.model';
import { DetailSubCardComponent } from './detail-sub-card/detail-sub-card.component';
import { FinalReceivedAddressComponent } from './detail-received-address/detail-received-address.component';
import { FinalFeeCollectionComponent } from './detail-fee-collection/detail-fee-collection';

@Component({
  selector: 'app-transaction-detail',
  standalone: true,
  imports: [
    CommonModule,
    BidvPageContainerComponent,
    StepComponent,
    BidvSvgModule,
    BidvBadgeModule,
    BidvExpandModule,
    DetailCustomerCnComponent,
    DetailMainCardComponent,
    DetailSubCardComponent,
    FinalReceivedAddressComponent,
    FinalFeeCollectionComponent,
  ],
  templateUrl: './transaction-detail.component.html',
  styleUrls: ['./transaction-detail.component.scss'],
})
export class TransactionDetailComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private transactionService = inject(TransactionService);
  private id = this.route.snapshot.params['id'];

  breadcrumbs = [
    { label: 'Quản lý giao dịch' },
    { label: 'Phê duyệt giao dịch' },
  ];
  is_cn = true;

  cardForm!: CardFormType;
  showReceivedAddressData!: boolean;

  metadata!: any;
  userInfoData!: any;
  mainCardData!: any;
  subCardData!: any;
  receivedAddressData!: any;
  feeCollectionData!: any;

  constructor() {
    this.metadata = this.transactionService.getTransactionDetail(
      Number(this.id),
    );
    if (!this.metadata)
      this.router.navigate(['../'], { relativeTo: this.route });

    this.cardForm = this.metadata.cardForm;
    this.showReceivedAddressData = this.metadata.showReceivedAddressData;

    this.userInfoData = this.metadata.userInfoData;
    this.mainCardData = this.metadata.mainCardData;
    this.subCardData = this.metadata.subCardData;
    this.receivedAddressData = this.metadata.receivedAddressData;
    this.feeCollectionData = this.metadata.feeCollectionData;
    console.log(this.feeCollectionData);
  }
}
