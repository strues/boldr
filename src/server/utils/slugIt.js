export default function(slug, replacement) {
  return (
    slug
      .split('')
      .reduce((result, ch) => {
        // allowed
        ch = ch.replace(/[^\w\s$*_+~.()'"!\-:@]/g, '');
        result += ch;
        return result;
      }, '')
      // trim leading/trailing spaces
      .replace(/^\s+|\s+$/g, '')
      // convert spaces
      .replace(/[-\s]+/g, replacement || '-')
      // remove trailing separator
      .replace('#{replacement}$', '')
  );
}
