// @flow

const deepRemove = (state: any, id: string): any => {
  const children = state.getIn([id, 'props', 'children']);
  if (children) {
    children.forEach(c => {
      state = deepRemove(state, c);
    });
  }
  return state.delete(id);
};

export default deepRemove;
