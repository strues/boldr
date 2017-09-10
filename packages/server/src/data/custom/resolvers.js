import {
  GraphQLEmail,
  GraphQLURL,
  GraphQLDateTime,
  GraphQLUUID,
  GraphQLJSON,
} from '../../schema/scalars';

export default pubsub => ({
  UUID: GraphQLUUID,
  Email: GraphQLEmail,
  DateTime: GraphQLDateTime,
  JSON: GraphQLJSON,
  URL: GraphQLURL,
});
