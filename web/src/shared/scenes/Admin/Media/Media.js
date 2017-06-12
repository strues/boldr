/* @flow */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import Helmet from 'react-helmet';
import filter from 'lodash/filter';
import Link from 'react-router-dom/Link';
import styled from 'styled-components';

import IconButton from 'material-ui/IconButton';
import { Col, Row, Headline, Photo, FontIcon } from 'boldr-ui';

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
  state = {
    currentlyVisible: this.props.media,
  };

  componentWillReceiveProps(nextProps: Object) {
    if (this.props.media !== nextProps.media) {
      this.setState({
        currentlyVisible: nextProps.media,
      });
    }
  }

  handleToggleImage = () => {
    const updatedFilter = filter(this.props.media, m =>
      m.type.mediaType.includes('image'),
    );
    this.setState({
      currentlyVisible: updatedFilter,
    });
  };
  handleToggleVideo = () => {
    const updatedFilter = filter(this.props.media, m =>
      m.type.mediaType.includes('video'),
    );
    this.setState({
      currentlyVisible: updatedFilter,
    });
  };

  props: Props;
  render() {
    return (
      <div>
        <Helmet title="Media" />
        <Row>
          <Col xs={12} md={1}>
            <MediaSidePanel>
              <IconButton onTouchTap={this.handleToggleImage}>

                <FontIcon>photo_library</FontIcon>
              </IconButton>
              {' '}
              <IconButton onTouchTap={this.handleToggleVideo}>

                <FontIcon>personal_video</FontIcon>
              </IconButton>
            </MediaSidePanel>
          </Col>
          <Col xs={12} md={11}>

            <Headline type="h2">
              Media Gallery
            </Headline>
            <Row>
              <MediaList>
                {this.state.currentlyVisible.map(m => (
                  <MediaItem key={m.id}>
                    <Photo
                      src={`/uploads/${m.thumbName}`}
                      alt={m.fileName}
                      role="presentation"
                      cta={
                        <div>
                          <Link to={`/admin/media/${m.id}`}>
                            <IconButton>
                              <FontIcon>edit</FontIcon>
                            </IconButton>
                          </Link>
                          <IconButton
                            onTouchTap={() => this.props.deleteMedia(m)}
                          >
                            <FontIcon>delete_permanently</FontIcon>
                          </IconButton>
                        </div>
                      }
                    />
                  </MediaItem>
                ))}
              </MediaList>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Media;
