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
import { IssuanceFormServices } from '../../../services/issuance-form.service';

@Component({
  selector: 'app-final-main-card',
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
  templateUrl: './final-main-card.component.html',
  styleUrls: ['./final-main-card.component.less'],
})
export class FinalMainCardComponent implements OnInit {
  router = inject(Router);
  private issuanceFormServices = inject(IssuanceFormServices);

  @Input({ required: true }) data!: any;

  detailItem: DetailItem = {
    title: 'Thông tin phát hành thẻ chính',
    subDetails: [
      {
        key: 'cardType',
        label: 'Loại thẻ phát hành',
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
        key: 'productCode',
        iconLabel: [{ name: '', class: '', key: '' }],
        label: 'Mã sản phẩm',
        class: '',
        customElement: undefined,
      },
      {
        key: 'name',
        iconLabel: [{ name: '', class: '', key: '' }],
        label: 'Tên in trên thẻ',
        class: '',
        customElement: undefined,
      },
      {
        key: 'cardCusGr',
        iconLabel: [{ name: '', class: '', key: '' }],
        label: 'Nhóm khách hàng',
        class: '',
        customElement: undefined,
      },
      {
        key: 'cardForm',
        iconLabel: [{ name: '', class: '', key: '' }],
        label: 'Hình thức thẻ',
        class: '',
        customElement: undefined,
      },
      {
        key: 'annualFee',
        iconLabel: [{ name: '', class: '', key: '' }],
        label: 'Phí thường niên & đặc quyền',
        class: '',
        customElement: undefined,
      },
      {
        key: 'mainAcc',
        iconLabel: [{ name: '', class: '', key: '' }],
        label: 'Tài khoản chính liên kết thẻ',
        class: '',
        customElement: undefined,
      },
      {
        key: 'question',
        iconLabel: [{ name: '', class: '', key: '' }],
        label: 'Câu hỏi bảo mật',
        class: '',
        customElement: undefined,
      },
      {
        key: 'staff',
        iconLabel: [{ name: '', class: '', key: '' }],
        label: 'CB giới thiệu',
        class: '',
        customElement: undefined,
      },
      {
        key: 'answer',
        iconLabel: [{ name: '', class: '', key: '' }],
        label: 'Trả lời câu hỏi bảo mật',
        class: '',
        customElement: undefined,
      },
      {
        key: 'subAcc',
        iconLabel: [{ name: '', class: '', key: '' }],
        label: 'Tài khoản phụ liên kết thẻ',
        class: '',
        customElement: undefined,
      },
      {
        key: 'staff',
        iconLabel: [{ name: '', class: '', key: '' }],
        label: 'Mã AM quản lý',
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
    this.data = this.issuanceFormServices.formatData(this.data);
  }
}
