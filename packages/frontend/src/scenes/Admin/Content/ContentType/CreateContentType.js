/* @flow */
import React from 'react';
import Helmet from 'react-helmet';
// import type { ArticleType } from '../../../../types/boldr';
import ContentTypeForm from './components/ContentTypeForm';

type Props = {
  onSubmit: Function,
};

const CreateContentType = (props: Props) => {
  const handleOnSubmit = (values: Object) => {
    props.onSubmit(values);
  };

  return (
    <div>
      <Helmet title="Admin: New Content Type" />
      <ContentTypeForm onSubmit={handleOnSubmit} />
    </div>
  );
};

export default CreateContentType;
