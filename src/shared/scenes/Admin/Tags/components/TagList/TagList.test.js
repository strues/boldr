import React from 'react';
import { shallow } from 'enzyme';
import tags from '../../__fixtures__/tags.fixtures';
import TagList from './TagList';

describe('<TagList /> component', () => {
  it('<TagList />, renders the tag list with props', () => {
    const wrapper = shallow(<TagList tags={tags} />);
    expect(wrapper.instance().props.tags).toEqual(tags);
  });
});
