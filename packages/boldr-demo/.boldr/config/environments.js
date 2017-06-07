export default {
  development: config => ({
    compilerPublicPath: `http://${config.serverHost}:${config.serverPort}/`,
  }),

  production: config => ({
    compilerPublicPath: '/',
    compilerFailOnWarning: false,
    compilerHashType: 'chunkhash',
    compilerDevtool: false,
    compilerStats: {
      chunks: true,
      chunkModules: true,
      colors: true,
    },
    useCompiledServer: true,
    cssInline: false,
  }),
};
