import styled from 'styled-components';

const Inner = styled.div`padding: 2rem;`;

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

const DarkSegment = styled.div`
  margin-bottom: 1.5rem;
  padding: 1.5rem;
  background: #2e363d;
  border-radius: 3px;
  box-shadow: 0 1px 1.5px 0 rgba(0, 0, 0, 0.12), 0 1px 1px 0 rgba(0, 0, 0, 0.24);
`;

const HelpTxt = styled.p`
  font-size: 14px;
  letter-spacing: 0.8;
  color: #fff;
`;

export { NewPost, Toolbar, Inner, DarkSegment, HelpTxt };
