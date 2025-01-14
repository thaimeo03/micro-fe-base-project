import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import {
  BidvExpandModule,
  BidvIconComponent,
  BidvTextfieldControllerModule,
  BidvDataListModule,
  BidvButtonModule,
  BidvDropdownModule,
  BidvTooltipModule,
  BidvHintModule,
} from '@bidv-ui/core';

import { FeeCollectionComponent } from '../fee-collection/fee-collection.component';
import {
  BidvBreadcrumbsModule,
  BidvCheckboxLabeledModule,
  BidvComboBoxModule,
  BidvDataListWrapperModule,
  BidvFilterByInputPipeModule,
  BidvInputModule,
  BidvInputNumberModule,
  BidvInputPasswordModule,
  BidvMultiSelectModule,
  BidvRadioListComponent,
  BidvSelectModule,
  BidvStepperModule,
  BidvStringifyContentPipeModule,
} from '@bidv-ui/kit';
import { SubCardItemComponent } from './sub-card-item/sub-card-item.component';
import { IssuanceFormServices } from '../../../../services/issuance-form.service';
import { ReceivedAddressFormComponent } from '../received-address/received-address.component';
import { subCardItemData } from '../../../../constants/form-initialization';

interface SelectItem {
  label: string;
  value: any;
}
@Component({
  standalone: true,
  selector: 'app-register-sub-card',
  imports: [
    CommonModule,
    BidvBreadcrumbsModule,
    BidvButtonModule,
    BidvStepperModule,
    FormsModule,
    ReactiveFormsModule,
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
    FeeCollectionComponent,
    BidvComboBoxModule,
    BidvStringifyContentPipeModule,
    BidvFilterByInputPipeModule,
    SubCardItemComponent,
    ReceivedAddressFormComponent,
  ],
  templateUrl: './register-sub-card.component.html',
  styleUrls: ['./register-sub-card.component.less'],
})
export class RegisterSubCardComponent {
  private fb = inject(FormBuilder);
  private issuanceFormServices = inject(IssuanceFormServices);

  @Input() showFeeCollection = true;
  @Input() showReceivedAddress = true;

  protected expandedMainCard = true;
  protected toggleMainCard(): void {
    this.expandedMainCard = !this.expandedMainCard;
  }

  protected expandedPlace = true;
  protected togglePlace(): void {
    this.expandedPlace = !this.expandedPlace;
  }

  MAX_SUB_CARD_ITEMS = 3;

  productCode = subCardItemData.productCode;

  cardCusGr = subCardItemData.cardCusGr;

  typeCard = subCardItemData.typeCard;

  mainAcc = subCardItemData.mainAcc;

  questions = subCardItemData.questions;

  annualFees = subCardItemData.annualFees;

  subAccs = subCardItemData.subAccs;

  staffId = subCardItemData.staffId;

  numberCard = subCardItemData.numberCard;

  cardForm = subCardItemData.cardForm;

  formSubCard: FormGroup;

  constructor() {
    this.formSubCard = this.initializeForm();
    this.issuanceFormServices.updateStepData('step-4-received-address', false);
  }

  initializeForm() {
    if (this.issuanceFormServices.formSubCard)
      return this.issuanceFormServices.formSubCard;

    return this.issuanceFormServices.setFormSubCard({
      subCardItemForms: this.fb.array([this.getSubCardItemGroup()]),
    });
  }

  addSubCard() {
    if (this.subCardItemForms.length < this.MAX_SUB_CARD_ITEMS) {
      this.subCardItemForms.push(this.getSubCardItemGroup());
    }
  }

  onRemoveSubCardItem(i: number) {
    if (this.subCardItemForms.length > 1) {
      this.subCardItemForms.removeAt(i);
    }
  }

  private getSubCardItemGroup(): FormGroup {
    return this.fb.group({
      cifNumber: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      mainAcc: new FormControl(null, [Validators.required]),
      question: new FormControl(null, [Validators.required]),
      cardType: new FormControl(this.cardForm[0], [Validators.required]),
      printPin: new FormControl(false),
      subAcc: new FormControl(null),
      answer: new FormControl(null, [Validators.required]),
    });
  }

  get subCardItemForms() {
    return this.formSubCard.get('subCardItemForms') as FormArray;
  }

  containPhysicalCard(): boolean {
    return this.subCardItemForms.value.some(
      (item: any) => item.cardType === 'Thẻ vật lý',
    );
  }
}
