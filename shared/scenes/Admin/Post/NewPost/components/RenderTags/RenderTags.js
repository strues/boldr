import React, { PropTypes } from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form';
import styled from 'styled-components';
import Button from 'react-md/lib/Buttons';
import FontIcon from 'react-md/lib/FontIcons';
import { InputField } from '../../../../../../components';

const TagList = styled.ul`
  list-style-type: none;
  display: flex;
  padding-left: 0;
`;

const TagItem = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  vertical-align: middle;
  padding-left: 0;
`;

const RenderTags = ({ fields, meta: { touched, error } }) => (
  <div>
    <Button secondary flat onClick={ () => fields.push('') } style={ { marginBottom: 17 } } label="Add Tag">add</Button>
  <TagList>
    {
      fields.map((name, index) =>
      <TagItem key={ index }>
        <Button onClick={ () => fields.remove(index) } icon primary>close</Button>
        <Field
          id={ `tag${index}` }
          name={ name }
          type="text"
          label="tag"
          component={ InputField }
        />
      </TagItem>)
    }
  </TagList>
</div>
);

export default RenderTags;
