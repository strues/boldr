# Theming

Boldr allows developers to theme their website's presentation using a Higher Order Component and child wrapper components.  

Theming takes place in `packages/boldr-cms/src/shared/pages/templates`. Inside the directory is `TemplateProvider.js` and folders containing the various page templates. 

The TemplateProvider is a [Higher Order Component](https://facebook.github.io/react/docs/higher-order-components.html), which wraps the page templates. It provides necessary data fetching and passes the results down as props to the components it wraps.

This section of Boldr is a work-in-progress. I know where I'm going, but not everything is implemented; nor is it documented.

Props for the TemplateProvider:  

```
type Props = {
  pathname: string,
  auth: Object,
  fetchSettingsIfNeeded: Function,
  dispatch: Function,
  location: Object,
  fetchPagesIfNeeded: Function,
  fetchMenusIfNeeded: Function,
  setMobileDevice: Function,
  isMobile: Boolean,
  settings: Object
};
```  

The TemplateProvider

```javascript
// packages/boldr-cms/src/shared/pages/templates/TemplateProvider.js
@provideHooks({
  fetch: ({ dispatch }) => dispatch(fetchMenusIfNeeded()),
})
@connect(mapStateToProps)
export default (ComposedComponent: any) => {
  class TemplateProvider extends Component {
    static childContextTypes = {
      dispatch: React.PropTypes.func,
      location: React.PropTypes.object,
      isMobile: React.PropTypes.bool,
    };
    getChildContext() {
      const { dispatch, location, isMobile } = this.props;
      return { dispatch, location, isMobile };
    }

    componentDidMount() {
      this.props.dispatch(fetchMenusIfNeeded());
      // this.props.dispatch(fetchSettingsIfNeeded());
      window.addEventListener('resize', debounce(event => {
        this.props.dispatch(setMobileDevice(testIfMobile()));
      }, 1000));
    }
    // $FlowIssue
    shouldComponentUpdate(nextProps, nextState) {
      return shallowCompare(this, nextProps, nextState);
    }
    props: Props;

    getPageURL() {
      return (typeof(window) !== 'undefined')
      ? window.location.href
      : `http://localhost:3000/${this.props.pathname}`;
    }
    render() {
      return (<ComposedComponent { ...this.props } url={ this.getPageURL() } />);
    }
  }

  return TemplateProvider;
};
```

### Pages
Pages are meant to inherit from theme components.

```javascript
  <PageTemplate
    helmetMeta={ <Helmet title="Home" /> }
    header={ <PrimaryHeader /> }
    hero={ <Hero /> }
    footer={ <Footer /> }
  >
  { /* excluded for brevity, but its props.children contents */}
  </PageTemplate>
```

The PageTemplate component accepts helmetMeta, header, hero, footer and children for props.

`helmetMeta` contains the `<Helmet />` component from [React-Helmet](https://github.com/nfl/react-helmet)

`header` by default will always render the `<PrimaryHeader />` component from Boldr's common components. You may pass in another Header on a page-by-page basis.

`hero` is optional.
`footer` expects a `<Footer />` component, but like the header, it defaults to the common Boldr footer component.
