import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BidvExpandModule, BidvSvgModule } from '@bidv-ui/core';
import { BidvBadgeModule } from '@bidv-ui/kit';
import {
  ActionHandleComponent,
  ActionHandleSubmit,
  BidvPageContainerComponent,
  StepComponent,
} from '@libs/components';
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
    ActionHandleComponent,
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

  actionButton: ActionHandleSubmit[] = this.getActionButtons();

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

  onSubmitAction(data: string) {
    switch (data) {
      case 'approve':
        this.transactionService.updateTransactionStatus(Number(this.id), 1);
        break;
      case 'reject':
        this.transactionService.updateTransactionStatus(Number(this.id), 2);
        break;
    }
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  private getActionButtons(): ActionHandleSubmit[] {
    return [
      {
        id: 1,
        code: 'approve',
        hideKey: 'approveButton',
        label: 'Phê duyệt',
        variant: 'filled',
        appearance: 'primary',
      },
      {
        id: 2,
        code: 'reject',
        hideKey: 'rejectButton',
        label: 'Từ chối',
        variant: 'outlined',
        appearance: 'primary',
      },
      {
        id: 3,
        code: 'send-email',
        hideKey: 'sendEmailButton',
        label: 'Gửi email',
        variant: 'outlined',
        appearance: 'primary',
      },
      {
        id: 4,
        code: 'biometrics',
        hideKey: 'biometricsButton',
        label: 'Sinh trắc học',
        variant: 'outlined',
        appearance: 'primary',
      },
      {
        id: 5,
        code: 'ecm',
        hideKey: 'ecmButton',
        label: 'ECM',
        variant: 'outlined',
        appearance: 'primary',
      },
      {
        id: 6,
        code: 'svs',
        hideKey: 'svsButton',
        label: 'SVS',
        variant: 'outlined',
        appearance: 'primary',
      },
    ];
  }
}
