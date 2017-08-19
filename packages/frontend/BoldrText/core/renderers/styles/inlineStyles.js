export default props => {
  const colorStyles = {};
  const bgColorStyles = {};
  const fontSizeStyles = {};
  const fontFamilyStyles = {};

  props.colors.forEach(color => {
    const colorId = color.replace('#', '');
    colorStyles[`COLOR-${colorId}`] = { color };
    bgColorStyles[`BGCOLOR-${colorId}`] = { backgroundColor: color };
  });

  props.fontSizes.forEach(fontSize => {
    fontSizeStyles[`FONTSIZE-${fontSize}`] = { fontSize: fontSize };
  });

  props.fontFamilies.forEach(fontFamily => {
    fontFamilyStyles[`FONTFAMILY-${fontFamily.name}`] = {
      fontFamily: fontFamily.family,
    };
  });

  return {
    SUPERSCRIPT: {
      position: 'relative',
      top: '-8px',
      fontSize: '11px',
    },
    SUBSCRIPT: {
      position: 'relative',
      bottom: '-8px',
      fontSize: '11px',
    },
    ...colorStyles,
    ...bgColorStyles,
    ...fontSizeStyles,
    ...fontFamilyStyles,
  };
};
