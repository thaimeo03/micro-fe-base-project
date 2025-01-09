import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
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
import { IssuanceServices } from '../../../../services/issuance.service';

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
  ],
  templateUrl: './register-sub-card.component.html',
  styleUrls: ['./register-sub-card.component.less'],
})
export class RegisterSubCardComponent implements OnInit {
  private fb = inject(FormBuilder);
  private issuanceServices = inject(IssuanceServices);

  @Input()
  showFeeCollection = true;

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

  placeReceivice = [
    { label: 'Chi nhánh/PGD BIDV', value: 1 },
    { label: 'Địa chỉ thường trú', value: 2 },
    { label: 'Địa chỉ liên hệ', value: 3 },
    { label: 'Địa chỉ khác', value: 4 },
  ];

  transactionOffice = [
    { label: '120151 - PGD Tràng Tiền', value: 1 },
    { label: '120151 - PGD Hoàn Kiếm', value: 2 },
    { label: '123871 - PGD Hà Thành', value: 3 },
    { label: '111463 - PGD Phan Bội Châu', value: 4 },
    { label: '197316 - PGD Hàng Bông', value: 5 },
    { label: '176425 - PGD Khâm Thiên', value: 6 },
  ];

  listProvince = [
    { label: 'Thành phố Hà Nội', value: 1 },
    { label: 'Thành phố Hồ Chí Minh', value: 2 },
    { label: 'Thành phố Hải Phòng', value: 3 },
    { label: 'Tỉnh Hà Nam', value: 4 },
  ];

  listDistrict = [
    { label: 'Quận Hoàn Kiếm', value: 1 },
    { label: 'Quận Đống Đa', value: 2 },
    { label: 'Quận Thanh Xuân', value: 3 },
    { label: 'Quận Cầu Giấy', value: 4 },
  ];

  listWard = [
    { label: 'Phường Tràng Tiền', value: 1 },
    { label: 'Phường Nhân Chính', value: 2 },
    { label: 'Phường Cửa Đông', value: 3 },
    { label: 'Phường Cửa Nam', value: 4 },
  ];

  protected readonly cardForm = ['Thẻ vật lý', 'Thẻ phi vật lý'];

  protected readonly stringifyCombobox = (item: SelectItem): string =>
    `${item.label}`;

  formSubCard = this.fb.group({
    subCardItemForms: this.fb.array([this.getSubCardItemGroup()]),
    transactionOffice: new FormControl(this.transactionOffice[0]),
    placeRec: new FormControl(this.placeReceivice[0]),
    detailAdd: new FormControl({ value: '', disabled: true }),
    cardHolderName: new FormControl({ value: '', disabled: true }),
    cardProduct: new FormControl({ value: '', disabled: true }),
    province: new FormControl(this.listProvince[0]),
    district: new FormControl(this.listDistrict[0]),
    ward: new FormControl(this.listWard[0]),
    homeAddress: new FormControl(''),
  });

  ngOnInit(): void {
    const preData = this.issuanceServices.getStepData('step-4-sub');
    if (preData) {
      this.formSubCard.patchValue(preData);
      this.subCardItemForms.patchValue(preData.subCardItemForms);
    }

    this.formSubCard.valueChanges.subscribe((value) => {
      this.issuanceServices.updateStepData('step-4-sub', value);
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
}
