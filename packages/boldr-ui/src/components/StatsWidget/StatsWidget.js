/* @flow */
import React from 'react';
import FontIcon from 'react-md/lib/FontIcons';
import styled from 'styled-components';
import classnames from 'classnames';
import Heading from '../Heading';
import { StyleClasses } from '../../theme/styleClasses';
import StatLabel from './StatLabel';
import StatValue from './StatValue';

type Props = {
  stats: Stats,
  className: string,
  title: string,
  titleSize: number,
  labelClassName: string,
  valueClassName: string,
  labelTag: string,
  valueTag: string,
};

const BASE_ELEMENT = StyleClasses.STATS_WIDGET;
const StatsList = styled.ul`
  list-style-type: none;
  padding-left: 0;
`;
const StatsListItem = styled.li`
  padding-top: 2px;
  padding-bottom: 2px;
`;
const StatsWidget = (props: Props) => {
  const { stats, title, titleSize, labelClassName, valueClassName, labelTag, valueTag } = props;

  const statistics = [];
  for (const key of Object.keys(stats)) {
    const statistic = { key: stats[key] };
    const statsObject = {
      name: key,
      total: stats[key],
    };
    statistics.push(statsObject);
  }
  const classes = classnames(BASE_ELEMENT, props.className);
  return (
    <div className={classes}>
      <Heading align="left" size={titleSize}>
        <FontIcon>assessment</FontIcon> {title}
      </Heading>
      <StatsList>
        {statistics.map(s => (
          <StatsListItem key={Math.random()}>
            <StatLabel name={s.name} tag={labelTag} className={labelClassName} />
            <StatValue total={s.total} tag={valueTag} className={valueClassName} />
          </StatsListItem>
        ))}
      </StatsList>
    </div>
  );
};

StatsWidget.defaultProps = {
  title: 'Stats',
  titleSize: 4,
  labelTag: 'span',
  valueTag: 'span',
};

export default StatsWidget;
