import {
  GraphQLScalarType,
  GraphQLInt,
  GraphQLFloat,
  GraphQLBoolean,
  GraphQLString,
} from 'graphql';

import { Kind } from 'graphql/language';

const astToJson = {
  [Kind.INT](ast) {
    return GraphQLInt.parseLiteral(ast);
  },
  [Kind.FLOAT](ast) {
    return GraphQLFloat.parseLiteral(ast);
  },
  [Kind.BOOLEAN](ast) {
    return GraphQLBoolean.parseLiteral(ast);
  },
  [Kind.STRING](ast) {
    return GraphQLString.parseLiteral(ast);
  },
  [Kind.ENUM](ast) {
    return String(ast.value);
  },
  [Kind.LIST](ast) {
    return ast.values.map(astItem => {
      return JSONType.parseLiteral(astItem);
    });
  },
  [Kind.OBJECT](ast) {
    const obj = {};
    ast.fields.forEach(field => {
      obj[field.name.value] = JSONType.parseLiteral(field.value);
    });
    return obj;
  },
};

export default new GraphQLScalarType({
  name: 'JSON',
  description: 'The `JSON` scalar type represents JSON values as specified by ' +
    '[ECMA-404](http://www.ecma-international.org/' +
    'publications/files/ECMA-ST/ECMA-404.pdf).',
  serialize: value => value,
  parseValue: value => value,
  parseLiteral: ast => {
    const parser = astToJson[ast.kind];
    return parser ? parser.call(this, ast) : null;
  },
});
