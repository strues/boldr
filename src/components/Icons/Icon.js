/* @flow eslint-disable max-lines, max-len, react/no-unescaped-entities */
import React, { PureComponent } from 'react';

import classnames from 'classnames';
import BaseIcon from './BaseIcon';

const iconList = [
  'activity',
  'account',
  'account-card',
  'anchor',
  'align-center',
  'align-left',
  'align-right',
  'archive',
  'arrow-left',
  'bold',
  'bell',
  'calendar',
  'chevron-left',
  'chevron-right',
  'chevron-up',
  'chevron-down',
  'close',
  'color',
  'crosshair',
  'dashboard',
  'datepicker-arrow',
  'delete',
  'edit',
  'embedded',
  'emoji',
  'eraser',
  'external-link',
  'file',
  'file-plus',
  'file-minus',
  'file-text',
  'headphones',
  'layout',
  'facebook',
  'folder',
  'folder-upload',
  'github',
  'globe',
  'google',
  'grid',
  'grid-view',
  'hash',
  'hidden',
  'history',
  'image',
  'indent',
  'italic',
  'justify',
  'link',
  'linkedin',
  'list-view',
  'logout',
  'login',
  'lock',
  'mail',
  'menu',
  'monospace',
  'more',
  'more_vert',
  'navigation',
  'new-post',
  'ordered',
  'outdent',
  'package',
  'plus2',
  'posts',
  'redo',
  'replace',
  'routes',
  'save',
  'share',
  'search',
  'settings',
  'scissors',
  'server',
  'shield',
  'shovel',
  'strikethrough',
  'subscript',
  'superscript',
  'type',
  'tags',
  'tag',
  'trash',
  'twitter',
  'underline',
  'video',
  'video-off',
  'undo',
  'unlink',
  'unordered',
  'unlock',
  'users',
  'upload',
  'upload-cloud',
  'visible',
  'zap',
];

export type Props = {
  color: ?string,
  className: ?string,
  height: ?number,
  kind: string,
  preview: ?boolean,
  onClick: ?() => void,
  size: ?number | ?string,
  width: ?number,
};
export default class Icon extends PureComponent {
  static defaultProps = {
    size: 24,
    color: '#222',
  };
  props: Props;
  renderIcon(kind: string) {
    const { color, size, height, width, onClick } = this.props;

    switch (kind) {
      default:
        return null;
      case 'save':
        return (
          <BaseIcon viewBox="0 0 24 24" {...this.props}>
            <g>
              <path
                d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"
                stroke={this.props.color}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
              <path
                stroke={this.props.color}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 21v-8H7v8M7 3v5h8"
              />
            </g>
          </BaseIcon>
        );
      case 'scissors':
        return (
          <BaseIcon viewBox="0 0 24 24" {...this.props}>
            <g>
              <circle
                cx="6"
                cy="6"
                r="3"
                fill="none"
                stroke={this.props.color}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
              <circle
                cx="6"
                cy="18"
                r="3"
                fill="none"
                stroke={this.props.color}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
              <path
                stroke={this.props.color}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M20 4L8.12 15.88M14.47 14.48L20 20M8.12 8.12L12 12"
              />
            </g>
          </BaseIcon>
        );
      case 'server':
        return (
          <BaseIcon viewBox="0 0 24 24" {...this.props}>
            <g>
              <rect
                x="2"
                y="2"
                width="20"
                height="8"
                rx="2"
                ry="2"
                fill="none"
                stroke={this.props.color}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
              <rect
                x="2"
                y="14"
                width="20"
                height="8"
                rx="2"
                ry="2"
                fill="none"
                stroke={this.props.color}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
              <path
                stroke={this.props.color}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18"
              />
            </g>
          </BaseIcon>
        );
      case 'share':
        return (
          <BaseIcon viewBox="0 0 24 24" {...this.props}>
            <g>
              <path
                d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8M16 6l-4-4-4 4M12 2v13"
                stroke={this.props.color}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
            </g>
          </BaseIcon>
        );
      case 'bell':
        return (
          /* eslint-disable */
          <BaseIcon viewBox="0 0 24 24" {...this.props}>
            <g>
              <path d="M22 17H2a3 3 0 0 0 3-3V9a7 7 0 0 1 14 0v5a3 3 0 0 0 3 3zm-8.27 4a2 2 0 0 1-3.46 0" />
            </g>
          </BaseIcon>
          /* eslint-enable */
        );
      case 'unlock':
        return (
          <BaseIcon viewBox="0 0 24 24" {...this.props}>
            <g>
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 9.9-1" />
            </g>
          </BaseIcon>
        );
      case 'upload-cloud':
        return (
          /* eslint-disable */
          <BaseIcon viewBox="0 0 24 24" {...this.props}>
            <g>
              <path d="M16 16l-4-4-4 4M12 12v9" />
              <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
              <path d="M16 16l-4-4-4 4" />
            </g>
          </BaseIcon>
          /* eslint-enable */
        );
      case 'upload':
        return (
          /* eslint-disable */
          <BaseIcon viewBox="0 0 24 24" {...this.props}>
            <g>
              <path d="M3 17v3a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-3M16 6l-4-4-4 4M12 2v14" />
            </g>
          </BaseIcon>
          /* eslint-enable */
        );
      case 'mail':
        return (
          /* eslint-disable */
          <BaseIcon viewBox="0 0 24 24" {...this.props}>
            <g>
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <path d="M22 6l-10 7L2 6" />
            </g>
          </BaseIcon>
          /* eslint-enable */
        );
      case 'folder':
        return (
          /* eslint-disable */
          <BaseIcon viewBox="0 0 24 24" {...this.props}>
            <g>
              <path
                d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"
                fill="none"
                stroke={this.props.color}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
            </g>
          </BaseIcon>
          /* eslint-enable */
        );
      case 'type':
        return (
          /* eslint-disable */ <BaseIcon viewBox="0 0 24 24" {...this.props}>
            <g>
              <path
                stroke={this.props.color}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 7V4h16v3M9 20h6M12 4v16"
              />
            </g>
          </BaseIcon> /* eslint-enable */
        );
      case 'video-off':
        return (
          <BaseIcon viewBox="0 0 24 24" {...this.props}>
            <g>
              <path d="M16 16v1a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2m5.66 0H14a2 2 0 0 1 2 2v3.34l1 1L23 7v10M1 1l22 22" />
            </g>
          </BaseIcon>
        );

      case 'video':
        return (
          <BaseIcon viewBox="0 0 24 24" {...this.props}>
            <g>
              <path d="M23 7l-7 5 7 5V7z" />
              <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
            </g>
          </BaseIcon>
        );
      case 'file':
        return (
          /* eslint-disable */
          <BaseIcon viewBox="0 0 24 24" {...this.props}>
            <g
              fill="none"
              stroke={this.props.color}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            >
              <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
              <polyline points="13 2 13 9 20 9" />
            </g>
          </BaseIcon>
          /* eslint-enable */
        );
      case 'file-plus':
        return (
          /* eslint-disable */
          <BaseIcon viewBox="0 0 24 24" {...this.props}>
            <path
              d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
              fill="none"
              stroke={this.props.color}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            />
            <polyline
              points="14 2 14 8 20 8"
              fill="none"
              stroke={this.props.color}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            />
            <line
              x1="12"
              y1="18"
              x2="12"
              y2="12"
              fill="none"
              stroke={this.props.color}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            />
            <line
              x1="9"
              y1="15"
              x2="15"
              y2="15"
              fill="none"
              stroke={this.props.color}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            />
          </BaseIcon>
          /* eslint-enable */
        );
      case 'file-minus':
        return (
          /* eslint-disable */
          <BaseIcon viewBox="0 0 24 24" {...this.props}>
            <path
              d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
              fill="none"
              stroke={this.props.color}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            />
            <polyline
              points="14 2 14 8 20 8"
              fill="none"
              stroke={this.props.color}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            />
            <line
              x1="9"
              y1="15"
              x2="15"
              y2="15"
              fill="none"
              stroke={this.props.color}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            />
          </BaseIcon>
          /* eslint-enable */
        );
      case 'file-text':
        return (
          /* eslint-disable */
          <BaseIcon viewBox="0 0 24 24" {...this.props}>
            <g>
              <path
                d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
                fill="none"
                stroke={this.props.color}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
              <polyline
                points="14 2 14 8 20 8"
                fill="none"
                stroke={this.props.color}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
              <line
                x1="16"
                y1="13"
                x2="8"
                y2="13"
                fill="none"
                stroke={this.props.color}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
              <line
                x1="16"
                y1="17"
                x2="8"
                y2="17"
                fill="none"
                stroke={this.props.color}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
              <polyline
                points="10 9 9 9 8 9"
                fill="none"
                stroke={this.props.color}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
            </g>
          </BaseIcon>
          /* eslint-enable */
        );

      case 'headphones':
        return (
          /* eslint-disable */
          <BaseIcon viewBox="0 0 24 24" {...this.props}>
            <path
              d="M3 18v-6a9 9 0 0 1 18 0v6"
              fill="none"
              stroke={this.props.color}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            />
            <path
              d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"
              fill="none"
              stroke={this.props.color}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            />
          </BaseIcon>
          /* eslint-enable */
        );
      case 'layout':
        return (
          /* eslint-disable */
          <BaseIcon viewBox="0 0 24 24" {...this.props}>
            <rect
              x="3"
              y="3"
              width="18"
              height="18"
              rx="2"
              ry="2"
              fill="none"
              stroke={this.props.color}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            />
            <line
              x1="3"
              y1="9"
              x2="21"
              y2="9"
              fill="none"
              stroke={this.props.color}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            />
            <line
              x1="9"
              y1="21"
              x2="9"
              y2="9"
              fill="none"
              stroke={this.props.color}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            />
          </BaseIcon>
          /* eslint-enable */
        );
      case 'anchor':
        return (
          /* eslint-disable */
          <BaseIcon viewBox="0 0 24 24" {...this.props}>
            <circle
              cx="12"
              cy="5"
              r="3"
              fill="none"
              stroke={this.props.color}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            />
            <line
              x1="12"
              y1="22"
              x2="12"
              y2="8"
              fill="none"
              stroke={this.props.color}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            />
            <path
              d="M5 12H2a10 10 0 0 0 20 0h-3"
              fill="none"
              stroke={this.props.color}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            />
          </BaseIcon>
          /* eslint-enable */
        );
      case 'zap':
        return (
          /* eslint-disable */
          <BaseIcon viewBox="0 0 24 24" {...this.props}>
            <g>
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </g>
          </BaseIcon>
          /* eslint-enable */
        );
      case 'package':
        return (
          /* eslint-disable */
          <BaseIcon viewBox="0 0 24 24" {...this.props}>
            <path
              d="M12.89 1.45l8 4A2 2 0 0 1 22 7.24v9.53a2 2 0 0 1-1.11 1.79l-8 4a2 2 0 0 1-1.79 0l-8-4a2 2 0 0 1-1.1-1.8V7.24a2 2 0 0 1 1.11-1.79l8-4a2 2 0 0 1 1.78 0z"
              fill="none"
              stroke={this.props.color}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            />
            <polyline
              points="2.32 6.16 12 11 21.68 6.16"
              fill="none"
              stroke={this.props.color}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            />
            <line
              x1="12"
              y1="22.76"
              x2="12"
              y2="11"
              fill="none"
              stroke={this.props.color}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            />
            <line
              x1="7"
              y1="3.5"
              x2="17"
              y2="8.5"
              fill="none"
              stroke={this.props.color}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            />
          </BaseIcon>
          /* eslint-enable */
        );
      case 'shield':
        return (
          /* eslint-disable */
          <BaseIcon viewBox="0 0 24 24" {...this.props}>
            <path
              d="M12 22s8-4 8-10V4l-8-2-8 2v8c0 6 8 10 8 10z"
              fill="none"
              stroke={this.props.color}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            />
          </BaseIcon>
          /* eslint-enable */
        );
      case 'tag':
        return (
          /* eslint-disable */
          <BaseIcon
            viewBox="0 0 24 24"
            fill="none"
            stroke={this.props.color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            {...this.props}
          >
            <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
            <line x1="7" y1="7" x2="7" y2="7" />
          </BaseIcon>
          /* eslint-enable */
        );
      case 'globe':
        return (
          /* eslint-disable */
          <BaseIcon viewBox="0 0 24 24" {...this.props}>
            <g>
              <circle
                cx="12"
                cy="12"
                r="10"
                fill="none"
                stroke={this.props.color}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
              <path
                d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"
                fill="none"
                stroke={this.props.color}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
            </g>
          </BaseIcon>
          /* eslint-enable */
        );
      case 'crosshair':
        return (
          /* eslint-disable */
          <BaseIcon viewBox="0 0 24 24" {...this.props}>
            <g>
              <circle
                cx="12"
                cy="12"
                r="10"
                fill="none"
                stroke={this.props.color}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
              <path
                d="M22 12h-4M6 12H2M12 6V2M12 22v-4"
                fill="none"
                stroke={this.props.color}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
            </g>
          </BaseIcon>
          /* eslint-enable */
        );
      case 'navigation':
        return (
          /* eslint-disable */
          <BaseIcon viewBox="0 0 24 24" {...this.props}>
            <g>
              <path
                fill="none"
                stroke={this.props.color}
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 11l19-9-9 19-2-8-8-2z"
              />
            </g>
          </BaseIcon>
          /* eslint-enable */
        );
      case 'activity':
        return (
          /* eslint-disable */
          <BaseIcon viewBox="0 0 24 24" {...this.props}>
            <g>
              <path
                d="M22 12h-4l-3 9L9 3l-3 9H2"
                fill="none"
                stroke={this.props.color}
                strokeLinejoin="round"
                strokeWidth="2"
              />
            </g>
          </BaseIcon>
          /* eslint-enable */
        );
      case 'grid':
        return (
          /* eslint-disable */
          <BaseIcon viewBox="0 0 24 24" {...this.props}>
            <g>
              <path
                stroke={this.props.color}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z"
              />
            </g>
          </BaseIcon>
          /* eslint-enable */
        );
      case 'hash':
        return (
          /* eslint-disable */
          <BaseIcon
            viewBox="0 0 24 24"
            fill="none"
            stroke={this.props.color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            {...this.props}
          >
            <line x1="4" y1="9" x2="20" y2="9" />
            <line x1="4" y1="15" x2="20" y2="15" />
            <line x1="10" y1="3" x2="8" y2="21" />
            <line x1="16" y1="3" x2="14" y2="21" />
          </BaseIcon>
          /* eslint-enable */
        );
      case 'menu':
        return (
          <BaseIcon viewBox="0 0 48 48" {...this.props}>
            <path d="M6 36h36v-4H6v4zm0-10h36v-4H6v4zm0-14v4h36v-4H6z" />
          </BaseIcon>
        );
      case 'grid-view':
        return (
          <BaseIcon viewBox="0 0 24 24" {...this.props}>
            {/* eslint-disable */}
            <path d="M3,11H11V3H3M3,21H11V13H3M13,21H21V13H13M13,3V11H21V3" />
          </BaseIcon>
        );
      case 'list-view':
        return (
          <BaseIcon viewBox="0 0 24 24" {...this.props}>
            {/* eslint-disable */}
            <path d="M9,5V9H21V5M9,19H21V15H9M9,14H21V10H9M4,9H8V5H4M4,19H8V15H4M4,14H8V10H4V14Z" />
          </BaseIcon>
        );
      case 'visible':
        return (
          <BaseIcon viewBox="0 0 24 24" {...this.props}>
            {/* eslint-disable */}
            <path d="M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17M12,4.5C7,4.5 2.73,7.61 1,12C2.73,16.39 7,19.5 12,19.5C17,19.5 21.27,16.39 23,12C21.27,7.61 17,4.5 12,4.5Z" />
          </BaseIcon>
        );
      case 'hidden':
        return (
          <BaseIcon viewBox="0 0 24 24" {...this.props}>
            {/* eslint-disable */}
            <path d="M11.83,9L15,12.16C15,12.11 15,12.05 15,12A3,3 0 0,0 12,9C11.94,9 11.89,9 11.83,9M7.53,9.8L9.08,11.35C9.03,11.56 9,11.77 9,12A3,3 0 0,0 12,15C12.22,15 12.44,14.97 12.65,14.92L14.2,16.47C13.53,16.8 12.79,17 12,17A5,5 0 0,1 7,12C7,11.21 7.2,10.47 7.53,9.8M2,4.27L4.28,6.55L4.73,7C3.08,8.3 1.78,10 1,12C2.73,16.39 7,19.5 12,19.5C13.55,19.5 15.03,19.2 16.38,18.66L16.81,19.08L19.73,22L21,20.73L3.27,3M12,7A5,5 0 0,1 17,12C17,12.64 16.87,13.26 16.64,13.82L19.57,16.75C21.07,15.5 22.27,13.86 23,12C21.27,7.61 17,4.5 12,4.5C10.6,4.5 9.26,4.75 8,5.2L10.17,7.35C10.74,7.13 11.35,7 12,7Z" />
          </BaseIcon>
        );
      case 'edit':
        return (
          <BaseIcon viewBox="0 0 24 24" {...this.props}>
            {/* eslint-disable */}
            <path d="M19,19V5H5V19H19M19,3A2,2 0 0,1 21,5V19C21,20.11 20.1,21 19,21H5A2,2 0 0,1 3,19V5A2,2 0 0,1 5,3H19M16.7,9.35L15.7,10.35L13.65,8.3L14.65,7.3C14.86,7.08 15.21,7.08 15.42,7.3L16.7,8.58C16.92,8.79 16.92,9.14 16.7,9.35M7,14.94L13.06,8.88L15.12,10.94L9.06,17H7V14.94Z" />
          </BaseIcon>
        );
      case 'delete':
        return (
          <BaseIcon viewBox="0 0 24 24" {...this.props}>
            {/* eslint-disable */}
            <path d="M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19M8.46,11.88L9.87,10.47L12,12.59L14.12,10.47L15.53,11.88L13.41,14L15.53,16.12L14.12,17.53L12,15.41L9.88,17.53L8.47,16.12L10.59,14L8.46,11.88M15.5,4L14.5,3H9.5L8.5,4H5V6H19V4H15.5Z" />
          </BaseIcon>
        );
      case 'calendar':
        return (
          <BaseIcon viewBox="0 0 24 24" {...this.props}>
            {/* eslint-disable */}
            <path d="M19,19H5V8H19M16,1V3H8V1H6V3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3H18V1" />
          </BaseIcon>
        );
      case 'new-post':
        return (
          <BaseIcon viewBox="0 0 24 24" {...this.props}>
            {/* eslint-disable */}
            <path d="M13,9H18.5L13,3.5V9M6,2H14L20,8V20A2,2 0 0,1 18,22H6C4.89,22 4,21.1 4,20V4C4,2.89 4.89,2 6,2M15,18V16H6V18H15M18,14V12H6V14H18Z" />
          </BaseIcon>
        );
      case 'facebook':
        return (
          <BaseIcon viewBox="0 0 24 24" {...this.props}>
            {/* eslint-disable */}
            <path d="M5,3H19A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H5A2,2 0 0,1 3,19V5A2,2 0 0,1 5,3M18,5H15.5A3.5,3.5 0 0,0 12,8.5V11H10V14H12V21H15V14H18V11H15V9A1,1 0 0,1 16,8H18V5Z" />
          </BaseIcon>
        );
      case 'twitter':
        return (
          <BaseIcon viewBox="0 0 24 24" {...this.props}>
            {/* eslint-disable */}
            <path d="M5,3H19A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H5A2,2 0 0,1 3,19V5A2,2 0 0,1 5,3M17.71,9.33C18.19,8.93 18.75,8.45 19,7.92C18.59,8.13 18.1,8.26 17.56,8.33C18.06,7.97 18.47,7.5 18.68,6.86C18.16,7.14 17.63,7.38 16.97,7.5C15.42,5.63 11.71,7.15 12.37,9.95C9.76,9.79 8.17,8.61 6.85,7.16C6.1,8.38 6.75,10.23 7.64,10.74C7.18,10.71 6.83,10.57 6.5,10.41C6.54,11.95 7.39,12.69 8.58,13.09C8.22,13.16 7.82,13.18 7.44,13.12C7.81,14.19 8.58,14.86 9.9,15C9,15.76 7.34,16.29 6,16.08C7.15,16.81 8.46,17.39 10.28,17.31C14.69,17.11 17.64,13.95 17.71,9.33Z" />
          </BaseIcon>
        );
      case 'google':
        return (
          <BaseIcon viewBox="0 0 24 24" {...this.props}>
            {/* eslint-disable */}
            <path d="M20,2A2,2 0 0,1 22,4V20A2,2 0 0,1 20,22H4A2,2 0 0,1 2,20V4C2,2.89 2.9,2 4,2H20M20,12H18V10H17V12H15V13H17V15H18V13H20V12M9,11.29V13H11.86C11.71,13.71 11,15.14 9,15.14C7.29,15.14 5.93,13.71 5.93,12C5.93,10.29 7.29,8.86 9,8.86C10,8.86 10.64,9.29 11,9.64L12.36,8.36C11.5,7.5 10.36,7 9,7C6.21,7 4,9.21 4,12C4,14.79 6.21,17 9,17C11.86,17 13.79,15 13.79,12.14C13.79,11.79 13.79,11.57 13.71,11.29H9Z" />
          </BaseIcon>
        );
      case 'linkedin':
        return (
          <BaseIcon viewBox="0 0 24 24" {...this.props}>
            {/* eslint-disable */}
            <path d="M19,3A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H5A2,2 0 0,1 3,19V5A2,2 0 0,1 5,3H19M18.5,18.5V13.2A3.26,3.26 0 0,0 15.24,9.94C14.39,9.94 13.4,10.46 12.92,11.24V10.13H10.13V18.5H12.92V13.57C12.92,12.8 13.54,12.17 14.31,12.17A1.4,1.4 0 0,1 15.71,13.57V18.5H18.5M6.88,8.56A1.68,1.68 0 0,0 8.56,6.88C8.56,5.95 7.81,5.19 6.88,5.19A1.69,1.69 0 0,0 5.19,6.88C5.19,7.81 5.95,8.56 6.88,8.56M8.27,18.5V10.13H5.5V18.5H8.27Z" />
          </BaseIcon>
        );
      case 'github':
        return (
          <BaseIcon viewBox="0 0 24 24" {...this.props}>
            {/* eslint-disable */}
            <path d="M5,3H19A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H14.56C14.24,20.93 14.23,20.32 14.23,20.11L14.24,17.64C14.24,16.8 13.95,16.25 13.63,15.97C15.64,15.75 17.74,15 17.74,11.53C17.74,10.55 17.39,9.74 16.82,9.11C16.91,8.89 17.22,7.97 16.73,6.73C16.73,6.73 15.97,6.5 14.25,7.66C13.53,7.46 12.77,7.36 12,7.35C11.24,7.36 10.46,7.46 9.75,7.66C8.03,6.5 7.27,6.73 7.27,6.73C6.78,7.97 7.09,8.89 7.18,9.11C6.61,9.74 6.26,10.55 6.26,11.53C6.26,15 8.36,15.75 10.36,16C10.1,16.2 9.87,16.6 9.79,17.18C9.27,17.41 7.97,17.81 7.17,16.43C7.17,16.43 6.69,15.57 5.79,15.5C5.79,15.5 4.91,15.5 5.73,16.05C5.73,16.05 6.32,16.33 6.73,17.37C6.73,17.37 7.25,19.12 9.76,18.58L9.77,20.11C9.77,20.32 9.75,20.93 9.43,21H5A2,2 0 0,1 3,19V5A2,2 0 0,1 5,3Z" />
          </BaseIcon>
        );
      case 'folder-upload':
        return (
          <BaseIcon viewBox="0 0 24 24" {...this.props}>
            {/* eslint-disable */}
            <path d="M20,6A2,2 0 0,1 22,8V18A2,2 0 0,1 20,20H4A2,2 0 0,1 2,18V6A2,2 0 0,1 4,4H10L12,6H20M10.75,13H14V17H16V13H19.25L15,8.75" />
          </BaseIcon>
        );
      case 'account-card':
        return (
          <BaseIcon viewBox="0 0 24 24" {...this.props}>
            {/* eslint-disable */}
            <path
              fill={color}
              d="M2,3H22C23.05,3 24,3.95 24,5V19C24,20.05 23.05,21 22,21H2C0.95,21 0,20.05 0,19V5C0,3.95 0.95,3 2,3M14,6V7H22V6H14M14,8V9H21.5L22,9V8H14M14,10V11H21V10H14M8,13.91C6,13.91 2,15 2,17V18H14V17C14,15 10,13.91 8,13.91M8,6A3,3 0 0,0 5,9A3,3 0 0,0 8,12A3,3 0 0,0 11,9A3,3 0 0,0 8,6Z"
            />
          </BaseIcon>
        );
      case 'tags':
        return (
          <BaseIcon viewBox="0 0 24 24" {...this.props}>
            {/* eslint-disable */}
            <path d="M5.5,9A1.5,1.5 0 0,0 7,7.5A1.5,1.5 0 0,0 5.5,6A1.5,1.5 0 0,0 4,7.5A1.5,1.5 0 0,0 5.5,9M17.41,11.58C17.77,11.94 18,12.44 18,13C18,13.55 17.78,14.05 17.41,14.41L12.41,19.41C12.05,19.77 11.55,20 11,20C10.45,20 9.95,19.78 9.58,19.41L2.59,12.42C2.22,12.05 2,11.55 2,11V6C2,4.89 2.89,4 4,4H9C9.55,4 10.05,4.22 10.41,4.58L17.41,11.58M13.54,5.71L14.54,4.71L21.41,11.58C21.78,11.94 22,12.45 22,13C22,13.55 21.78,14.05 21.42,14.41L16.04,19.79L15.04,18.79L20.75,13L13.54,5.71Z" />
          </BaseIcon>
        );
      case 'shovel':
        return (
          <BaseIcon viewBox="0 0 24 24" {...this.props}>
            {/* eslint-disable */}
            <path d="M15.1,1.81L12.27,4.64C11.5,5.42 11.5,6.69 12.27,7.47L13.68,8.88L9.13,13.43L6.31,10.6L4.89,12C-0.06,17 3.5,20.5 3.5,20.5C3.5,20.5 7,24 12,19.09L13.41,17.68L10.61,14.88L15.15,10.34L16.54,11.73C17.32,12.5 18.59,12.5 19.37,11.73L22.2,8.9L15.1,1.81M17.93,10.28L16.55,8.9L15.11,7.46L13.71,6.06L15.12,4.65L19.35,8.88L17.93,10.28Z" />
          </BaseIcon>
        );
      case 'routes':
        return (
          <BaseIcon viewBox="0 0 24 24" {...this.props}>
            {/* eslint-disable */}
            <path d="M11,10H5L3,8L5,6H11V3L12,2L13,3V4H19L21,6L19,8H13V10H19L21,12L19,14H13V20A2,2 0 0,1 15,22H9A2,2 0 0,1 11,20V10Z" />
          </BaseIcon>
        );
      case 'posts':
        return (
          <BaseIcon viewBox="0 0 24 24" {...this.props}>
            {/* eslint-disable */}
            <path d="M16,9H21.5L16,3.5V9M7,2H17L23,8V18A2,2 0 0,1 21,20H7C5.89,20 5,19.1 5,18V4A2,2 0 0,1 7,2M3,6V22H21V24H3A2,2 0 0,1 1,22V6H3Z" />
          </BaseIcon>
        );
      case 'settings':
        return (
          <BaseIcon viewBox="0 0 24 24" {...this.props}>
            <circle
              cx="12"
              cy="12"
              r="3"
              fill="none"
              stroke={this.props.color}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            />
            <path
              d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"
              fill="none"
              stroke={this.props.color}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            />
          </BaseIcon>
        );
      case 'chevron-left':
        return (
          <BaseIcon viewBox="0 0 24 24" {...this.props}>
            {/* eslint-disable */}
            <g>
              <path d="M15 18l-6-6 6-6" />
            </g>
          </BaseIcon>
        );
      case 'chevron-right':
        return (
          <BaseIcon viewBox="0 0 24 24" {...this.props}>
            {/* eslint-disable */}
            <g>
              <path d="M9 18l6-6-6-6" />
            </g>
          </BaseIcon>
        );
      case 'chevron-up':
        return (
          <BaseIcon viewBox="0 0 24 24" {...this.props}>
            {/* eslint-disable */}
            <g>
              <path d="M18 15l-6-6-6 6" />
            </g>
          </BaseIcon>
        );
      case 'chevron-down':
        return (
          <BaseIcon viewBox="0 0 24 24" {...this.props}>
            {/* eslint-disable */}
            <g>
              <path d="M6 9l6 6 6-6" />
            </g>
          </BaseIcon>
        );
      case 'search':
        return (
          <BaseIcon viewBox="-137 138 25 25" {...this.props}>
            {/* eslint-disable */}
            <path d="M-114.6,162.6l-7.5-7.5c-0.6-0.6-0.6-1.6,0-2.1l0,0c0.6-0.6,1.6-0.6,2.1,0l7.5,7.5c0.6,0.6,0.6,1.6,0,2.1l0,0
                                                    C-113,163.1-114,163.1-114.6,162.6z" />
            <path d="M-134.1,140.9c-3.9,3.9-3.9,10.2,0,14.1s10.2,3.9,14.1,0s3.9-10.2,0-14.1S-130.2,137-134.1,140.9z M-122.1,153
                                                    c-2.7,2.7-7.1,2.7-9.8,0s-2.7-7.1,0-9.8s7.1-2.7,9.8,0C-119.4,145.9-119.4,150.2-122.1,153z" />
          </BaseIcon>
        );
      case 'close':
        return (
          <BaseIcon viewBox="-137 138 25 25" {...this.props}>
            <g transform="translate(0,-952.36218)">
              {/* eslint-disable */}
              <path d="M-131.3,1094.4c-0.4,0-0.9,0.1-1.2,0.5c-0.7,0.7-0.7,1.7,0,2.4l5.6,5.6l-5.6,5.6c-0.7,0.7-0.7,1.7,0,2.4
                              c0.7,0.7,1.7,0.7,2.4,0l5.6-5.6l5.6,5.6c0.7,0.7,1.7,0.7,2.4,0c0.7-0.7,0.7-1.7,0-2.4l-5.6-5.6l5.6-5.6c0.7-0.7,0.7-1.7,0-2.4
                              c-0.7-0.7-1.7-0.7-2.4,0l-5.6,5.6l-5.6-5.6C-130.5,1094.5-130.9,1094.4-131.3,1094.4L-131.3,1094.4z" />
            </g>
          </BaseIcon>
        );
      case 'more':
        return (
          <BaseIcon viewBox="0 0 24 24" {...this.props}>
            {/* eslint-disable */}
            <path d="M22 3H7c-.69 0-1.23.35-1.59.88L0 12l5.41 8.11c.36.53.97.89 1.66.89H22c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 13.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm5 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm5 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
          </BaseIcon>
        );
      case 'more_vert':
        return (
          <BaseIcon viewBox="0 0 24 24" {...this.props}>
            {/* eslint-disable */}
            <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
          </BaseIcon>
        );
      case 'archive':
        return (
          <BaseIcon viewBox="0 0 24 24" {...this.props}>
            {/* eslint-disable */}
            <path d="M20.54 5.23l-1.39-1.68C18.88 3.21 18.47 3 18 3H6c-.47 0-.88.21-1.16.55L3.46 5.23C3.17 5.57 3 6.02 3 6.5V19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6.5c0-.48-.17-.93-.46-1.27zM12 17.5L6.5 12H10v-2h4v2h3.5L12 17.5zM5.12 5l.81-1h12l.94 1H5.12z" />
          </BaseIcon>
        );
      case 'account':
        return (
          <BaseIcon viewBox="0 0 24 24" {...this.props}>
            {/* eslint-disable */}
            <path d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z" />
          </BaseIcon>
        );
      // case 'logout':
      //   return (
      //     <BaseIcon viewBox="0 0 24 24" {...this.props}>
      //       {/* eslint-disable */}
      //       <path d="M14.08,15.59L16.67,13H7V11H16.67L14.08,8.41L15.5,7L20.5,12L15.5,17L14.08,15.59M19,3A2,2 0 0,1 21,5V9.67L19,7.67V5H5V19H19V16.33L21,14.33V19A2,2 0 0,1 19,21H5C3.89,21 3,20.1 3,19V5C3,3.89 3.89,3 5,3H19Z" />
      //     </BaseIcon>
      //   );
      case 'lock':
        return (
          <BaseIcon viewBox="0 0 24 24" {...this.props}>
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </BaseIcon>
        );
      case 'login':
        return (
          <BaseIcon viewBox="0 0 24 24" {...this.props}>
            <g>
              <path
                d="M14 22h5a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2h-5"
                stroke={this.props.color}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
              <path
                stroke={this.props.color}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M11 16l4-4-4-4M15 12H3"
              />
            </g>
          </BaseIcon>
        );
      case 'logout':
        return (
          <BaseIcon viewBox="0 0 24 24" {...this.props}>
            <path
              d="M10 22H5a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h5M17 16l4-4-4-4M21 12H9"
              stroke={this.props.color}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1"
            />
          </BaseIcon>
        );
      case 'dashboard':
        return (
          <BaseIcon viewBox="0 0 24 24" {...this.props}>
            {/* eslint-disable */}
            <path d="M13,3V9H21V3M13,21H21V11H13M3,21H11V15H3M3,13H11V3H3V13Z" />
          </BaseIcon>
        );
      case 'arrow-left':
        return (
          <BaseIcon viewBox="0 0 6 9" {...this.props}>
            {/* eslint-disable */}
            <g>
              <title>Path 2</title>
              <path
                d="M5.122 0L1 4.365l4.122 4.234"
                stroke="currentColor"
                fill="none"
                fillRule="evenodd"
              />
            </g>
          </BaseIcon>
        );
      case 'users':
        return (
          <BaseIcon viewBox="0 0 24 24" {...this.props}>
            <g>
              <path
                d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"
                stroke={this.props.color}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
              <circle
                cx="9"
                cy="7"
                r="4"
                fill="none"
                stroke={this.props.color}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
              <path
                d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"
                stroke={this.props.color}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
            </g>
          </BaseIcon>
        );
      case 'datepicker-arrow':
        return (
          <BaseIcon viewBox="0 0 8 13" {...this.props}>
            {/* eslint-disable */}
            <g>
              <title>Data-picker-arrow</title>
              <path
                d="M7.954 6.248L.995 12.999 0 12.037l5.928-5.751L.014.957 1.008 0l5.911 5.325 1.035.923"
                fill="currentColor"
                fillRule="evenodd"
              />
            </g>
          </BaseIcon>
        );
      case 'bold':
        return (
          <BaseIcon viewBox="0 0 20 20" {...this.props}>
            {/* eslint-disable */}
            <path d="M3 19V1h8a5 5 0 0 1 3.88 8.16A5.5 5.5 0 0 1 11.5 19H3zm7.5-8H7v5h3.5a2.5 2.5 0 1 0 0-5zM7 4v4h3a2 2 0 1 0 0-4H7z" />
          </BaseIcon>
        );
      case 'italic':
        return (
          <BaseIcon viewBox="0 0 20 20" {...this.props}>
            {/* eslint-disable */}
            <path d="M8 1h9v2H8V1zm3 2h3L8 17H5l6-14zM2 17h9v2H2v-2z" />
          </BaseIcon>
        );
      case 'underline':
        return (
          <BaseIcon viewBox="0 0 20 20" {...this.props}>
            {/* eslint-disable */}
            <path d="M16 9A6 6 0 1 1 4 9V1h3v8a3 3 0 0 0 6 0V1h3v8zM2 17h16v2H2v-2z" />
          </BaseIcon>
        );
      case 'align-left':
        return (
          <BaseIcon viewBox="0 0 20 20" {...this.props}>
            {/* eslint-disable */}
            <path d="M1 1h18v2H1V1zm0 8h18v2H1V9zm0 8h18v2H1v-2zM1 5h12v2H1V5zm0 8h12v2H1v-2z" />
          </BaseIcon>
        );
      case 'align-right':
        return (
          <BaseIcon viewBox="0 0 20 20" {...this.props}>
            {/* eslint-disable */}
            <path d="M1 1h18v2H1V1zm0 8h18v2H1V9zm0 8h18v2H1v-2zM7 5h12v2H7V5zm0 8h12v2H7v-2z" />
          </BaseIcon>
        );
      case 'align-center':
        return (
          <BaseIcon viewBox="0 0 20 20" {...this.props}>
            {/* eslint-disable */}
            <path d="M1 1h18v2H1V1zm0 8h18v2H1V9zm0 8h18v2H1v-2zM4 5h12v2H4V5zm0 8h12v2H4v-2z" />
          </BaseIcon>
        );
      case 'justify':
        return (
          <BaseIcon viewBox="0 0 20 20" {...this.props}>
            {/* eslint-disable */}
            <path d="M1 1h18v2H1V1zm0 8h18v2H1V9zm0 8h18v2H1v-2zM1 5h18v2H1V5zm0 8h18v2H1v-2z" />
          </BaseIcon>
        );
      case 'outdent':
        return (
          <BaseIcon viewBox="0 0 20 20" {...this.props}>
            {/* eslint-disable */}
            <path d="M1 1h18v2H1V1zm6 8h12v2H7V9zm-6 8h18v2H1v-2zM7 5h12v2H7V5zm0 8h12v2H7v-2zM5 6v8l-4-4 4-4z" />
          </BaseIcon>
        );
      case 'indent':
        return (
          <BaseIcon viewBox="0 0 20 20" {...this.props}>
            {/* eslint-disable */}
            <path d="M1 1h18v2H1V1zm6 8h12v2H7V9zm-6 8h18v2H1v-2zM7 5h12v2H7V5zm0 8h12v2H7v-2zM1 6l4 4-4 4V6z" />
          </BaseIcon>
        );
      case 'unordered':
        return (
          <BaseIcon viewBox="0 0 20 20" {...this.props}>
            {/* eslint-disable */}
            <path d="M4 10.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zm0-6c-.83 0-1.5.67-1.5 1.5S3.17 7.5 4 7.5 5.5 6.83 5.5 6 4.83 4.5 4 4.5zm0 12c-.83 0-1.5.68-1.5 1.5s.68 1.5 1.5 1.5 1.5-.68 1.5-1.5-.67-1.5-1.5-1.5zM7 19h14v-2H7v2zm0-6h14v-2H7v2zm0-8v2h14V5H7z" />
          </BaseIcon>
        );
      case 'ordered':
        return (
          <BaseIcon viewBox="0 0 20 20" {...this.props}>
            {/* eslint-disable */}
            <path d="M2 17h2v.5H3v1h1v.5H2v1h3v-4H2v1zm1-9h1V4H2v1h1v3zm-1 3h1.8L2 13.1v.9h3v-1H3.2L5 10.9V10H2v1zm5-6v2h14V5H7zm0 14h14v-2H7v2zm0-6h14v-2H7v2z" />
          </BaseIcon>
        );
      case 'color':
        return (
          <BaseIcon viewBox="0 0 20 20" {...this.props}>
            {/* eslint-disable */}
            <path
              d="M9 20v-1.7l.01-.24L15.07 12h2.94c1.1 0 1.99.89 1.99 2v4a2 2 0 0 1-2 2H9zm0-3.34V5.34l2.08-2.07a1.99 1.99 0 0 1 2.82 0l2.83 2.83a2 2 0 0 1 0 2.82L9 16.66zM0 1.99C0 .9.89 0 2 0h4a2 2 0 0 1 2 2v16c0 1.1-.89 2-2 2H2a2 2 0 0 1-2-2V2zM4 17a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"
              fill="none"
              stroke={this.props.color}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            />
          </BaseIcon>
        );
      case 'embedded':
        return (
          <BaseIcon viewBox="5.81276e-7 3.05420e-8 16.9999 16.9999" {...this.props}>
            {/* eslint-disable */}
            <g transform="matrix(0.03320299834012985, 0, 0, 0.03320299834012985, -2.842170943040401e-14, 0)">
              <g>
                <path d="M202.042,199.238c-6.938-2.103-14.268,1.82-16.371,8.759l-55.138,182.045c-2.102,6.938,1.82,14.268,8.759,16.37&#10;&#9;&#9;&#9;c1.27,0.385,2.549,0.568,3.811,0.568c5.633,0,10.841-3.656,12.56-9.326l55.138-182.045&#10;&#9;&#9;&#9;C212.901,208.668,208.981,201.338,202.042,199.238z" />
              </g>
            </g>
            <g transform="matrix(0.03320299834012985, 0, 0, 0.03320299834012985, -2.842170943040401e-14, 0)">
              <g>
                <path d="M268.994,199.238c-6.93-2.103-14.268,1.82-16.37,8.759l-55.138,182.045c-2.102,6.938,1.82,14.268,8.759,16.37&#10;&#9;&#9;&#9;c1.269,0.385,2.549,0.568,3.811,0.568c5.633,0,10.841-3.656,12.56-9.326l55.138-182.045&#10;&#9;&#9;&#9;C279.857,208.668,275.935,201.338,268.994,199.238z" />
              </g>
            </g>
            <g transform="matrix(0.03320299834012985, 0, 0, 0.03320299834012985, -2.842170943040401e-14, 0)">
              <g>
                <path d="M498.872,0H13.128C5.878,0,0,5.879,0,13.128v485.744C0,506.121,5.878,512,13.128,512h485.744&#10;&#9;&#9;&#9;c7.249,0,13.128-5.879,13.128-13.128V13.128C512,5.879,506.121,0,498.872,0z M105.026,26.256h301.949v52.513H105.026V26.256z&#10;&#9;&#9;&#9; M26.256,26.256h52.513v52.513H26.256V26.256z M485.744,485.744H26.256V105.026h459.487V485.744z M485.744,78.769h-52.513V26.256&#10;&#9;&#9;&#9;h52.513V78.769z" />
              </g>
            </g>
            <g transform="matrix(0.03320299834012985, 0, 0, 0.03320299834012985, -2.842170943040401e-14, 0)">
              <g>
                <circle cx="93.867" cy="245.064" r="13.128" />
              </g>
            </g>
            <g transform="matrix(0.03320299834012985, 0, 0, 0.03320299834012985, -2.842170943040401e-14, 0)">
              <g>
                <circle cx="93.867" cy="360.592" r="13.128" />
              </g>
            </g>
            <g transform="matrix(0.03320299834012985, 0, 0, 0.03320299834012985, -2.842170943040401e-14, 0)">
              <g>
                <path d="M429.292,380.718H307.2c-7.249,0-13.128,5.879-13.128,13.128c0,7.249,5.879,13.128,13.128,13.128h122.092&#10;&#9;&#9;&#9;c7.249,0,13.128-5.879,13.128-13.128C442.421,386.597,436.542,380.718,429.292,380.718z" />
              </g>
            </g>
            <g transform="matrix(0.03320299834012985, 0, 0, 0.03320299834012985, -2.842170943040401e-14, 0)" />
            <g transform="matrix(0.03320299834012985, 0, 0, 0.03320299834012985, -2.842170943040401e-14, 0)" />
            <g transform="matrix(0.03320299834012985, 0, 0, 0.03320299834012985, -2.842170943040401e-14, 0)" />
            <g transform="matrix(0.03320299834012985, 0, 0, 0.03320299834012985, -2.842170943040401e-14, 0)" />
            <g transform="matrix(0.03320299834012985, 0, 0, 0.03320299834012985, -2.842170943040401e-14, 0)" />
            <g transform="matrix(0.03320299834012985, 0, 0, 0.03320299834012985, -2.842170943040401e-14, 0)" />
            <g transform="matrix(0.03320299834012985, 0, 0, 0.03320299834012985, -2.842170943040401e-14, 0)" />
            <g transform="matrix(0.03320299834012985, 0, 0, 0.03320299834012985, -2.842170943040401e-14, 0)" />
            <g transform="matrix(0.03320299834012985, 0, 0, 0.03320299834012985, -2.842170943040401e-14, 0)" />
            <g transform="matrix(0.03320299834012985, 0, 0, 0.03320299834012985, -2.842170943040401e-14, 0)" />
            <g transform="matrix(0.03320299834012985, 0, 0, 0.03320299834012985, -2.842170943040401e-14, 0)" />
            <g transform="matrix(0.03320299834012985, 0, 0, 0.03320299834012985, -2.842170943040401e-14, 0)" />
            <g transform="matrix(0.03320299834012985, 0, 0, 0.03320299834012985, -2.842170943040401e-14, 0)" />
            <g transform="matrix(0.03320299834012985, 0, 0, 0.03320299834012985, -2.842170943040401e-14, 0)" />
            <g transform="matrix(0.03320299834012985, 0, 0, 0.03320299834012985, -2.842170943040401e-14, 0)" />
          </BaseIcon>
        );
      case 'emoji':
        return (
          <BaseIcon viewBox="15.7289 22.0824 17 17" {...this.props}>
            {/* eslint-disable */}
            <g transform="matrix(0.1655159890651703, 0, 0, 0.1655159890651703, 16.585067749023438, 22.938426971435547)">
              <path d="M 79.285 13.084 C 61.031 -5.172 31.332 -5.172 13.081 13.08 C -5.173 31.331 -5.171 61.031 13.083 79.286 C 31.332 97.537 61.031 97.537 79.283 79.283 C 97.536 61.031 97.535 31.333 79.285 13.084 Z M 74.177 74.178 C 58.741 89.614 33.625 89.616 18.187 74.18 C 2.748 58.742 2.75 33.622 18.187 18.186 C 33.623 2.751 58.74 2.749 74.179 18.188 C 89.615 33.623 89.613 58.743 74.177 74.178 Z M 28.721 33.513 C 28.721 30.492 31.171 28.042 34.192 28.042 C 37.213 28.042 39.663 30.491 39.663 33.513 C 39.663 36.536 37.213 38.986 34.192 38.986 C 31.171 38.986 28.721 36.536 28.721 33.513 Z M 53.53 33.513 C 53.53 30.492 55.982 28.042 59.004 28.042 C 62.024 28.042 64.474 30.491 64.474 33.513 C 64.474 36.536 62.025 38.986 59.004 38.986 C 55.982 38.986 53.53 36.536 53.53 33.513 Z M 66.465 55.922 C 63.075 63.764 55.134 68.83 46.236 68.83 C 37.147 68.83 29.159 63.738 25.885 55.857 C 25.324 54.508 25.964 52.959 27.314 52.397 C 27.646 52.26 27.99 52.196 28.329 52.196 C 29.367 52.196 30.352 52.808 30.774 53.827 C 33.224 59.727 39.293 63.537 46.236 63.537 C 53.021 63.537 59.054 59.724 61.606 53.821 C 62.187 52.48 63.745 51.861 65.087 52.442 C 66.427 53.024 67.046 54.581 66.465 55.922 Z" />
            </g>
          </BaseIcon>
        );
      case 'link':
        return (
          <BaseIcon viewBox="0 0 24 24" {...this.props}>
            {/* eslint-disable */}
            <path d="M16,6H13V7.9H16C18.26,7.9 20.1,9.73 20.1,12A4.1,4.1 0 0,1 16,16.1H13V18H16A6,6 0 0,0 22,12C22,8.68 19.31,6 16,6M3.9,12C3.9,9.73 5.74,7.9 8,7.9H11V6H8A6,6 0 0,0 2,12A6,6 0 0,0 8,18H11V16.1H8C5.74,16.1 3.9,14.26 3.9,12M8,13H16V11H8V13Z" />
          </BaseIcon>
        );
      case 'unlink':
        return (
          <BaseIcon viewBox="0 0 24 24" {...this.props}>
            {/* eslint-disable */}
            <path d="M2,5.27L3.28,4L20,20.72L18.73,22L13.9,17.17L11.29,19.78C9.34,21.73 6.17,21.73 4.22,19.78C2.27,17.83 2.27,14.66 4.22,12.71L5.71,11.22C5.7,12.04 5.83,12.86 6.11,13.65L5.64,14.12C4.46,15.29 4.46,17.19 5.64,18.36C6.81,19.54 8.71,19.54 9.88,18.36L12.5,15.76L10.88,14.15C10.87,14.39 10.77,14.64 10.59,14.83C10.2,15.22 9.56,15.22 9.17,14.83C8.12,13.77 7.63,12.37 7.72,11L2,5.27M12.71,4.22C14.66,2.27 17.83,2.27 19.78,4.22C21.73,6.17 21.73,9.34 19.78,11.29L18.29,12.78C18.3,11.96 18.17,11.14 17.89,10.36L18.36,9.88C19.54,8.71 19.54,6.81 18.36,5.64C17.19,4.46 15.29,4.46 14.12,5.64L10.79,8.97L9.38,7.55L12.71,4.22M13.41,9.17C13.8,8.78 14.44,8.78 14.83,9.17C16.2,10.54 16.61,12.5 16.06,14.23L14.28,12.46C14.23,11.78 13.94,11.11 13.41,10.59C13,10.2 13,9.56 13.41,9.17Z" />
          </BaseIcon>
        );
      case 'image':
        return (
          <BaseIcon viewBox="0 0 24 24" {...this.props}>
            {/* eslint-disable */}
            <path d="M20,5A2,2 0 0,1 22,7V17A2,2 0 0,1 20,19H4C2.89,19 2,18.1 2,17V7C2,5.89 2.89,5 4,5H20M5,16H19L14.5,10L11,14.5L8.5,11.5L5,16Z" />
          </BaseIcon>
        );
      case 'eraser':
        return (
          <BaseIcon viewBox="0 0 24 24" {...this.props}>
            {/* eslint-disable */}
            <path d="M16.24,3.56L21.19,8.5C21.97,9.29 21.97,10.55 21.19,11.34L12,20.53C10.44,22.09 7.91,22.09 6.34,20.53L2.81,17C2.03,16.21 2.03,14.95 2.81,14.16L13.41,3.56C14.2,2.78 15.46,2.78 16.24,3.56M4.22,15.58L7.76,19.11C8.54,19.9 9.8,19.9 10.59,19.11L14.12,15.58L9.17,10.63L4.22,15.58Z" />
          </BaseIcon>
        );
      case 'history':
        return (
          <BaseIcon viewBox="0 0 24 24" {...this.props}>
            {/* eslint-disable */}
            <path d="M11,7V12.11L15.71,14.9L16.5,13.62L12.5,11.25V7M12.5,2C8.97,2 5.91,3.92 4.27,6.77L2,4.5V11H8.5L5.75,8.25C6.96,5.73 9.5,4 12.5,4A7.5,7.5 0 0,1 20,11.5A7.5,7.5 0 0,1 12.5,19C9.23,19 6.47,16.91 5.44,14H3.34C4.44,18.03 8.11,21 12.5,21C17.74,21 22,16.75 22,11.5A9.5,9.5 0 0,0 12.5,2Z" />
          </BaseIcon>
        );
      case 'undo':
        return (
          <BaseIcon viewBox="0 0 24 24" {...this.props}>
            {/* eslint-disable */}
            <path d="M13.5,7A6.5,6.5 0 0,1 20,13.5A6.5,6.5 0 0,1 13.5,20H10V18H13.5C16,18 18,16 18,13.5C18,11 16,9 13.5,9H7.83L10.91,12.09L9.5,13.5L4,8L9.5,2.5L10.92,3.91L7.83,7H13.5M6,18H8V20H6V18Z" />
          </BaseIcon>
        );
      case 'redo':
        return (
          <BaseIcon viewBox="0 0 24 24" {...this.props}>
            {/* eslint-disable */}
            <path d="M10.5,7A6.5,6.5 0 0,0 4,13.5A6.5,6.5 0 0,0 10.5,20H14V18H10.5C8,18 6,16 6,13.5C6,11 8,9 10.5,9H16.17L13.09,12.09L14.5,13.5L20,8L14.5,2.5L13.08,3.91L16.17,7H10.5M18,18H16V20H18V18Z" />
          </BaseIcon>
        );
      case 'strikethrough':
        return (
          <BaseIcon viewBox="0 0 24 24" {...this.props}>
            {/* eslint-disable */}
            <path d="M23,12V14H18.61C19.61,16.14 19.56,22 12.38,22C4.05,22.05 4.37,15.5 4.37,15.5L8.34,15.55C8.37,18.92 11.5,18.92 12.12,18.88C12.76,18.83 15.15,18.84 15.34,16.5C15.42,15.41 14.32,14.58 13.12,14H1V12H23M19.41,7.89L15.43,7.86C15.43,7.86 15.6,5.09 12.15,5.08C8.7,5.06 9,7.28 9,7.56C9.04,7.84 9.34,9.22 12,9.88H5.71C5.71,9.88 2.22,3.15 10.74,2C19.45,0.8 19.43,7.91 19.41,7.89Z" />
          </BaseIcon>
        );
      case 'monospace':
        return (
          <BaseIcon viewBox="0 0 24 24" {...this.props}>
            {/* eslint-disable */}
            <path d="M8,3A2,2 0 0,0 6,5V9A2,2 0 0,1 4,11H3V13H4A2,2 0 0,1 6,15V19A2,2 0 0,0 8,21H10V19H8V14A2,2 0 0,0 6,12A2,2 0 0,0 8,10V5H10V3M16,3A2,2 0 0,1 18,5V9A2,2 0 0,0 20,11H21V13H20A2,2 0 0,0 18,15V19A2,2 0 0,1 16,21H14V19H16V14A2,2 0 0,1 18,12A2,2 0 0,1 16,10V5H14V3H16Z" />
          </BaseIcon>
        );
      case 'subscript':
        return (
          <BaseIcon viewBox="0 0 24 24" {...this.props}>
            {/* eslint-disable */}
            <path d="M16,7.41L11.41,12L16,16.59L14.59,18L10,13.41L5.41,18L4,16.59L8.59,12L4,7.41L5.41,6L10,10.59L14.59,6L16,7.41M21.85,21.03H16.97V20.03L17.86,19.23C18.62,18.58 19.18,18.04 19.56,17.6C19.93,17.16 20.12,16.75 20.13,16.36C20.14,16.08 20.05,15.85 19.86,15.66C19.68,15.5 19.39,15.38 19,15.38C18.69,15.38 18.42,15.44 18.16,15.56L17.5,15.94L17.05,14.77C17.32,14.56 17.64,14.38 18.03,14.24C18.42,14.1 18.85,14 19.32,14C20.1,14.04 20.7,14.25 21.1,14.66C21.5,15.07 21.72,15.59 21.72,16.23C21.71,16.79 21.53,17.31 21.18,17.78C20.84,18.25 20.42,18.7 19.91,19.14L19.27,19.66V19.68H21.85V21.03Z" />
          </BaseIcon>
        );
      case 'superscript':
        return (
          <BaseIcon viewBox="0 0 24 24" {...this.props}>
            {/* eslint-disable */}
            <path d="M16,7.41L11.41,12L16,16.59L14.59,18L10,13.41L5.41,18L4,16.59L8.59,12L4,7.41L5.41,6L10,10.59L14.59,6L16,7.41M21.85,9H16.97V8L17.86,7.18C18.62,6.54 19.18,6 19.56,5.55C19.93,5.11 20.12,4.7 20.13,4.32C20.14,4.04 20.05,3.8 19.86,3.62C19.68,3.43 19.39,3.34 19,3.33C18.69,3.34 18.42,3.4 18.16,3.5L17.5,3.89L17.05,2.72C17.32,2.5 17.64,2.33 18.03,2.19C18.42,2.05 18.85,2 19.32,2C20.1,2 20.7,2.2 21.1,2.61C21.5,3 21.72,3.54 21.72,4.18C21.71,4.74 21.53,5.26 21.18,5.73C20.84,6.21 20.42,6.66 19.91,7.09L19.27,7.61V7.63H21.85V9Z" />
          </BaseIcon>
        );
      case 'external-link':
        return (
          <BaseIcon viewBox="0 0 24 24" {...this.props}>
            {/* eslint-disable */}
            <path d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z" />
          </BaseIcon>
        );
      case 'plus2':
        return (
          <BaseIcon viewBox="0 0 31 31" {...this.props}>
            {/* eslint-disable */}
            <g>
              <title>upload-logo</title>
              <g fill="currentColor" fillRule="evenodd">
                <path d="M.5 16H31v-1H0v1z" />
                <path d="M15 .5V31h1V0h-1z" />
              </g>
            </g>
          </BaseIcon>
        );
      case 'replace':
        return (
          <BaseIcon viewBox="0 0 717 1024" {...this.props}>
            {/* eslint-disable */}
            <g>
              <path d="M481.311 665.782l153.6 153.6v-36.204l-153.6 153.6c-9.997 9.997-9.997 26.206 0 36.204s26.206 9.997 36.204 0l153.6-153.6c9.997-9.997 9.997-26.206 0-36.204l-153.6-153.6c-9.997-9.997-26.206-9.997-36.204 0s-9.997 26.206 0 36.204z" />
              <path d="M653.012 775.68h-281.6c-155.513 0-281.6-126.087-281.6-281.6 0-14.138-11.462-25.6-25.6-25.6s-25.6 11.462-25.6 25.6c0 183.79 149.01 332.8 332.8 332.8h281.6c14.138 0 25.6-11.462 25.6-25.6s-11.462-25.6-25.6-25.6zM236.209 370.689L82.609 204.09v34.705l153.6-166.599c9.584-10.395 8.926-26.59-1.469-36.174s-26.59-8.926-36.174 1.469L44.966 204.09c-9.038 9.803-9.038 24.902 0 34.705l153.6 166.599c9.584 10.395 25.779 11.052 36.174 1.469s11.052-25.779 1.469-36.174z" />
              <path d="M63.788 247.043h281.6c155.027 0 281.6 137.285 281.6 307.599 0 14.138 11.462 25.6 25.6 25.6s25.6-11.462 25.6-25.6c0-197.704-148.525-358.799-332.8-358.799h-281.6c-14.138 0-25.6 11.462-25.6 25.6s11.462 25.6 25.6 25.6z" />
            </g>
          </BaseIcon>
        );
      case 'trash':
        return (
          <BaseIcon viewBox="0 0 390 445" {...this.props}>
            <g>
              <g fill="currentColor">
                <path d="M181 184h28v193h-28zM124 184h28v193h-28zM238 184h29v193h-29z" />
                <path d="M267 65V9H124v56H9v29h29v343h314V94h29V65H267zM152 36h86v30h-86V36zm172 373H67V94h257v315z" />
              </g>
            </g>
          </BaseIcon>
        );
    }
  }

  render() {
    const { className, kind, onClick } = this.props;
    return this.renderIcon(kind);
  }
}
