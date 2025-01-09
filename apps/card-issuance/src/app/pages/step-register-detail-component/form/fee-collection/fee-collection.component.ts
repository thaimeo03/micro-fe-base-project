import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  BidvButtonModule,
  BidvExpandModule,
  BidvIconComponent,
  BidvDataListModule,
  BidvTextfieldControllerModule,
  BidvDropdownModule,
  BidvTooltipModule,
  BidvHintModule,
} from '@bidv-ui/core';

import {
  BidvBreadcrumbsModule,
  BidvStepperModule,
  BidvCheckboxLabeledModule,
  BidvRadioListComponent,
  BidvInputNumberModule,
  BidvDataListWrapperModule,
  BidvSelectModule,
  BidvInputModule,
  BidvInputPasswordModule,
  BidvMultiSelectModule,
} from '@bidv-ui/kit';
import { IssuanceServices } from '../../../../services/issuance.service';

@Component({
  standalone: true,
  selector: 'app-fee-collection',
  imports: [
    CommonModule,
    BidvBreadcrumbsModule,
    BidvButtonModule,
    BidvStepperModule,
    FormsModule,
    BidvCheckboxLabeledModule,
    BidvRadioListComponent,
    BidvExpandModule,
    BidvIconComponent,
    BidvInputNumberModule,
    BidvSelectModule,
    BidvDataListModule,
    BidvDataListWrapperModule,
    BidvTextfieldControllerModule,
    BidvDropdownModule,
    BidvInputModule,
    BidvInputPasswordModule,
    BidvMultiSelectModule,
    BidvTooltipModule,
    BidvHintModule,
    ReactiveFormsModule,
  ],
  templateUrl: './fee-collection.component.html',
  styleUrls: ['./fee-collection.component.less'],
})
export class FeeCollectionComponent implements OnInit {
  private issuanceServices = inject(IssuanceServices);

  feeType = [
    { label: 'Hình thức thanh toán phí 1', value: 1 },
    { label: 'Hình thức thanh toán phí 2', value: 2 },
    { label: 'Hình thức thanh toán phí 3', value: 3 },
    { label: 'Hình thức thanh toán phí 4', value: 4 },
  ];

  feeAccount = [
    { label: '01678741346 - 100,000,000 VND', value: 1 },
    { label: '01234567890 - 150,000,000 VND', value: 2 },
  ];

  feeCollectionForm: FormGroup;

  constructor() {
    this.feeCollectionForm = this.initializeForm();
  }

  private VAT = 10;
  totalFee = 0;
  VATFee = 0;
  revenueFee = 0;

  initializeForm() {
    if (this.issuanceServices.feeCollectionForm) {
      this.totalFee = this.issuanceServices.feeCollectionForm.value.totalFee;
      this.VATFee = this.issuanceServices.feeCollectionForm.value.VATFee;
      this.revenueFee =
        this.issuanceServices.feeCollectionForm.value.revenueFee;
      return this.issuanceServices.feeCollectionForm;
    }

    return this.issuanceServices.setFeeCollectionForm({
      typeFee: new FormControl(this.feeType[0], Validators.required),
      mainCardFee: new FormControl(0, Validators.required),
      subCardFee: new FormControl(0, Validators.required),
      addressFee: new FormControl(0, Validators.required),
      accountFee: new FormControl(null),
    });
  }

  ngOnInit(): void {
    // Handle calculate fee
    this.feeCollectionForm
      .get('mainCardFee')
      ?.valueChanges.subscribe((value) => {
        const [_, subCardFeeValue, addressFeeValue] = this.getFeeValues();
        this.calculateFee(value, subCardFeeValue, addressFeeValue);
      });

    this.feeCollectionForm
      .get('subCardFee')
      ?.valueChanges.subscribe((value) => {
        const [mainCardFeeValue, _, addressFeeValue] = this.getFeeValues();
        this.calculateFee(mainCardFeeValue, value, addressFeeValue);
      });

    this.feeCollectionForm
      .get('addressFee')
      ?.valueChanges.subscribe((value) => {
        const [mainCardFeeValue, subCardFeeValue, _] = this.getFeeValues();
        this.calculateFee(mainCardFeeValue, subCardFeeValue, value);
      });
  }

  private calculateFee(
    mainCardFeeValue: number | null | undefined,
    subCardFeeValue: number | null | undefined,
    addressFeeValue: number | null | undefined,
  ) {
    if (
      typeof mainCardFeeValue === 'number' &&
      typeof subCardFeeValue === 'number' &&
      typeof addressFeeValue === 'number'
    ) {
      this.totalFee = this.calculateTotalFee(
        mainCardFeeValue,
        subCardFeeValue,
        addressFeeValue,
      );
      this.VATFee = this.calculateVATFee();
      this.revenueFee = this.totalFee + this.VATFee;
      this.revenueFee = this.calculateRevenueFee();
    } else {
      this.totalFee = 0;
      this.VATFee = 0;
      this.revenueFee = 0;
    }
  }

  private calculateTotalFee(
    mainCardFeeValue: number,
    subCardFeeValue: number,
    addressFeeValue: number,
  ) {
    return mainCardFeeValue + subCardFeeValue + addressFeeValue;
  }

  private calculateVATFee() {
    return this.totalFee * (this.VAT / 100);
  }

  private calculateRevenueFee() {
    return this.totalFee + this.VATFee;
  }

  private getFeeValues() {
    const mainCardFeeValue = this.feeCollectionForm.value.mainCardFee;
    const subCardFeeValue = this.feeCollectionForm.value.subCardFee;
    const addressFeeValue = this.feeCollectionForm.value.addressFee;

    return [mainCardFeeValue, subCardFeeValue, addressFeeValue];
  }

  protected expandedFeeCollection = true;
  protected toggleFeeCollection(): void {
    this.expandedFeeCollection = !this.expandedFeeCollection;
  }

  protected readonly paymentType = ['Trích nợ tài khoản', 'Hình thức khác'];
}
