/* @flow */
import React from 'react';
import styled from 'styled-components';

const DetailItem = styled.li`
  padding-left: 0;
  display: flex;
  align-items: center;
`;

const DetailLabel = styled.div`
  font-size: 1.4em;
  margin-right: 20px;
`;

type Props = {
  label: ReactElement,
  detail: String,
};

const ProfileDetail = (props: Props) => {
  return (
    <DetailItem>
      <DetailLabel>{ props.label }</DetailLabel> <span>{props.detail}</span>
    </DetailItem>
  );
};

export default ProfileDetail;
