/* eslint-disable max-len */
import React, { PureComponent } from 'react';

const iconList = [
  'menu',
];

export default class Icon extends PureComponent {

  static propTypes = {
    color: React.PropTypes.string,
    height: React.PropTypes.number,
    kind: React.PropTypes.oneOf(iconList).isRequired,
    preview: React.PropTypes.bool,
    onClick: React.PropTypes.func,
    size: React.PropTypes.number,
    width: React.PropTypes.number,
  };

  static defaultProps = {
    size: 24,
    color: '#fff',
  }

  renderPreview() {
    return (
      <div>
        {iconList.map(kind => this.renderPreviewKind(kind))}
      </div>
    );
  }

  renderPreviewKind(kind) {
    return (
      <span key={ kind }>
        <h3>&lt;Icon kind="{kind}" /&gt;</h3>
        {this.renderIcon(kind)}
      </span>
    );
  }

  renderIcon(kind) {
    const { color, size, height, width } = this.props;

    switch (kind) {
      default: return null;
      case ('menu'): return (<svg fill={ color } height={ height || size } width={ width || size } viewBox="0 0 48 48"><path d="M6 36h36v-4H6v4zm0-10h36v-4H6v4zm0-14v4h36v-4H6z" /></svg>);
    }
  }

  render() {
    const { kind, preview, onClick } = this.props;

    return (
      <div className="boldr-icon" onClick={ onClick }>
        { preview ? this.renderPreview() : this.renderIcon(kind) }
      </div>
    );
  }
}
