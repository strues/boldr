import React, { PropTypes } from 'react';
import Card from 'react-md/lib/Cards/Card';
import CardTitle from 'react-md/lib/Cards/CardTitle';
import CardActions from 'react-md/lib/Cards/CardActions';
import CardText from 'react-md/lib/Cards/CardText';
import Media, { MediaOverlay } from 'react-md/lib/Media';
import Avatar from 'react-md/lib/Avatars';
import Button from 'react-md/lib/Buttons';

const propTypes = {
  user: PropTypes.object,
  handleToggle: PropTypes.func,
};

const MemberCard = (props) => {
  function handleToggle(user) {
    props.handleToggle(props.user.id);
  }
  return (
    <Card>
       <CardTitle
         title={ props.user.display_name }
         subtitle={ props.user.roles[0].name }
         avatar={ <Avatar src={ props.user.avatar_url } role="presentation" /> }
       />

       <CardText>
         { props.user.id }

        { props.user.email }
      </CardText>
     <CardActions>
         <Button raised primary label="Edit User" onClick={ handleToggle } />
     </CardActions>
   </Card>
  );
};

MemberCard.propTypes = propTypes;

export default MemberCard;
