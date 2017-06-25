import { connect } from 'react-redux';
// internal
import { editMedia, deleteMedia } from '../../state/media';
import MediaManager from './MediaManager';

const mapDispatchToProps = {
  editMedia,
  deleteMedia,
};

export default connect(null, mapDispatchToProps)(MediaManager);
