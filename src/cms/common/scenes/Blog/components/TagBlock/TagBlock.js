import React from 'react';
import { Divider, Card, Comment, Header } from 'semantic-ui-react';
import Tag from '../Tag';

const styles = {
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap'
  }
};

const TagBlock = (props) => {
  if (!props.tags) {
    return <div>No tags</div>;
  }
  return (
    <div style={ styles.wrapper } className="tagblock">

    {
      props.tags.map(tag => <Tag key={ tag.id } name={ tag.name } id={ tag.id } />)
    }

    </div>
  );
};

TagBlock.propTypes = {
  tags: React.PropTypes.arrayOf(React.PropTypes.shape({
    id: React.PropTypes.number,
    name: React.PropTypes.name
  }))
};

export default TagBlock;
