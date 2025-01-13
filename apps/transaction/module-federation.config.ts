import { ModuleFederationConfig } from '@nx/webpack';

const config: ModuleFederationConfig = {
  name: 'transaction',
  exposes: {
    './Routes': 'apps/transaction/src/app/remote-entry/entry.routes.ts',
  },
};
export default config;
