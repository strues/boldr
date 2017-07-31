declare type WebpackConfig = {
  name: string,
  target: string,
  devtool: string,
  context: string,
  bail: boolean,
  externals: Array<string>,
  node: Object,
  performance: Object,
  entry:
    | string
    | Array<string>
    | {
        [key: string]: string | Array<string>,
      },
  output: {
    filename: string,
    libraryTarget: string,
    path: string,
    publicPath: string,
  },
  resolve: {
    extensions: Array<string>,
    mainFields: Array<string>,
    modules: Array<string>,
  },
  resolveLoader: {
    modules: Array<string>,
  },
  module: {
    strictExportPresence: boolean,
    rules: Array<{
      enforce?: string,
      test:
        | string
        | RegExp
        | ((path: string) => boolean | Array<string | RegExp | (() => boolean)>),
      use?: Array<
        | string
        | {
          loader: string,
          options?: { [key: string]: any },
        },
      >,
      include?: string | Array<string> | RegExp | ((path: string) => boolean),
    }>,
  },
  plugins: Array<any>,
};

declare type Configuration = {
  client: WebpackConfig,
  server: WebpackConfig,
};

declare type ConfigurationOptions = {
  target?: string,
  env?: string,
  verbose?: boolean,
  useSourceMaps?: boolean,
  minifier?: string,
};
