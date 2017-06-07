import defaultHeadAttributes from './headAttributes';

const clientConfig = {
  // Custom store config
  customEnhancers: [],
  defaultHeadAttributes,
  // custom middleware for store
  middlewares: {
    byFolder: false,
    collection: [],

    logger: {
      enabled: false,
      options: {},
    },
  },
};

export default clientConfig;
