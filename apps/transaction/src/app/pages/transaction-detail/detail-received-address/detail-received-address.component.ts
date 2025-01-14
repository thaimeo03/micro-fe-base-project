import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  BidvExpandModule,
  BidvSvgModule,
  BidvTextfieldControllerModule,
} from '@bidv-ui/core';
import {
  BidvBadgeModule,
  BidvDividerDirective,
  BidvInputModule,
} from '@bidv-ui/kit';
import { DetailItem } from '../../../models';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { formatData } from '../utils/format-data';

@Component({
  selector: 'app-detail-received-address',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    BidvSvgModule,
    BidvBadgeModule,
    BidvDividerDirective,
    BidvExpandModule,
    BidvInputModule,
    BidvTextfieldControllerModule,
  ],
  templateUrl: './detail-received-address.component.html',
  styleUrls: ['./detail-received-address.component.scss'],
})
export class FinalReceivedAddressComponent implements OnInit {
  router = inject(Router);

  @Input({ required: true }) data!: any;

  receivedAddressData: any;

  detailItem: DetailItem = {
    title: 'Địa chỉ nhận thẻ',
    subDetails: [
      {
        key: 'placeRec',
        iconLabel: [{ name: '', class: '', key: '' }],
        label: 'Địa điểm nhận thẻ',
        class: '',
        customElement: undefined,
      },
      {
        key: 'transactionOffice',
        iconLabel: [{ name: '', class: '', key: '' }],
        label: 'Chi nhánh/ PGD BIDV',
        class: '',
        customElement: undefined,
      },
      {
        key: 'detailAdd',
        iconLabel: [{ name: '', class: '', key: '' }],
        label: 'Địa chỉ chi tiết',
        class: '',
        customElement: undefined,
      },
      {
        key: 'province',
        iconLabel: [{ name: '', class: '', key: '' }],
        label: 'Tỉnh/TP',
        class: '',
        customElement: undefined,
      },
      {
        key: 'district',
        iconLabel: [{ name: '', class: '', key: '' }],
        label: 'Quận/Huyện',
        class: '',
        customElement: undefined,
      },
      {
        key: 'ward',
        iconLabel: [{ name: '', class: '', key: '' }],
        label: 'Phường/Xã',
        class: '',
        customElement: undefined,
      },
      {
        key: 'homeAddress',
        iconLabel: [{ name: '', class: '', key: '' }],
        label: 'Địa chỉ nhà',
        class: '',
        customElement: undefined,
      },
    ],
  };

  expand1 = true;
  protected toggle(code: string): void {
    if (code === '1') {
      this.expand1 = !this.expand1;
    }
  }

  ngOnInit(): void {
    this.receivedAddressData = formatData(this.data);
  }
}
