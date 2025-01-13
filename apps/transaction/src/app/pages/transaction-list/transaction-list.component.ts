import { Component, inject } from '@angular/core';
import { AgGridModule } from 'ag-grid-angular';
import { ColDef, ColGroupDef, GridOptions } from 'ag-grid-community';
import { StoreFeatureModuleModule, FeatureModuleFacade } from '@libs/store';
import { BadgeStatusComponent } from './badge-status/badge-status.component';

@Component({
  selector: 'app-transaction-list',
  standalone: true,
  imports: [AgGridModule, BadgeStatusComponent, StoreFeatureModuleModule],
  providers: [FeatureModuleFacade],
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss'],
})
export class TransactionListComponent {
  private featureModuleFacade = inject(FeatureModuleFacade);

  colDefs: Array<ColDef | ColGroupDef> = [];
  rowData: any[] = [];
  defaultColDef: ColDef;
  rowHeight = 50;
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
    this.rowData = this.fakeData();
    this.featureModuleFacade.selectedTransactionList$.subscribe((data) => {
      if (data) {
        this.updateRowData(data);
      }
    });
  }

  private createColumnDefs(): void {
    this.colDefs = [
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
        headerName: 'Mã GD',
        field: 'txncode',
        pinned: true,
        width: 120,
        sortable: true,
      },
      {
        headerName: 'Số giao dịch',
        field: 'txntype',
        pinned: true,
        width: 120,
        sortable: true,
      },
      {
        headerName: 'Tên khách hàng',
        field: 'cifoffDesc',
        pinned: true,
        width: 120,
        sortable: true,
      },
      {
        headerName: 'Số tài khoản',
        field: 'txntype',
        pinned: true,
        width: 120,
        sortable: true,
      },
      {
        headerName: 'Số CIF',
        field: 'acn',
        pinned: true,
        width: 120,
        sortable: true,
      },
      {
        headerName: 'Số ID',
        field: 'oin',
        pinned: true,
        width: 120,
        sortable: true,
      },
      {
        headerName: 'Trạng Thái',
        field: 'status',
        cellRenderer: BadgeStatusComponent,
        pinned: true,
        width: 120,
        sortable: true,
      },
      {
        headerName: 'Mã người dùng',
        field: 'txntype',
        pinned: true,
        width: 120,
        sortable: true,
      },
      {
        headerName: 'Thời gian',
        field: 'txntype',
        pinned: true,
        width: 120,
        sortable: true,
      },
      {
        headerName: 'Thời gian',
        field: 'txntype',
        pinned: true,
        width: 120,
        sortable: true,
      },
      {
        headerName: 'Tên giao dịch',
        field: 'txntype',
        pinned: true,
        width: 120,
        sortable: true,
      },
      {
        headerName: 'CI',
        field: 'txntype',
        pinned: true,
        width: 120,
        sortable: true,
      },
    ];
  }

  private fakeData() {
    return [
      ...this.rowData,
      {
        id: 1,
        cifoffDesc: 'Nguyen Van A',
        acn: '85082',
        oin: '084069000125',
        status: 0,
      },
      {
        id: 2,
        cifoffDesc: 'Nguyen Van B',
        acn: '85082',
        oin: '084069000125',
        status: 0,
      },
      {
        id: 3,
        cifoffDesc: 'Nguyen Van C',
        acn: '85082',
        oin: '084069000125',
        status: 1,
      },
    ];
  }

  private updateRowData(data: any) {
    this.rowData = [
      ...this.rowData,
      {
        id: this.rowData.length + 1,
        cifoffDesc: data?.userInfoData.cifoffDesc,
        acn: data?.userInfoData.acn,
        oin: data?.userInfoData.oin,
        status: 0,
      },
    ];

    console.log(this.rowData);
  }
}
