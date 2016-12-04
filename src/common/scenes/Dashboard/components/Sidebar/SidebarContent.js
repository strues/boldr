import React, { PureComponent } from 'react';
import { Menu, Dropdown, Icon } from 'semantic-ui-react';
import Link from 'react-router/lib/Link';
import { BoldrLogo } from 'components/index';
import Titlebar from './Titlebar';

const styles = {
  sidebar: {
    width: 175,
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
               <Menu.Item>
                 <Link to="/"><Icon name="home" /> Home</Link>
               </Menu.Item>
               <Menu.Item>
                 <Link to="/dashboard"><Icon name="dashboard" /> Dashboard</Link>
               </Menu.Item>
               <Menu.Item>
                 <Link to="/dashboard/members"><Icon name="users" /> Members</Link>
               </Menu.Item>
             </Menu.Menu>
           </Menu.Item>
            <Menu.Item>
              <Menu.Header>Posts</Menu.Header>
               <Menu.Menu>
                 <Menu.Item>
                   <Link to="/dashboard/posts"><Icon name="list" /> Post Listing</Link>
                 </Menu.Item>
                 <Menu.Item>
                   <Link to="/dashboard/posts/new"><Icon name="file text outline" /> New Post</Link>
                 </Menu.Item>
               </Menu.Menu>
             </Menu.Item>
             <Menu.Item>
               <Menu.Header>Media</Menu.Header>
               <Menu.Menu>
                 <Menu.Item>
                   <Link to="/dashboard/filemanager"><Icon name="cloud upload" />File Manager</Link>
                 </Menu.Item>
                 <Menu.Item>
                   <Link to="/dashboard/filemanager"><Icon name="image" /> Galleries</Link>
                 </Menu.Item>
               </Menu.Menu>
             </Menu.Item>
             <Menu.Item>
               <Menu.Header>Build</Menu.Header>
               <Menu.Menu>
               <Menu.Item>
                 <Link to="/dashboard/blocks"><Icon name="browser" />Blocks</Link>
               </Menu.Item>
                 <Menu.Item>
                   <Link to="/dashboard/navigation"><Icon name="anchor" />Navigation</Link>
                 </Menu.Item>
                 <Menu.Item>
                   <Link to="/dashboard/pages"><Icon name="columns" /> Pages</Link>
                 </Menu.Item>
               </Menu.Menu>
             </Menu.Item>
             <Menu.Item>
               <Menu.Header>Configuration</Menu.Header>
               <Menu.Menu>
                 <Menu.Item>
                   <Link to="/dashboard/settings"><Icon name="settings" /> Settings</Link>
                 </Menu.Item>
               </Menu.Menu>
             </Menu.Item>
           </Menu>
      </div>
    </Titlebar>
  );
};

export default SidebarContent;
