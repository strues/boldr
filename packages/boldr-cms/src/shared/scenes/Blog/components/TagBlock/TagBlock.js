import React from 'react';
import Tag from '../Tag';

const TagBlock = (props) => {
  const styles = {
    wrapper: {
      display: 'flex',
      flexWrap: 'wrap',
    },
  };
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
    name: React.PropTypes.name,
  })),
};

export default TagBlock;
