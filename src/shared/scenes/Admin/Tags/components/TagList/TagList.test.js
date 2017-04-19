import React from 'react';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import tags from '../../__fixtures__/tags.fixtures';
import TagList from './TagList';

describe('<TagList /> component', () => {
  it('<TagList />, renders the tag list with props', () => {
    const wrapper = shallow(<TagList tags={tags} />);
    expect(wrapper.instance().props.tags).toEqual(tags);
  });

  it('simulates a click', () => {
    const handleTagClick = sinon.spy();
    const wrapper = mount(
      <TagList tags={tags} handleTagClick={handleTagClick} />,
    );
    wrapper.find('.md-list-item').first().simulate('click');
    expect(handleTagClick.calledOnce).toEqual(false);
  });
});
