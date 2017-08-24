// @flow
import * as React from 'react';
import universal from 'react-universal-component';

type Props = {
  loading: boolean,
  error?: Object,
};

const UniversalContent = universal(import('./Content'));

const Content = ({ loading, error }: Props) =>
  <UniversalContent isLoading={loading} error={error} />;

export default Content;
