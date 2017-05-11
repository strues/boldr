import React from 'react';
import Perf from 'react-addons-perf';
import styles from './styles.scss';

class PerfProfiler extends React.Component {
  state = { started: false };

  toggle = () => {
    const { started } = this.state;

    started ? Perf.stop() : Perf.start();

    this.setState({ started: !started });
  };

  printWasted = () => {
    const lastMeasurements = Perf.getLastMeasurements();

    Perf.printWasted(lastMeasurements);
  };

  printOperations = () => {
    const lastMeasurements = Perf.getLastMeasurements();

    Perf.printOperations(lastMeasurements);
  };

  render() {
    const { started } = this.state;

    return (
      <div className={styles.perfProfiler}>
        <h1>Performance Profiler</h1>
        <button onClick={this.toggle}>{started ? 'Stop' : 'Start'}</button>
        <button onClick={this.printWasted}>Print Wasted</button>
        <button onClick={this.printOperations}>Print Operations</button>
      </div>
    );
  }
}

export default PerfProfiler;
