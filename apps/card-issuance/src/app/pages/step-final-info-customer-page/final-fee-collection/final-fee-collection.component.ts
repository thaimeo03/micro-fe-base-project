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
  private issuanceFormServices = inject(IssuanceFormServices);

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
    const { mainCardFee, subCardFee, addressFee } =
      this.issuanceFormServices.feeCollectionForm.value;
    const { totalFee, VATFee, revenueFee } =
      this.issuanceFormServices.calculateFee(
        mainCardFee,
        subCardFee,
        addressFee,
      );
    this.data = { ...this.data, totalFee, VATFee, revenueFee };
    this.data = this.issuanceFormServices.formatData(this.data);
  }
}
