import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { Row, Col } from 'components/Layout';

class Preferences extends Component {
  handleItemClick = (name) => this.setState({ activeItem: name })
  render() {
    const { activeItem } = this.state || {};
    return (
      <div>
        <Helmet
          title="Preferences"
          titleTemplate={ '%s | powered by Boldr' }
        />
        <Row>
          <Col xs={ 12 } md={ 2 }>
          prefs
            </Col>
          <Col xs={ 12 } md={ 10 }>
            Swag
          </Col>
        </Row>

      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    boldr: state.boldr,
    auth: state.auth,
  };
}

export default connect(mapStateToProps)(Preferences);
