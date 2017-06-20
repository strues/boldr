/* @flow */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import { gql, graphql } from 'react-apollo';
import { Footer, Loader, Headline } from 'boldr-ui';
import Switch from 'react-router-dom/Switch';
import Route from 'react-router-dom/Route';
import flatMapDeep from 'lodash/flatMapDeep';
import { selectMe } from '@@state/modules/users/selectors';
import SiteHeaderContainer from '@@components/SiteHeader/SiteHeaderContainer';
import routes from './routes';

type Data = {
  articles: Array<Article>,
  loading: boolean,
};
type Props = {
  layout: string,
  dispatch: Function,
  changeLayout: () => void,
  handleChangeLayout: () => void,
  data: Data,
};

const flattenRoutes = topRoutes =>
  flatMapDeep(topRoutes, ({ routes: nestedRoutes, ...other }) => [
    other,
    ...flattenRoutes(nestedRoutes),
  ]);

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100%;
  height: 100%;
  box-sizing: border-box;
`;

const ContentWrapper = styled.section`
  width: 100%;
  height: 100%;
  min-height: 100%;
  box-sizing: border-box;
  position: relative;
  margin: 0 auto;
  padding-bottom: 250px;
  background-color: #e5eaed;
`;

const FooterWrapper = styled.div`
  margin-top: auto;
`;

class AccountContainer extends Component {
  constructor(props: Props) {
    super(props);
    (this: any).flattenedRoutes = flattenRoutes(routes);
  }
  props: Props;

  render() {
    return (
      <div>
        <Switch>
          {(this: any).flattenedRoutes.map(props => <Route key={props.path} {...props} />)}
        </Switch>
      </div>
    );
  }
}

export default AccountContainer;
