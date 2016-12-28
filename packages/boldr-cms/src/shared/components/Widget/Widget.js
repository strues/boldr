/* @flow */
import React from 'react';
import { Card, CardTitle, CardText } from 'material-ui/Card';

type Props = {
  name?: string,
  subtitle?: string,
};

const Widget = (props: Props) => {
  return (
    <div className="widget__wrap">
      <Card>
        <CardTitle title={ props.name } />
        <CardText>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
          Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
          Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
        </CardText>
      </Card>
    </div>
  );
};

export default Widget;
