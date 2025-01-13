import { CommonModule } from '@angular/common';
import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
  AfterViewInit,
  ChangeDetectorRef,
} from '@angular/core';
import { BidvButtonModule } from '@bidv-ui/core';
import {
  BidvBreadcrumbsModule,
  BidvDividerDirective,
  BidvStepperModule,
} from '@bidv-ui/kit';
import { ActionHandleComponent, ActionHandleSubmit } from '../action-handle';

export interface StepOption {
  key: string;
  label: string;
  index: number;
}

export type ButtonType =
  | 'approve'
  | 'print'
  | 'svs'
  | 'biometrics'
  | 'ecm'
  | 'save'
  | 'cancel';

@Component({
  standalone: true,
  selector: 'step-component',
  imports: [
    CommonModule,
    BidvBreadcrumbsModule,
    BidvButtonModule,
    BidvStepperModule,
    BidvDividerDirective,
    ActionHandleComponent,
  ],
  templateUrl: './step-component.component.html',
  styleUrls: ['./step-component.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StepComponent implements AfterViewInit {
  @Input() stepOption: StepOption[] = [
    { key: 'find', label: 'Tìm kiếm KH', index: 1 },
    { key: 'info', label: 'Thông tin KH', index: 2 },
    { key: 'register', label: 'Đăng ký dịch vụ', index: 3 },
    { key: 'detail', label: 'Chi tiết dịch vụ', index: 4 },
    { key: 'done', label: 'Hoàn thành', index: 5 },
  ];

  @Input()
  currentStep = 0;

  @Output() readonly handleNextStep = new EventEmitter<number>();
  @Output() readonly handlePrevStep = new EventEmitter<number>();
  @Output() readonly handleSubmitAction = new EventEmitter<string>();

  activeItemIndex = -1;
  actionButton: ActionHandleSubmit[] = this.getDefaultButtons();

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    Promise.resolve().then(() => {
      this.activeItemIndex = this.currentStep;
      this.updateActionButtons();
      this.cdr.detectChanges();
    });
  }

  onNextStep(): void {
    if (this.activeItemIndex < this.stepOption.length - 1) {
      this.activeItemIndex++;

      this.handleNextStep.emit(this.activeItemIndex);
      this.updateActionButtons();
    }
  }

  onPreStep(): void {
    if (this.activeItemIndex > 0) {
      this.activeItemIndex--;
      this.handlePrevStep.emit(this.activeItemIndex);
      this.updateActionButtons();
    }
  }

  onSubmitAction(data: string): void {
    this.handleSubmitAction.emit(data);
  }

  private updateActionButtons(): void {
    this.actionButton =
      this.activeItemIndex === this.stepOption.length - 1
        ? this.getFinalButtons()
        : this.getDefaultButtons();
  }

  private getDefaultButtons(): ActionHandleSubmit[] {
    return [
      {
        id: 3,
        code: 'biometrics',
        hideKey: 'biometricsButton',
        label: 'Sinh trắc học',
        variant: 'outlined',
        appearance: 'primary',
      },
      {
        id: 4,
        code: 'ecm',
        hideKey: 'ecmButton',
        label: 'ECM',
        variant: 'outlined',
        appearance: 'primary',
      },
      {
        id: 5,
        code: 'svs',
        hideKey: 'svsButton',
        label: 'SVS',
        variant: 'outlined',
        appearance: 'primary',
      },
    ];
  }

  private getFinalButtons(): ActionHandleSubmit[] {
    return [
      {
        id: 1,
        code: 'approve',
        hideKey: 'approveButton',
        label: 'Đẩy duyệt',
        variant: null,
        appearance: 'primary',
      },
      {
        id: 2,
        code: 'print',
        hideKey: 'printButton',
        label: 'In',
        variant: 'outlined',
        appearance: 'primary',
      },
      ...this.getDefaultButtons(),
      {
        id: 6,
        code: 'save',
        hideKey: 'saveButton',
        label: 'Lưu',
        variant: 'outlined',
        appearance: 'primary',
      },
      {
        id: 7,
        code: 'cancel',
        hideKey: 'cancelButton',
        label: 'Huỷ',
        variant: 'outlined',
        appearance: 'primary',
      },
    ];
  }
}
