/* @flow */
import React from 'react';
import { graphql, gql } from 'react-apollo';

type Props = {
  mutate: Function,
  handleSetMedia: Function,
};

const UploadArticleImage = ({ mutate, handleSetMedia }: Props) => {
  const handleChange = ({ target }) => {
    if (target.validity.valid) {
      mutate({
        variables: {
          file: target.files[0],
        },
      })
        .then(({ data }) => handleSetMedia(data))
        .catch(err => console.log(err));
    }
  };

  return <input type="file" required onChange={handleChange} />;
};

export default graphql(gql`
  mutation uploadMedia($file: UploadMediaInput!) {
    uploadMedia(file: $file) {
      id
      name
      type
      path
    }
  }
`)(UploadArticleImage);
