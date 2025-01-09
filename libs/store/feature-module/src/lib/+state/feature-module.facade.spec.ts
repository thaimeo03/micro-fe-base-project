import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';
import { readFirst } from '@nx/angular/testing';

import * as FeatureModuleActions from './feature-module.actions';
import { FeatureModuleEffects } from './feature-module.effects';
import { FeatureModuleFacade } from './feature-module.facade';
import { FeatureModuleEntity } from './feature-module.models';
import {
  FEATURE_MODULE_FEATURE_KEY,
  FeatureModuleState,
  initialFeatureModuleState,
  featureModuleReducer,
} from './feature-module.reducer';
import * as FeatureModuleSelectors from './feature-module.selectors';

interface TestSchema {
  featureModule: FeatureModuleState;
}

describe('FeatureModuleFacade', () => {
  let facade: FeatureModuleFacade;
  let store: Store<TestSchema>;
  const createFeatureModuleEntity = (
    id: string,
    name = '',
  ): FeatureModuleEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(
            FEATURE_MODULE_FEATURE_KEY,
            featureModuleReducer,
          ),
          EffectsModule.forFeature([FeatureModuleEffects]),
        ],
        providers: [FeatureModuleFacade],
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [
          StoreModule.forRoot({}),
          EffectsModule.forRoot([]),
          CustomFeatureModule,
        ],
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.inject(Store);
      facade = TestBed.inject(FeatureModuleFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async () => {
      let list = await readFirst(facade.allFeatureModule$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      facade.init();

      list = await readFirst(facade.allFeatureModule$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(true);
    });

    /**
     * Use `loadFeatureModuleSuccess` to manually update list
     */
    it('allFeatureModule$ should return the loaded list; and loaded flag == true', async () => {
      let list = await readFirst(facade.allFeatureModule$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      store.dispatch(
        FeatureModuleActions.loadFeatureModuleSuccess({
          featureModule: [
            createFeatureModuleEntity('AAA'),
            createFeatureModuleEntity('BBB'),
          ],
        }),
      );

      list = await readFirst(facade.allFeatureModule$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(2);
      expect(isLoaded).toBe(true);
    });
  });
});
