import React, { PropTypes } from 'react';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import Button from 'components/Button';

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
       <CardHeader
         title={ props.user.display_name }
         subtitle={ props.user.role.name }
         avatar={ props.user.avatar_url }
       />

       <CardText>
         { props.user.id }

        { props.user.email }
      </CardText>
     <CardActions>
         <Button onClick={ handleToggle }>Edit User</Button>
     </CardActions>
   </Card>
  );
};

MemberCard.propTypes = propTypes;

export default MemberCard;
