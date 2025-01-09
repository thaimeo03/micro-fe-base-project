import { Action } from '@ngrx/store';

import * as FeatureModuleActions from './feature-module.actions';
import { FeatureModuleEntity } from './feature-module.models';
import {
  FeatureModuleState,
  initialFeatureModuleState,
  featureModuleReducer,
} from './feature-module.reducer';

describe('FeatureModule Reducer', () => {
  const createFeatureModuleEntity = (
    id: string,
    name = '',
  ): FeatureModuleEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('valid FeatureModule actions', () => {
    it('loadFeatureModuleSuccess should return the list of known FeatureModule', () => {
      const featureModule = [
        createFeatureModuleEntity('PRODUCT-AAA'),
        createFeatureModuleEntity('PRODUCT-zzz'),
      ];
      const action = FeatureModuleActions.loadFeatureModuleSuccess({
        featureModule,
      });

      const result: FeatureModuleState = featureModuleReducer(
        initialFeatureModuleState,
        action,
      );

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = featureModuleReducer(initialFeatureModuleState, action);

      expect(result).toBe(initialFeatureModuleState);
    });
  });
});
