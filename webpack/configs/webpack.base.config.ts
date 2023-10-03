import { regExps } from '../consts';
import { paths } from '../libs';
import webpack from 'webpack';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import TsConfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import { EsbuildPlugin } from 'esbuild-loader';
import type { BuildOptions } from '../types';

export const getBaseConfig = (options: BuildOptions): webpack.Configuration => ({
  /* ------------------------------ CompileTarget ----------------------------- */
  target: ['browserslist'],

  /* ---------------------------------- Entry --------------------------------- */
  entry: paths.entry,

  /* ---------------------------------- Output --------------------------------- */
  output: {
    path: paths.output,
    filename: 'assets/js/[name].[contenthash].js',
    chunkFilename: 'assets/js/[name].[contenthash].chunk.js',
    publicPath: 'auto',
    scriptType: 'text/javascript',
    clean: true,
  },

  /* ---------------------------------- Resolve --------------------------------- */
  resolve: {
    plugins: [
      new TsConfigPathsPlugin({
        configFile: paths.tsConfig,
      }),
    ],
    extensions: ['.js', '.ts', '.tsx', '.sass', '.scss'],
  },

  /* ---------------------------------- Loaders --------------------------------- */
  module: {
    rules: [
      /* -| loader: TypeScript |- */
      {
        test: regExps.ts,
        use: [
          {
            loader: 'esbuild-loader',
            options: {
              target: 'es6',
            },
          },
        ],
      },

      /* -| loader: CSS |- */
      {
        test: regExps.style,
        sideEffects: true,
        use: [
          options.isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: {
                auto: regExps.module,
                localIdentName: '[local]_[hash:base64:5]',
                exportLocalsConvention: 'camelCase',
              },
              sourceMap: options.isDev,
            },
          },
          {
            loader: 'group-css-media-queries-loader',
          }
        ],
      },

      /* ---------------------------------- Assets --------------------------------- */
      /* -| vendor img |- */
      {
        test: /\.(gif|svg)$/,
        type: 'asset/inline',
      },

      /* -| local img |- */
      {
        test: /\.(bmp|jpe?g|png|gif|svg)$/,
        dependency: { not: ['url'] },
        type: 'asset',
        generator: {
          filename: 'assets/images/[name].[contenthash:6].[ext][query]',
        },
      },

      /* -| fonts |- */
      {
        test: /\.(woff|woff2|otf|ttf|eot)$/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/fonts/[name].[contenthash:6].[ext]',
        },
      },

      /* -| media |- */
      {
        test: /\.(pdf|xlsx?|docx?|epf)$/,
        dependency: { not: ['url'] },
        type: 'asset/resource',
        generator: {
          filename: 'assets/media/[name].[contenthash:6].[ext]',
        },
      },
    ],
  },

  /* ---------------------------------- Plugins --------------------------------- */
  plugins: [
    new webpack.ProgressPlugin({
      profile: options.isDev,
    }),

    new CopyWebpackPlugin({
      patterns: [
        {
          from: paths.publicDir,
          filter: resourcePath => !resourcePath.includes('index.html'),
          to: './',
        },
      ],
    }),
  ],

  /* ---------------------------------- Optimization --------------------------------- */
  optimization: {
    minimize: !options.isDev,
    minimizer: [
      '...',
      new EsbuildPlugin({
        target: 'es6',
      }),

      // ToDo: add ImageMinimizerPlugin

    ],
    runtimeChunk: 'single',
    chunkIds: 'natural',
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          enforce: true,
          filename: 'assets/js/vendors.[contenthash:6].js',
        },
      },
    },
  },
});
