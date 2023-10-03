import { modes } from '../consts';
import { paths } from '../libs';
import { getDevServerConfig } from './webpack.dev-server.config';
import HtmlWebpackPlugin from 'html-webpack-plugin';
// import ForkTsCheckerPlugin from 'fork-ts-checker-webpack-plugin';
import type { Env, WebpackConfig } from '../types';

process.env.NODE_ENV = modes.dev;

export const getDevConfig = (env: Env): WebpackConfig => ({
  /* ------------------------------------ Mode ----------------------------------- */
  mode: modes.dev,

  /* ---------------------------------- DevTool ---------------------------------- */
  devtool: 'cheap-module-source-map',

  /* ---------------------------------- DevServer -------------------------------- */
  devServer: getDevServerConfig(env.PORT),

  /* ----------------------------------- Plugins --------------------------------- */
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: paths.htmlTemplate,
      inject: true,
      title: modes.dev,
    }),

    // ToDo: enable type checking after fix typescript errors of codebase
    // new ForkTsCheckerPlugin({
    //   async: true,
    //   devServer: true,
    //   formatter: 'codeframe',
    //   typescript: {
    //     memoryLimit: 4096,
    //   },
    // }),
  ],

  /* ------------------------------------ Cache ----------------------------------- */
  cache: {
    type: 'filesystem',
    compression: 'gzip',
    cacheDirectory: paths.resolveFromRootDir('.temp_cache'),
  },

  /* --------------------------- Performance Notifies ----------------------------- */
  // ToDo: configure optimization notification rules and perform analysis using webpack-bundle-analyzer
  // performance: {
  //   maxAssetSize: 100000,
  // },

  /* ---------------------------------- Logging ----------------------------------- */
  infrastructureLogging: {
    level: 'log',
    colors: true,
  },

  /* ---------------------------------- Statistic --------------------------------- */
  stats: 'minimal',
});
