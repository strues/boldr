import React, { PropTypes } from 'react';
import { Avatar, CardTitle, Card, CardActions, CardText, Button, Media, MediaOverlay } from 'boldr-ui';

const propTypes = {
  user: PropTypes.object,
  handleToggle: PropTypes.func,
};

const MemberCard = props => {
  function handleToggle(user) {
    props.handleToggle(props.user.id);
  }
  return (
    <Card>
      <CardTitle
        title={ props.user.username }
        subtitle={ props.user.roles[0].name }
        avatar={ <Avatar src={ props.user.avatarUrl } role="presentation" /> }
      />

      <CardText>
        {props.user.id}

        {props.user.email}
      </CardText>
      <CardActions>
        <Button raised primary label="Edit User" onClick={ handleToggle } />
      </CardActions>
    </Card>
  );
};

MemberCard.propTypes = propTypes;

export default MemberCard;
