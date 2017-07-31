import React, { PureComponent } from 'react';
import styled from 'styled-components';
import Icon from '@boldr/ui/Icons/Icon';
// internal
import Headline from '@boldr/ui/Headline';
import Paragraph from '@boldr/ui/Paragraph';
import Divider from '@boldr/ui/Divider';

const Wrapper = styled.aside`
  height: 100%;
  width: 280px;
  background-color: #fff;
  border-right: 1px solid #e1e7ea;
  display: flex;
  flex-direction: column;
  margin-right: 2em;
`;

const SettingsList = styled.ul`
  list-style-type: none;
  padding-right: 40px;
`;
const SettingsListItem = styled.li`list-style-type: none;`;
const SettingsTitle = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
`;
const Label = styled.span`
  font-weight: 600;
  font-size: 1.5em;
  padding-left: .7em;
  line-height: 40px;
`;
const SidebarHeader = styled.div`
  padding-top: 15px;
  padding-left: 40px;
  padding-right: 40px;
`;
class SettingsAside extends PureComponent {
  render() {
    return (
      <Wrapper>
        <SidebarHeader>
          <Headline type="h3">Settings</Headline>
          <Paragraph isLead>Modify how Boldr interacts with your website.</Paragraph>
        </SidebarHeader>
        <Divider />
        <SettingsList>
          <SettingsListItem>
            <SettingsTitle>
              <Icon kind="history" color="#333" size="32" />
              <Label>General</Label>
            </SettingsTitle>
            <Paragraph isLight>
              Change the url, site name, logo or favicon of your website
            </Paragraph>
          </SettingsListItem>
        </SettingsList>
      </Wrapper>
    );
  }
}

export default SettingsAside;
