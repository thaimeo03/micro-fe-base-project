import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
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
import { ReceivedAddressFormComponent } from '../received-address/received-address.component';
import { mainCardData } from '../../../../constants/form-initialization';

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
    ReceivedAddressFormComponent,
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
export class RegisterMainCardComponent implements OnInit {
  private issuanceFormServices = inject(IssuanceFormServices);

  @Input() showFeeCollection = true;
  @Input() showReceivedAddress = true;

  @Output() handleChangeShowReceivedAddress = new EventEmitter<boolean>();

  protected expandedMainCard = true;
  protected toggleMainCard(): void {
    this.expandedMainCard = !this.expandedMainCard;
  }

  typeCard = mainCardData.typeCard;
  productCode = mainCardData.productCode;
  cardCusGr = mainCardData.cardCusGr;
  mainAcc = mainCardData.mainAcc;
  questions = mainCardData.questions;
  annualFees = mainCardData.annualFees;
  subAccs = mainCardData.subAccs;
  staffId = mainCardData.staffId;
  cardForm = mainCardData.cardForm;

  formMainCard: FormGroup;

  constructor() {
    this.formMainCard = this.initializeForm();
    this.issuanceFormServices.updateStepData('step-4-received-address', true);
  }

  ngOnInit(): void {
    this.formMainCard.get('cardForm')?.valueChanges.subscribe((value) => {
      this.handleChangeShowReceivedAddress.emit(value === 'Thẻ vật lý');
      this.issuanceFormServices.updateStepData(
        'step-4-received-address',
        value === 'Thẻ vật lý',
      );
    });
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
