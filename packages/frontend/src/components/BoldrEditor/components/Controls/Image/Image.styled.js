/* eslint-disable no-unused-vars */
import styled from 'styled-components';

export const ImageModal = styled.div`
  position: absolute;
  top: 35px;
  left: 5px;
  z-index: 100;
  display: flex;
  flex-direction: column;
  width: 235px;
  color: #f1f1f1;
  height: 200px;
  padding: 15px;
  background-color: #243140;
  border-radius: 3px;
  box-shadow: 2px 10px 30px rgba(#000, 0.3);
`;

export const ImageHeader = styled.div`
  display: flex;
  margin: 10px 0;
  font-size: 15px;
`;

export const ImageOption = styled.span`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50%;
  cursor: pointer;
`;

export const ImageLabel = styled.span`
  width: 80px;
  background: ${props => (props.highlighted ? '#6eb8d4' : '#f1f1f1')};
  border: 1px solid #f1f1f1;
  border-bottom: ${props => (props.highlighted ? '2px solid #0a66b7' : 'inherit')};
  margin-top: 5px;
`;

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
export const UrlSection = styled.div`display: block;`;
export const UploadUrlInput = styled.input`
  width: 95%;
  height: 35px;
  padding: 0 5px;
  border: 1px solid #f1f1f1;
  border-radius: 2px;
  margin: 30px 0 20px;
  font-size: 15px;
`;
export const SizeSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 8px 0;
`;
export const SizeInput = styled.input`
  width: 45%;
  height: 20px;
  border: 1px solid #f1f1f1;
  border-radius: 2px;
  font-size: 12px;
`;

export const ImageBtnSection = styled.div`margin: 10px auto 0;`;

export const ImageBtn = styled.button`
  width: 75px;
  height: 30px;
  background: white;
  border: 1px solid #f1f1f1;
  border-radius: 2px;
  margin: 0 5px;
  text-transform: capitalize;
  cursor: pointer;

  &:hover {
    box-shadow: 1px 1px 0px #bfbdbd;
  }

  &:active {
    box-shadow: 1px 1px 0px #bfbdbd inset;
  }

  &:focus {
    outline: none !important;
  }

  &:disabled {
    background: #ece9e9;
  }
`;
