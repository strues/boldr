import React from 'react';

export default class Audio extends React.Component {
  render() {
    const { url, width, height, name } = this.props.mediaData;

    return (
      <div className="be-media__audio-holder">
        <i className="icon-music" />
        <h5>
          {name}
        </h5>
        <h6>
          {url}
        </h6>
      </div>
    );
  }
}
