/* @flow */
import React, { PureComponent } from 'react';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import { Grid, Col, Row } from '@boldr/ui/Layout';
import Heading from '@boldr/ui/Heading';
import Paper from '@boldr/ui/Paper';

import {
  Accordion,
  AccordionItem,
  AccordionItemTitle,
  AccordionItemBody,
} from '@boldr/ui/Accordion';

import type { Setting } from '../../../types/boldr';
import SettingsAside from './components/SettingsAside';
import SettingForm from './SettingForm';

type Props = {
  settings: Array<Setting>,
};

const Content = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  padding: 0;
  height: 100%;
`;
class Settings extends PureComponent {
  props: Props;

  render() {
    const { settings } = this.props;

    return (
      <div>
        <Helmet title="Admin: Settings" />
        <Content>
          <SettingsAside />
          {settings.map(setting => (
            <SettingForm
              id={setting.id}
              label={setting.label}
              value={setting.value}
              key={setting.key}
            />
          ))}
        </Content>
      </div>
    );
  }
}

export default Settings;
