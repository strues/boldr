/* @flow */
let callBacks = [];

export default {
  onKeyDown: (event: Object) => {
    callBacks.forEach(callBack => {
      callBack(event);
    });
  },

  registerCallBack: (callBack: Function): void => {
    callBacks.push(callBack);
  },

  deregisterCallBack: (callBack: Function): void => {
    callBacks = callBacks.filter(cb => cb !== callBack);
  },
};
