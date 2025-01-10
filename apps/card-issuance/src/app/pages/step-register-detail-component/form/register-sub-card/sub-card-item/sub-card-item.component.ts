import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
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

@Component({
  standalone: true,
  selector: 'app-sub-card-item',
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
    BidvComboBoxModule,
    BidvStringifyContentPipeModule,
    BidvFilterByInputPipeModule,
  ],
  templateUrl: './sub-card-item.component.html',
  styleUrls: ['./sub-card-item.component.less'],
})
export class SubCardItemComponent {
  @Input() subCardItemFormGroup!: any;
  @Input() subCardItemIndex = 0;
  @Input() mainAcc!: { label: string; value: number }[];
  @Input() questions!: { label: string; value: number }[];
  @Input() subAccs!: { label: string; value: number }[];
  @Input() cardForm!: string[];
  @Input() showPin!: boolean;

  @Output() handleRemoveSubCardItem = new EventEmitter<number>();

  removeSubCard() {
    this.handleRemoveSubCardItem.emit(this.subCardItemIndex);
  }
}
