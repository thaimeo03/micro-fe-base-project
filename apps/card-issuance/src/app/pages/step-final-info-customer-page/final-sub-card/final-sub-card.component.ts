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
  selector: 'app-final-sub-card',
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
  templateUrl: './final-sub-card.component.html',
  styleUrls: ['./final-sub-card.component.less'],
})
export class FinalSubCardComponent implements OnInit {
  router = inject(Router);
  private issuanceFormServices = inject(IssuanceFormServices);

  @Input({ required: true }) data!: any;

  subCardItemsData: any;

  detailItem: DetailItem = {
    title: 'Thông tin phát hành thẻ phụ',
    subDetails: [
      {
        key: 'cifNumber',
        label: 'CIF chủ thẻ phụ',
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
        key: 'name',
        iconLabel: [{ name: '', class: '', key: '' }],
        label: 'Tên KHCN sử dụng thẻ',
        class: '',
        customElement: undefined,
      },
      {
        key: 'cardType',
        iconLabel: [{ name: '', class: '', key: '' }],
        label: 'Hình thức thẻ',
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
        key: 'subAcc',
        iconLabel: [{ name: '', class: '', key: '' }],
        label: 'Tài khoản phụ liên kết đến thẻ',
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
        key: 'answer',
        iconLabel: [{ name: '', class: '', key: '' }],
        label: 'Trả lời câu hỏi bảo mật',
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
    this.subCardItemsData = this.data.subCardItemForms.map((item: any) =>
      this.issuanceFormServices.formatData(item),
    );
  }
}
