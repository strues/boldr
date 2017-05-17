// @noflow
/* eslint-disable react/jsx-boolean-value, line-comment-position, babel/new-cap, require-await, react/prop-types */
declare var test: any;
import path from 'path';
import React from 'react';
import { shallow, mount } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import Loadable, {
  flushServerSideRequirePaths,
  flushWebpackChunkNames,
} from './Loadable';

const waitFor = (delay: number) => {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
};

const createLoader = (delay, Component, error?) => {
  return async () => {
    await waitFor(delay);
    if (Component) {
      return Component;
    } else {
      throw error;
    }
  };
};

const MyLoadingComponent = props => (
  <div>MyLoadingComponent {JSON.stringify(props)}</div>
);
const MyComponent = props => <div>MyComponent {JSON.stringify(props)}</div>;

test('server side rendering', async () => {
  const LoadableMyComponent = Loadable({
    loader: createLoader(400, null, new Error('test error')),
    LoadingComponent: MyLoadingComponent,
    serverSideRequirePath: path.join(__dirname, './__fixtures__/component.js'),
  });

  const component = shallow(<LoadableMyComponent prop="baz" />);

  expect(shallowToJson(component)).toMatchSnapshot(); // serverside
});

test('server side rendering es6', async () => {
  const LoadableMyComponent = Loadable({
    loader: createLoader(400, null, new Error('test error')),
    LoadingComponent: MyLoadingComponent,
    serverSideRequirePath: path.join(
      __dirname,
      './__fixtures__/component.es6.js',
    ),
  });

  const component = shallow(<LoadableMyComponent prop="baz" />);
  // serverside
  expect(shallowToJson(component)).toMatchSnapshot();
});

test('server side rendering flushing', async () => {
  const createLoadable = name => {
    return Loadable({
      loader: createLoader(400, null, new Error('test error')),
      LoadingComponent: MyLoadingComponent,
      serverSideRequirePath: path.join(__dirname, '__fixtures__', name),
    });
  };

  const Loadable1 = createLoadable('component.js');
  const Loadable2 = createLoadable('component2.js');
  const Loadable3 = createLoadable('component3.js');

  const App = props => (
    <div>
      {props.one ? <Loadable1 /> : null}
      {props.two ? <Loadable2 /> : null}
      {props.three ? <Loadable3 /> : null}
    </div>
  );

  flushServerSideRequirePaths();
  shallow(<App one={true} two={true} three={false} />);
  // server
  expect(flushServerSideRequirePaths()).toMatchSnapshot();
  shallow(<App one={true} two={false} three={true} />);
  // server
  expect(flushServerSideRequirePaths()).toMatchSnapshot();
});
