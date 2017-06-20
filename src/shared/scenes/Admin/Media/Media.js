/* @flow */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import Helmet from 'react-helmet';
import filter from 'lodash/filter';
import Link from 'react-router-dom/Link';
import styled from 'styled-components';
import IconButton from 'material-ui/IconButton';

import { Col, Row } from '@@components/Layout';
import Headline from '@@components/Headline';
import Photo from '@@components/Photo';
import FontIcon from '@@components/FontIcon';

type Props = {
  media: Array<Object>,
  deleteMedia: () => void,
  selectMedia: () => void,
  siteName: string,
};
const MediaList = styled.ul`
  flex-flow: row wrap;
  list-style-type: none;
  display: flex;
  padding: .3rem;
`;
const MediaItem = styled.li`
 align-items: stretch;
 box-sizing: border-box;
 column-break-inside: avoid;
 counter-increment: item;
 display: flex;
 justify-content: center;
 padding: .5rem .7rem;
`;

const MediaSidePanel = styled.div`
  background-color: #00B4D0;
  width: 100%;
  height: 100%;
  padding: 1rem;
`;
class Media extends Component {
  props: Props;
  render() {
    const { media } = this.props;
    return (
      <div>
        <Helmet title="Media" />
        <Row>
          <Col xs={12}>
            <Headline type="h2">
              Media Gallery
            </Headline>
            <Row>
              <MediaList>
                {media.map(m =>
                  <MediaItem key={m.id}>
                    <Photo
                      src={`/uploads/${m.thumbName}`}
                      alt={m.name}
                      role="presentation"
                      cta={
                        <div>
                          <Link to={`/admin/media/${m.id}`}>
                            <IconButton>
                              <FontIcon>edit</FontIcon>
                            </IconButton>
                          </Link>

                        </div>
                      }
                    />
                  </MediaItem>,
                )}
              </MediaList>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Media;
