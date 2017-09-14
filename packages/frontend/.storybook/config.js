import React from 'react';
import { configure, setAddon, addDecorator } from '@storybook/react';
import { setOptions } from '@storybook/addon-options';
import infoAddon from '@storybook/addon-info';

setOptions({
  name: 'Boldr UI',
  url: 'https://github.com/strues/boldr',
  goFullScreen: false,
  showLeftPanel: true,
  showDownPanel: true,
  showSearchBox: false,
  downPanelInRight: false,
  sortStoriesByKind: true,
  hierarchySeparator: /\/|\./,
});
// addDecorator(story => <div style={{ padding: 20 }}>{story()}</div>);
setAddon(infoAddon);

function loadStories() {
  require('../src/styles/main.scss');
  require('../src/components/Alert/Alert.stories');
  require('../src/components/Button/Button.stories');
  require('../src/components/Block/Block.stories');

  require('../src/components/ContentPromo/ContentPromo.stories');
  require('../src/components/Flag/Flag.stories');
  require('../src/components/Heading/Heading.stories');
  // require('../src/Headline/Headline.stories');
  require('../src/components/ImageDisplay/ImageDisplay.stories');
  require('../src/components/Loader/Loader.stories');

  require('../src/components/Paper/Paper.stories');
  require('../src/components/Paragraph/Paragraph.stories');
  require('../src/components/Tag/Tag.stories');

  // //
  // require('../src/components/Select/Select.stories');
  // require('../src/components/Pop/Pop.stories');
  require('../src/components/Tooltip/Tooltip.stories');
  require('../src/components/Card/Card.stories');
  require('../src/components/Tabs/Tabs.stories');
  require('../src/components/Dialog/Dialog.stories');
  require('../src/components/Menu/Menu.stories');
  require('../src/components/Accordion/Accordion.stories');
  require('../src/components/Level/Level.stories');
  require('../src/components/Hero/Hero.stories');
  require('../src/components/Navbar/Navbar.stories');
  // require('../stories');
}

configure(loadStories, module);
