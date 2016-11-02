# Pages

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

`helmetMeta` contains the `<Helmet />` component from [React-Helmet](https://github.com/nfl/react-react)

`header` by default will always render the `<PrimaryHeader />` component from Boldr's common components. You may pass in another Header on a page-by-page basis.

`hero` is optional.
`footer` expects a `<Footer />` component, but like the header, it defaults to the common Boldr footer component.
