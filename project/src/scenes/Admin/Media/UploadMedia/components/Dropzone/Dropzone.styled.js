/* eslint-disable no-unused-vars */
import styled from 'styled-components';

export const UploadOpt = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 65px;
  color: gray;
  background-color: #f1f1f1;
  border: none;
  margin: 10px 0;
  outline: ${props => (props.highlighted ? '2px dashed #0a66b7' : ' 2px dashed #eaeaea')};
  outline-offset: -10px;
  font-size: 15px;
  cursor: pointer;
`;

export const UploadLabel = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 15px;
  cursor: pointer;

  span {
    padding: 0 20px;
  }
`;

export const UploadInput = styled.input`
  position: absolute;
  z-index: -1;
  overflow: hidden;
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
`;
