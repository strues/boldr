/* @flow */
import React from 'react';
import styled from 'styled-components';
import classnames from 'classnames';
// internal
import { StyleClasses } from '@boldr/ui';

const DetailLabel = styled.div`
  font-size: 1.4em;
  margin-right: 20px;
`;

type Props = {
  className: ?string,
  label: ReactElement,
  detail: string,
};
const BASE_ELEMENT = StyleClasses.PROFILE_DETAIL;
const ProfileDetail = (props: Props) => {
  const classes = classnames(BASE_ELEMENT, props.className);
  return (
    <li className={classes}>
      <DetailLabel>{props.label}</DetailLabel> <span>{props.detail}</span>
    </li>
  );
};

export default ProfileDetail;
