import { css } from 'styled-components';
import { GRID_SETTINGS, THEME_NAME } from './constants';

function insertMediaQuery(media) {
  return (...args) => css`
    @media ${media} {
      ${css(...args)}
    }
  `;
}

const configCache = [];
const makeCacheId = props => JSON.stringify((props.theme && props.theme[THEME_NAME]) || {});
const resolveConfig = props => {
  const themeConf = (props.theme && props.theme[THEME_NAME]) || {};

  const conf = {
    ...GRID_SETTINGS,
    ...themeConf,
    container: {
      ...GRID_SETTINGS.container,
      ...themeConf.container,
    },
    breakpoints: {
      ...GRID_SETTINGS.breakpoints,
      ...themeConf.breakpoints,
    },
  };

  conf.media = Object.keys(conf.breakpoints).reduce((media, breakpoint) => {
    const breakpointWidth = conf.breakpoints[breakpoint];
    media[breakpoint] = insertMediaQuery(
      'only screen' + (breakpoint === 0 ? '' : ` and (min-width: ${breakpointWidth}em)`),
    );
    return media;
  }, {});

  return conf;
};

export default function config(props) {
  const cacheId = makeCacheId(props);
  if (configCache[0] === cacheId) {
    return configCache[1];
  }

  const conf = resolveConfig(props);

  configCache[0] = cacheId;
  configCache[1] = conf;

  return conf;
}
