import { GraphQLScalarType } from 'graphql';
import { GraphQLError } from 'graphql/error';
import { Kind } from 'graphql/language';

const uuidRegex = /^[0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{12}$/i;

const GraphQLUUID = new GraphQLScalarType({
  name: 'UUID',
  description: 'The UUID scalar type represents a UUID.',
  serialize: value => {
    return value;
  },
  parseValue: value => {
    const ast = {
      kind: Kind.STRING,
      value,
    };
    return parser(ast);
  },
  parseLiteral: ast => {
    if (ast.kind !== Kind.STRING) {
      throw new GraphQLError(
        `Query error: UUID is not a string, it is a: ${ast.kind}`,
        [ast],
      );
    }
    if (!uuidRegex.test(ast.value)) {
      throw new GraphQLError('Query error: Not a valid UUID', [ast]);
    }
    if (ast.value.length !== 36) {
      throw new GraphQLError('Query error: UUID must have a length of 36.', [
        ast,
      ]);
    }

    return ast.value.toLowerCase();
  },
});

export default GraphQLUUID;
