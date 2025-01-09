import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { BidvActiveZoneDirective, BidvObscuredDirective } from '@bidv-ui/cdk';
import {
  BidvButtonModule,
  BidvDataListModule,
  BidvDropdownModule,
} from '@bidv-ui/core';

export interface ActionHandleSubmit {
  id: number;
  code: string;
  hideKey: string;
  label: string;
  variant: 'filled' | 'flat' | 'outlined' | null | undefined;
  appearance: string;
}

interface StatusButton {
  hide?: boolean;
  disabled?: boolean;
}

export interface OptionActionHandle {
  [key: string]: StatusButton | undefined;
}

@Component({
  standalone: true,
  selector: 'action-handle',
  imports: [
    CommonModule,
    BidvButtonModule,
    BidvDropdownModule,
    BidvDataListModule,
    BidvActiveZoneDirective,
    BidvObscuredDirective,
  ],
  templateUrl: './action-handle.component.html',
  styleUrls: ['./action-handle.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActionHandleComponent implements OnChanges {
  @Input()
  action: ActionHandleSubmit[] = [];

  @Input()
  label: string | null = null;

  @Input()
  loading: string | undefined = undefined;

  @Input()
  loadingFetch = false;

  @Input()
  defaultOptions: OptionActionHandle | undefined = undefined;

  @Output()
  readonly handleSubmit = new EventEmitter<string>();

  maxAction: ActionHandleSubmit[] = [];
  lastAction: ActionHandleSubmit[] = [];
  showMoreAction = false;

  onClick(): void {
    this.showMoreAction = !this.showMoreAction;
  }

  submitAction(data: string): void {
    this.handleSubmit.emit(data);
  }

  onObscured(obscured: boolean): void {
    if (obscured) {
      this.showMoreAction = false;
    }
  }

  onActiveZone(active: boolean): void {
    this.showMoreAction = active && this.showMoreAction;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['defaultOptions'] || changes['action']) {
      // Filter actions based on defaultOptions, using hideKey to look up each action's visibility status
      const filteredActions = this.action.filter((actionItem) => {
        const option = this.defaultOptions?.[actionItem.hideKey];

        return !option?.hide; // Include items where hide is not true
      });

      // Split filteredActions into maxAction and lastAction
      if (filteredActions.length <= 3) {
        this.maxAction = [...filteredActions].reverse();
        this.lastAction = [];
      } else {
        this.maxAction = filteredActions.slice(0, 3).reverse();
        this.lastAction = filteredActions.slice(3);
      }
    }
  }
}
