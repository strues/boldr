/* @flow */
import React, { Component } from 'react';
import { format } from 'date-fns';
import { connect } from 'react-redux';
import Link from 'react-router/lib/Link';
import Avatar from 'react-md/lib/Avatars';
import Paper from 'react-md/lib/Papers';
import Button from 'react-md/lib/Buttons/Button';
import Card from 'react-md/lib/Cards/Card';
import CardText from 'react-md/lib/Cards/CardText';
import TableCardHeader from 'react-md/lib/DataTables/TableCardHeader';
import SelectionControl from 'react-md/lib/SelectionControls/SelectionControl';
import type { Post } from '../../../../types/models';
import { KebabMenu } from '../../../../components';
import { selectPost } from '../../../../state/modules/blog/posts/actions';
import { PostTable } from '../components';

export type Props = {
  posts: Array<Post>,
  post: Post,
  id: String,
  handleDeleteClick: Function,
  handleArticlePublishClick: Function,
  handleArticleDraftClick: Function,
  _handleRowToggle: Function,
  dispatch: Function,
};

type State = {
  count: Number,
};

class PostList extends Component {
  constructor(props) {
    super(props);

    (this: any).state = { count: 0 };

    (this: any)._handleRowToggle = this._handleRowToggle.bind(this);
  }
  state: State;

  _handleRowToggle(row, toggled, count) {
    console.log(toggled);
    this.setState({ count });
  }
  props: Props;
  render() {
    const { count } = this.state;
    const kebab = (
      <KebabMenu id="kebab" items={ ['Something', 'Something Else'] } />
    );
    const contextualActions = [<Button key="btn" icon>delete</Button>, kebab];
    const leftChildren = [
      <Button flat primary label="Add" key="add-row" style={ { marginLeft: 8 } } />,
      <Button flat primary label="Remove" key="remove-row" />,
    ];
    return (
      <div>
        <Card tableCard>
          <TableCardHeader
            title="Post Listing"
            visible={ count > 0 }
            contextualTitle={ `${count} item${count > 1 ? 's' : ''} selected` }
            leftChildren={ null }
            actions={ contextualActions }
          >
            <Button icon>filter_list</Button>
            {kebab}
          </TableCardHeader>
          <PostTable posts={ this.props.posts } onRowToggle={ this._handleRowToggle } />
        </Card>
      </div>
    );
  }
}

export default connect()(PostList);
