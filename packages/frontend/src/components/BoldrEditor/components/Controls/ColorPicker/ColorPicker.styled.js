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
  color: ${props => props.theme.fontColor.light};
  display: flex;
  flex-direction: column;
  width: 250px;
  padding: 15px;
  background-color: ${props => props.theme.palette.primary3};
  border-radius: 3px;
  box-shadow: 2px 10px 30px rgba(#000, .3);
`;
ColorModal.defaultProps = {
  theme: {
    palette: { primary3: '#1B252F' },
    fontColor: { light: '#F7F7F9' },
  },
};
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
  border-bottom: ${props => (props.active ? `2px solid ${props.theme.palette.primary2}` : 'none')};
`;
ColorModalLabel.defaultProps = {
  theme: {
    palette: { primary2: '#3178B7' },
  },
};
export const ColorOptions = styled.span`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  height: 100%;
  margin: 0 auto;
`;
