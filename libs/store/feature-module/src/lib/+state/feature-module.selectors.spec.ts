import { FeatureModuleEntity } from './feature-module.models';
import {
  featureModuleAdapter,
  FeatureModulePartialState,
  initialFeatureModuleState,
} from './feature-module.reducer';
import * as FeatureModuleSelectors from './feature-module.selectors';

describe('FeatureModule Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getFeatureModuleId = (it: FeatureModuleEntity) => it.id;
  const createFeatureModuleEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as FeatureModuleEntity);

  let state: FeatureModulePartialState;

  beforeEach(() => {
    state = {
      featureModule: featureModuleAdapter.setAll(
        [
          createFeatureModuleEntity('PRODUCT-AAA'),
          createFeatureModuleEntity('PRODUCT-BBB'),
          createFeatureModuleEntity('PRODUCT-CCC'),
        ],
        {
          ...initialFeatureModuleState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        },
      ),
    };
  });

  describe('FeatureModule Selectors', () => {
    it('selectAllFeatureModule() should return the list of FeatureModule', () => {
      const results = FeatureModuleSelectors.selectAllFeatureModule(state);
      const selId = getFeatureModuleId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('selectEntity() should return the selected Entity', () => {
      const result = FeatureModuleSelectors.selectEntity(
        state,
      ) as FeatureModuleEntity;
      const selId = getFeatureModuleId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it('selectFeatureModuleLoaded() should return the current "loaded" status', () => {
      const result = FeatureModuleSelectors.selectFeatureModuleLoaded(state);

      expect(result).toBe(true);
    });

    it('selectFeatureModuleError() should return the current "error" state', () => {
      const result = FeatureModuleSelectors.selectFeatureModuleError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
