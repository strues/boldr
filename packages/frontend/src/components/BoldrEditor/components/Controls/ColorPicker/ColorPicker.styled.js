import styled from 'styled-components';

export const ColorWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  margin-bottom: 5px;
`;

export const ColorModal = styled.div`
  position: absolute;
  top: 35px;
  left: 0;
  z-index: 100;
  color: #f1f1f1;
  display: flex;
  flex-direction: column;
  width: 250px;
  padding: 15px;
  background-color: #243140;
  border-radius: 3px;
  box-shadow: 2px 10px 30px rgba(#000, .3);
`;

export const ColorHeader = styled.span`
  display: flex;
  padding-bottom: 5px;
`;

export const ColorModalLabel = styled.span`
  width: 50%;
  padding: 0 10px 5px;
  font-size: 15px;
  text-align: center;
  cursor: pointer;
  border-bottom: ${props => (props.active ? '2px solid #0a66b7' : 'none')};
`;

export const ColorOptions = styled.span`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  height: 100%;
  margin: 0 auto;
`;
