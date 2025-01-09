import 'ag-grid-enterprise';

import { CommonModule } from '@angular/common';
import {
  Component,
  DestroyRef,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';

import { AgGridModule } from 'ag-grid-angular';
import { ColDef, GridOptions } from 'ag-grid-community';

import { BidvLoaderModule, BidvSvgModule } from '@bidv-ui/core';
import { BidvPaginationSelectPageModule } from '@bidv-ui/kit';
import { injectQuery, queryOptions } from '@bidv-api/angular';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';

@Component({
  selector: 'base-table-with-api',
  standalone: true,
  imports: [
    CommonModule,
    AgGridModule,
    BidvPaginationSelectPageModule,
    BidvLoaderModule,
    BidvSvgModule,
  ],
  templateUrl: './base-table-with-api.component.html',
  styleUrls: ['./base-table-with-api.component.less'],
})
export class BaseTableWithApiComponent implements OnChanges, OnInit {
  destroyedRef = inject(DestroyRef);
  readonly #query = injectQuery();
  @Input() colDefs: ColDef[] | null = null;
  @Input() defaultColDef: ColDef = {
    flex: 1,
    filter: true,
  };
  @Input() gridOptions: GridOptions = {};
  @Input() rowHeight = 50;
  @Input({ required: true }) key = '';
  @Input() nullFilter = false;

  @Input() itemPages: Array<{ value: number; label: string }> = [
    { value: 10, label: '10 /Trang' },
    { value: 20, label: '20 /Trang' },
    { value: 50, label: '50 /Trang' },
    { value: 100, label: '100 /Trang' },
  ];
  @Input({ required: true }) api!: (params: any) => Observable<any>;
  @Output() dataReturn = new EventEmitter<any>();
  @Input({ required: true }) params: any = null;
  @Input()
  hidePagination = false
  public overlayNoRowsTemplate =
    '<span style="padding: 10px; background: white;">Không có dữ liệu</span>';
  defaultColumnDef: ColDef = {
    flex: 1,
    filter: true,
    resizable: true,
    ...this.defaultColDef,
  };
  protected rowData = [];
  protected index = 0;
  protected itemPerPages = 10;
  protected totalPage = 0;
  protected length = 0;

  protected paramApi = {
    page: this.index,
    size: this.itemPerPages,
  };
  #featureQuery = this.#query(this.getListOption(this.params, this.nullFilter));
  features = this.#featureQuery.result;
  protected getData(params: any) {
    if (!this.api) return;
    this.#featureQuery.updateOptions(
      this.getListOption(params, this.nullFilter),
    );
  }
  getListOption(params: any, nullFilter: boolean) {
    return queryOptions({
      enabled: !!params && !nullFilter,
      queryKey: [this.key, params] as const,
      staleTime: 1 * 1000,
      retry: 0,
      queryFn: ({ queryKey }) => {
        const [_, params] = queryKey;

        return this.api(params);
      },
    });
  }
  ngOnInit(): void {
    this.#featureQuery.result$
      .pipe(takeUntilDestroyed(this.destroyedRef))
      .subscribe((res) => {
        const data = res.data;
        if (!data) {
          return;
        }
        this.rowData = data.content;
        this.totalPage = data.totalPages;
        this.itemPerPages = data.size;
        this.length = data.totalElements;
        this.dataReturn.emit(data);
      });
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['params']) {
      if (this.params) {
        this.paramApi = { ...this.paramApi, ...this.params };
      }
      this.getData(this.paramApi);
    }
  }
  protected selectPage(value: any): void {
    this.itemPerPages = value;
    this.paramApi.size = value;
    this.getData(this.paramApi);
  }

  protected goToPage(index: number): void {
    this.index = index;
    this.paramApi.page = index;
    this.getData(this.paramApi);
  }
}
