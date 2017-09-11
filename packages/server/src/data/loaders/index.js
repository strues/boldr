import MenuDetail from '../../models/MenuDetail';
import modelById from './modelById';

export default () => {
  return {
    menuDetailById: modelById(MenuDetail),
  };
};
