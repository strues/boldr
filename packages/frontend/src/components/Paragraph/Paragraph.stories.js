import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Paragraph from './Paragraph';

storiesOf('Paragraph', module)
  .add('default', () => (
    <Paragraph>
      Wolf whatever craft beer, readymade blue bottle raclette squid next level af franzen heirloom
      90's XOXO beard. Twee schlitz health goth cray. Biodiesel butcher coloring book venmo
      snackwave vexillologist, neutra live-edge enamel pin chia. Roof party church-key fanny pack
      sartorial, flannel shabby chic four loko literally tumeric stumptown coloring book. Organic
      scenester mumblecore cliche, vice readymade helvetica. Glossier 8-bit disrupt affogato pop-up
      post-ironic, la croix cardigan. Gentrify tousled scenester, iceland dreamcatcher master
      cleanse kombucha hoodie mlkshk cardigan seitan before they sold out drinking vinegar ethical
      kickstarter.
    </Paragraph>
  ))
  .add('lead', () => (
    <Paragraph isLead>
      Wolf whatever craft beer, readymade blue bottle raclette squid next level af franzen heirloom
      90's XOXO beard. Twee schlitz health goth cray. Biodiesel butcher coloring book venmo
      snackwave vexillologist, neutra live-edge enamel pin chia. Roof party church-key fanny pack
      sartorial, flannel shabby chic four loko literally tumeric stumptown coloring book. Organic
      scenester mumblecore cliche, vice readymade helvetica. Glossier 8-bit disrupt affogato pop-up
      post-ironic, la croix cardigan. Gentrify tousled scenester, iceland dreamcatcher master
      cleanse kombucha hoodie mlkshk cardigan seitan before they sold out drinking vinegar ethical
      kickstarter.
    </Paragraph>
  ))
  .add('light', () => (
    <div style={{ backgroundColor: '#1B252F' }}>
      <Paragraph isLight>
        Wolf whatever craft beer, readymade blue bottle raclette squid next level af franzen
        heirloom 90's XOXO beard. Twee schlitz health goth cray. Biodiesel butcher coloring book
        venmo snackwave vexillologist, neutra live-edge enamel pin chia. Roof party church-key fanny
        pack sartorial, flannel shabby chic four loko literally tumeric stumptown coloring book.
        Organic scenester mumblecore cliche, vice readymade helvetica. Glossier 8-bit disrupt
        affogato pop-up post-ironic, la croix cardigan. Gentrify tousled scenester, iceland
        dreamcatcher master cleanse kombucha hoodie mlkshk cardigan seitan before they sold out
        drinking vinegar ethical kickstarter.
      </Paragraph>
    </div>
  ));
