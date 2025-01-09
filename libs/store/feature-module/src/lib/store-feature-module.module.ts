import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromFeatureModule from './+state/feature-module.reducer';
import { FeatureModuleEffects } from './+state/feature-module.effects';
import { FeatureModuleFacade } from './+state/feature-module.facade';

@NgModule({
  imports: [
    StoreModule.forFeature(
      fromFeatureModule.FEATURE_MODULE_FEATURE_KEY,
      fromFeatureModule.featureModuleReducer,
    ),
    EffectsModule.forFeature([FeatureModuleEffects]),
  ],
  providers: [FeatureModuleFacade],
})
export class StoreFeatureModuleModule {}
