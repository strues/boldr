/* eslint-disable new-cap */
import { render } from 'react-dom';
import wrapBoldrApp from '../shared/wrapBoldrApp';

/**
 * Renders the wrapped application to the DOM using ReactDOM.render()
 * @param  {ReactElement}   Application       the React application
 * @param  {Function}       apolloClient      apolloClient configured
 * @param  {Object}         reduxStore        the combined redux store
 *                    the wrapped application mounted to the DOM.
 */
export default function renderBoldrApp(Application, apolloClient, reduxStore) {
  render(wrapBoldrApp(Application, apolloClient, reduxStore), document.getElementById('app'));
}
