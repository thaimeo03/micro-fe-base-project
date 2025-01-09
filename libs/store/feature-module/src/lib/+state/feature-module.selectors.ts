import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  FEATURE_MODULE_FEATURE_KEY,
  FeatureModuleState,
  featureModuleAdapter,
} from './feature-module.reducer';

// Lookup the 'FeatureModule' feature state managed by NgRx
export const selectFeatureModuleState =
  createFeatureSelector<FeatureModuleState>(FEATURE_MODULE_FEATURE_KEY);

const { selectAll, selectEntities } = featureModuleAdapter.getSelectors();

export const selectFeatureModuleLoaded = createSelector(
  selectFeatureModuleState,
  (state: FeatureModuleState) => state.loaded,
);

export const selectFeatureModuleError = createSelector(
  selectFeatureModuleState,
  (state: FeatureModuleState) => state.error,
);

export const selectAllFeatureModule = createSelector(
  selectFeatureModuleState,
  (state: FeatureModuleState) => selectAll(state),
);

export const selectFeatureModuleEntities = createSelector(
  selectFeatureModuleState,
  (state: FeatureModuleState) => selectEntities(state),
);

export const selectSelectedId = createSelector(
  selectFeatureModuleState,
  (state: FeatureModuleState) => state.selectedId,
);

export const selectEntity = createSelector(
  selectFeatureModuleEntities,
  selectSelectedId,
  (entities, selectedId) => (selectedId ? entities[selectedId] : undefined),
);
