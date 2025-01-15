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
import { IssuanceFormServices } from '../../../../services/issuance-form.service';
import { feeCollectionData } from '../../../../constants/form-initialization';

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
  private issuanceFormService = inject(IssuanceFormServices);

  feeType = feeCollectionData.feeType;

  feeAccount = feeCollectionData.feeAccount;

  feeCollectionForm: FormGroup;

  constructor() {
    this.feeCollectionForm = this.initializeForm();
  }

  totalFee = 0;
  VATFee = 0;
  revenueFee = 0;

  initializeForm() {
    if (this.issuanceFormService.feeCollectionForm) {
      const { mainCardFee, subCardFee, addressFee } =
        this.issuanceFormService.feeCollectionForm.value;
      const { totalFee, VATFee, revenueFee } =
        this.issuanceFormService.calculateFee(
          mainCardFee,
          subCardFee,
          addressFee,
        );
      this.setFeeValues(totalFee, VATFee, revenueFee);

      return this.issuanceFormService.feeCollectionForm;
    }

    return this.issuanceFormService.setFeeCollectionForm({
      typeFee: new FormControl(this.feeType[0], Validators.required),
      mainCardFee: new FormControl(0, Validators.required),
      subCardFee: new FormControl(0, Validators.required),
      addressFee: new FormControl(0, Validators.required),
      accountFee: new FormControl(null, Validators.required),
    });
  }

  ngOnInit(): void {
    // Handle calculate fee
    this.feeCollectionForm
      .get('mainCardFee')
      ?.valueChanges.subscribe((value) => {
        const [_, subCardFeeValue, addressFeeValue] = this.getFeeValues();
        const { totalFee, VATFee, revenueFee } =
          this.issuanceFormService.calculateFee(
            value,
            subCardFeeValue,
            addressFeeValue,
          );
        this.setFeeValues(totalFee, VATFee, revenueFee);
      });

    this.feeCollectionForm
      .get('subCardFee')
      ?.valueChanges.subscribe((value) => {
        const [mainCardFeeValue, _, addressFeeValue] = this.getFeeValues();
        const { totalFee, VATFee, revenueFee } =
          this.issuanceFormService.calculateFee(
            mainCardFeeValue,
            value,
            addressFeeValue,
          );
        this.setFeeValues(totalFee, VATFee, revenueFee);
      });

    this.feeCollectionForm
      .get('addressFee')
      ?.valueChanges.subscribe((value) => {
        const [mainCardFeeValue, subCardFeeValue, _] = this.getFeeValues();
        const { totalFee, VATFee, revenueFee } =
          this.issuanceFormService.calculateFee(
            mainCardFeeValue,
            subCardFeeValue,
            value,
          );
        this.setFeeValues(totalFee, VATFee, revenueFee);
      });
  }

  private getFeeValues() {
    const mainCardFeeValue = this.feeCollectionForm.value.mainCardFee;
    const subCardFeeValue = this.feeCollectionForm.value.subCardFee;
    const addressFeeValue = this.feeCollectionForm.value.addressFee;

    return [mainCardFeeValue, subCardFeeValue, addressFeeValue];
  }

  private setFeeValues(totalFee: number, VATFee: number, revenueFee: number) {
    this.totalFee = totalFee;
    this.VATFee = VATFee;
    this.revenueFee = revenueFee;
  }

  protected expandedFeeCollection = true;
  protected toggleFeeCollection(): void {
    this.expandedFeeCollection = !this.expandedFeeCollection;
  }

  protected readonly paymentType = ['Trích nợ tài khoản', 'Hình thức khác'];
}
