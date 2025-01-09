import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { StepRegisterKHCNComponent } from './page-container/khcn/step-register-khcn-component.component';
import { BidvPageContainerComponent, StepComponent } from '@libs/components';
import { Router } from '@angular/router';
import { StepRegisterKHDNComponent } from './page-container/khdn/step-register-khdn-component.component';
import { issuanceRouter } from '../../constants/router';
import { IssuanceServices } from '../../services/issuance.service';

export interface StepOption {
  key: string;
  label: string;
}

@Component({
  standalone: true,
  selector: 'app-step-register-detail-component',
  imports: [
    StepRegisterKHCNComponent,
    StepRegisterKHDNComponent,
    BidvPageContainerComponent,
    StepComponent,
  ],
  templateUrl: './page-container.component.html',
  styleUrls: ['./page-container.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageContainerComponent {
  router = inject(Router);

  breadcrumbs = [
    { label: 'Quản lý giao dịch' },
    { label: 'Phê duyệt giao dịch' },
  ];

  onNextStep(stepKey: number) {
    this.router.navigate([issuanceRouter[stepKey]]);
  }
  onPreStep(stepKey: number) {
    this.router.navigate([issuanceRouter[stepKey]]);
  }
}
