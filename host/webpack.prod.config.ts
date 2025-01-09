import { withModuleFederation } from '@nx/angular/module-federation';
import { composePlugins } from '@nx/webpack';
import { DefinePlugin } from 'webpack';
import config from './module-federation.config';

function getClientEnvironment() {
  // Grab NX_* environment variables and prepare them to be injected
  // into the application via DefinePlugin in webpack configuration.
  const NX_APP = /^NX_/i;

  const raw = Object.keys(process.env)
    .filter((key) => NX_APP.test(key))
    .reduce((env, key) => {
      env[key] = process.env[key];
      return env;
    }, {});

  // Stringify all values so we can feed into webpack DefinePlugin
  return {
    'process.env': Object.keys(raw).reduce((env, key) => {
      env[key] = JSON.stringify(raw[key]);
      return env;
    }, {}),
  };
}

export default composePlugins(
  withModuleFederation({
    ...config,
    remotes: [
      ['admin', '/admin'],
      ['remote-mfe', '/mfe'],
    ],
  }),
  (config) => {
    config.plugins?.push(new DefinePlugin(getClientEnvironment()));
    return config;
  }
);
