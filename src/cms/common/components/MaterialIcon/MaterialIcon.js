import React from 'react'
import './icon.scss';
const MaterialIcon = (props) => {
  return (
      <i className={`material-icons ${props.class}`} style={props.style}>
        {props.type}
      </i>
    );
}

MaterialIcon.defaultProps = {
  class: '',
  style: {}
}

export default MaterialIcon;

