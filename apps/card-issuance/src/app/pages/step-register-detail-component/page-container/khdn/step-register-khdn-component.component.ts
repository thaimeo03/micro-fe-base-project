import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  BidvButtonModule,
  BidvDataListModule,
  BidvDropdownModule,
  BidvExpandModule,
  BidvHintModule,
  BidvIconComponent,
  BidvTextfieldControllerModule,
  BidvTooltipModule,
} from '@bidv-ui/core';
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
  bidvItemsHandlersProvider,
} from '@bidv-ui/kit';
import { FeeCollectionComponent } from '../../form/fee-collection/fee-collection.component';
interface SelectItem {
  label: string;
  value: any;
}
@Component({
  standalone: true,
  selector: 'app-step-register-khdn-component',
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
  ],
  templateUrl: './step-register-khdn-component.component.html',
  styleUrls: ['./step-register-khdn-component.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    bidvItemsHandlersProvider({
      stringify: (item: SelectItem) => `${item.label}`,
    }),
  ],
})
export class StepRegisterKHDNComponent {
  @Input()
  showFeeCollection = true;

  protected expandedInfoCard = true;
  protected toggleInfoCard(): void {
    this.expandedInfoCard = !this.expandedInfoCard;
  }

  protected expandedPlace = true;
  protected togglePlace(): void {
    this.expandedPlace = !this.expandedPlace;
  }

  protected expandedListInfoCard = true;
  protected toggleListInfoCard(): void {
    this.expandedListInfoCard = !this.expandedListInfoCard;
  }

  typeCard = [
    { label: 'Thẻ ghi nợ quốc tế', value: 1 },
    { label: 'Thẻ ghi nợ nội địa', value: 2 },
    { label: 'Thẻ Prepaid', value: 3 },
  ];

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

  protected readonly stringifyCombobox = (item: SelectItem): string =>
    `${item.label}`;

  formInfoCard = new FormGroup({
    nameValue: new FormControl('', Validators.required),
    cardTypeId: new FormControl(this.typeCard[0]),
    productCodeId: new FormControl(this.productCode[0]),
    annualFee: new FormControl(this.annualFees[0]),
    staff: new FormControl(''),
    printPin: new FormControl(false),
    cardCusGr: new FormControl(this.cardCusGr[0]),
    detailAdd: new FormControl({ value: '', disabled: true }),
    transactionOffice: new FormControl(this.transactionOffice[0]),
    placeRec: new FormControl(this.placeReceivice[0]),
    ecom: new FormControl(false),
    cash: new FormControl(false),
    sale: new FormControl(false),
  });

  protected readonly cardForm = ['Thẻ vật lý', 'Thẻ phi vật lý'];
}
