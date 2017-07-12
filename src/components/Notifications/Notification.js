import styled from 'styled-components';
import { oneOf, number, bool, string } from 'prop-types';
import getAnimation from './animations/getAnimation';
import { getDuration } from './helpers/utils';

const Notification = styled.div`
  position: relative;
  z-index: ${props => (props.isVisible ? 999999 : -1)};
  animation: ${props => getAnimation(props)};
  animation-timing-function: ${props => props.animationEasing};
  animation-fill-mode: forwards;
  ${getDuration};
`;

Notification.propTypes = {
  isVisible: bool.isRequired,
  notificationHeight: number.isRequired,
  animatedMargin: oneOf(['bottom', 'top']).isRequired,
  animationDuration: number.isRequired,
  animationEasing: string.isRequired,
  slideFromSide: oneOf(['left', 'right']),
};

export default Notification;
