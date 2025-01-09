import { ModuleFederationConfig } from '@nx/webpack';

const config: ModuleFederationConfig = {
  name: 'card-issuance',
  exposes: {
    './Routes': 'apps/card-issuance/src/app/remote-entry/entry.routes.ts',
  },
};

export default config;
