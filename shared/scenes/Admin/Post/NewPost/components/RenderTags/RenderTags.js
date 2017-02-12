import React from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form';
import styled from 'styled-components';
import Button from 'react-md/lib/Buttons';
import FontIcon from 'react-md/lib/FontIcons';
import { TextField } from '../../../../../../components';

const TagList = styled.ul`
  list-style-type: none;
  display: flex;
`;

const TagItem = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  vertical-align: middle;
`;

const RenderTags = ({ fields, meta: { touched, error } }) => (
  <TagList>
    <TagItem>
      <Button secondary flat onClick={ () => fields.push('') } label="Add Tag">add</Button>
      { touched && error && <span>{ error }</span>}
    </TagItem>
    {
      fields.map((name, index) =>
      <TagItem key={ index }>
        <Button onClick={ () => fields.remove(index) } icon primary>delete_forever</Button>
        <Field
          id={ `tag${index}` }
          name={ name }
          type="text"
          label="tag"
          component={ TextField }
        />
      </TagItem>)
    }
  </TagList>
);

export default RenderTags;
