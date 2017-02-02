import React from 'react';
import { shallow } from 'enzyme';
import TaggedPostMenu from './TaggedPostMenu';

const post = {
  id: '12312zcwef-asdfsadf-32asdf',
  title: 'Nother Post',
  slug: 'nother-post',
  content: 'abasdfasdf',
  excerpt: 'asdfasdfsdfasf',
};

test('<TaggedPostMenu />, renders the widget with props', () => {
  const wrapper = shallow(<TaggedPostMenu post={ post } />);
  expect(wrapper.instance().props.post).toEqual(post);
});
