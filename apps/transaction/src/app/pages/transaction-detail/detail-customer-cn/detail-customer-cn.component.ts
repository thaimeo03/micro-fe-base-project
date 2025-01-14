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
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { DetailItem } from '../../../models';
import { UserInfo } from '../../../models/step-detail-customer.model';

@Component({
  selector: 'app-detail-customer-cn',
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
  templateUrl: './detail-customer-cn.component.html',
  styleUrls: ['./detail-customer-cn.component.scss'],
})
export class DetailCustomerCnComponent implements OnInit {
  @Input({ required: true }) data!: any;

  title = 'Thông tin KH';
  breadcrumbs = [
    { label: 'Quản lý giao dịch' },
    { label: 'Phê duyệt giao dịch' },
  ];

  detailItem: DetailItem = {
    title: '',
    subDetails: [
      {
        key: 'idexp',
        label: 'Trạng thái khách hàng',
        iconLabel: [
          {
            name: '',
            class: '',
            key: '',
          },
        ],
        class: '',
        customElement: {
          type: 'badge',
          options: {
            size: 's',
            class: 'badge-green',
            shape: '',
            appearance: '',
            icon: 'bidvIconCheckmarkCircle',
          },
        },
      },
      {
        key: 'dob',
        iconLabel: [{ name: '', class: '', key: '' }],
        label: 'Ngày sinh',
        class: '',
        customElement: undefined,
      },
      {
        key: 'zbph1',
        iconLabel: [{ name: '', class: '', key: '' }],
        label: 'Số điện thoại',
        class: '',
        customElement: undefined,
      },
      {
        key: 'email',
        iconLabel: [{ name: '', class: '', key: '' }],
        label: 'Email',
        class: '',
        customElement: undefined,
      },
      {
        key: 'idexp',
        iconLabel: [{ name: '', class: '', key: '' }],
        label: 'Trạng thái hiệu lực GTTT',
        class: '',
        customElement: undefined,
      },
      {
        key: 'oed',
        iconLabel: [{ name: '', class: '', key: '' }],
        label: 'Thời hạn hiệu lực GTTT',
        class: '',
        customElement: undefined,
      },
      {
        key: 'rescdDesc',
        iconLabel: [{ name: '', class: '', key: '' }],
        label: 'Tình trạng cư trú',
        class: '',
        customElement: undefined,
      },
      {
        key: 'pcntryDesc',
        iconLabel: [{ name: '', class: '', key: '' }],
        label: 'Quốc tịch',
        class: '',
        customElement: undefined,
      },
      {
        key: 'oisdt',
        iconLabel: [{ name: '', class: '', key: '' }],
        label: 'Thời hạn cư trú',
        class: '',
        customElement: undefined,
      },
      {
        key: 'mad1',
        iconLabel: [{ name: '', class: '', key: '' }],
        label: 'Địa chỉ thường trú',
        class: '',
        customElement: undefined,
      },
      {
        key: 'zprivDesc',
        iconLabel: [{ name: '', class: '', key: '' }],
        label: 'Trạng thái thu thập xác nhận của Khách hàng',
        class: '',
        customElement: undefined,
      },
      {
        key: 'zsth',
        iconLabel: [{ name: '', class: '', key: '' }],
        label: 'Trạng thái thu thập sinh trắc học',
        class: '',
        customElement: undefined,
      },
      {
        key: 'zbca',
        iconLabel: [{ name: '', class: '', key: '' }],
        label: 'Trạng thái xác thực Bộ Công An',
        class: '',
        customElement: undefined,
      },
    ],
  };

  form = new FormGroup({
    name: new FormControl(),
  });

  ngOnInit(): void {
    this.data = this.formatUserInfoData();
  }

  formatUserInfoData() {
    return {
      ...this.data,
      idexp: this.data.idexp === '0' ? 'Còn hiệu lực' : 'Hết hiệu lực',
    } as UserInfo;
  }

  expand1 = true;
  protected toggle(code: string): void {
    if (code === '1') {
      this.expand1 = !this.expand1;
    }
  }
}
