import { compose, graphql } from 'react-apollo';
import MEDIA_BY_ID_QUERY from '../gql/mediaById.graphql';
import EDIT_MEDIA_MUTATION from '../gql/editMedia.graphql';
import MediaManager from './MediaManager';

export default compose(
  graphql(MEDIA_BY_ID_QUERY, {
    options: props => ({
      variables: {
        id: props.match.params.id,
      },
    }),
  }),
  graphql(EDIT_MEDIA_MUTATION, {
    props: ({ mutate }) => ({
      editMediaFile: (mediaId, values) =>
        mutate({
          variables: {
            id: mediaId,
            input: {
              name: values.name,
              fileDescription: values.fileDescription,
            },
          },
        }),
    }),
  }),
)(MediaManager);
