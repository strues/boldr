import React from 'react';

export default function fetchData(RootComponent, store) {
  return new Promise(resolve => {
    const promises = [];
    const children = flattenReactChildrenToArray(RootComponent);
    children.map(child => {
      if (child.type.fetchData) {
        console.log(`Fetching for ${child.type.displayName}...`);
        promises.push(child.type.fetchData(store));
      }
    });
    Promise.all(promises)
      .then(res => {
        const actions = res.map(action => action.type);
        resolve({ RootComponent, store });
      })
      .catch(() => {
        resolve({ RootComponent, store });
      });
  });
}

function flattenReactChildrenToArray(nodeChildren, accumulated = []) {
  React.Children.forEach(nodeChildren, (childNode) => {
    accumulated.push(childNode);
    if (childNode && childNode.props && childNode.props.children) {
      flattenReactChildrenToArray(childNode.props.children, accumulated);
    }
  });
  return accumulated;
}
