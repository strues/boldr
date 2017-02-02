
// if you need to check whether the client is a mobile device from the server
// side, use the isMobile reducer in the store
const testIfMobile = () => {
  if (typeof window === 'undefined') return false;
  return document.documentElement.clientWidth < 768; // Bootstrap's screen-sm-min
};
export default testIfMobile;
