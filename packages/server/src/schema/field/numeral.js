/* eslint-disable no-extra-boolean-cast, no-implicit-coercion */
import { GraphQLString } from 'graphql';
import inflect from 'i';
import numeral from 'numeral';
import GraphQLFormattedNumber from '../scalars/GraphQLFormattedNumber';

const { pluralize, singularize } = inflect();

export default fn => ({
  type: GraphQLFormattedNumber,
  args: {
    format: {
      type: GraphQLString,
      description: "Returns a `String` when format is specified. e.g.`'0,0.0000''`",
    },
    label: {
      type: GraphQLString,
    },
  },
  resolve: (obj, { format, label }, { fieldName }) => {
    let value = fn ? fn(obj) : obj[fieldName];

    if (!value) {
      value = 0;
    }

    const count = value;

    if (!!format) {
      value = numeral(value).format(format);
    }

    if (!!label) {
      value = `${value} ${count === 1 ? singularize(label) : pluralize(label)}`;
    }

    return value;
  },
});
