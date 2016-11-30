/* eslint-disable max-len */
import React, { PureComponent } from 'react';

const iconList = [
  'menu',
  'grid-view',
  'list-view',
  'visible',
  'hidden',
  'edit',
  'delete',
  'calendar',
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
      case ('grid-view'): return (<svg fill={ color } height={ height || size } width={ width || size } viewBox="0 0 24 24"><path d="M3,11H11V3H3M3,21H11V13H3M13,21H21V13H13M13,3V11H21V3" /></svg>);
      case ('list-view'): return (<svg fill={ color } height={ height || size } width={ width || size } viewBox="0 0 24 24"><path d="M9,5V9H21V5M9,19H21V15H9M9,14H21V10H9M4,9H8V5H4M4,19H8V15H4M4,14H8V10H4V14Z" /></svg>);
      case ('visible'): return (<svg fill={ color } height={ height || size } width={ width || size } viewBox="0 0 24 24"><path d="M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17M12,4.5C7,4.5 2.73,7.61 1,12C2.73,16.39 7,19.5 12,19.5C17,19.5 21.27,16.39 23,12C21.27,7.61 17,4.5 12,4.5Z" /></svg>);
      case ('hidden'): return (<svg fill={ color } height={ height || size } width={ width || size } viewBox="0 0 24 24"><path d="M11.83,9L15,12.16C15,12.11 15,12.05 15,12A3,3 0 0,0 12,9C11.94,9 11.89,9 11.83,9M7.53,9.8L9.08,11.35C9.03,11.56 9,11.77 9,12A3,3 0 0,0 12,15C12.22,15 12.44,14.97 12.65,14.92L14.2,16.47C13.53,16.8 12.79,17 12,17A5,5 0 0,1 7,12C7,11.21 7.2,10.47 7.53,9.8M2,4.27L4.28,6.55L4.73,7C3.08,8.3 1.78,10 1,12C2.73,16.39 7,19.5 12,19.5C13.55,19.5 15.03,19.2 16.38,18.66L16.81,19.08L19.73,22L21,20.73L3.27,3M12,7A5,5 0 0,1 17,12C17,12.64 16.87,13.26 16.64,13.82L19.57,16.75C21.07,15.5 22.27,13.86 23,12C21.27,7.61 17,4.5 12,4.5C10.6,4.5 9.26,4.75 8,5.2L10.17,7.35C10.74,7.13 11.35,7 12,7Z" /></svg>);
      case ('edit'): return (<svg fill={ color } height={ height || size } width={ width || size } viewBox="0 0 24 24"><path d="M19,19V5H5V19H19M19,3A2,2 0 0,1 21,5V19C21,20.11 20.1,21 19,21H5A2,2 0 0,1 3,19V5A2,2 0 0,1 5,3H19M16.7,9.35L15.7,10.35L13.65,8.3L14.65,7.3C14.86,7.08 15.21,7.08 15.42,7.3L16.7,8.58C16.92,8.79 16.92,9.14 16.7,9.35M7,14.94L13.06,8.88L15.12,10.94L9.06,17H7V14.94Z" /></svg>);
      case ('delete'): return (<svg fill={ color } height={ height || size } width={ width || size } viewBox="0 0 24 24"><path d="M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19M8.46,11.88L9.87,10.47L12,12.59L14.12,10.47L15.53,11.88L13.41,14L15.53,16.12L14.12,17.53L12,15.41L9.88,17.53L8.47,16.12L10.59,14L8.46,11.88M15.5,4L14.5,3H9.5L8.5,4H5V6H19V4H15.5Z" /></svg>);
      case ('calendar'): return (<svg fill={ color } height={ height || size } width={ width || size } viewBox="0 0 24 24"><path d="M19,19H5V8H19M16,1V3H8V1H6V3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3H18V1" /></svg>);
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
