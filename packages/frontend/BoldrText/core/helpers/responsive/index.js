import uniqueId from 'lodash/uniqueId';

let resizeEventHandlers = [];
let responsiveHelperInited = false;
let debouce = false;

export default {
  resolve(eventHandler) {
    const id = uniqueId();
    resizeEventHandlers.push({ id, eventHandler });
    return id;
  },

  unresolve(id) {
    resizeEventHandlers = resizeEventHandlers.filter(item => item.id !== id);
  },
};

if (!responsiveHelperInited) {
  typeof window !== 'undefined' &&
    typeof window === 'object' &&
    window.addEventListener('resize', event => {
      clearTimeout(debouce);
      debouce = setTimeout(() => {
        resizeEventHandlers.map(item => {
          typeof item.eventHandler === 'function' && item.eventHandler(event);
        });
        debouce = false;
      }, 100);
    });

  responsiveHelperInited = true;
}
