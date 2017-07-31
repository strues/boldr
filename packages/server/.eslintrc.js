module.exports = {
  extends: ['boldr', 'boldr/flowtype', 'boldr/promise', 'boldr/import'],
  // plugins: ['graphql'],
  rules: {
    'jsx-a11y/href-no-hash': 0,
    // 'graphql/template-strings': [
    //   'error',
    //   {
    //     // Import default settings for your GraphQL client. Supported values:
    //     // 'apollo', 'relay', 'lokka', 'literal'
    //     env: 'apollo',
    //
    //     // Import your schema JSON here
    //     schemaJson: require('./internal/graphqlSchema.json'),
    //
    //     // OR provide absolute path to your schema JSON
    //     // schemaJsonFilepath: path.resolve(__dirname, './schema.json'),
    //
    //     // OR provide the schema in the Schema Language format
    //     // schemaString: printSchema(schema),
    //
    //     // tagName is gql by default
    //   },
    // ],
  },
};
