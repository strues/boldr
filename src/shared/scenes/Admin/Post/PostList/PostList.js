/* @flow */
import React, { Component } from 'react';
import Link from 'react-router-dom/Link';
import { Card, Avatar, Button } from 'boldr-ui';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import Griddle, {
  plugins,
  RowDefinition,
  ColumnDefinition,
  // $FlowIssue
} from 'griddle-react';

import { format } from 'date-fns';

type Props = {
  posts: Array<Post>,
  handleDeleteClick: Function,
};

class PostList extends Component {
  state = {
    posts: this.props.posts,
  };
  componentWillReceiveProps(nextProps: Object) {
    if (nextProps.posts) {
      this.setState({ posts: nextProps.posts });
    }
  }

  props: Props;

  render() {
    return (
      <div>
        <Helmet title="Admin: Post List" />
        <Card tableCard>

          <Griddle
            plugins={[plugins.LocalPlugin]}
            resultsPerPage={10}
            data={this.state.posts}
            showFilter
          >
            <RowDefinition>
              <ColumnDefinition
                id="featureImage"
                title="Feature Image"
                customComponent={AvatarColumn}
              />
              <ColumnDefinition
                id="title"
                title="Title"
                customComponent={enhancedWithRowData(TitleColumn)}
              />
              <ColumnDefinition
                id="createdAt"
                title="Created"
                customComponent={DateColumn}
              />
              <ColumnDefinition
                id="published"
                title="Status"
                customComponent={PublishColumn}
              />

            </RowDefinition>
          </Griddle>
        </Card>
      </div>
    );
  }
}

export default PostList;

const PublishColumn = ({ value }) => (
  <span>
    {value === true ? 'Published' : 'Draft'}
  </span>
);

const DateColumn = ({ value }) => <span>{format(value, 'MM/DD/YY')}</span>;

const AvatarColumn = ({ value }) => <Avatar src={value} />;

const rowDataSelector = (state, { griddleKey }) => {
  return state
    .get('data')
    .find(rowMap => rowMap.get('griddleKey') === griddleKey)
    .toJSON();
};

const enhancedWithRowData = connect((state, props) => {
  return {
    rowData: rowDataSelector(state, props),
  };
});

function TitleColumn({ value, griddleKey, rowData }) {
  return (
    <div className="TitleColumn">
      <strong>
        <Link to={`/admin/post-editor/${rowData.slug}`}>{value}</Link>
      </strong>
    </div>
  );
}
