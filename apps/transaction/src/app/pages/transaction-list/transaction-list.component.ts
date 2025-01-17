import { Component, inject, OnInit } from '@angular/core';
import { AgGridModule } from 'ag-grid-angular';
import {
  ColDef,
  ColGroupDef,
  GridApi,
  GridOptions,
  GridReadyEvent,
  RowClickedEvent,
} from 'ag-grid-community';
import { StoreFeatureModuleModule, FeatureModuleFacade } from '@libs/store';
import { BadgeStatusComponent } from './badge-status/badge-status.component';
import { TransactionService } from '../../services/transaction.service';
import { Router } from '@angular/router';
import { TransactionRoutes } from '../../constants/router';
import { BidvButtonModule } from '@bidv-ui/core';

@Component({
  selector: 'app-transaction-list',
  standalone: true,
  imports: [AgGridModule, StoreFeatureModuleModule, BidvButtonModule],
  providers: [FeatureModuleFacade],
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss'],
})
export class TransactionListComponent implements OnInit {
  private router = inject(Router);
  private featureModuleFacade = inject(FeatureModuleFacade);
  private transactionService = inject(TransactionService);

  gridApi!: GridApi;
  colDefs: Array<ColDef | ColGroupDef> = [];
  rowData: any[] = [];
  defaultColDef: ColDef;
  rowHeight = 50;
  gridOptions: GridOptions = {
    domLayout: 'autoHeight',
    rowSelection: 'multiple',
    suppressRowClickSelection: true,
    unSortIcon: true,
    onRowClicked: this.handleRowClick.bind(this),
    onGridReady: this.onGridReady.bind(this),
  };

  constructor() {
    this.defaultColDef = {
      flex: 1,
      resizable: true,
    };
    this.createColumnDefs();
  }

  ngOnInit(): void {
    this.transactionService.fakedTransactionList$.subscribe(
      (transactionList) => {
        this.rowData = this.formatData(transactionList);
      },
    );

    this.featureModuleFacade.selectedTransactionList$
      .subscribe((data) => {
        if (data) {
          this.transactionService.addNewTransaction({
            id: this.rowData.length + 1,
            ...data,
          });
          this.featureModuleFacade.setTransactionData(null);
        }
      })
      .unsubscribe();
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
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
      },
      {
        headerName: 'Mã GD',
        field: 'txncode',
        width: 120,
        sortable: true,
      },
      {
        headerName: 'Số giao dịch',
        field: 'txntype',
        width: 120,
        sortable: true,
      },
      {
        headerName: 'Tên khách hàng',
        field: 'cifoffDesc',
        width: 120,
        sortable: true,
      },
      {
        headerName: 'Số tài khoản',
        field: 'txntype',
        width: 120,
        sortable: true,
      },
      {
        headerName: 'Số CIF',
        field: 'acn',
        width: 120,
        sortable: true,
      },
      {
        headerName: 'Số ID',
        field: 'oin',
        width: 120,
        sortable: true,
      },
      {
        headerName: 'Trạng Thái',
        field: 'status',
        cellRenderer: BadgeStatusComponent,
        width: 120,
        sortable: true,
      },
      {
        headerName: 'Mã người dùng',
        field: 'txntype',
        width: 120,
        sortable: true,
      },
      {
        headerName: 'Thời gian',
        field: 'txntype',
        width: 120,
        sortable: true,
      },
      {
        headerName: 'Thời gian',
        field: 'txntype',
        width: 120,
        sortable: true,
      },
      {
        headerName: 'Tên giao dịch',
        field: 'txntype',
        width: 120,
        sortable: true,
      },
      {
        headerName: 'CI',
        field: 'txntype',
        width: 120,
        sortable: true,
      },
    ];
  }

  handleRowClick(event: RowClickedEvent): void {
    console.log('handleRowClick', event);
    this.router.navigate([TransactionRoutes.detail, event.data.id]);
  }

  handleRejectTransactions() {
    // Should be handle call api instead
    this.gridApi.getSelectedRows().forEach((selectedRow) => {
      this.transactionService.updateTransactionStatus(selectedRow.id, 2);
    });
  }

  handleApproveTransactions() {
    // Should be handle call api instead
    this.gridApi.getSelectedRows().forEach((selectedRow) => {
      this.transactionService.updateTransactionStatus(selectedRow.id, 1);
    });
  }

  private formatData(transactionList: any) {
    return transactionList.map((item: any, index: number) => {
      return {
        id: index + 1,
        cifoffDesc: item.userInfoData.cifoffDesc,
        acn: item.userInfoData.acn,
        oin: item.userInfoData.oin,
        status: item.status,
      };
    });
  }
}
