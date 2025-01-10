import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  BidvButtonModule,
  BidvExpandModule,
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
import { BidvThumbnailCardComponent } from '@bidv-ui/addon-commerce';
import { RegisterMainCardComponent } from '../../form/register-main-card/register-main-card.component';
import { RegisterSubCardComponent } from '../../form/register-sub-card/register-sub-card.component';
import { RegisterMainAndSubCardComponent } from '../../form/register-main-and-sub-card/register-main-and-sub-card.component';
import { IssuanceFormServices } from '../../../../services/issuance-form.service';
import { CardFormType } from '../../../../models/step-register-detail.model';

export interface StepOption {
  key: string;
  label: string;
}

interface SelectItem {
  label: string;
  value: any;
}
@Component({
  standalone: true,
  selector: 'app-step-register-khcn-component',
  imports: [
    CommonModule,
    BidvBreadcrumbsModule,
    BidvButtonModule,
    BidvStepperModule,
    FormsModule,
    ReactiveFormsModule,
    BidvCheckboxLabeledModule,
    BidvRadioListComponent,
    BidvThumbnailCardComponent,
    BidvExpandModule,
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
    RegisterMainCardComponent,
    RegisterSubCardComponent,
    RegisterMainAndSubCardComponent,
  ],
  templateUrl: './step-register-khcn-component.component.html',
  styleUrls: ['./step-register-khcn-component.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    bidvItemsHandlersProvider({
      stringify: (item: SelectItem) => `${item.label}`,
    }),
  ],
})
export class StepRegisterKHCNComponent {
  private issuanceFormServices = inject(IssuanceFormServices);

  protected readonly strings: CardFormType[] = [
    'Thẻ chính',
    'Thẻ phụ',
    'Thẻ chính kèm thẻ phụ',
  ];

  protected horizontal;

  constructor() {
    this.horizontal = this.issuanceFormServices.getStepData('step-4-card-form');
  }

  changeHorizontal(value: string) {
    this.horizontal = value;
    this.issuanceFormServices.updateStepData(
      'step-4-card-form',
      this.horizontal,
    );
  }

  formLinked = new FormGroup({
    linked: new FormControl(false),
  });
}
