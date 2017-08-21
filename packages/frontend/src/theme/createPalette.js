/* eslint-disable new-cap */
import Color from 'color';

/**
 * Theme variables
 */

// Base `Color` can be used to create additional variations
function createPalette(baseColors = {}) {
  const defaultBasePrimary = '#0094c6';
  const defaultBaseSecondary = '#b57bff';
  const defaultBaseError = '#ef476f';
  const defaultBaseSuccess = '#61e786';
  const defaultBaseWarn = '#fffd82';
  const defaultBaseGrey = '#64686f';

  const {
    primary = defaultBasePrimary,
    secondary = defaultBaseSecondary,
    error = defaultBaseError,
    success = defaultBaseSuccess,
    warn = defaultBaseWarn,
    grey = defaultBaseGrey,
  } = baseColors;

  const palette = {};

  palette.primaryBaseColor = Color(primary);
  palette.primaryColor = Color(primary).hsl().string();
  palette.primaryColorLight = Color(primary).lighten(0.3).hsl().string();
  palette.primaryColorLighter = Color(primary).lighten(0.6).hsl().string();
  palette.primaryColorLightest = Color(primary).lighten(0.8).hsl().string();
  palette.primaryColorDark = Color(primary).darken(0.2).hsl().string();
  palette.primaryColorDarker = Color(primary).darken(0.4).hsl().string();
  palette.primaryColorDarkest = Color(primary).darken(0.6).hsl().string();

  palette.secondaryBaseColor = Color(secondary);
  palette.secondaryColor = Color(secondary).hsl().string();
  palette.secondaryColorLight = Color(secondary).lighten(0.1).hsl().string();
  palette.secondaryColorLighter = Color(secondary).lighten(0.2).hsl().string();
  palette.secondaryColorLightest = Color(secondary).lighten(0.3).hsl().string();
  palette.secondaryColorDark = Color(secondary).darken(0.2).hsl().string();
  palette.secondaryColorDarker = Color(secondary).darken(0.4).hsl().string();
  palette.secondaryColorDarkest = Color(secondary).darken(0.6).hsl().string();

  palette.errorBaseColor = Color(error);
  palette.errorColor = Color(error).hsl().string();
  palette.errorColorLight = Color(error).lighten(0.2).hsl().string();
  palette.errorColorLighter = Color(error).lighten(0.4).hsl().string();
  palette.errorColorLightest = Color(error).lighten(0.6).hsl().string();
  palette.errorColorDark = Color(error).darken(0.2).hsl().string();
  palette.errorColorDarker = Color(error).darken(0.4).hsl().string();
  palette.errorColorDarkest = Color(error).darken(0.6).hsl().string();

  palette.warnBaseColor = Color(warn);
  palette.warnColor = Color(warn).hsl().string();
  palette.warnColorLight = Color(warn).lighten(0.2).hsl().string();
  palette.warnColorLighter = Color(warn).lighten(0.3).hsl().string();
  palette.warnColorLightest = Color(warn).lighten(0.5).hsl().string();
  palette.warnColorDark = Color(warn).darken(0.2).hsl().string();
  palette.warnColorDarker = Color(warn).darken(0.3).hsl().string();
  palette.warnColorDarkest = Color(warn).darken(0.5).hsl().string();

  palette.successBaseColor = Color(success);
  palette.successColor = Color(success).hsl().string();
  palette.successColorLight = Color(success).lighten(0.2).hsl().string();
  palette.successColorLighter = Color(success).lighten(0.4).hsl().string();
  palette.successColorLightest = Color(success).lighten(0.6).hsl().string();
  palette.successColorDark = Color(success).darken(0.2).hsl().string();
  palette.successColorDarker = Color(success).darken(0.4).hsl().string();
  palette.successColorDarkest = Color(success).darken(0.6).hsl().string();

  /* eslint-disable newline-per-chained-call */
  palette.greyBaseColor = Color(grey);
  palette.grey = Color(grey).hsl().string();
  palette.greyLightest = Color(grey).lighten(0.5).grayscale().hsl().string();
  palette.greyLighter = Color(grey).lighten(0.42).grayscale().hsl().string();
  palette.greyLight = Color(grey).lighten(0.2).grayscale().hsl().string();
  palette.greyDark = Color(grey).darken(0.2).grayscale().hsl().string();
  palette.greyDarker = Color(grey).darken(0.3).grayscale().hsl().string();
  palette.greyDarkest = Color(grey).darken(0.5).grayscale().hsl().string();
  /* eslint-enable newline-per-chained-call */

  palette.infoColor = '#6320EE';
  palette.textColorDark = '#030507';
  palette.textColorLight = '#F8F0FB';

  return palette;
}

export default createPalette;
