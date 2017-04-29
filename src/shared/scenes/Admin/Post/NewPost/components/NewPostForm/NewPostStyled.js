import React from 'react';
import styled from 'styled-components';

const Inner = styled.div`
  padding: 2rem;
`;

const NewPost = styled.section`
  width: 100%;
  margin-top: 30px;
  padding-bottom: 50px;
`;
const Toolbar = styled.div`
  width: 100%;
  height: 50px;
  background-color: #66bb6a;
  color: #fff;
  line-height: 24px;
  vertical-align: middle;
  font-size: 18px;
  font-weight: 600;
  padding-left: 1rem;
  display: flex;
  align-items: center;
`;

export { NewPost, Toolbar, Inner, Wrapper };
