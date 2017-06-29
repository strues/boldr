import { connect } from 'react-redux';
// internal
import { deleteMedia } from '../../state/media';
import MediaManager from './MediaManager';

const mapDispatchToProps = {
  deleteMedia,
};

export default connect(null, mapDispatchToProps)(MediaManager);
