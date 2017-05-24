import fs from 'fs';
import { join as pathJoin } from 'path';

const typeDefs = fs.readFileSync(
  pathJoin(__dirname, 'typeDefs.graphql'),
  'utf8',
);
export default typeDefs;
