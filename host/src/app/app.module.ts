import { HttpClientModule } from '@angular/common/http';
import { NgModule, importProvidersFrom, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { provideQueryDevTools } from '@bidv-api/angular-devtools';
import { KeycloakAngularModule, importBidvAuthProviders } from '@bidv-auth/cdk';
import { BidvAuthModule } from '@bidv-auth/router';
import { BIDV_SANITIZER, BidvRootModule } from '@bidv-ui/core';
import { EffectsModule, provideEffects } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule, provideStore } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { NgDompurifySanitizer } from '@tinkoff/ng-dompurify';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    KeycloakAngularModule,
    RouterModule.forRoot(appRoutes, {
      initialNavigation: 'enabledNonBlocking',
    }),
    StoreModule.forRoot(
      {},
      {
        metaReducers: [],
        runtimeChecks: {
          strictActionImmutability: true,
          strictStateImmutability: true,
        },
      },
    ),
    EffectsModule.forRoot([]),
    StoreRouterConnectingModule.forRoot(),
    StoreDevtoolsModule.instrument({ logOnly: !isDevMode() }),
    HttpClientModule,
    BidvAuthModule,
    BidvRootModule,
  ],
  providers: [
    provideStore(),
    provideEffects([]),
    isDevMode() ? provideQueryDevTools() : [],
    importProvidersFrom(BidvRootModule, BidvAuthModule),
    { provide: 'NX_DEVELOP', useValue: process.env['NX_DEVELOP'] == 'true' },
    {
      provide: 'NX_DEVELOP_KEYCLOAK',
      useValue: process.env['NX_DEVELOP_KEYCLOAK'] == 'true',
    },
    { provide: 'BIDV_USE_LANG', useValue: true },
    importBidvAuthProviders({
      url:
        process.env['NX_ENDPOINT_URL'] ??
        'http://kong-api-smart-teller.apps.ttptnhs.ldapudtest.com/',
      lang: {
        config: {
          availableLangs: [
            { id: 'vi', label: 'VIE' },
            { id: 'en', label: 'ENG' },
            { id: 'ko', label: 'KOR' },
          ],
          fallbackLang: 'vi',
          defaultLang: 'vi',
          reRenderOnLangChange: true,
          prodMode: !isDevMode(),
        },
      }, // or false,
      keycloack: {
        clientId: process.env['NX_KEYCLOAK_CLIENID'] ?? 'bidv-client',
        url:
          process.env['NX_KEYCLOAK_URL'] ??
          'http://keycloak-smart-teller.apps.ttptnhs.ldapudtest.com/',
        realm: process.env['NX_KEYCLOAK_REALM'] ?? 'bidv-realm',
      },
      auth: {
        tokenForAppApi: process.env['NX_ESB_APP_TOKEN'] || '',
        tokenForUserApi: process.env['NX_ESB_USER_TOKEN'] || '',
        getAppByUserUrl: process.env['NX_GET_APP_BY_USER'] || undefined,
        getFunctionByUserUrl:
          process.env['NX_GET_FUNCTION_BY_USER'] || undefined,
      },
    }
    ),
    {
      provide: BIDV_SANITIZER,
      useClass: NgDompurifySanitizer,
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
