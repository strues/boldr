/* eslint-disable import/no-mutable-exports, react/no-array-index-key */
import React from 'react';
import styled from 'styled-components';
import { Field, reduxForm, formValueSelector, FieldArray } from 'redux-form';
import { connect } from 'react-redux';
import Button from '@boldr/ui/Button';
import { InputField, FontIcon } from '@boldr/ui';

type Props = {
  handleSubmit?: Function,
  reset?: Function,
  submitting?: boolean,
  fields: ?Array<Object>,
  pristine?: boolean,
  input: Object,
  hasDropdownValue: boolean,
};

const style = {
  margin: 12,
};

const DetailsList = styled.ul`
  list-style-type: none;
  padding-left: 0;
`;

const DetailsListItem = styled.li`padding-left: 0;`;

const renderMenuDetails = ({ fields }: Props) =>
  <DetailsList>
    <DetailsListItem>
      <Button kind="secondary" onClick={() => fields.push({})}>
        Add Menu Detail
      </Button>
    </DetailsListItem>
    {fields.map((items, index) =>
      <DetailsListItem key={index}>
        <IconButton style={{ float: 'right' }} onClick={() => fields.remove(index)}>
          <FontIcon>close</FontIcon>
        </IconButton>
        <Field id="name" name={`${items}.name`} type="text" component={InputField} label="Name" />
        <Field id="href" name={`${items}.href`} type="text" component={InputField} label="URL" />
        <Field id="icon" name={`${items}.icon`} type="text" component={InputField} label="Icon" />
      </DetailsListItem>,
    )}
  </DetailsList>;
let NavigationForm = (props: Props) => {
  // eslint-disable-line
  const { handleSubmit, reset, hasDropdownValue } = props;

  return (
    <form className="form__navigation" onSubmit={handleSubmit}>
      <Field id="nav-name" name="name" component={InputField} type="text" label="Name" />
      <Field
        id="nav-position"
        name="order"
        component={InputField}
        type="text"
        label="Display Order"
      />
      <Field id="nav-link" name="href" component={InputField} type="text" label="Link" />
      <Field id="nav-icon" name="icon" component={InputField} type="text" label="Icon" />
      <label htmlFor="menuType">What type of menu item?</label>
      <br />
      <label htmlFor="single" style={{ marginRight: '10px' }}>
        <Field
          id="hasDropdown"
          name="hasDropdown"
          component="input"
          type="radio"
          value="false"
        />{' '}
        Single Link
      </label>
      <label htmlFor="dropdown">
        <Field
          id="dropdownHasDropdown"
          name="hasDropdown"
          component="input"
          type="radio"
          value="true"
        />{' '}
        Dropdown Menu
      </label>
      {hasDropdownValue === 'true' &&
        <div>
          <Field id="nav-key" name="key" component={InputField} type="text" label="Key" />
          <FieldArray id="nav-items" name="items" component={renderMenuDetails} />
        </div>}

      <div className="form__footer">
        <Button htmlType="submit" style={style} kind="primary">
          Save
        </Button>
        <Button onClick={reset} style={style} kind="secondary">
          Reset
        </Button>
      </div>
    </form>
  );
};
NavigationForm = reduxForm({
  form: 'navigationForm',
})(NavigationForm);

const selector = formValueSelector('navigationForm');
NavigationForm = connect(state => {
  const hasDropdownValue = selector(state, 'hasDropdown');
  return {
    hasDropdownValue,
  };
})(NavigationForm);

export default NavigationForm;
