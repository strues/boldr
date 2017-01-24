import React from 'react';
import Avatar from 'react-md/lib/Avatars';
import Chip from 'react-md/lib/Chips';
import Button from 'react-md/lib/Buttons';
import FontIcon from 'react-md/lib/FontIcons';
import { format } from 'date-fns';
import { Icon, Row, Col } from '../../../../components/index';
import ActivityItemDetail from '../ActivityItemDetail';
const styled = require('styled-components').default;

const ActivityPanel = styled.div`
  height: 80px;
  box-sizing: border-box;
  padding-top: .5em;
  padding-bottom: .5em;
  vertical-align: middle;
  display: flex;
  flex-direction: row;
  align-items: center;
  border-bottom: 1px solid #D7D8DD;
`;

const Date = styled.div`
  margin-right: 10px;
`;
const User = styled.div`
  margin-right: 10px;
`;

const ActivityItem = (props) => {
    return (
      <ActivityPanel>
        <Date>
          <Button icon tooltipLabel={format(props.created_at, 'MM/DD/YYYY')}>access_time</Button>
        </Date>
        <User>
          <Chip
            label={ props.owner.first_name }
            avatar={ <Avatar src={ props.owner.avatar_url } role="presentation"/> }
          />
        </User>
        <ActivityItemDetail atype={ props.action_type_id }/>
        <Icon kind="new-post" color="#308AC8" />
      </ActivityPanel>
    );
};

export default ActivityItem;
