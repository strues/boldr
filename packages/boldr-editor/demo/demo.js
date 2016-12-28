import React from 'react';
import { BoldrEditor, defaultBlocks } from '../src/index';

class Demo extends React.Component {
  constructor() {
    super();

    this.onFocus = this.onFocus.bind(this);
    this.state = {
      content: {
        entityMap: {},
        blocks: [
          {
            text: '',
            type: 'unstyled',
            depth: 0,
            inlineStyleRanges: [],
            entityRanges: [],
          },
        ],
      },
    };
  }
  onFocus() {
    console.log('focus');
  }
  render() {
    return (
      <div>
        <BoldrEditor
          content={ this.state.content || null }
          onChange={ content => this.setState({ content }) }
          onFocus={ this.onFocus }
          placeholder="Tell a story..."
          customBlocks={ defaultBlocks }
          customBlockControls={ Object.keys(defaultBlocks) }
        />

        {
          this.state.content ? (
          <div dangerouslySetInnerHTML={ { __html: this.state.content } } />
        ) : null
      }

      </div>
    );
  }
}

export default Demo;
