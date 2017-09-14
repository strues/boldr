/* @flow */
import React from 'react';
import type { Node } from 'react';
import styled from 'styled-components';
import Heading from '../../Heading';

type Props = {
  skinny: boolean,
  title: string,
  lightText: boolean,
  form: Node,
  formTitleSize: string,
};

const FormCard = (props: Props) => {
  const FCard = styled.div`
    display: block;
    width: ${props => (props.skinny ? '400px' : '650px')};
    margin: 3rem auto;
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2),
      0 1px 5px 0 rgba(0, 0, 0, 0.12);
    overflow: hidden;
    font-size: 1.4rem;
    background: #fff;
    border-radius: 0.2rem;
    cursor: pointer;
  `;
  return (
    <FCard>
      <FormHeader>
        <Heading isLight={props.lightText} type={props.formTitleSize} text={props.title} />
      </FormHeader>
      <FormInner>{props.form}</FormInner>
    </FCard>
  );
};
const FormInner = styled.div`padding: 1em;`;
const FormHeader = styled.div`
  width: 100%;
  height: 60px;
  justify-content: center;
  display: flex;
  background-color: #00bcd4;
  border: 1px solid #00b4d0;
  align-items: center;
  color: #fff;
`;

FormCard.defaultProps = {
  formTitleSize: 'h3',
  skinny: false,
};

export default FormCard;
