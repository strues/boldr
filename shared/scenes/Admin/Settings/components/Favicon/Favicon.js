/* @fllow */
import React, { Component } from 'react';
import ExpansionPanel from 'react-md/lib/ExpansionPanels';
import TextField from 'react-md/lib/TextFields';

class Favicon extends Component {
  render() {
    const { focused, columnWidths, mobile } = this.props;
    return (
      <ExpansionPanel
        focused={ focused }
        columnWidths={ columnWidths }
        label="Favicon"
        onSave={ null }
        onCancel={ null }
        className="md-cell-md-cell--12"
        contentClassName="md-grid"
      >
      <div>
        Favicon
      </div>
      </ExpansionPanel>
    );
  }
}

export default Favicon;
