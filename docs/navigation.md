# Navigation

The navigation editor allows you to modify the main header's links and menus. As of now, the only "easily" editable navigation area is the main nav. It won't be forever.


### Disassembling the Menu Detail Structure

> For all intents and purposes, a menu detail object is simply a navigation link.

Dropdown menus and their child items are stored in the database as JSON. Their schema could be more fluid, but it is important to adhere to the structure outlined in the menu detail child item object type.

```javascript
export type MenuDetails = {
  id: Number,
  uuid: String,
  name: String,
  safe_name: String,
  css_classname: String,
  has_dropdown: Boolean,
  order: Number,
  href: String,
  mobile_href: String,
  icon: String,
  children: MenuDetailChild,
};

```
Above is the schema used for menu details. Links belonging to a dropdown menu, fall into the children object. The key is a simple identifier with a value like so `NAME-menu`. If you were editing the about link and it was a dropdown menu, its key would be about-menu. The name is arbitrary, and only used to help identify.


```javascript
export type MenuDetailChild = {
  key: String,
  items: Array<DetailChildItem>
};

```

Below represents the menu detail child item object.
```javascript
export type DetailChildItem = {
  name: String,
  href: String,
  icon: String,
};

```
