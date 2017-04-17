import {connect} from 'react-redux';
import withRouter from 'react-router-dom/withRouter';
import {
  getMediaType,
  toggleMedia,
  selectMedia,
} from '../../../state/modules/media';
import Media from './Media';

const mapStateToProps = (state, filter = 'all') => ({
  media: getMediaType(state, filter),
});

const VisibleMedia = withRouter(
  connect(mapStateToProps, {toggleMedia, selectMedia})(Media),
);

export default VisibleMedia;
