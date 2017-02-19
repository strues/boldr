/* @flow */
/* eslint-disable react/prop-types */
/* eslint-disable  react/jsx-no-bind */
import React from 'react';
import { connect } from 'react-redux';
import Link from 'react-router/lib/Link';
import { format } from 'date-fns';
import Button from 'react-md/lib/Buttons';
import FontIcon from 'react-md/lib/FontIcons';
import Griddle from 'griddle-react';
import Avatar from 'react-md/lib/Avatars';

import type { Post } from '../../../../../../types/models';
import { selectPost } from '../../../../../../state/modules/blog/posts/actions';

type Props = {
  posts: Array<Post>,
  id: String,
  onRowToggle: Function,
  dispatch: Function,
  data: any,
};
const AvatarComp = (props) => {
  return (
    <Avatar src={ props.data } role="presentation" />
  );
};
const LinkComp = (props) => {
  return (
  <Link to={ `/admin/posts/editor/${props.rowData.slug}` }>{ props.data }</Link>
  );
};
const DateComp = (props) => {
  return (
    <span>{ format(props.data, 'MMMM Do YYYY') }</span>
  );
};
const PublishedComp = (props) => {
  return (
    <span>{ props.data === true ? 'Published' : 'Draft' }</span>
  );
};

const DeleteComp = ({ data, rowData, metadata }) => {
  return (
    <Button
      onClick={ metadata.customComponentMetadata.onClick.bind(null, data, rowData, metadata) }
      icon
    >delete_forever</Button>
  );
};
const PostTable = (props: Props) => {
  const post = props;
  function transitionPost() {
    props.dispatch(selectPost(post));
  }
  const rowMetadata = {
    'bodyCssClassName'(rowData) {
      return 'md-table-row';
    },
  };

  const metaData = [
    {
      columnName: 'feature_image',
      displayName: 'Feature Image',
      customComponent: AvatarComp,
      cssClassName: 'md-table-column avatar-column',
      visible: true,
      order: 1,
    }, {
      columnName: 'title',
      displayName: 'Title',
      visible: true,
      cssClassName: 'md-table-column title-column md-text',
      customComponent: LinkComp,
      order: 2,
    }, {
      columnName: 'published',
      displayName: 'Published',
      cssClassName: 'md-table-column published-column md-text',
      customComponent: PublishedComp,
      visible: true,
      order: 3,
    }, {
      columnName: 'featured',
      displayName: 'Featured',
      visible: true,
      cssClassName: 'md-table-column featured-column md-text',
      order: 4,
    }, {
      columnName: 'created_at',
      displayName: 'Created',
      customComponent: DateComp,
      cssClassName: 'md-table-column created-column md-text',
      visible: true,
      order: 5,
    }, {
      columnName: 'actions',
      displayName: 'Actions',
      customComponent: DeleteComp,
      cssClassName: 'md-table-column delete-column md-text',
      customComponentMetadata: {
        onClick: (data, rowData, metadata) => {
          props.handleDeleteClick(rowData.id);
        },
      },
      visible: true,
      order: 6,
    },
  ];
  return (
    <Griddle results={ props.posts } showFilter columnMetadata={ metaData }
      showSettings columns={ ['feature_image', 'title', 'published', 'featured', 'created_at', 'actions'] }
      useGriddleStyles={ false }
      gridClassName="boldr-table__grid"
      tableClassName="md-data-table" customFormatClassName="boldr-table__format"
      rowMetadata={ rowMetadata }
      settingsToggleClassName="settings-button md-inline-block md-btn md-btn--flat md-text--theme-secondary md-ink--secondary md-pointer--hover md-btn--text"
    />

  );
};

export default connect()(PostTable);
