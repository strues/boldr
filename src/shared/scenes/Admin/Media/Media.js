/* @flow */
/* eslint-disable react/prefer-stateless-function */
import React, {Component} from 'react';
import Helmet from 'react-helmet';
import filter from 'lodash/filter';
import Link from 'react-router-dom/Link';
import styled from 'styled-components';
import {
  Grid,
  Col,
  Row,
  HorizontalRule,
  Block,
  Heading,
  Photo,
  Paper,
  FontIcon,
  Button,
} from 'boldr-ui';

type Props = {
  media: Array<Object>,
  selectMedia: () => void,
};

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
              <Button icon onClick={this.handleToggleImage}>
                photo_library
              </Button>
              {' '}
              <Button icon onClick={this.handleToggleVideo}>
                personal_video
              </Button>
            </MediaSidePanel>
          </Col>
          <Col xs={12} md={11}>
            <Heading size={3}>Media</Heading>
            <Row>
              {this.state.currentlyVisible.map(m => (
                <Col xs={12} md={4} key={m.id}>
                  <Photo
                    src={`http://localhost:2121${m.url}`}
                    alt={m.fileName}
                    role="presentation"
                    cta={
                      <Link to={`/admin/media/${m.id}`}>
                        <Button icon onClick={() => this.props.selectMedia(m)}>
                          edit
                        </Button>
                      </Link>
                    }
                  />
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Media;
