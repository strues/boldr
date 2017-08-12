// @flow
import React from 'react';
import PropTypes from 'prop-types';
import hoistStatics from 'hoist-non-react-statics';

import { formatGeneralAPIErrors } from '../../core/reduxFormErrors';

const getDisplayName = WrappedComponent =>
  // $FlowIssue
  WrappedComponent.displayName || WrappedComponent.name || 'Component';
const IS_LOADING_NETWORK_STATUS = 1;

const withApolloFetchingContainer = (
  PlaceholderComponent: ReactElement<*>,
  { fullPage }: { fullPage?: boolean } = {},
) => (WrappedComponent: ReactElement<*>) => {
  class WithApolloFetchingContainer extends React.Component {
    static WrappedComponent: ReactElement<*>;
    static propTypes = {
      data: PropTypes.shape({
        networkStatus: PropTypes.number,
      }).isRequired,
    };

    getRenderedContent = fn => {
      const { data: { networkStatus, error } } = this.props;
      if (error) {
        const content = (
          <div>
            {formatGeneralAPIErrors(error)}
          </div>
        );
        return { content, key: 'alert' };
      }
      if (networkStatus === IS_LOADING_NETWORK_STATUS) {
        return { content: <PlaceholderComponent />, key: 'placeholder' };
      }
      return { content: fn(), key: 'content' };
    };

    renderWhenReady = fn => {
      const { content } = this.getRenderedContent(fn);
      return (
        <div>
          {content}
        </div>
      );
    };

    render() {
      if (fullPage) {
        // $FlowIssue
        return this.renderWhenReady(() => <WrappedComponent {...this.props} />);
      }
      // $FlowIssue
      return <WrappedComponent {...this.props} renderWhenReady={this.renderWhenReady} />;
    }
  }
  WithApolloFetchingContainer.displayName = `WithApolloFetchingContainer(${getDisplayName(
    WrappedComponent,
  )})`;
  // $FlowIssue
  WithApolloFetchingContainer.WrappedComponent = WrappedComponent;

  return hoistStatics(WithApolloFetchingContainer, WrappedComponent);
};

export default withApolloFetchingContainer;
