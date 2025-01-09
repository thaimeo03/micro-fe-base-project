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

@Component({
  selector: 'app-final-fee-collection',
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
  templateUrl: './final-fee-collection.component.html',
  styleUrls: ['./final-fee-collection.component.less'],
})
export class FinalFeeCollectionComponent implements OnInit {
  router = inject(Router);

  @Input({ required: true }) data!: any;

  detailItem: DetailItem = {
    title: '',
    subDetails: [
      {
        key: 'typeFee',
        label: 'Hình thức thanh toán phí',
        iconLabel: [
          {
            name: '',
            class: '',
            key: '',
          },
        ],
        class: '',
        customElement: undefined,
      },
      {
        key: 'mainCardFee',
        iconLabel: [{ name: '', class: '', key: '' }],
        label: 'Phí phát hành thẻ chính',
        class: '',
        customElement: undefined,
      },
      {
        key: 'subCardFee',
        iconLabel: [{ name: '', class: '', key: '' }],
        label: 'Phí phát hành thẻ phụ',
        class: '',
        customElement: undefined,
      },
      {
        key: 'addressFee',
        iconLabel: [{ name: '', class: '', key: '' }],
        label: 'Phí trả về địa chỉ KH',
        class: '',
        customElement: undefined,
      },
      {
        key: 'accountFee',
        iconLabel: [{ name: '', class: '', key: '' }],
        label: 'Tài khoản thu phí',
        class: '',
        customElement: undefined,
      },
      {
        key: 'totalFee',
        iconLabel: [{ name: '', class: '', key: '' }],
        label: 'Tổng phí (VND):',
        class: '',
        customElement: undefined,
      },
      {
        key: 'VATFee',
        iconLabel: [{ name: '', class: '', key: '' }],
        label: 'Tổng VAT (VND):',
        class: '',
        customElement: undefined,
      },
      {
        key: 'revenueFee',
        iconLabel: [{ name: '', class: '', key: '' }],
        label: 'Tổng thu (VND):',
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
    this.data = this.formatData(this.data);
  }

  formatData(data: any) {
    const obj: Record<string, string | number> = {};

    for (const key in data) {
      if (Array.isArray(data[key])) {
        obj[key] = data[key].map((item: any) => item.label).join(' ');
      } else if (
        typeof data[key] === 'string' ||
        typeof data[key] === 'number'
      ) {
        obj[key] = data[key];
      } else if (data[key] && typeof data[key] === 'object') {
        obj[key] = data[key].label;
      }
    }

    return obj;
  }
}
