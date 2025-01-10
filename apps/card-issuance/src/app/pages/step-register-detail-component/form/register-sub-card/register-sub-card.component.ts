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

  productCode = [
    { label: 'PVC0066 - VS Credit Infinite', value: 1 },
    { label: 'PVC0088 - VS Credit Infinite Private Banking', value: 2 },
    { label: 'PVC0051 - VS Credit Platinum online cashback 360', value: 3 },
    { label: 'PVC0052 - VS Credit Platinum OL cashback Online', value: 4 },
    { label: 'PVC0042 - VS Credit Platinum cashback Online', value: 5 },
  ];

  cardCusGr = [
    { label: '010-VIP', value: 1 },
    { label: '031-KHCC PRIVATE', value: 2 },
    { label: '033-KHCC PREMIER ELITE', value: 3 },
    { label: '045-KH TAP DOAN THANH CONG', value: 4 },
    { label: '051-KH CHUYEN TIEN QUOC TE', value: 5 },
  ];

  typeCard = [
    { label: 'Thẻ ghi nợ quốc tế', value: 1 },
    { label: 'Thẻ ghi nợ nội địa', value: 2 },
    { label: 'Thẻ Prepaid', value: 3 },
  ];

  mainAcc = [
    { label: '1234567891 - VND', value: 1 },
    { label: '1234567891 - EUR', value: 2 },
    { label: '1234567891 - USD', value: 3 },
    { label: '1234567891 - GBP', value: 4 },
  ];

  questions = [
    { label: 'Họ tên mẹ?', value: 1 },
    { label: 'Tên trường tiếu học?', value: 2 },
  ];

  annualFees = [
    { label: 'Thu phí thường niên', value: 1 },
    { label: 'Không thu phí thường niên', value: 2 },
  ];

  subAccs = [
    { label: '1234567891 - VND', value: 1 },
    { label: '1234567891 - EUR', value: 2 },
    { label: '1234567891 - USD', value: 3 },
    { label: '1234567891 - GBP', value: 4 },
  ];

  staffId = [
    { label: '178702 - Nguyễn Huy Quân', value: 1 },
    { label: '178888 - Lê Văn Tùng', value: 2 },
  ];

  numberCard = [
    { label: '1234567890', value: 1 },
    { label: '1122334455', value: 2 },
  ];

  protected readonly cardForm = ['Thẻ vật lý', 'Thẻ phi vật lý'];

  protected readonly stringifyCombobox = (item: SelectItem): string =>
    `${item.label}`;

  formSubCard: FormGroup;

  constructor() {
    this.formSubCard = this.initializeForm();
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
