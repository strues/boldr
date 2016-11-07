import React from 'react';

const styles = {
  root: {
    fontFamily: '"Roboto", "Helvetica Neue", Helvetica, Arial, sans-serif',
    fontWeight: 300,
    alignItems: 'center',
  },
  header: {
    backgroundColor: '#1f2225',
    color: '#fff',
    marginBottom: '15px',
    fontSize: '1.5em',
    display: 'flex',
  },
};

const Titlebar = (props) => {
  const rootStyle = props.style ? { ...styles.root, ...props.style } : styles.root;

  return (
    <div style={ rootStyle }>
      <div style={ styles.header }>{ props.icon } { props.title } </div>
      {props.children}
    </div>
  );
};

Titlebar.propTypes = {
  style: React.PropTypes.object,
  title: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.object,
  ]),
  icon: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.object,
  ]),
  children: React.PropTypes.object,
};

export default Titlebar;
