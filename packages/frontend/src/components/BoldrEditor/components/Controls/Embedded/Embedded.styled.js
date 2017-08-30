import styled from 'styled-components';

export const EmbeddedModal = styled.div`
  position: absolute;
  top: 35px;
  left: 5px;
  z-index: 100;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 235px;
  height: 180px;
  padding: 15px;
  color: #f1f1f1;
  background-color: #243140;
  border-radius: 3px;
  box-shadow: 2px 10px 30px rgba(#000, 0.3);
`;

export const EmbeddedHeader = styled.span`
  display: flex;
  font-size: 15px;
`;

export const EmbeddedHeaderOpt = styled.span`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50%;
  cursor: pointer;
`;

export const EmbeddedHeaderLabel = styled.span`
  width: 95px;
  background: #6eb8d4;
  border: 1px solid #f1f1f1;
  border-bottom: 2px solid #0a66b7;
  margin-top: 5px;
`;

export const EmbeddedLinkSection = styled.div`
  display: flex;
  flex-direction: column;
`;

export const EmbeddedSize = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 8px 0;
`;
export const EmbeddedInput = styled.input`
  width: 95%;
  height: 35px;
  padding: 0 5px;
  border: 1px solid #f1f1f1;
  border-radius: 2px;
  margin: 10px 0;
  font-size: 15px;
`;

export const EmbeddedSizeInput = styled.input`
  width: 45%;
  height: 20px;
  border: 1px solid #f1f1f1;
  border-radius: 2px;
  font-size: 12px;
`;

export const EmbeddedBtn = styled.button`
  width: 75px;
  height: 30px;
  background: #fff;
  border: 1px solid #f1f1f1;
  border-radius: 2px;
  margin: 0 3px;
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

export const EmbeddedBtnSection = styled.div`
  display: flex;
  justify-content: center;
`;
