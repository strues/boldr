import fs from 'fs';
import path from 'path';
import { graphql } from 'graphql';
import { introspectionQuery, printSchema } from 'graphql/utilities';
import RootSchema from '../../server/data/rootSchema';
// Save JSON of full schema introspection for Babel Relay Plugin to use
(async () => {
  const result = await (graphql(RootSchema, introspectionQuery));
  if (result.errors) {
    console.error(
      'ERROR introspecting schema: ',
      JSON.stringify(result.errors, null, 2)
    );
  } else {
    fs.writeFileSync(path.join(__dirname, '../graphqlSchema.json'),
      JSON.stringify(result, null, 2)
    );
  }
})();

// Save user readable type system shorthand of schema
fs.writeFileSync(
  path.join(__dirname, '../graphqlSchema-readable.json'),
  printSchema(RootSchema)
);
