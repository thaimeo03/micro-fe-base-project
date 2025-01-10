import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
} from '@angular/core';
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
  bidvItemsHandlersProvider,
  BidvInputModule,
  BidvInputPasswordModule,
  BidvMultiSelectModule,
} from '@bidv-ui/kit';
import { FeeCollectionComponent } from '../fee-collection/fee-collection.component';
import { IssuanceFormServices } from '../../../../services/issuance-form.service';

interface SelectItem {
  label: string;
  value: any;
}

@Component({
  standalone: true,
  selector: 'app-register-main-card',
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
  ],
  templateUrl: './register-main-card.component.html',
  styleUrls: ['./register-main-card.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    bidvItemsHandlersProvider({
      stringify: (item: SelectItem) => `${item.label}`,
    }),
  ],
})
export class RegisterMainCardComponent {
  private issuanceFormServices = inject(IssuanceFormServices);

  @Input()
  showFeeCollection = true;

  protected expandedMainCard = true;
  protected toggleMainCard(): void {
    this.expandedMainCard = !this.expandedMainCard;
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

  protected readonly cardForm = ['Thẻ vật lý', 'Thẻ phi vật lý'];

  formMainCard: FormGroup;

  constructor() {
    this.formMainCard = this.initializeForm();
  }

  initializeForm(): FormGroup {
    if (this.issuanceFormServices.formMainCard)
      return this.issuanceFormServices.formMainCard;

    return this.issuanceFormServices.setFormMainCard({
      cardType: new FormControl(this.typeCard[0]),
      productCode: new FormControl(this.productCode[0]),
      name: new FormControl('', [
        Validators.required,
        Validators.maxLength(26),
      ]),
      cardCusGr: new FormControl(null, [Validators.required]),
      mainAcc: new FormControl(null, [Validators.required]),
      question: new FormControl(this.questions[0]),
      answer: new FormControl('', [Validators.required]),
      cardForm: new FormControl(this.cardForm[0]),
      printPin: new FormControl(false),
      annualFee: new FormControl(this.annualFees[0]),
      subAcc: new FormControl(null),
      staff: new FormControl(this.staffId[0]),
    });
  }
}
