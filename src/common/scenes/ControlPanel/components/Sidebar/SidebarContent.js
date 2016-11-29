import React, { PureComponent } from 'react';
import { Menu, Dropdown } from 'semantic-ui-react';
import Link from 'react-router/lib/Link';
import { BoldrLogo } from 'components/index';
import Titlebar from './Titlebar';

const styles = {
  sidebar: {
    width: 200,
    height: '100vh',
    overflow: 'hidden',
  },
};

type Props = {
  style: Object
};

  const SidebarContent = (props: Props) => {
    const style = props.style ? { ...styles.sidebar, ...props.style } : styles.sidebar;
    return (
      <Titlebar style={ style }>
        <BoldrLogo height="100px" width="120px" />
        <div className="sidebar__inner">
          <Menu vertical>
            <Menu.Item>
              <Menu.Header>Menu</Menu.Header>
             <Menu.Menu>
               <Menu.Item><Link to="/">Home</Link></Menu.Item>
               <Menu.Item><Link to="/cp">Dashboard</Link></Menu.Item>
               <Menu.Item><Link to="/cp/members">Members</Link></Menu.Item>
             </Menu.Menu>
           </Menu.Item>
            <Menu.Item>
              <Menu.Header>Posts</Menu.Header>
               <Menu.Menu>
                 <Menu.Item><Link to="/cp/posts">Post Listing</Link></Menu.Item>
                 <Menu.Item><Link to="/cp/posts/new">New Post</Link></Menu.Item>
               </Menu.Menu>
             </Menu.Item>
             <Menu.Item>
               <Menu.Header>Media</Menu.Header>
               <Menu.Menu>
                 <Menu.Item><Link to="/cp/filemanager">File Manager</Link></Menu.Item>
                 <Menu.Item><Link to="/cp/filemanager">Galleries</Link></Menu.Item>
               </Menu.Menu>
             </Menu.Item>
             <Menu.Item>
               <Menu.Header>Build</Menu.Header>
               <Menu.Menu>
               <Menu.Item><Link to="/cp/blocks">Blocks</Link></Menu.Item>
                 <Menu.Item><Link to="/cp/navigation">Navigation</Link></Menu.Item>
                 <Menu.Item><Link to="/cp/pages">Pages</Link></Menu.Item>
               </Menu.Menu>
             </Menu.Item>
             <Menu.Item>
               <Menu.Header>Configuration</Menu.Header>
               <Menu.Menu>
                 <Menu.Item><Link to="/cp/settings">Settings</Link></Menu.Item>
               </Menu.Menu>
             </Menu.Item>
           </Menu>
      </div>
    </Titlebar>
  );
}

export default SidebarContent;
