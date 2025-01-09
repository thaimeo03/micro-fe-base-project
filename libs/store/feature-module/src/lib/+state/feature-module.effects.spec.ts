import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import * as FeatureModuleActions from './feature-module.actions';
import { FeatureModuleEffects } from './feature-module.effects';

describe('FeatureModuleEffects', () => {
  let actions: Observable<Action>;
  let effects: FeatureModuleEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        FeatureModuleEffects,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(FeatureModuleEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: FeatureModuleActions.initFeatureModule() });

      const expected = hot('-a-|', {
        a: FeatureModuleActions.loadFeatureModuleSuccess({ featureModule: [] }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
