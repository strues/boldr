import React, { PropTypes } from 'react';
import { Card, Image } from 'semantic-ui-react';
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
     <Card.Content>
       <Image floated="right" size="mini" src={ props.user.avatar_url } />
       <Card.Header>
           { props.user.display_name }
       </Card.Header>
       <Card.Meta>
         { props.user.id }
       </Card.Meta>
       <Card.Description>
        { props.user.email } { ' ' }{ props.user.role[0].name }
       </Card.Description>
     </Card.Content>
     <Card.Content extra>
<<<<<<< HEAD:src/common/scenes/Dashboard/Members/components/MemberCard/MemberCard.js
       <div className="ui two buttons">
         <Button onClick={ handleToggle }>Edit User</Button>
       </div>
=======
         <Button onClick={ handleToggle }>Edit User</Button>
>>>>>>> develop:src/common/scenes/Dashboard/Members/components/MemberCard/MemberCard.js
     </Card.Content>
   </Card>
  );
};

MemberCard.propTypes = propTypes;

export default MemberCard;
