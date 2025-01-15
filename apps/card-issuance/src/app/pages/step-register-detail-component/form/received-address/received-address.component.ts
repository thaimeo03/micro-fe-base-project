import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
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
import { IssuanceFormServices } from '../../../../services/issuance-form.service';
import { receivedAddressData } from '../../../../constants/form-initialization';

interface SelectItem {
  label: string;
  value: any;
}
@Component({
  standalone: true,
  selector: 'app-received-address',
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
  templateUrl: './received-address.component.html',
  styleUrls: ['./received-address.component.less'],
})
export class ReceivedAddressFormComponent {
  private issuanceFormServices = inject(IssuanceFormServices);

  protected expandedMainCard = true;
  protected toggleMainCard(): void {
    this.expandedMainCard = !this.expandedMainCard;
  }

  protected expandedPlace = true;
  protected togglePlace(): void {
    this.expandedPlace = !this.expandedPlace;
  }

  placeReceivice = receivedAddressData.placeReceivice;

  transactionOffice = receivedAddressData.transactionOffice;

  listProvince = receivedAddressData.listProvince;

  listDistrict = receivedAddressData.listDistrict;

  listWard = receivedAddressData.listWard;

  receivedAddressForm: FormGroup;

  constructor() {
    this.receivedAddressForm = this.initializeForm();
  }

  protected readonly stringifyCombobox = (item: SelectItem): string =>
    `${item.label}`;

  initializeForm() {
    if (this.issuanceFormServices.receivedAddressForm)
      return this.issuanceFormServices.receivedAddressForm;

    return this.issuanceFormServices.setReceivedAddressForm({
      transactionOffice: new FormControl(this.transactionOffice[0]),
      placeRec: new FormControl(this.placeReceivice[0]),
      detailAdd: new FormControl({ value: '', disabled: true }),
      cardProduct: new FormControl({ value: '', disabled: true }),
      province: new FormControl(this.listProvince[0]),
      district: new FormControl(this.listDistrict[0]),
      ward: new FormControl(this.listWard[0]),
      homeAddress: new FormControl('', [Validators.required]),
    });
  }
}
