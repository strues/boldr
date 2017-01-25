
import TextField from 'react-md/lib/TextFields';
import wrapFormComponent from './util/wrapFormComponent';
import mapError from './util/mapError';

export default wrapFormComponent(TextField, mapError);
