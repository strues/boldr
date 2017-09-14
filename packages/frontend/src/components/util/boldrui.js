// @flow weak
/* eslint-disable */
import React from 'react';
import classNames from 'classnames';
import { combineModifiers, getDomSafeProps, isBetween, is, isOption } from './helpers';

export const isMobile = is({ mobile: true });
export const isTablet = is({ tablet: true });
export const isTouch = is({ touch: true });
export const isDesktop = is({ desktop: true });
export const isWidescreen = is({ widescreen: true });
export const isFullHD = is({ fullhd: true });

const isTabletOnly = is({ 'tablet-only': true });
const isDesktopOnly = is({ 'desktop-only': true });

export const isLeft = is({ left: true });
export const isRight = is({ right: true });
export const isCentered = is({ centered: true });

export const isCenter = is({ center: true });
export const isFullWidth = is({ fullwidth: true });

const isColor = is({
  white: true,
  light: true,
  dark: true,
  black: true,
  primary: true,
  info: true,
  success: true,
  warning: true,
  danger: true,
});

const isSmall = is({ small: true });
const isMedium = is({ medium: true });
const isLarge = is({ large: true });

const isAllPlatforms = isOption(
  isMobile,
  isTablet,
  isDesktop,
  isTouch,
  isWidescreen,
  isTabletOnly,
  isDesktopOnly,
);
const isAlign = isOption(isLeft, isCentered, isRight);
const isSize = isOption(isSmall, isMedium, isLarge);

export function getAlignmentModifiers({ isAlign: align }) {
  return isAlign(align) ? { [`is-${align}`]: true } : {};
}

export function removeAlignmentProps(props) {
  const { isAlign, ...rest } = props;
  return rest;
}

export function getSizeModifiers({ isSize: size }) {
  return isSize(size) ? { [`is-${size}`]: true } : {};
}

export function removeSizeProps(props) {
  const { isSize, ...rest } = props;
  return rest;
}

function getFullWidthModifiers(props) {
  return {
    'is-fullwidth': props.isFullWidth,
  };
}
function getFullHeightModifiers(props) {
  return {
    'is-fullheight': props.isFullHeight,
  };
}
function removeFullHeightProps(props) {
  const { isFullHeight, ...rest } = props;
  return rest;
}

function removeFullWidthProps(props) {
  const { isFullWidth, ...rest } = props;
  return rest;
}

export function getActiveModifiers(props) {
  return { 'is-active': props.isActive };
}

export function removeActiveModifiers(props) {
  const { isActive, ...rest } = props;
  return rest;
}

export function getFocusedModifiers(props) {
  return { 'is-focused': props.isFocused };
}

export function removeFocusedModifiers(props) {
  const { isFocused, ...rest } = props;
  return rest;
}

export function getHoveredModifiers(props) {
  return { 'is-hovered': props.isHovered };
}

export function removeHoveredModifiers(props) {
  const { isHovered, ...rest } = props;
  return rest;
}

export function getStateModifiers(props) {
  return {
    ...getActiveModifiers(props),
    ...getFocusedModifiers(props),
    ...getHoveredModifiers(props),
  };
}

export function removeStateProps(props) {
  const { isActive, isFocused, isHovered, ...rest } = props;
  return rest;
}

export function getLoadingModifiers(props) {
  return {
    'is-loading': props.isLoading,
  };
}

export function removeLoadingProps(props) {
  const { isLoading, ...rest } = props;
  return rest;
}

export function getColorModifiers({ isColor: color }) {
  return isColor(color) ? { [`is-${color}`]: true } : {};
}

export function removeColorProps(props) {
  const { isColor, ...rest } = props;
  return rest;
}

const isValidHeading = isBetween(1, 6);

export function getHeadingModifiers({ isSpaced, isSize: size }) {
  const isSize = isValidHeading(size) ? { [`is-${size}`]: true } : {};

  return {
    ...isSize,
    'is-spaced': isSpaced,
  };
}

export function removeHeadingProps(props) {
  const { isSize, isSpaced, ...rest } = props;
  return rest;
}

const isFlex = is({ flex: true });
const isBlock = is({ block: true });
const isInline = is({ inline: true });
const isInlineBlock = is({ 'inline-block': true });
const isInlineFlex = is({ 'inline-flex': true });

const isDisplay = isOption(isFlex, isBlock, isInline, isInlineBlock, isInlineFlex);

const getShowModifiers = display => {
  const isDefault = str => str === 'default';
  if (typeof display === 'string') {
    return { [`is-${display}`]: true };
  }
  if (Array.isArray(display)) {
    return display.reduce((acc, display) => ({ ...acc, [`is-${display}`]: true }), {});
  }
  if (typeof display === 'object') {
    return Object.keys(display).reduce((acc, key) => {
      if (Array.isArray(display[key])) {
        return display[key].reduce((acc, display) => {
          if (isDefault(display)) {
            return { ...acc, [`is-${key}`]: true };
          }
          return { ...acc, [`is-${key}-${display}`]: true };
        }, acc);
      }
      if (isDefault(display[key])) {
        return { ...acc, [`is-${key}`]: true };
      }
      return isDisplay(key) && isAllPlatforms(display[key])
        ? { ...acc, [`is-${key}-${display[key]}`]: true }
        : acc;
    }, {});
  }
  return {};
};

const getHideModifiers = platform => {
  if (typeof platform === 'boolean') {
    return platform ? { 'is-hidden': true } : {};
  }
  if (typeof platform === 'string') {
    return isAllPlatforms(platform) ? { [`is-hidden-${platform}`]: true } : {};
  }
  if (Array.isArray(platform)) {
    return platform.reduce(
      (acc, platform) =>
        isAllPlatforms(platform) ? { ...acc, [`is-hidden-${platform}`]: true } : acc,
      {},
    );
  }
  return {};
};

const getAlignModifier = (modifier, helper) => {
  return isAlign(modifier) ? { [`${helper}-${modifier}`]: true } : {};
};

const getColorModifier = modifier => {
  return isColor(modifier) ? { [`has-text-${modifier}`]: true } : {};
};

function getHelpersModifiers({
  isDisplay,
  isHidden,
  isPulled,
  isClearfix,
  isOverlay,
  isMarginless,
  isPaddingless,
  isUnselectable,
  hasTextAlign,
  hasTextColor,
}) {
  return {
    ...getShowModifiers(isDisplay),
    ...getHideModifiers(isHidden),
    ...getAlignModifier(isPulled, 'is-pulled'),
    ...getAlignModifier(hasTextAlign, 'has-text'),
    ...getColorModifier(hasTextColor),
    'is-clearfix': isClearfix,
    'is-overlay': isOverlay,
    'is-marginless': isMarginless,
    'is-paddingless': isPaddingless,
    'is-unselectable': isUnselectable,
  };
}

function removeHelpersProps(props) {
  const {
    isDisplay,
    isHidden,
    isClearfix,
    isPulled,
    isOverlay,
    isMarginless,
    isPaddingless,
    isUnselectable,
    hasTextAlign,
    hasTextColor,
    ...rest
  } = props;

  return rest;
}

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name;
}

type Props = {
  className?: string,
};
export function createWrappedComponent(Component) {
  const Wrapped = (props: Props) => {
    const className = classNames(
      {
        ...combineModifiers(
          props,
          getHelpersModifiers,
          getFullWidthModifiers,
          getFullHeightModifiers,
        ),
      },
      props.className,
    );

    const rest = getDomSafeProps(
      props,
      removeHelpersProps,
      removeFullWidthProps,
      removeFullHeightProps,
    );

    return className ? <Component {...rest} className={className} /> : <Component {...rest} />;
  };

  Wrapped.displayName = `boldruiComponent(${getDisplayName(Component)})`;

  return Wrapped;
}
