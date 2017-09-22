/* @flow */
import React from 'react';
import styled from 'styled-components';
import cn from 'classnames';
// internal
import { StyleClasses } from '@boldr/ui/theme/styleClasses';

const DetailLabel = styled.div`
  font-size: 1.4em;
  margin-right: 20px;
`;

type Props = {
  className?: string,
  label: string,
  detail: string,
};
const BASE_ELEMENT = StyleClasses.PROFILE_DETAIL;
const ProfileDetail = (props: Props) => {
  const classes = cn(BASE_ELEMENT, props.className);
  return (
    <li className={classes}>
      <DetailLabel>{props.label}</DetailLabel> <span>{props.detail}</span>
    </li>
  );
};

export default ProfileDetail;
