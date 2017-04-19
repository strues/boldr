import { connect } from 'react-redux';
import { editMedia, deleteMedia } from '../../../../state/modules/media';
import MediaManager from './MediaManager';

const mapStateToProps = state => {
  return {
    media: state.media.currentMedia,
  };
};

const mapDispatchToProps = {
  editMedia,
  deleteMedia,
};

export default connect(mapStateToProps, mapDispatchToProps)(MediaManager);
