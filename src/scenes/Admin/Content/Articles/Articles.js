/* @flow */
import React, { Component } from 'react';
import Link from 'react-router-dom/Link';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { format } from 'date-fns';
import Griddle, { plugins, RowDefinition, ColumnDefinition } from 'griddle-react';
// internal
import Paper from '@boldr/ui/Paper';
import Icon from '@boldr/ui/Icons/Icon';
import Avatar from '@boldr/ui/Avatar';
import Headline from '@boldr/ui/Headline';
import Loader from '@boldr/ui/Loader';

const styleConfig = {
  icons: {
    TableHeadingCell: {
      sortDescendingIcon: <Icon kind="chevron-up" color="#222" size="16px" />,
      sortAscendingIcon: <Icon kind="chevron-down" color="#222" size="16px" />,
    },
  },
};

export type Props = {
  articles: Array<Article>,
  handleDeleteClick: Function,
};

class Articles extends Component {
  state = {
    articles: this.props.articles,
  };
  componentWillReceiveProps(nextProps: Object) {
    if (nextProps.articles) {
      this.setState({ articles: nextProps.articles });
    }
  }

  props: Props;

  render() {
    return (
      <div>
        <Helmet title="Admin: Post List" />
        <Paper zDepth={3}>
          <Griddle
            plugins={[plugins.LocalPlugin]}
            resultsPerPage={10}
            data={this.state.articles}
            styleConfig={styleConfig}
            showFilter
          >
            <RowDefinition>
              <ColumnDefinition
                id="featureImage"
                title="Feature Image"
                order={1}
                sortable={false}
                customComponent={AvatarColumn}
              />
              <ColumnDefinition
                id="title"
                title="Title"
                order={2}
                customComponent={enhancedWithRowData(TitleColumn)}
              />
              <ColumnDefinition
                id="createdAt"
                title="Created"
                order={3}
                customComponent={DateColumn}
              />
              <ColumnDefinition
                id="published"
                title="Status"
                order={4}
                customComponent={PublishColumn}
              />
            </RowDefinition>
          </Griddle>
        </Paper>
      </div>
    );
  }
}

export default Articles;

const PublishColumn = ({ value }) =>
  <span>
    {value === true ? 'Published' : 'Draft'}
  </span>;

const DateColumn = ({ value }) =>
  <span>
    {format(value, 'MM/DD/YY')}
  </span>;

const AvatarColumn = ({ value }) => <Avatar src={value} />;

const rowDataSelector = (state, { griddleKey }) => {
  return state.get('data').find(rowMap => rowMap.get('griddleKey') === griddleKey).toJSON();
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
        <Link to={`/admin/content/articles/${rowData.slug}`}>
          {value}
        </Link>
      </strong>
    </div>
  );
}
