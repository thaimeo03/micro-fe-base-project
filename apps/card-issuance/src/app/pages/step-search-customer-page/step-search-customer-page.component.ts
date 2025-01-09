import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { BidvListCustomerComponent } from "@bidv-aoit-common/kit";
import { BidvPageContainerComponent, StepComponent } from '@libs/components';
import { issuanceRouter } from '../../constants/router';
import { Router } from '@angular/router';
import { BidvDividerDirective } from '@bidv-ui/kit';
@Component({
  selector: 'app-step-search-customer-page',
  standalone: true,
  imports: [CommonModule,BidvListCustomerComponent,BidvPageContainerComponent, StepComponent, BidvDividerDirective],
  templateUrl: './step-search-customer-page.component.html',
  styleUrls: ['./step-search-customer-page.component.less'],
})
export class ListCustommerPageComponent {
  breadcrumbs = [
    { label: 'Quản lý giao dịch' },
    { label: 'Phê duyệt giao dịch' },
  ];
  router = inject(Router)


  onRowClick(value:any){
    console.log(value);

  }
  onNextStep(stepKey: number) {
    this.router.navigate([issuanceRouter[stepKey]])
  }
  onPreStep(stepKey: number) {
    this.router.navigate([issuanceRouter[stepKey]])
  }
}
