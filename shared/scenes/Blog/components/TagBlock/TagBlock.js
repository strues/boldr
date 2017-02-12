import React from 'react';
import Tag from '../Tag';

const TagBlock = (props) => {
  const styles = {
    wrapper: {
      display: 'flex',
      flexWrap: 'wrap',
      backgroundColor: '#fff',
    },
  };
  if (!props.tags) {
    return null;
  }

  return (
    <div style={ styles.wrapper } className="boldr-post__tagblock boldr-paperoverride">

    {

      props.tags.map(tag => <Tag key={ tag.id } tag={ tag } />)
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
