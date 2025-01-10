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
