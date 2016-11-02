# Theming

Boldr allows developers to theme their website's presentation using a Higher Order Component and child wrapper components.  

Theming takes place in `src/cms/common/theme`. Inside the directory you will find a folder named Boldr. This is the default theme. The Boldr file, inside the directory, is the HOC wrapper for the theme.

```javascript
// src/cms/common/theme/Boldr/Boldr.js
export default (ComposedComponent) => {
  class Boldr extends Component {

    render() {
      return (
        <section className="boldr__theme">
          <ComposedComponent { ...this.props } />
        </section>
      );
    }
  }

  return Boldr;
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
