import {nodeJS} from './index';

const execWorkingDir = nodeJS.fs.realpathSync(process.cwd());

const resolveFromRootDir = (relativePath: string) =>
    nodeJS.path.resolve?.(execWorkingDir, relativePath);

export const paths = {
    resolveFromRootDir,
    entry: resolveFromRootDir('src/entry.tsx'),
    publicDir: resolveFromRootDir('public') || '',
    htmlTemplate: resolveFromRootDir('public/index.html'),
    output: resolveFromRootDir('build'),
    tsConfig: resolveFromRootDir('tsconfig.json'),
    nodeModules: resolveFromRootDir('node_modules'),
};
