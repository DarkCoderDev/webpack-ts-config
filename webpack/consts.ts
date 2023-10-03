import type { Mode } from './types';

export const regExps = {
  ts: /\.[jt]sx?$/,
  style: /\.(c|sa|sc)ss$/i,
  module: /\.module\./i,
};

export const modes: Record<string, Mode> = {
  dev: 'development',
  prod: 'production',
};
