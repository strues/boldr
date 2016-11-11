import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Menu, Dropdown } from 'semantic-ui-react';
import { BoldrLogo } from 'components/index';
import {
  postListClicked, postEditorClicked, dashboardClicked,
  fileManagerClicked, membersClicked, settingsClicked, homeClicked,
  navigationClicked, contentClicked, pagesClicked, blocksClicked,
} from '../../reducer';
import Titlebar from './Titlebar';

const styles = {
  sidebar: {
    width: 200,
    height: '100vh',
    overflow: 'hidden',
  },
};

type Props = {
  postListClicked?: Function,
  postEditorClicked?: Function,
  dashboardClicked?: Function,
  fileManagerClicked?: Function,
  membersClicked?: Function,
  settingsClicked?: Function,
  homeClicked?: Function,
  navigationClicked?: Function,
  pagesClicked?: Function,
  contentClicked?: Function,
  blocksClicked?: Function,
  style: Object
}

class SidebarContent extends PureComponent {
  props: Props;
  render() {
    const style = this.props.style ? { ...styles.sidebar, ...this.props.style } : styles.sidebar;

    return (
      <Titlebar style={ style }>
        <BoldrLogo height="100px" width="120px" />
        <div className="sidebar__inner">
          <Menu vertical>
            <Menu.Item>
              <Menu.Header>Menu</Menu.Header>
             <Menu.Menu>
               <Menu.Item onClick={ this.props.homeClicked }>Home </Menu.Item>
               <Menu.Item onClick={ this.props.dashboardClicked }>Dashboard </Menu.Item>
               <Menu.Item onClick={ this.props.membersClicked }>Members</Menu.Item>
             </Menu.Menu>
           </Menu.Item>
            <Menu.Item>
              <Menu.Header>Posts</Menu.Header>
               <Menu.Menu>
                 <Menu.Item onClick={ this.props.postListClicked }>Post Listing</Menu.Item>
                 <Menu.Item onClick={ this.props.postEditorClicked }>New Post</Menu.Item>
               </Menu.Menu>
             </Menu.Item>

             <Menu.Item>
               <Menu.Header>Media</Menu.Header>

               <Menu.Menu>
                 <Menu.Item onClick={ this.props.fileManagerClicked }>File Manager</Menu.Item>
                 <Menu.Item onClick={ this.props.fileManagerClicked }>Galleries</Menu.Item>
               </Menu.Menu>
             </Menu.Item>
             <Menu.Item>
               <Menu.Header>Build</Menu.Header>

               <Menu.Menu>
               <Menu.Item onClick={ this.props.blocksClicked }>
                 Blocks
               </Menu.Item>
                 <Menu.Item onClick={ this.props.navigationClicked }>
                   Navigation
                 </Menu.Item>
                 <Menu.Item onClick={ this.props.navigationClicked }>
                   Links
                 </Menu.Item>
                 <Menu.Item onClick={ this.props.pagesClicked }>
                   Pages
                 </Menu.Item>
               </Menu.Menu>
             </Menu.Item>
             <Menu.Item>
               <Menu.Header>Configuration</Menu.Header>

               <Menu.Menu>
                 <Menu.Item onClick={ this.props.settingsClicked }>Settings</Menu.Item>
               </Menu.Menu>
             </Menu.Item>
           </Menu>
      </div>
    </Titlebar>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    postListClicked, postEditorClicked, dashboardClicked,
    fileManagerClicked, membersClicked, settingsClicked, homeClicked, navigationClicked,
    contentClicked, pagesClicked, blocksClicked }, dispatch);
};

export default connect(null, mapDispatchToProps)(SidebarContent);
