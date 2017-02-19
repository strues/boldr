import React from 'react';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import SelectField from 'react-md/lib/SelectFields';
import Button from 'react-md/lib/Buttons';
import InputField from '../../../../../components/Form/InputField';

type Props = {
  handleSubmit?: Function,
  reset?: Function,
  submitting?: boolean,
  fields?: Object,
  pristine?: boolean,
  input: Object,
};

const style = {
  margin: 12,
};

let NavigationForm = (props: Props) => { // eslint-disable-line
  const { handleSubmit, reset, hasDropdownValue } = props;
  const opts = [{ itemValue: true, label: 'Yes' }, { itemValue: false, label: 'No' }];
  const renderDropSelector = ({ input }) => (
    <div>
      <SelectField
        { ...input }
        id="drop"
        label="Has Dropdown"
        placeholder="Select a role"
        menuItems={ opts }
        itemLabel="label"
        itemValue="has_dropdown.itemValue"
        className="md-cell"
      />
    </div>
  );
  return (
    <form className="form__navigation" onSubmit={ handleSubmit }>
      <Field id="nav-name" name="name" component={ InputField } type="text" label="Name" />
      <Field id="nav-position" name="order" component={ InputField } type="text" label="Display Order" />
      <Field id="nav-link" name="href" component={ InputField } type="text" label="Link" />
      <Field id="nav-icon" name="icon" component={ InputField } type="text" label="Icon" />
      <label>What type of menu item?</label><br />
      <label style={ { marginRight: '10px' } }>
        <Field id="draft" name="has_dropdown" component="input" type="radio" value="false" /> Single Link</label>
      <label>
        <Field id="published" name="has_dropdown" component="input" type="radio" value="true" /> Dropdown Menu
      </label>
      { hasDropdownValue === 'true' && <div>has a drop</div>}
      <div className="form__footer">
        <Button type="submit" label="Save" style={ style } raised primary />
        <Button label="Reset" onClick={ reset } style={ style } raised secondary />
      </div>
    </form>
  );
};
NavigationForm = reduxForm({
  form: 'navigationForm',
})(NavigationForm);

const selector = formValueSelector('navigationForm');
NavigationForm = connect(
  state => {
    const hasDropdownValue = selector(state, 'has_dropdown');
    return {
      hasDropdownValue,
    };
  },
)(NavigationForm);

export default NavigationForm;
