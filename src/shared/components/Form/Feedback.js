// @flow
import React from 'react';
import styled from 'styled-components';

type Props = {
  meta: Object,
};

const Feedback = (props: Props) => {
  if (!props.meta) {
    return null;
  }

  const { meta } = props;
  const showError = meta.touched && meta.error && meta.invalid;
  return (
    <InputErrorContainer>

      {meta.error && <div className="boldrui-form__error">{meta.error}</div>}
      {meta.warning &&
        <div className="boldrui-form__warning">{meta.warning}</div>}
    </InputErrorContainer>
  );
};

export default Feedback;

const InputErrorContainer = styled.div`
  position: relative;
  top: -1.15rem;
`;

const InputErrorRed = styled.div`
  padding: 10px 20px;
  background: #fee7e8;
  color: #cc0726;
  font-size: 14px;
  border: 1px solid #cc0726;
  border-top: none;
  border-bottom-right-radius: 3px;
  border-bottom-left-radius: 3px;
  overflow: hidden;
`;
