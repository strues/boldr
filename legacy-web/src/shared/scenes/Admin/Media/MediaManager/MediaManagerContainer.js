import { connect } from 'react-redux';
import { editMedia, deleteMedia } from '../../../../state/modules/media';
import MediaManager from './MediaManager';

const mapDispatchToProps = {
  editMedia,
  deleteMedia,
};

export default connect(null, mapDispatchToProps)(MediaManager);
