import React, { Component } from 'react';
import { render } from 'react-dom';
import Example from './Example';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { darkTheme: false };
  }

  switchTheme() {
    console.log('ere we go...');
    this.setState({ darkTheme: !this.state.darkTheme }, () => {
      /* switch off or on the dark styles */
      const darkDisabled = !this.state.darkTheme;
      document.styleSheets[1].disabled = darkDisabled;
      document.styleSheets[3].disabled = darkDisabled;
    });
  }

  render() {
    return (
      <div>
        <span onClick={ ::this.switchTheme } className="switch-theme" >
          {
            this.state.darkTheme ? (
              <p className="switch-to-normal">try light theme</p>
            ) : (
              <p className="switch-to-dark">try dark theme</p>
            )
          }
          { this.switchIcon() }
        </span>

        <Example />
      </div>
    );
  }
}

render((
  <App />
), document.getElementById('root'));
