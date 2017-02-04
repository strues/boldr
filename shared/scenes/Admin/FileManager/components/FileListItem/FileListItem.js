import React, { PropTypes } from 'react';
import styled from 'styled-components';

const Wrapper = styled.section`
  display: table;
  width: 100%;
  margin-bottom: 10px;
  box-shadow: 0 4px 5px 0 rgba(0, 0, 0, .14), 0 1px 10px 0 rgba(0, 0, 0, .12), 0 2px 4px -1px rgba(0, 0, 0, .4);
  background-color: #fff;
`;
const ImgWrapper = styled.div`
  position: relative;
  overflow: hidden;
  display: table-cell;
  width: 40%;
`;
const Content = styled.div`
  padding: 1.5rem;
  vertical-align: middle;
  display: table-cell;
  padding: 3rem;
`;

const Img = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  min-width: 100%;
  min-height: 100%;
  width: auto;
  height: auto;
  max-width: none;
`;

const FileListItem = props => {
  return (
    <Wrapper>
      <ImgWrapper>
        <Img src={ props.imgSrc } />
      </ImgWrapper>
      <Content>
        { props.children }
      </Content>
    </Wrapper>
  );
};

FileListItem.propTypes = {
  children: PropTypes.node.isRequired,
  /**
   * A function which returns the media element to render in the background.
   * It recieves an props object which should be propagated to the JSX element.
   */
  imgSrc: PropTypes.string.isRequired,
};

export default FileListItem;
