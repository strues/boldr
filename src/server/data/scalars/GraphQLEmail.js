import { GraphQLScalarType } from 'graphql';
import { GraphQLError } from 'graphql/error';
import { Kind } from 'graphql/language';

const emailRegex = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;

const GraphQLEmail = new GraphQLScalarType({
  name: 'Email',
  description: 'The Email scalar type represents E-Mail addresses compliant to RFC 822.',
  serialize: value => value.toLowerCase(),
  parseValue: value => value.toLowerCase(),
  parseLiteral: ast => {
    if (ast.kind !== Kind.STRING) {
      throw new GraphQLError(
        `Query error: Email is not a string, it is a: ${ast.kind}`,
        [ast],
      );
    }
    if (!emailRegex.test(ast.value)) {
      throw new GraphQLError('Query error: Not a valid Email', [ast]);
    }
    if (ast.value.length < 4) {
      throw new GraphQLError(
        'Query error: Email must have a minimum length of 4.',
        [ast],
      );
    }
    if (ast.value.length > 300) {
      throw new GraphQLError('Query error: Email is too long.', [ast]);
    }
    return ast.value.toLowerCase();
  },
});

export default GraphQLEmail;
