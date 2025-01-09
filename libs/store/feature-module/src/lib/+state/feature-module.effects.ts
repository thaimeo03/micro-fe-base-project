import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, catchError, of } from 'rxjs';
import * as FeatureModuleActions from './feature-module.actions';
import * as FeatureModuleFeature from './feature-module.reducer';

@Injectable()
export class FeatureModuleEffects {
  private actions$ = inject(Actions);

  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FeatureModuleActions.initFeatureModule),
      switchMap(() =>
        of(
          FeatureModuleActions.loadFeatureModuleSuccess({ featureModule: [] }),
        ),
      ),
      catchError((error) => {
        console.error('Error', error);
        return of(FeatureModuleActions.loadFeatureModuleFailure({ error }));
      }),
    ),
  );
}
