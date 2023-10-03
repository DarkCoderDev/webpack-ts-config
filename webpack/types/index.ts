import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';
import type { Configuration } from 'webpack';

export type WebpackConfig = Configuration & DevServerConfiguration;

export type Mode = 'development' | 'production';

export type BuildOptions = {
  isDev: boolean,
}

export * from './env';
