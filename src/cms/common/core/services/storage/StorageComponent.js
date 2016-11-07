import React, { Component, PropTypes } from 'react';
import Storage from './storage';

export default class StorageComponent extends Component {

  componentWillUpdate() {
    if (this.props.autoSave) {
      this.save();
      this.storage = new Storage();
    }
  }

  save() {
    const value = this.props.useRaw ?
    this.props.value : JSON.stringify(this.props.value);

    Storage.set(this.props.name, value);
  }

  render() {
    return `[property value for ${this.props.name}]`;
  }
}

StorageComponent.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.array,
  ]),
  useRaw: PropTypes.bool,
  autoSave: PropTypes.bool,
  cache: PropTypes.object,
  storage: PropTypes.object,
},

Storage.defaultProps = DataStore.defaults;

Storage.get = (key) => (this.storage.get(key));

Storage.set = (key, value) => (this.storage.remove(key, value));

Storage.remove = (key) => (this.storage.remove(key));
