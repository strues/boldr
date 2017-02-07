import { loadRoute, errorLoading } from '../../core/utils';
import ProfileContainer from './ProfileContainer';

export default (store, connect) => {
  return {
    path: 'profiles/:username',
    component: ProfileContainer,
  };
};
