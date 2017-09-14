/* @flow */
import React from 'react';
import cn from 'classnames';
import Tooltip from '../Tooltip';

import Icon from '../Icons';
import BoldrComponent from '../util/BoldrComponent';

export type Props = {
  imageSrc: string,
  iconColor: string,
  editTooltipTxt: string,
  removeTooltipTxt: string,
  onAddImage?: () => void,
  onUpdateImage?: () => void,
  onRemoveImage?: () => void,
};

class ImageDisplay extends BoldrComponent {
  static defaultProps = {
    editTooltipTxt: 'Edit image properties',
    removeTooltipTxt: 'Remove...',
    iconColor: '#eaf7ff',
  };

  props: Props;
  render() {
    const {
      imageSrc,
      onAddImage,
      onUpdateImage,
      onRemoveImage,
      iconColor,
      editTooltipTxt,
      removeTooltipTxt,
    } = this.props;

    const tooltipCommonProps = {
      showDelay: 0,
      hideDelay: 0,
      align: 'center',
      placement: 'top',
      moveBy: { x: 2, y: 0 },
    };
    const classes = cn('boldr-image-display__container', { 'has-logo': imageSrc });
    return (
      <div className={classes}>
        <div data-hook="add-image" className="add-logo" onClick={onAddImage}>
          <div className="dashed-border" />
          <div className="plus-icon">
            <Icon kind="plus" size="1.2em" color={iconColor} />
          </div>
        </div>
        {imageSrc && (
          <div className="boldr-image-display__logo--container">
            <div className="boldr-image-display__layout">
              <img
                data-hook="boldr-image-display-image"
                className="boldr-image-display__image"
                src={imageSrc}
                alt="image thumbnail"
              />
            </div>
            <div className="boldr-image-display__bg">
              <div className="boldr-image-display__btns">
                <Tooltip content={editTooltipTxt} {...tooltipCommonProps}>
                  <div
                    data-hook="update-image"
                    className="boldr-image-display__btn"
                    onClick={onUpdateImage}>
                    <Icon kind="edit" color={iconColor} size="1.2em" />
                  </div>
                </Tooltip>
                <Tooltip content={removeTooltipTxt} {...tooltipCommonProps}>
                  <div
                    data-hook="remove-image"
                    className="boldr-image-display__btn"
                    onClick={onRemoveImage}>
                    <Icon kind="delete" color={iconColor} size="1.2em" />
                  </div>
                </Tooltip>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default ImageDisplay;
