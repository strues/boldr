import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { addTypenameToDocument } from 'apollo-client';
import { MockedProvider } from 'react-apollo/lib/test-utils';
import { ArticleSidebar, SIDEBAR_QUERY } from './ArticleSidebar';

const query = addTypenameToDocument(SIDEBAR_QUERY);
const variables = { id: 'aasdf' };
const mockedData = {
  userById: {
    __typename: 'User',
    username: 'abc',
    avatarUrl: 'abc',
    bio: 'abc',
    socialMedia: {
      facebookUrl: 'abc',
      githubUrl: 'abc',
      twitterUrl: 'abc',
      linkedinUrl: 'abc',
      googleUrl: 'abc',
      stackoverflowUrl: 'abc',
    },
  },
};

it('<ArticleSidebar />, renders the sidebar', () => {
  const wrapper = shallow(
    <MockedProvider
      mocks={[{ request: { query, variables }, result: { data: mockedData } }]}
    >
      <ArticleSidebar />
    </MockedProvider>,
  );
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});
