import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Menu } from 'semantic-ui-react';
import {
  postListClicked, postEditorClicked, dashboardClicked,
  fileManagerClicked, membersClicked, settingsClicked, homeClicked,
  navigationClicked, contentClicked, pagesClicked, blocksClicked
} from '../../reducer';
import Titlebar from './Titlebar';

const styles = {
  sidebar: {
    width: 200,
    height: '100vh',
    overflow: 'hidden'
  }
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

class SidebarContent extends Component {
  props: Props;
  render() {
    const style = this.props.style ? { ...styles.sidebar, ...this.props.style } : styles.sidebar;

    return (
      <Titlebar style={ style }>
        <div className="sidebar__inner">
          <Menu vertical>
          <Menu.Item>
            <Menu.Header>Menu</Menu.Header>
             <Menu.Menu>
               <Menu.Item name="Home" onClick={ this.props.homeClicked } />
               <Menu.Item name="Dashboard" onClick={ this.props.dashboardClicked } />
             </Menu.Menu>
           </Menu.Item>
            <Menu.Item>
              <Menu.Header>Posts</Menu.Header>
               <Menu.Menu>
                 <Menu.Item name="Post Listing" onClick={ this.props.postListClicked } />
                 <Menu.Item name="New Post" onClick={ this.props.postEditorClicked } />
               </Menu.Menu>
             </Menu.Item>

             <Menu.Item>
               <Menu.Header>Media</Menu.Header>

               <Menu.Menu>
                 <Menu.Item name="File Manager" onClick={ this.props.fileManagerClicked } />
                 <Menu.Item name="Galleries" onClick={ this.props.fileManagerClicked } />
               </Menu.Menu>
             </Menu.Item>
             <Menu.Item>
               <Menu.Header>Build</Menu.Header>

               <Menu.Menu>
               <Menu.Item name="Blocks" onClick={ this.props.blocksClicked }>
                 Blocks
               </Menu.Item>
                 <Menu.Item name="Navigation" onClick={ this.props.navigationClicked }>
                   Navigation
                 </Menu.Item>
                 <Menu.Item name="Links" onClick={ this.props.navigationClicked }>
                   Links
                 </Menu.Item>
                 <Menu.Item name="Pages" onClick={ this.props.pagesClicked }>
                   Pages
                 </Menu.Item>
               </Menu.Menu>
             </Menu.Item>
             <Menu.Item>
               <Menu.Header>Configuration</Menu.Header>

               <Menu.Menu>
                 <Menu.Item name="Settings" onClick={ this.props.settingsClicked } />
                 <Menu.Item name="Members" onClick={ this.props.membersClicked } />
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
