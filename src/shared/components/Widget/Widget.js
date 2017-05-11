/* @flow */
import React from 'react';
import { Card, CardTitle, CardActions, CardText } from 'material-ui/Card';

type Props = {
  name?: string,
  subtitle?: string,
  children?: any,
};

const Widget = (props: Props) => {
  return (
    <div className="boldrui-widget">
      <Card>
        <CardTitle title={props.name} />
        <CardText>
          {props.children}
        </CardText>
      </Card>
    </div>
  );
};

export default Widget;
