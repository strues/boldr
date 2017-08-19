import styled from 'styled-components';

export const EmojiModal = styled.div`
  position: absolute;
  top: 35px;
  left: 5px;
  z-index: 100;
  display: flex;
  overflow: auto;
  flex-wrap: wrap;
  width: 235px;
  height: 180px;
  padding: 15px;
  background: #fff;
  border: 1px solid #f1f1f1;
  border-radius: 2px;
`;

export const EmojiIcon = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 24px;
  margin: 2.5px;
  font-size: 22px;
  cursor: pointer;
`;
