/* @flow */
import React, { Component } from 'react';
import { List, ListItem } from 'material-ui/List';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import { grey400, darkBlack, lightBlack } from 'material-ui/styles/colors';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import { Row, Col } from '../../../components';
import type { Tag } from '../../../types/models';

type Props = {
  tags: Array<Tag>,
  handleTagClick: Function
};
const iconButtonElement = (
<IconButton
  touch
  tooltip="more"
  tooltipPosition="bottom-left"
>
  <MoreVertIcon color={ grey400 } />
</IconButton>
);

const rightIconMenu = (
  <IconMenu iconButtonElement={ iconButtonElement }>
    <MenuItem>Reply</MenuItem>
    <MenuItem>Forward</MenuItem>
    <MenuItem>Delete</MenuItem>
  </IconMenu>
);

class Tags extends Component {
  constructor() {
    super();

    (this: any).handleClick = this.handleClick.bind(this);
  }
  handleClick(tag: Object) {
    this.props.handleTagClick(tag);
  }
  props: Props;
  render() {
    return (
    <div>
      {
        this.props.tags.map(tag =>
          <ListItem
            key={ tag.id }
            primaryText={ tag.name }
            rightIconButton={ rightIconMenu }
            secondaryText={ tag.description }
            onClick={ () => this.handleClick(tag) }
          />)
      }
    </div>
    );
  }
}

export default Tags;
