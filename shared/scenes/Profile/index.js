import { loadRoute, errorLoading } from '../../core/utils';
import ProfileContainer from './ProfileContainer';

export default (store) => {
  /* istanbul ignore next */
  return {
    path: 'profiles/:username',
    component: ProfileContainer,
  };
};
