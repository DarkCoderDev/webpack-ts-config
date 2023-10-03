import webpack from 'webpack';
import { modes } from '../consts';
import { paths } from '../libs';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import type { Env } from '../types';

process.env.NODE_ENV = modes.prod;

export const getProdConfig = (env: Env): webpack.Configuration => ({
  /* ---------------------------------- Mode ------------------------------------ */
  mode: modes.prod,

  /* ---------------------------------- DevTool --------------------------------- */
  devtool: false,

  /* ---------------------------------- Fall out on first error ----------------- */
  bail: true,

  /* ---------------------------------- Plugins --------------------------------- */
  plugins: [
    new HtmlWebpackPlugin(
      {
        filename: 'index.html',
        template: paths.htmlTemplate,
        inject: true,
        title: modes.dev,
        minify: {
          collapseWhitespace: true,
          removeComments: true,
          removeRedundantAttributes: true,
          removeScriptTypeAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeStyleLinkTypeAttributes: true,
          keepClosingSlash: true,
          minifyJS: true,
          minifyCSS: true,
          minifyURLs: true,
        },
      }),

    new MiniCssExtractPlugin({
      filename: 'assets/css/[name].[contenthash:6].css',
      chunkFilename: 'assets/css/[contenthash:6].chunk.css',
      ignoreOrder: true,
    }),
  ],

  /* ---------------------------------- Statistic --------------------------------- */
  stats: {
    preset: 'normal',
    colors: true,
    assets: true,
    modulesSpace: 5,
    chunkModulesSpace: 10,
    assetsSort: '!size',
    cachedAssets: true,
    chunkGroups: true,
    groupAssetsByEmitStatus: false,
    groupAssetsByChunk: false,
    assetsSpace: 175,
    performance: true,
    entrypoints: false,
    modules: false,
    moduleTrace: true,
    errorDetails: true,
  },
});
