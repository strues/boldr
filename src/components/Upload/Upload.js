import { graphql, gql } from 'react-apollo';

const MultipleUploader = ({ mutate }) => {
  const handleChange = ({ target }) => {
    if (target.validity.valid) {
      mutate({
        variables: {
          files: target.files,
        },
      });
    }
  };

  return <input type="file" multiple required onChange={handleChange} />;
};

export default graphql(gql`
  mutation multipleUpload($files: [Upload!]!) {
    multipleUpload(files: $files) {
      name
      type
      size
      path
    }
  }
`)(MultipleUploader);
