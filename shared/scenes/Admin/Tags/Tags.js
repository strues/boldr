/* @flow */
import React, { Component } from 'react';
import ListItem from 'react-md/lib/Lists/ListItem';
import Paper from 'react-md/lib/Papers';
import { Row, Col } from '../../../components';
import type { Tag } from '../../../types/models';

type Props = {
  tags: Array<Tag>,
  handleTagClick: Function
};

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

            secondaryText={ tag.description }
            onClick={ () => this.handleClick(tag) }
          />)
      }
    </div>
    );
  }
}

export default Tags;
