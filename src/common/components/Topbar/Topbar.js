import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

const styled = require('styled-components').default;

const Logo = styled.div`
  vertical-align: middle;
  margin-right: 25px;
  left: 10px;
  position: absolute;

  @media all and (min-width: 768px) {
    left: 150px;
  }
`;

const NavItems = styled.ul`
  list-style: none;
  display: flex;
  margin: 0;
  flex-direction: row;
  justify-content: space-between;
`;

const NavItem = styled.li`
  transition: all .1s ease;
  padding: 20px 24px;
  font-size: 1em;

  @media all and (min-width: 768px) {
    float: left;
  }
`;

const Container = styled.div`
  align-items: center;
  max-width: 1000px;
  margin: 0 auto;
  @media all and (min-width: 768px) {
    justify-content: center;
    display: flex;
    padding: 0 2%;
  }
`;

  /**
   * @method renderAuthenticated
   * shows the menu with options for authenticated users
   */


const Topbar = (props) => {
  if (!props.navigation) {
    return (
      <span>Loading...</span>
    );
  }
  const renderedMenuItems = props.navigation.links.map((item, i) =>
    <NavItem key={ item.id } >
    <FlatButton labelStyle={ { color: '#fff' } } label={ item.name } href={ item.href } />
  </NavItem>,
  );
  const renderAuthenticated = (
    <NavItem>
     <IconMenu
       iconButtonElement={
         <IconButton><MoreVertIcon /></IconButton>
       }
       targetOrigin={ { horizontal: 'right', vertical: 'top' } }
       anchorOrigin={ { horizontal: 'right', vertical: 'top' } }
     >
       <MenuItem onClick={ props.handleDashClick } primaryText="Dashboard" />
       <MenuItem onClick={ props.handleProfClick } primaryText="Profile" />
       <MenuItem primaryText="Preferences" onClick={ props.handlePrefClick } />
       <MenuItem primaryText="Logout" onClick={ props.handleLogoutClick } />
     </IconMenu>
   </NavItem>
   );

  return (
    <Container>
      <Logo>
        <img src={ props.logo.value } className="ph-logo" />
      </Logo>
      <NavItems>
        { renderedMenuItems }
        { props.auth.isAuthenticated ? null :
          <NavItem>
            <RaisedButton primary label="Login" href="/account/login" />
          </NavItem>
        }
        { props.auth.isAuthenticated ? null :
          <NavItem>
            <RaisedButton secondary label="Sign Up" href="/account/signup" />
          </NavItem>
        }
      { props.auth.isAuthenticated ? renderAuthenticated : null }
      </NavItems>
    </Container>
  );
};

export default Topbar;
