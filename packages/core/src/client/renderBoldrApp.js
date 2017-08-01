import { render } from 'react-dom';
import wrapBoldrApp from '../shared/wrapBoldrApp';

/**
 * Renders the wrapped application to the DOM using ReactDOM.render()
 * @param  {ReactElement} Application the React application
 * @param  {Object}       config      configuration fed to other elements
 * @return {ReactElement}       the wrapped application mounted to the DOM.
 */
export default function renderBoldrApp(Application, apolloClient, reduxStore) {
  render(wrapBoldrApp(Application, apolloClient, reduxStore), document.getElementById('app'));
}
