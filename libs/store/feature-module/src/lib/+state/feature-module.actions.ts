import { createAction, props } from '@ngrx/store';
import { FeatureModuleEntity } from './feature-module.models';

export const initFeatureModule = createAction('[FeatureModule Page] Init');
export const loadFeatureModuleSuccess = createAction(
  '[FeatureModule/API] Load FeatureModule Success',
  props<{ featureModule: FeatureModuleEntity[] }>(),
);

export const loadFeatureModuleFailure = createAction(
  '[FeatureModule/API] Load FeatureModule Failure',
  props<{ error: any }>(),
);
