import React from 'react';

const SelectField = ({ input, elements, label }) => (
  <div>
    <label style={ { fontSize: 20 } }>{label}</label>
    <select className="ui dropdown" { ...input }>
      <option>Choose...</option>
      { elements.map((element, index) =>
        <option key={ index }>{element}</option>,
      )}
    </select>
  </div>
);

export default SelectField;
