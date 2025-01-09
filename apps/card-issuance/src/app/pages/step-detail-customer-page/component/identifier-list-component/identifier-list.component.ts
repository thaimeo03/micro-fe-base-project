import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { BidvExpandModule, BidvSvgModule } from '@bidv-ui/core';
import { BidvBadgeModule, BidvDividerDirective } from '@bidv-ui/kit';
import { BaseTableWithApiComponent } from '@libs/components';
import { IssuanceServices } from '../../../../services/issuance.service';
import { ColDef, ColGroupDef, GridOptions } from 'ag-grid-community';

@Component({
  selector: 'app-identifier-component',
  standalone: true,
  imports: [
    CommonModule,
    BidvSvgModule,
    BidvBadgeModule,
    BidvExpandModule,
    BidvDividerDirective,
    BaseTableWithApiComponent,
  ],
  templateUrl: './identifier-list.component.html',
  styleUrls: ['./identifier-list.component.less'],
})
export class IdentifierComponent {
  router = inject(Router);
  is_cn = true;
  columnDefs: Array<ColDef | ColGroupDef> = [];
  rowData: any[] = [];
  defaultColDef: ColDef;
  issuanceServices = inject(IssuanceServices);
  gridOptions: GridOptions = {
    domLayout: 'autoHeight',
    rowSelection: 'multiple',
    suppressRowClickSelection: true,
    unSortIcon: true,
  };
  constructor() {
    this.defaultColDef = {
      flex: 1,
      resizable: true,
    };
    this.createColumnDefs();
  }
  private createColumnDefs(): void {
    this.columnDefs = [
      {
        width: 40,
        checkboxSelection: true,
        filter: false,
        sortable: false,
        suppressMenu: true,
        pinned: true,
        headerCheckboxSelection: true,
      },
      {
        headerName: 'STT',
        field: 'id',
        width: 80,
        pinned: true,
        sortable: false,
        cellClass: 'text-stt',
      },
      {
        headerName: 'ID chính phụ',
        field: 'txncode',
        pinned: true,
        width: 120,
        sortable: true,
      },
      {
        headerName: 'Loại ID',
        field: 'txncode',
        pinned: true,
        width: 120,
        sortable: true,
      },
      {
        headerName: 'Số ID',
        field: 'txncode',
        width: 120,
        sortable: true,
      },
      {
        headerName: 'Quốc gia cấp ID',
        field: 'txncode',
        width: 120,
        sortable: true,
      },
      {
        headerName: 'Nơi cấp ID',
        field: 'txncode',
        width: 120,
        sortable: true,
      },
      {
        headerName: 'Ngày cấp ID',
        field: 'txncode',
        width: 120,
        sortable: true,
      },
      {
        headerName: 'Loại ngày hết hạn ID',
        field: 'txncode',
        width: 120,
        sortable: true,
      },
      {
        headerName: 'Hiệu lục GTTT',
        field: 'txncode',
        width: 120,
        sortable: true,
      },
    ];
  }
  onRowClick(value: any) {
    console.log(value);
  }
  apiList(params: any) {
    return this.issuanceServices.listIndentifier(params).build();
  }
  expand1 = true;
  protected toggle(code: string): void {
    if (code === '1') {
      this.expand1 = !this.expand1;
    }
  }
}
