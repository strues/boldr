import React, { PropTypes } from 'react';
import { Card } from 'semantic-ui-react';

const Widget = (props) => {
  return (
    <div className="widget__wrap">
      <Card>
      <Card.Content>
      <Card.Header>
      { props.name }
      </Card.Header>
      <Card.Meta>
        { props.subtitle }
      </Card.Meta>
       <Card.Description>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
          Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
          Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
        </Card.Description>
        </Card.Content>
        </Card>
    </div>
  );
};

Widget.propTypes = {
  name: PropTypes.string,
  subtitle: PropTypes.string,
};

export default Widget;
