import { loadRoute, errorLoading } from 'boldr-utils';
import ProfileContainer from './ProfileContainer';

export default (store) => {
  /* istanbul ignore next */
  return {
    path: 'profiles/:username',
    component: ProfileContainer,
  };
};
