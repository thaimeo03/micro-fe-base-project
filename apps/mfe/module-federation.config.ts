import { ModuleFederationConfig } from '@nx/webpack';
import { nxBidvRemote } from '@nx/bidv';
const config: ModuleFederationConfig = {
  name: 'remote-mfe',
  exposes: {
    './Routes': 'apps/mfe/src/app/remote-entry/entry.routes.ts',
  },
};
export default nxBidvRemote(config);
