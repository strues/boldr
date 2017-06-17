import React from 'react';
import { Provider } from 'react-redux';
import { shallow, mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import TagsContainer from './TagsContainer';
import Tags from './Tags';

const middlewares = [];
const mockStore = configureStore(middlewares);
const initialState = {};
const store = mockStore(initialState);

describe('TagsContainer', () => {
  it('should render the tags', () => {
    const tagData = [{ id: 1 }, { id: 2 }];
    const curTag = { id: 3 };
    const wrapper = shallow(
      <Provider store={store}>
        <TagsContainer>
          <Tags tags={tagData} currentTag={curTag} />
        </TagsContainer>
      </Provider>,
    );

    expect(wrapper.find(Tags).length).toEqual(1);
  });
});
