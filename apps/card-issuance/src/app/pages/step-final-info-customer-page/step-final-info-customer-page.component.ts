import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { BidvPageContainerComponent, StepComponent } from '@libs/components';
import { issuanceRouter } from '../../constants/router';
import { Router } from '@angular/router';
import { BidvExpandModule, BidvSvgModule } from '@bidv-ui/core';
import { BidvBadgeModule } from '@bidv-ui/kit';
import { DetailCustommerCnComponent } from '../step-detail-customer-page/step-detail-customer-cn-component/step-detail-cn-customer.component';
import { FinalMainCardComponent } from './final-main-card/final-main-card.component';
import { FinalSubCardComponent } from './final-sub-card/final-sub-card.component';
import { FinalFeeCollectionComponent } from './final-fee-collection/final-fee-collection.component';
import { IssuanceFormServices } from '../../services/issuance-form.service';
import { CardFormType } from '../../models/step-register-detail.model';
import { FinalReceivedAddressComponent } from './final-received-address/final-received-address.component';
import { FeatureModuleFacade, StoreFeatureModuleModule } from '@libs/store';

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
    FinalReceivedAddressComponent,
    StoreFeatureModuleModule,
  ],
  providers: [FeatureModuleFacade],
  templateUrl: './step-final-info-customer-page.component.html',
  styleUrls: ['./step-final-info-customer-page.component.less'],
})
export class FinalInfoCustomerComponent implements OnInit {
  router = inject(Router);
  private issuanceFormServices = inject(IssuanceFormServices);
  private featureModuleFacade = inject(FeatureModuleFacade);

  breadcrumbs = [
    { label: 'Quản lý giao dịch' },
    { label: 'Phê duyệt giao dịch' },
  ];
  title = 'Thông tin KH';
  is_cn = true;

  cardForm: CardFormType = 'Thẻ chính';
  showReceivedAddressData = true;
  userInfoData!: any;
  mainCardData!: any;
  subCardData!: any;
  receivedAddressData!: any;
  feeCollectionData!: any;

  constructor() {
    this.mainCardData = this.issuanceFormServices.formMainCard?.value || null;
    this.subCardData = this.issuanceFormServices.formSubCard?.value || null;
    this.receivedAddressData =
      this.issuanceFormServices.receivedAddressForm?.value || null;
    this.feeCollectionData =
      this.issuanceFormServices.feeCollectionForm?.value || null;
  }

  ngOnInit(): void {
    this.issuanceFormServices.stepData$
      .subscribe((data) => {
        this.userInfoData = data['step-2'];
        this.cardForm =
          this.issuanceFormServices.getStepData('step-4-card-form');
        this.showReceivedAddressData =
          this.cardForm === 'Thẻ phụ' ? false : data['step-4-received-address'];

        this.checkValidForm();
      })
      .unsubscribe();
  }

  private checkValidForm() {
    if (!this.userInfoData) {
      this.router.navigate([issuanceRouter[1]]);
    }

    const validMainCardForm = this.issuanceFormServices.formMainCard?.valid;
    const validSubCardForm = this.issuanceFormServices.formSubCard?.valid;
    const validReceivedAddressForm =
      this.issuanceFormServices.receivedAddressForm?.valid;
    const validFeeCollectionForm =
      this.issuanceFormServices.feeCollectionForm?.valid;

    switch (this.cardForm) {
      case 'Thẻ chính':
        if (
          !validMainCardForm ||
          !validFeeCollectionForm ||
          !validReceivedAddressForm
        ) {
          this.router.navigate([issuanceRouter[3]]);
          if (!validMainCardForm) {
            this.issuanceFormServices.formMainCard.markAllAsTouched();
          }
          if (!validFeeCollectionForm) {
            this.issuanceFormServices.feeCollectionForm.markAllAsTouched();
          }
          if (!validReceivedAddressForm) {
            this.issuanceFormServices.receivedAddressForm.markAllAsTouched();
          }
        }
        break;
      case 'Thẻ phụ':
        if (!validSubCardForm || !validFeeCollectionForm) {
          this.router.navigate([issuanceRouter[3]]);
          if (!validSubCardForm) {
            this.issuanceFormServices.formSubCard.markAllAsTouched();
          }
          if (!validFeeCollectionForm) {
            this.issuanceFormServices.feeCollectionForm.markAllAsTouched();
          }
          // if (!validReceivedAddressForm) {
          //   this.issuanceFormServices.receivedAddressForm.markAllAsTouched();
          // }
        }
        break;
      case 'Thẻ chính kèm thẻ phụ':
        if (
          !validMainCardForm ||
          !validSubCardForm ||
          !validFeeCollectionForm ||
          !validReceivedAddressForm
        ) {
          this.router.navigate([issuanceRouter[3]]);
          if (!validMainCardForm) {
            this.issuanceFormServices.formMainCard.markAllAsTouched();
          }
          if (!validSubCardForm) {
            this.issuanceFormServices.formSubCard.markAllAsTouched();
          }
          if (!validFeeCollectionForm) {
            this.issuanceFormServices.feeCollectionForm.markAllAsTouched();
          }
          if (!validReceivedAddressForm) {
            this.issuanceFormServices.receivedAddressForm.markAllAsTouched();
          }
        }
        break;
    }
  }

  onPreStep(stepKey: number) {
    this.router.navigate([issuanceRouter[stepKey]]);
  }

  onSubmitAction(data: string): void {
    switch (data) {
      case 'approve':
        this.featureModuleFacade.setTransactionData({
          cardForm: this.cardForm, // Use to determine which form to show
          showReceivedAddressData: this.showReceivedAddressData, // Use to determine whether can show received address
          status: 0, // Use to determine which status transaction with 0: pending, 1: approved, 2: rejected
          userInfoData: this.userInfoData,
          mainCardData: this.mainCardData,
          subCardData: this.subCardData,
          receivedAddressData: this.receivedAddressData,
          feeCollectionData: this.feeCollectionData,
        });
        this.resetForms();
        this.router.navigate(['transaction/list']);
        break;
    }
  }

  private resetForms() {
    switch (this.cardForm) {
      case 'Thẻ chính':
        this.issuanceFormServices.resetMainCardForm();
        break;
      case 'Thẻ phụ':
        this.issuanceFormServices.resetSubCardForm();
        break;
      case 'Thẻ chính kèm thẻ phụ':
        this.issuanceFormServices.resetMainCardForm();
        this.issuanceFormServices.resetSubCardForm();
    }
    this.issuanceFormServices.resetReceivedAddressForm();
    this.issuanceFormServices.resetFeeCollectionForm();
  }
}
