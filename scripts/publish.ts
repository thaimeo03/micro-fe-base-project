import { resolve } from 'node:path';

import { getValueByFlag } from './shared/argv.utils';
import { infoLog, successLog } from './shared/colored-log';
import { execute } from './shared/execute';

const isDryRun =
    getValueByFlag<'false' | 'true' | 'undefined'>('--dry-run', 'false') === 'true';
const path = getValueByFlag<string>('--path', '');

(async function main(): Promise<void> {
    const packageJson = await import(resolve(path, 'package.json'));
    const version = getValueByFlag<string>('--customVersion', packageJson.version);

    infoLog(`name: ${packageJson.name}`);
    infoLog(`version: ${version}`);

    const dry = isDryRun ? '--dry-run' : '';

    const tgzFilename = `${packageJson.name}-${version}.tgz`;

    execute(
        `npm pack ${path} ${dry} --filename=${tgzFilename} --pack-destination=./build/Release`,
    );

    successLog(`Package packed into ${tgzFilename}`);
})();
