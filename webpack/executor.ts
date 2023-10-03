import { merge } from 'webpack-merge';
import { modes } from './consts';
import { getBaseConfig, getDevConfig, getProdConfig } from './configs';
import type { Env, WebpackConfig } from './types';

const configs = {
  [modes.dev]: getDevConfig,
  [modes.prod]: getProdConfig,
};

export default function runExecutor(env: Env): WebpackConfig {
  const isDev = env.mode === modes.dev;

  return merge(
    getBaseConfig({ isDev }), configs[env.mode](env),
  );
}
