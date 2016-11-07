import React, { PropTypes } from 'react';
import { Button, Card, Image } from 'semantic-ui-react';

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
       <div className="ui two buttons">
         <Button basic color="green" onClick={ handleToggle }>Edit</Button>
       </div>
     </Card.Content>
   </Card>
  );
};

MemberCard.propTypes = propTypes;

export default MemberCard;
