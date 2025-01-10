import { inject, Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

type StepKey = 'step-2' | 'step-4-card-form';

@Injectable({
  providedIn: 'root',
})
export class IssuanceFormServices {
  private fb = inject(FormBuilder);
  private VAT = 10;
  private stepData = new BehaviorSubject<Record<StepKey, any>>({
    'step-2': null,
    'step-4-card-form': 'Thẻ chính',
  });
  stepData$ = this.stepData.asObservable();

  formMainCard!: FormGroup;
  formSubCard!: FormGroup;
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
}
