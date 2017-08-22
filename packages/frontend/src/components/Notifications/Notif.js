/* @flow */
import React from 'react';
import styled from 'styled-components';
import Button from '@boldr/ui/Button';
import Times from '@boldr/icons/Times';

const NotificationWrap = styled.div`
  position: relative;
  box-sizing: border-box;
  overflow: hidden;
  max-height: 400px;
  min-width: 425px;
  padding: 0.5rem;
  font-family: ${props => props.theme.fontFamily.header};
  font-weight: 400;
  background-color: ${props =>
    props.type === 'error' ? `${props.theme.palette.danger}` : `${props.theme.palette.success}`};
  color: ${props => props.theme.fontColor.dark};
  border-radius: 4px;
  box-shadow: 0 0 1px 1px rgba(10, 10, 11, 0.125);
  margin-bottom: 2px;
`;
const NotificationInner = styled.div`
  flex: 1 0 auto;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NotifIcon = styled.div`
  position: absolute;
  right: 5px;
`;

const NotificationText = styled.div`margin-right: 12px;`;

export type Props = {
  hideNotification: Function,
  options: Object,
};
// Your custom notification component
const Notif = ({ options, hideNotification }: Props) => {
  const { type, text } = options;
  return (
    <NotificationWrap type={type}>
      <NotificationInner>
        <NotificationText>
          {text}
        </NotificationText>
        <NotifIcon>
          <Times onClick={hideNotification} color="#222" />
        </NotifIcon>
      </NotificationInner>
    </NotificationWrap>
  );
};

export default Notif;
