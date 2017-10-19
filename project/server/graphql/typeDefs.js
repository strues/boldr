import path from 'path';
import { readFileSync } from 'fs-extra';

const typeDefs = readFileSync(path.join(__dirname, 'typedefs.graphql'), 'utf8');

export default typeDefs;
