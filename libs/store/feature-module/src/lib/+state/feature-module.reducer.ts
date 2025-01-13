import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as FeatureModuleActions from './feature-module.actions';
import { FeatureModuleEntity } from './feature-module.models';

export const FEATURE_MODULE_FEATURE_KEY = 'featureModule';

export interface FeatureModuleState extends EntityState<FeatureModuleEntity> {
  selectedId?: string | number; // which FeatureModule record has been selected
  loaded: boolean; // has the FeatureModule list been loaded
  error?: string | null; // last known error (if any)
  transactionList?: any;
}

export interface FeatureModulePartialState {
  readonly [FEATURE_MODULE_FEATURE_KEY]: FeatureModuleState;
}

export const featureModuleAdapter: EntityAdapter<FeatureModuleEntity> =
  createEntityAdapter<FeatureModuleEntity>();

export const initialFeatureModuleState: FeatureModuleState =
  featureModuleAdapter.getInitialState({
    // set initial required properties
    loaded: false,
  });

const reducer = createReducer(
  initialFeatureModuleState,
  on(FeatureModuleActions.initFeatureModule, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(
    FeatureModuleActions.loadFeatureModuleSuccess,
    (state, { featureModule }) =>
      featureModuleAdapter.setAll(featureModule, { ...state, loaded: true }),
  ),
  on(FeatureModuleActions.loadFeatureModuleFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(FeatureModuleActions.transactionList, (state, { transactionList }) => ({
    ...state,
    transactionList,
  })),
);

export function featureModuleReducer(
  state: FeatureModuleState | undefined,
  action: Action,
) {
  return reducer(state, action);
}
