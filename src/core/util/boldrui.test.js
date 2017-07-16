import React from 'react';
import { shallow, mount } from 'enzyme';

import * as BoldrUI from './boldrui';

describe('removeProps functions', () => {
  const props = {
    href: '#',
    onClick: f => f,
  };

  it('should remove Alignment props', () => {
    const aligmentProps = {
      isAlign: 'left',
    };
    expect(BoldrUI.removeAlignmentProps({ ...props, ...aligmentProps })).toEqual(props);
  });

  it('should remove Size props', () => {
    const sizeProps = {
      isSize: 'large',
    };
    expect(BoldrUI.removeSizeProps({ ...props, ...sizeProps })).toEqual(props);
  });

  it('should remove State props', () => {
    const stateProps = {
      isActive: true,
      isHovered: true,
      isFocused: true,
    };
    expect(BoldrUI.removeStateProps({ ...props, ...stateProps })).toEqual(props);
  });

  it('should remove Active props', () => {
    const stateProps = {
      isActive: true,
    };
    expect(BoldrUI.removeActiveModifiers({ ...props, ...stateProps })).toEqual(props);
  });

  it('should remove Hovered props', () => {
    const stateProps = {
      isHovered: true,
    };
    expect(BoldrUI.removeHoveredModifiers({ ...props, ...stateProps })).toEqual(props);
  });

  it('should remove Focused props', () => {
    const stateProps = {
      isFocused: true,
    };
    expect(BoldrUI.removeFocusedModifiers({ ...props, ...stateProps })).toEqual(props);
  });

  it('should remove Color props', () => {
    const colorProps = {
      isColor: 'white',
    };
    expect(BoldrUI.removeColorProps({ ...props, ...colorProps })).toEqual(props);
  });

  it('should remove Heading props', () => {
    const HeadingProps = {
      isSize: 2,
      isSpaced: true,
    };
    expect(BoldrUI.removeHeadingProps({ ...props, ...HeadingProps })).toEqual(props);
  });
});

describe('get*Modifiers functions', () => {
  it('should getAlignmentModifiers', () => {
    const props = {
      isAlign: 'left',
    };
    const expected = {
      'is-left': true,
    };
    expect(BoldrUI.getAlignmentModifiers(props)).toEqual(expected);
  });

  it('should getSizeModifiers', () => {
    const props = {
      isSize: 'medium',
    };
    const expected = {
      'is-medium': true,
    };
    expect(BoldrUI.getSizeModifiers(props)).toEqual(expected);
  });

  it('should getStateModifiers', () => {
    const props = {
      isActive: true,
      isFocused: true,
      isHovered: true,
    };
    const expected = {
      'is-active': true,
      'is-focused': true,
      'is-hovered': true,
    };
    expect(BoldrUI.getStateModifiers(props)).toEqual(expected);
  });

  it('should getLoadingModifiers', () => {
    const props = {
      isLoading: true,
    };
    const expected = {
      'is-loading': true,
    };
    expect(BoldrUI.getLoadingModifiers(props)).toEqual(expected);
  });

  it('should getColorModifiers', () => {
    const props = {
      isColor: 'success',
    };
    const expected = {
      'is-success': true,
    };
    expect(BoldrUI.getColorModifiers(props)).toEqual(expected);
  });

  it('should getHeadingModifiers', () => {
    const props = {
      isSize: 1,
      isSpaced: true,
    };
    const expected = {
      'is-1': true,
      'is-spaced': true,
    };
    expect(BoldrUI.getHeadingModifiers(props)).toEqual(expected);
  });
});

describe('createWrappedComponent', () => {
  it('should render a Component without modification', () => {
    const Component = props => {
      return <div>Hello World</div>;
    };
    const WithHelpersModifiersComponent = BoldrUI.createWrappedComponent(Component);

    expect(shallow(<WithHelpersModifiersComponent />).contains(<Component />)).toBe(true);
  });

  it('should render a Component with custom props', () => {
    const Component = props => {
      return <div>Hello World</div>;
    };
    const WithHelpersModifiersComponent = BoldrUI.createWrappedComponent(Component);
    const renderedComponent = <WithHelpersModifiersComponent isColor="black" className="custom" />;
    expect(
      shallow(renderedComponent).contains(<Component isColor="black" className="custom" />),
    ).toBe(true);
  });

  it('should render a Component with className from Helpers without passing Helpers Props', () => {
    const Component = props => {
      return <div>Hello World</div>;
    };
    const WithHelpersModifiersComponent = BoldrUI.createWrappedComponent(Component);
    const renderedComponent = (
      <WithHelpersModifiersComponent isColor="black" isFullWidth className="custom" />
    );
    const shallowedComponent = shallow(renderedComponent);

    expect(shallowedComponent.prop('isColor')).toBe('black');
    expect(shallowedComponent.prop('isFullWidth')).toBe(undefined);
    expect(shallowedComponent.hasClass('custom')).toBe(true);
    expect(shallowedComponent.hasClass('is-fullwidth')).toBe(true);
  });

  it('should render a Component with .flex', () => {
    const Component = props => {
      return <div>Hello World</div>;
    };
    const WithHelpersModifiersComponent = BoldrUI.createWrappedComponent(Component);
    const renderedComponent = <WithHelpersModifiersComponent isDisplay="flex" className="custom" />;
    const shallowedComponent = shallow(renderedComponent);

    expect(shallowedComponent.prop('isDisplay')).toBe(undefined);
    expect(shallowedComponent.hasClass('is-flex')).toBe(true);
    expect(shallowedComponent.hasClass('custom')).toBe(true);
  });

  it('should render a Component with isDisplay with Object Array', () => {
    const Component = props => {
      return <div>Hello World</div>;
    };
    const WithHelpersModifiersComponent = BoldrUI.createWrappedComponent(Component);
    const renderedComponent = (
      <WithHelpersModifiersComponent
        isDisplay={{ flex: ['default', 'mobile'] }}
        className="custom"
      />
    );
    const shallowedComponent = shallow(renderedComponent);

    expect(shallowedComponent.prop('isDisplay')).toBe(undefined);
    expect(shallowedComponent.hasClass('is-flex')).toBe(true);
    expect(shallowedComponent.hasClass('is-flex-mobile')).toBe(true);
    expect(shallowedComponent.hasClass('custom')).toBe(true);
  });

  it('should render a Component with isDisplay with Object String', () => {
    const Component = props => {
      return <div>Hello World</div>;
    };
    const WithHelpersModifiersComponent = BoldrUI.createWrappedComponent(Component);
    const renderedComponent = (
      <WithHelpersModifiersComponent
        isDisplay={{ flex: 'default', block: ['default', 'tablet-only'] }}
        className="custom"
      />
    );
    const shallowedComponent = shallow(renderedComponent);

    expect(shallowedComponent.prop('isDisplay')).toBe(undefined);
    expect(shallowedComponent.hasClass('is-flex')).toBe(true);
    expect(shallowedComponent.hasClass('is-block')).toBe(true);
    expect(shallowedComponent.hasClass('is-block-tablet-only')).toBe(true);
    expect(shallowedComponent.hasClass('custom')).toBe(true);
  });

  it('should render a Component with flex modifiers', () => {
    const Component = props => {
      return <div>Hello World</div>;
    };
    const WithHelpersModifiersComponent = BoldrUI.createWrappedComponent(Component);
    const renderedComponent = (
      <WithHelpersModifiersComponent
        isDisplay={['block-mobile', 'flex-desktop-only', 'flex']}
        className="custom"
      />
    );
    const shallowedComponent = shallow(renderedComponent);

    expect(shallowedComponent.prop('isDisplay')).toBe(undefined);
    expect(shallowedComponent.hasClass('is-block-mobile')).toBe(true);
    expect(shallowedComponent.hasClass('is-flex-desktop-only')).toBe(true);
    expect(shallowedComponent.hasClass('is-flex')).toBe(true);
    expect(shallowedComponent.hasClass('custom')).toBe(true);
  });

  it('should render a Component with flex modifiers', () => {
    const Component = props => {
      return <div>Hello World</div>;
    };
    const WithHelpersModifiersComponent = BoldrUI.createWrappedComponent(Component);
    const renderedComponent = (
      <WithHelpersModifiersComponent
        isDisplay={{ flex: 'mobile', lol: false }}
        className="custom"
      />
    );
    const shallowedComponent = shallow(renderedComponent);

    expect(shallowedComponent.prop('isDisplay')).toBe(undefined);
    expect(shallowedComponent.hasClass('is-flex-mobile')).toBe(true);
    expect(shallowedComponent.hasClass('custom')).toBe(true);
  });

  it('should render a Component with flex modifiers', () => {
    const Component = props => {
      return <div>Hello World</div>;
    };
    const WithHelpersModifiersComponent = BoldrUI.createWrappedComponent(Component);
    const renderedComponent = <WithHelpersModifiersComponent isHidden className="custom" />;
    const shallowedComponent = shallow(renderedComponent);

    expect(shallowedComponent.prop('isHidden')).toBe(undefined);
    expect(shallowedComponent.hasClass('is-hidden')).toBe(true);
    expect(shallowedComponent.hasClass('custom')).toBe(true);
  });

  it('should render a Component with flex modifiers', () => {
    const Component = props => {
      return <div>Hello World</div>;
    };
    const WithHelpersModifiersComponent = BoldrUI.createWrappedComponent(Component);
    const renderedComponent = (
      <WithHelpersModifiersComponent isHidden={['desktop-only', 'touch']} className="custom" />
    );
    const shallowedComponent = shallow(renderedComponent);

    expect(shallowedComponent.prop('isHidden')).toBe(undefined);
    expect(shallowedComponent.hasClass('is-hidden-desktop-only')).toBe(true);
    expect(shallowedComponent.hasClass('is-hidden-touch')).toBe(true);
    expect(shallowedComponent.hasClass('custom')).toBe(true);
  });

  it('should render a Component with flex modifiers', () => {
    const Component = props => {
      return <div>Hello World</div>;
    };
    const WithHelpersModifiersComponent = BoldrUI.createWrappedComponent(Component);
    const renderedComponent = (
      <WithHelpersModifiersComponent isHidden={['desktop-only', 'lol']} className="custom" />
    );
    const shallowedComponent = shallow(renderedComponent);

    expect(shallowedComponent.prop('isHidden')).toBe(undefined);
    expect(shallowedComponent.hasClass('is-hidden-desktop-only')).toBe(true);
    expect(shallowedComponent.hasClass('custom')).toBe(true);
  });

  it('should render a Component with flex modifiers', () => {
    const Component = props => {
      return <div>Hello World</div>;
    };
    const WithHelpersModifiersComponent = BoldrUI.createWrappedComponent(Component);
    const renderedComponent = (
      <WithHelpersModifiersComponent isHidden="mobile" className="custom" />
    );
    const shallowedComponent = shallow(renderedComponent);

    expect(shallowedComponent.prop('isHidden')).toBe(undefined);
    expect(shallowedComponent.hasClass('is-hidden-mobile')).toBe(true);
    expect(shallowedComponent.hasClass('custom')).toBe(true);
  });

  it('should render a Component with flex modifiers', () => {
    const Component = props => {
      return <div>Hello World</div>;
    };
    const WithHelpersModifiersComponent = BoldrUI.createWrappedComponent(Component);
    const renderedComponent = <WithHelpersModifiersComponent isHidden="lol" className="custom" />;
    const shallowedComponent = shallow(renderedComponent);

    expect(shallowedComponent.prop('isHidden')).toBe(undefined);
    expect(shallowedComponent.hasClass('custom')).toBe(true);
  });

  it('should render a Component with flex modifiers', () => {
    const Component = props => {
      return <div>Hello World</div>;
    };
    const WithHelpersModifiersComponent = BoldrUI.createWrappedComponent(Component);
    const renderedComponent = <WithHelpersModifiersComponent isHidden={false} className="custom" />;
    const shallowedComponent = shallow(renderedComponent);

    expect(shallowedComponent.prop('isHidden')).toBe(undefined);
    expect(shallowedComponent.hasClass('custom')).toBe(true);
  });

  it('should render a Component without isFlex prop when someone provides bad data', () => {
    const Component = props => {
      return <div>Hello World</div>;
    };
    const WithHelpersModifiersComponent = BoldrUI.createWrappedComponent(Component);
    const renderedComponent = <WithHelpersModifiersComponent isDisplay="none" className="custom" />;
    const shallowedComponent = shallow(renderedComponent);

    expect(shallowedComponent.prop('isFlex')).toBe(undefined);
    expect(shallowedComponent.hasClass('custom')).toBe(true);
  });

  it('should render a Component withouth errors when passing bad data to isFlex', () => {
    const Component = props => {
      return <div>Hello World</div>;
    };
    const WithHelpersModifiersComponent = BoldrUI.createWrappedComponent(Component);
    const renderedComponent = <WithHelpersModifiersComponent isDisplay={1} className="custom" />;
    const shallowedComponent = shallow(renderedComponent);

    expect(shallowedComponent.prop('isDisplay')).toBe(undefined);
    expect(shallowedComponent.hasClass('custom')).toBe(true);
  });

  it('should render a Component with hasTextAlign modifiers', () => {
    const Component = props => {
      return <div>Hello World</div>;
    };
    const WithHelpersModifiersComponent = BoldrUI.createWrappedComponent(Component);

    expect(
      shallow(<WithHelpersModifiersComponent hasTextAlign="left" className="custom" />).hasClass(
        'has-text-left',
      ),
    ).toBe(true);
    expect(
      shallow(
        <WithHelpersModifiersComponent hasTextAlign="centered" className="custom" />,
      ).hasClass('has-text-centered'),
    ).toBe(true);
    expect(
      shallow(<WithHelpersModifiersComponent hasTextAlign="right" className="custom" />).hasClass(
        'has-text-right',
      ),
    ).toBe(true);

    expect(
      shallow(
        <WithHelpersModifiersComponent hasTextAlign="right,left" className="custom" />,
      ).hasClass('has-text-right'),
    ).toBe(false);
  });

  it('should render a Component with hasTextColor modifiers', () => {
    const Component = props => {
      return <div>Hello World</div>;
    };
    const WithHelpersModifiersComponent = BoldrUI.createWrappedComponent(Component);

    expect(
      shallow(<WithHelpersModifiersComponent hasTextColor="white" className="custom" />).hasClass(
        'has-text-white',
      ),
    ).toBe(true);
    expect(
      shallow(<WithHelpersModifiersComponent hasTextColor="light" className="custom" />).hasClass(
        'has-text-light',
      ),
    ).toBe(true);
    expect(
      shallow(<WithHelpersModifiersComponent hasTextColor="dark" className="custom" />).hasClass(
        'has-text-dark',
      ),
    ).toBe(true);

    expect(
      shallow(<WithHelpersModifiersComponent hasTextColor="black" className="custom" />).hasClass(
        'has-text-black',
      ),
    ).toBe(true);
    expect(
      shallow(<WithHelpersModifiersComponent hasTextColor="primary" className="custom" />).hasClass(
        'has-text-primary',
      ),
    ).toBe(true);
    expect(
      shallow(<WithHelpersModifiersComponent hasTextColor="info" className="custom" />).hasClass(
        'has-text-info',
      ),
    ).toBe(true);
    expect(
      shallow(<WithHelpersModifiersComponent hasTextColor="success" className="custom" />).hasClass(
        'has-text-success',
      ),
    ).toBe(true);
    expect(
      shallow(<WithHelpersModifiersComponent hasTextColor="warning" className="custom" />).hasClass(
        'has-text-warning',
      ),
    ).toBe(true);
    expect(
      shallow(<WithHelpersModifiersComponent hasTextColor="danger" className="custom" />).hasClass(
        'has-text-danger',
      ),
    ).toBe(true);
  });
});
