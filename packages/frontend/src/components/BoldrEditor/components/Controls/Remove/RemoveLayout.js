/* @flow */

import React from 'react';
import styled from 'styled-components';
import Eraser from '@boldr/icons/Eraser';
import Option from '../../Option';

type Props = {
  config: Object,
  onChange: Function,
};

const RemoveBtn = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  margin-bottom: 5px;
`;

const RemoveLayout = ({ config, onChange }: Props) => {
  const { className, title } = config;
  return (
    <RemoveBtn aria-label="be-remove__control">
      <Option className={className} onClick={onChange} title={title}>
        <Eraser fill="#222" />
      </Option>
    </RemoveBtn>
  );
};

export default RemoveLayout;
