let callbacks = [];

export default {
  onKeyDown: event => {
    callbacks.forEach(callback => {
      callback(event);
    });
  },

  registerCallback: callback => {
    callbacks.push(callback);
  },

  deregisterCallback: callback => {
    callbacks = callbacks.filter(cb => cb !== callback);
  },
};
