const fsAll = require('fs');

import {
  infoLog
} from './shared/colored-log';
const fs = fsAll.promises;
(async function main(): Promise<void> {
  infoLog('xoa file cu');
  if (fsAll.existsSync('./build/host'))   await fs.rm('./build/host', { recursive: true, force: true });
  await fs.mkdir('./build/host');
  if (!fsAll.existsSync('./dist/apps')) await fs.mkdir('./dist/apps');

  infoLog('copy host');
  await fs.cp('./dist/host', './build/host', {
    recursive: true,
  });
  infoLog('copy remote');
  await fs.cp('./dist/apps', './build/host', { recursive: true });
  infoLog('copy done');
})();
