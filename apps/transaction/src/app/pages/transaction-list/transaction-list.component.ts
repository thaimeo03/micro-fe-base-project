import { Component, inject, OnInit } from '@angular/core';
import { AgGridModule } from 'ag-grid-angular';
import {
  ColDef,
  ColGroupDef,
  GridOptions,
  RowClickedEvent,
} from 'ag-grid-community';
import { StoreFeatureModuleModule, FeatureModuleFacade } from '@libs/store';
import { BadgeStatusComponent } from './badge-status/badge-status.component';
import { TransactionService } from '../../services/transaction.service';
import { Router } from '@angular/router';
import { TransactionRoutes } from '../../constants/router';

@Component({
  selector: 'app-transaction-list',
  standalone: true,
  imports: [AgGridModule, BadgeStatusComponent, StoreFeatureModuleModule],
  providers: [FeatureModuleFacade],
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss'],
})
export class TransactionListComponent implements OnInit {
  private router = inject(Router);
  private featureModuleFacade = inject(FeatureModuleFacade);
  private transactionService = inject(TransactionService);

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

  handleRowClick(event: RowClickedEvent): void {
    console.log('handleRowClick', event);
    this.router.navigate([TransactionRoutes.detail, event.data.id]);
  }

  private formatData(transactionList: any) {
    return transactionList.map((item: any, index: number) => {
      return {
        id: index + 1,
        cifoffDesc: item.userInfoData.cifoffDesc,
        acn: item.userInfoData.acn,
        oin: item.userInfoData.oin,
        status: 0,
      };
    });
  }
}
