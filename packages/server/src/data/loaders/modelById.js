import DataLoader from 'dataloader';
import modelsByIds from './modelsByIds';

export default Model => new DataLoader(modelsByIds(Model));
