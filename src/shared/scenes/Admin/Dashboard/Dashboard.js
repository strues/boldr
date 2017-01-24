/* @flow */
import React, { Component } from 'react';
import { Col, Row, Widget, Loader } from '../../../components/index';
import ActivityWidget from '../components/ActivityWidget';
import StatsWidget from '../components/StatsWidget';
import type { Stats } from '../../../types/models';
import { loadSiteActivity, fetchStats } from '../../../state/modules/admin/dashboard/actions';

type Props = {
  loadSiteActivity: Function,
  fetchStats: Function,
  activities: Object,
  loading: boolean,
  stats: Stats,
};

const Dashboard = (props: Props) => {
  if (props.loading) {
    return (
        <Loader />
    );
  }
  return (
      <div>
        <Row>
          <Col xs={ 12 } md={ 6 }>
            <Row>
              <Col xs={ 6 } md={ 3 }>
                <StatsWidget stats={ props.stats } />
              </Col>
              <Col xs={ 6 } md={ 3 }>
                <Widget name="Widget C" />
              </Col>
            </Row>
          </Col>
          <Col xs={ 12 } md={ 6 }>
            {
              props.activities
              ? <ActivityWidget activities={ props.activities } />
              : null
            }
          </Col>
        </Row>
      </div>
  );
};

export default Dashboard;
