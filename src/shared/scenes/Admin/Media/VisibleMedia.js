import { connect } from 'react-redux';
import withRouter from 'react-router-dom/withRouter';
import {
  getMediaType,
  toggleMedia,
  deleteMedia,
  selectMedia,
} from '../../../state/modules/media';
import Media from './Media';

const mapStateToProps = (state, filter = 'all') => ({
  media: getMediaType(state, filter),
});

const VisibleMedia = withRouter(
  connect(mapStateToProps, { toggleMedia, selectMedia, deleteMedia })(Media),
);

export default VisibleMedia;
