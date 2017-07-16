import React from 'react';
import { getDomSafeProps, combineModifiers } from './helpers';

describe('getDomSafeProps', () => {
  const props = {
    href: '#',
    onClick: f => f,
  };

  it('should return props when no removeFunctions are passed', () => {
    expect(getDomSafeProps(props)).toEqual(props);
  });

  it('should remove props with more than one function as parameter', () => {
    const removeHref = props => {
      const { href, ...rest } = props;
      return rest;
    };

    const removeOnClick = props => {
      const { onClick, ...rest } = props;
      return rest;
    };

    expect(getDomSafeProps(props, removeHref, removeOnClick)).toEqual({});
  });
});

describe('combineModifiers', () => {
  it('should return an empty object when only props are passed', () => {
    const props = {
      testAny: true,
      testSome: true,
      testNothing: false,
    };
    expect(combineModifiers(props)).toEqual({});
  });

  it('should return combined Object when get*ModifiersFunctions are passed', () => {
    const props = {
      testAny: true,
      testSome: true,
      testNothing: false,
    };

    const getTestAnyModifiers = props => ({ 'test-any': props.testAny });
    const getTestSomeModifiers = props => ({ 'test-some': props.testSome });
    const getFailModifiers = props => ({ 'test-fail': props.testFail });

    const combined = combineModifiers(
      props,
      getTestAnyModifiers,
      getTestSomeModifiers,
      getFailModifiers,
    );
    const outputExpect = {
      'test-any': true,
      'test-some': true,
    };
    expect(combined).toEqual(outputExpect);
  });
});
