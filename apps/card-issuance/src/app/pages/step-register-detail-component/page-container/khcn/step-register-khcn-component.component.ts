import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy } from '@angular/core';
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
  protected readonly strings = [
    'Thẻ chính',
    'Thẻ phụ',
    'Thẻ chính kèm thẻ phụ',
  ];

  protected horizontal = this.strings[0];

  formLinked = new FormGroup({
    linked: new FormControl(false),
  });

  
}
