
import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import BoldrEditor from './BoldrEditor';

describe('BoldrEditor menu test suite', () => {
  it('should have a div when rendered', () => {
    expect(shallow(<BoldrEditor />).node.type).to.equal('div');
  });
});
