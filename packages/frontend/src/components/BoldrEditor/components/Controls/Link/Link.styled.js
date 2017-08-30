import styled from 'styled-components';

export const LinkWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  margin-bottom: 5px;
`;

export const LinkModal = styled.div`
  position: absolute;
  top: 35px;
  left: 5px;
  z-index: 100;
  display: flex;
  flex-direction: column;
  width: 235px;
  height: 205px;
  padding: 15px;
  color: #f1f1f1;
  background-color: #243140;
  border-radius: 3px;
  box-shadow: 2px 10px 30px rgba(#000, 0.3);
`;

export const LinkInput = styled.input`
  height: 25px;
  padding: 0 5px;
  border: 1px solid #f1f1f1;
  border-radius: 2px;
  margin-top: 5px;
  margin-bottom: 15px;
`;
export const LinkModalBtnSection = styled.span`margin: 0 auto;`;
export const LinkModalOption = styled.span`
  margin-bottom: 20px;

  > span {
    margin-left: 5px;
  }
`;

export const LinkLabel = styled.span`font-size: 15px;`;

export const LinkModalBtn = styled.button`
  width: 75px;
  height: 30px;
  background: #fff;
  border: 1px solid #f1f1f1;
  border-radius: 2px;
  margin-left: 10px;
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
