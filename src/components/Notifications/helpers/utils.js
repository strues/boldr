import { css } from 'styled-components';

export const convertToCssPosition = position => {
  const COORDINATES = ['top', 'right', 'bottom', 'left'];
  return position.map((value, index) => `${COORDINATES[index]}: ${value};`);
};

export const getPosition = css`
  ${props => convertToCssPosition(props.position)}
`;

export const convertToCssDuration = miliseconds => `${(miliseconds / 1000).toString()}s`;

export const getDuration = css`
  animation-duration: ${props => convertToCssDuration(props.animationDuration)};
`;
