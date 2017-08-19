import styled from 'styled-components';

export const DropdownWrapper = styled.div`
  height: 30px;
  background: #fff;
  border: 1px solid #e5e5e5;
  border-radius: 2px;
  margin: 0 3px;
  width: ${props => (props.isSkinny ? '60px' : '120px')};
  text-transform: capitalize;
  cursor: pointer;
  a {
    color: rgba(0, 0, 0, 0.87);
  }

  &:focus {
    outline: none;
  }

  &:hover {
    background-color: #fff;
    box-shadow: 1px 1px 0px #bfbdbd;
  }

  &:active {
    box-shadow: 1px 1px 0px #bfbdbd inset;
  }
`;
export const DropdownOptionWrapper = styled.ul`
  position: relative;
  z-index: 100;
  overflow-y: scroll;
  width: 98%;
  max-height: 250px;
  padding: 0;
  background: #fff;
  border: 1px solid #f1f1f1;
  border-radius: 2px;
  margin: 0;
`;
export const DropdownSelectedText = styled.a`
  position: relative;
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 5px;
`;

export const CaretOpen = styled.div`
  position: absolute;
  top: 35%;
  right: 10%;
  width: 0;
  height: 0;
  border-top: 6px solid black;
  border-right: 5px solid transparent;
  border-left: 5px solid transparent;
`;
export const CaretClosed = styled.div`
  position: absolute;
  top: 35%;
  right: 10%;
  width: 0;
  height: 0;
  border-right: 5px solid transparent;
  border-bottom: 6px solid black;
  border-left: 5px solid transparent;
`;
