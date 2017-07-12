/* @flow */
import React from 'react';
import styled from 'styled-components';

const NotificationWrap = styled.div`
  width: 100%;
  overflow: hidden;
  display: flex;
  position: relative;
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  border-radius: 3px;
`;
const NotificationInner = styled.div`
  flex: 1 0 auto;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NotificationText = styled.div`margin-right: 12px;`;

export type Props = {
  hideNotification: Function,
  options?: Object,
};
// Your custom notification component
const Notif = ({ options, hideNotification }: Props) => {
  const { type, text } = options;
  return (
    <NotificationWrap>
      <NotificationInner>
        <NotificationText>
          {text}
        </NotificationText>
        <button onClick={hideNotification}>Click to close</button>
      </NotificationInner>
    </NotificationWrap>
  );
};

export default Notif;
