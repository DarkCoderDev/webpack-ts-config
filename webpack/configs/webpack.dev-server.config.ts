import WebpackDevServer from 'webpack-dev-server';
import { paths } from '../libs';

export const getDevServerConfig = (port = 3000): WebpackDevServer.Configuration => ({
  port,
  compress: true,
  hot: true,
  open: true,
  historyApiFallback: true,
  client: {
    overlay: {
      errors: true,
      warnings: false,
      runtimeErrors: true,
    },
    progress: true,
    reconnect: 5,
    logging: 'info',
  },
  static: {
    directory: paths.publicDir,
    watch: true,
  },
});

