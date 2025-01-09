import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { BidvButtonModule } from '@bidv-ui/core';

import {
  BidvBreadcrumbsModule,
  BidvStepperModule,
  BidvCheckboxLabeledModule,
  BidvRadioListComponent,
} from '@bidv-ui/kit';
import { BidvPageContainerComponent, StepComponent } from '@libs/components';
import { issuanceRouter } from '../../constants/router';

export interface StepOption {
  key: string;
  label: string;
}
@Component({
  standalone: true,
  selector: 'app-step-register-component',
  imports: [
    CommonModule,
    BidvBreadcrumbsModule,
    BidvButtonModule,
    BidvStepperModule,
    FormsModule,
    ReactiveFormsModule,
    BidvCheckboxLabeledModule,
    BidvRadioListComponent,
    BidvPageContainerComponent,
    StepComponent
  ],
  templateUrl: './step-register-component.component.html',
  styleUrls: ['./step-register-component.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [],
})
export class StepRegisterComponent {
  breadcrumbs = [
    { label: 'Quản lý giao dịch' },
    { label: 'Phê duyệt giao dịch' },
  ];
  router = inject(Router)
  protected testForm = new FormGroup({
    testValue1: new FormControl(true),
    testValue2: new FormControl(false),
    testValue3: new FormControl(false),
    testValue4: new FormControl(false),
    testValue5: new FormControl(false),
    testValue6: new FormControl(false),
    testValue7: new FormControl(false),
  });

  testForm1 = new FormGroup({
    selectedPackage: new FormControl(null, Validators.required),
  });

  packageOptions = [
    { name: 'Gói sản phẩm 1' },
    { name: 'Gói sản phẩm 2' },
    { name: 'Gói sản phẩm 3' },
    { name: 'Gói sản phẩm 4' },
    { name: 'Gói sản phẩm 5' },
    { name: 'Gói sản phẩm 6' },
  ];

  packageGroups: any[] = [];

  ngOnInit() {
    const groupSize = 3;
    this.packageGroups = this.chunkArray(this.packageOptions, groupSize);
  }

  chunkArray(arr: any[], size: number): any[] {
    return arr.reduce(
      (acc, _, i) => (i % size === 0 ? [...acc, arr.slice(i, i + size)] : acc),
      [],
    );
  }

  onNextStep(stepKey: number) {
    this.router.navigate([issuanceRouter[stepKey]])
  }
  onPreStep(stepKey: number) {
    this.router.navigate([issuanceRouter[stepKey]])
  }
}
