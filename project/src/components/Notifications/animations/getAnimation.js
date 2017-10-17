import { horizontalShow, horizontalHide, verticalShow, verticalHide } from './animations';

const getAnimation = props => {
  const { isVisible, animatedMargin, slideFromSide, notificationHeight } = props;
  if (slideFromSide === 'left' || slideFromSide === 'right') {
    return isVisible
      ? horizontalShow(notificationHeight, animatedMargin, slideFromSide)
      : horizontalHide(notificationHeight, animatedMargin, slideFromSide);
  }
  return isVisible
    ? verticalShow(notificationHeight, animatedMargin)
    : verticalHide(notificationHeight, animatedMargin);
};

export default getAnimation;
