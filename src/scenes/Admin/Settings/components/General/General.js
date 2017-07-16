/* @flow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
// internal
import Headline from '@boldr/ui/Headline';
import {
  Accordion,
  AccordionItem,
  AccordionItemTitle,
  AccordionItemBody,
} from '@boldr/ui/Accordion';
// import SiteDescription from './SiteDescription';
// import SiteName from './SiteName';
// import Logo from './Logo';
// import Favicon from './Favicon';
// import SiteUrl from './SiteUrl';

type Props = {
  siteName: Object,
  siteDescription: Object,
  siteUrl: Object,
  siteFavicon: Object,
  siteLogo: Object,
};

const ContentArea = styled.div`
  height: 100%;
  background-color: #fff;
  border: 1px solid #e1e7ea;
  display: flex;
  padding: 1em;
  flex-direction: column;
  flex: 1;
`;
class General extends Component {
  props: Props;
  render() {
    return (
      <ContentArea>
        <Headline type="h3">General Settings</Headline>
        <Accordion>
          <AccordionItem>
            <AccordionItemTitle>
              <Headline type="h4">Site Name</Headline>
            </AccordionItemTitle>
            <AccordionItemBody>
              s
              {/* <SiteName /> */}
            </AccordionItemBody>
          </AccordionItem>
          <AccordionItem>
            <AccordionItemTitle>
              <Headline type="h4">Site Description</Headline>
            </AccordionItemTitle>
            <AccordionItemBody>
              <p>A story you havent told.</p>
            </AccordionItemBody>
          </AccordionItem>
          <AccordionItem>
            <AccordionItemTitle>
              <Headline type="h4">Site URL</Headline>
            </AccordionItemTitle>
            <AccordionItemBody>
              <p>A story you havent told.</p>
            </AccordionItemBody>
          </AccordionItem>
          <AccordionItem>
            <AccordionItemTitle>
              <Headline type="h4">Logo</Headline>
            </AccordionItemTitle>
            <AccordionItemBody>
              <p>A story you havent told.</p>
            </AccordionItemBody>
          </AccordionItem>
          <AccordionItem>
            <AccordionItemTitle>
              <Headline type="h4">Favicon</Headline>
            </AccordionItemTitle>
            <AccordionItemBody>
              <p>A story you havent told.</p>
            </AccordionItemBody>
          </AccordionItem>
        </Accordion>
      </ContentArea>
    );
  }
}

export default connect()(General);
