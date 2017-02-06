/* @fllow */
import React, { Component } from 'react';
import ExpansionPanel from 'react-md/lib/ExpansionPanels';
import TextField from 'react-md/lib/TextFields';

class SiteName extends Component {
  render() {
    const { focused, columnWidths, mobile } = this.props;
    return (
      <ExpansionPanel
        focused={ focused }
        columnWidths={ columnWidths }
        label="Site Name"
        onSave={ null }
        onCancel={ null }
        className="md-cell-md-cell--12"
        contentClassName="md-grid"
      >
      <div>SiteUrl</div>
    </ExpansionPanel>
    );
  }
}

export default SiteName;
