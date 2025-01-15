import { inject, Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import {
  feeCollectionInit,
  mainCardInit,
  receivedAddressInit,
  subCardInit,
} from '../constants/form-initialization';

type StepKey = 'step-2' | 'step-4-card-form' | 'step-4-received-address';

@Injectable({
  providedIn: 'root',
})
export class IssuanceFormServices {
  private fb = inject(FormBuilder);
  private VAT = 10;
  private stepData = new BehaviorSubject<Record<StepKey, any>>({
    'step-2': null,
    'step-4-card-form': 'Thẻ chính',
    'step-4-received-address': true,
  });
  stepData$ = this.stepData.asObservable();

  formMainCard!: FormGroup;
  formSubCard!: FormGroup;
  receivedAddressForm!: FormGroup;
  feeCollectionForm!: FormGroup;

  // Set forms
  setFormMainCard(values: any) {
    this.formMainCard = this.fb.group(values);
    return this.formMainCard;
  }

  setFormSubCard(values: any) {
    this.formSubCard = this.fb.group(values);
    return this.formSubCard;
  }

  setFeeCollectionForm(values: any) {
    this.feeCollectionForm = this.fb.group(values);
    return this.feeCollectionForm;
  }

  setReceivedAddressForm(values: any) {
    this.receivedAddressForm = this.fb.group(values);
    return this.receivedAddressForm;
  }

  // Reset forms
  resetMainCardForm() {
    this.formMainCard.reset(mainCardInit, { emitEvent: false });
  }

  resetSubCardForm() {
    this.formSubCard.setControl(
      'subCardItemForms',
      this.fb.array([this.fb.group(subCardInit)]),
      { emitEvent: false },
    );
  }

  resetReceivedAddressForm() {
    this.receivedAddressForm.reset(receivedAddressInit, { emitEvent: false });
  }

  resetFeeCollectionForm() {
    this.feeCollectionForm.reset(feeCollectionInit, { emitEvent: false });
  }

  // Update step data
  updateStepData(step: StepKey, data: any) {
    const curData = this.stepData.getValue();
    this.stepData.next({ ...curData, [step]: data });
  }

  getStepData(step: StepKey) {
    return this.stepData.getValue()[step];
  }

  // Calculate fee
  calculateFee(
    mainCardFeeValue: number | null | undefined,
    subCardFeeValue: number | null | undefined,
    addressFeeValue: number | null | undefined,
  ) {
    if (
      typeof mainCardFeeValue === 'number' &&
      typeof subCardFeeValue === 'number' &&
      typeof addressFeeValue === 'number'
    ) {
      const totalFee = this.calculateTotalFee(
        mainCardFeeValue,
        subCardFeeValue,
        addressFeeValue,
      );
      const VATFee = this.calculateVATFee(totalFee);
      const revenueFee = this.calculateRevenueFee(totalFee, VATFee);

      return {
        totalFee,
        VATFee,
        revenueFee,
      };
    } else {
      return {
        totalFee: 0,
        VATFee: 0,
        revenueFee: 0,
      };
    }
  }

  calculateTotalFee(
    mainCardFeeValue: number,
    subCardFeeValue: number,
    addressFeeValue: number,
  ) {
    return mainCardFeeValue + subCardFeeValue + addressFeeValue;
  }

  calculateVATFee(totalFee: number) {
    return totalFee * (this.VAT / 100);
  }

  calculateRevenueFee(totalFee: number, VATFee: number) {
    return totalFee + VATFee;
  }

  // Format data
  formatData(data: any) {
    const obj: Record<string, string | number> = {};

    for (const key in data) {
      if (Array.isArray(data[key])) {
        obj[key] = data[key].map((item: any) => item.label).join(' ');
      } else if (
        typeof data[key] === 'string' ||
        typeof data[key] === 'number'
      ) {
        obj[key] = data[key];
      } else if (data[key] && typeof data[key] === 'object') {
        obj[key] = data[key].label;
      }
    }

    return obj;
  }
}
