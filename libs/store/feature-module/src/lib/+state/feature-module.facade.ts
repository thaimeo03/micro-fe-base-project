import { Injectable, inject } from '@angular/core';
import { Store, select } from '@ngrx/store';

import * as FeatureModuleActions from './feature-module.actions';
import * as FeatureModuleSelectors from './feature-module.selectors';

@Injectable()
export class FeatureModuleFacade {
  private readonly store = inject(Store);

  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  loaded$ = this.store.pipe(
    select(FeatureModuleSelectors.selectFeatureModuleLoaded),
  );
  allFeatureModule$ = this.store.pipe(
    select(FeatureModuleSelectors.selectAllFeatureModule),
  );
  selectedFeatureModule$ = this.store.pipe(
    select(FeatureModuleSelectors.selectEntity),
  );
  selectedTransactionList$ = this.store.pipe(
    select(FeatureModuleSelectors.selectTransactionList),
  );

  /**
   * Use the initialization action to perform one
   * or more tasks in your Effects.
   */
  init() {
    this.store.dispatch(FeatureModuleActions.initFeatureModule());
  }
  setData() {
    this.store.dispatch(
      FeatureModuleActions.loadFeatureModuleSuccess({
        featureModule: [
          { id: new Date().toTimeString(), name: new Date().toTimeString() },
        ],
      }),
    );
  }
  setData2() {
    this.store.dispatch(
      FeatureModuleActions.loadFeatureModuleSuccess({
        featureModule: [{ id: 2, name: '2' }],
      }),
    );
  }

  setTransactionData(data: any) {
    this.store.dispatch(
      FeatureModuleActions.transactionList({
        transactionList: data,
      }),
    );
  }
}
