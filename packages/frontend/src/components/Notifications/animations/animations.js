import { keyframes } from 'styled-components';

const TRANSLATEX = 60;

export const verticalShow = (height, animatedMargin) =>
  keyframes`
    0% {
      margin-${animatedMargin}: ${-height}px;
      opacity: 0;
    }
    100% {
      margin-${animatedMargin}: 0px;
      opacity: 1;
    }
  `;

export const verticalHide = (height, animatedMargin) =>
  keyframes`
    0% {
      margin-${animatedMargin}: 0px;
      opacity: 1;
    }
    100% {
      margin-${animatedMargin}: ${-height}px;
      opacity: 0;
    }
  `;

export const horizontalShow = (height, animatedMargin, slideFromSide) =>
  keyframes`
    0% {
      margin-${animatedMargin}: ${-height}px;
      opacity: 0;
      transform: translateX(${slideFromSide === 'left' ? -TRANSLATEX : TRANSLATEX}%);
    }
    50% {
      margin-${animatedMargin}: 0;
      opacity: 0;
      transform: translateX(${slideFromSide === 'left' ? -TRANSLATEX : TRANSLATEX}%);
    }
    100% {
      margin-${animatedMargin}: 0;
      opacity: 1;
      transform: translateX(0%);
    }
  `;

export const horizontalHide = (height, animatedMargin, slideFromSide) =>
  keyframes`
    0%{
      margin-${animatedMargin}: 0;
      opacity: 1;
      transform: translateX(0%);
    }
    50% {
      margin-${animatedMargin}: 0;
      opacity: 0;
      transform: translateX(${slideFromSide === 'left' ? -TRANSLATEX : TRANSLATEX}%);
    }
    100% {
      margin-${animatedMargin}: ${-height}px;
      opacity: 0;
      transform: translateX(${slideFromSide === 'left' ? -TRANSLATEX : TRANSLATEX}%);
    }
  `;
