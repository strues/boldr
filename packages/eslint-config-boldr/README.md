eslint-config-boldr
=======

Usage
-------

Install the conventions by running:

```
npm install --save-dev eslint eslint-config-boldr
```

Then add the extends to your `.eslintrc`:

```javascript
{
  "extends": "boldr",
  "rules": {
     your overrides
  }
}
```

React
-------

The `react` config is separate from the main configuration.

**Note if you use this, you'll also need to install `eslint-plugin-react`**:

```javascript
{
  "extends": "boldr/react"
}
```



Explaination of Rules
=======

Best Practices
-------
`accessor-pairs` - off

enforces getter/setter pairs in objects

`array-callback-return`
enforces return statements in callbacks of arrays methods
http:eslint.org/docs/rules/array-callback-return

`block-scoped-var`
treat var statements as if they were block scoped

`complexity`
specify the maximum cyclomatic complexity allowed in a program

`consistent-return`
require return statements to either always or never specify values

`curly`
specify curly brace conventions for all control statements

`default-case`
require default case in switch statements

`dot-notation`
encourages use of dot notation whenever possible

`dot-location`
enforces consistent newlines before or after dots

`eqeqeq`
require the use of === and !==

`guard-for-in`
make sure for-in loops have an if statement

`id-blacklist`
Blacklist certain identifiers to prevent them being used
http:eslint.org/docs/rules/id-blacklist

`no-alert`
disallow the use of alert, confirm, and prompt

`no-caller`
disallow use of arguments.caller or arguments.callee

`no-case-declarations`
disallow lexical declarations in case/default clauses
http:eslint.org/docs/rules/no-case-declarations.html

`no-div-regex`
disallow division operators explicitly at beginning of regular expression

`no-else-return`
disallow else after a return in an if

`no-extra-label`
disallow Unnecessary Labels
http:eslint.org/docs/rules/no-extra-label

`no-eq-null`
disallow comparisons to null without a type-checking operator

`no-eval`
disallow use of eval()

`no-extend-native`
disallow adding to native types

`no-extra-bind`
disallow unnecessary function binding

`no-fallthrough`
disallow fallthrough of case statements

`no-floating-decimal`
disallow the use of leading or trailing decimal points in numeric literals

`no-implicit-coercion`
disallow the type conversions with shorter notations

`no-implied-eval`
disallow use of eval()-like methods

`no-invalid-this`
disallow this keywords outside of classes or class-like objects

`no-iterator`
disallow usage of __iterator__ property

`no-labels`
disallow use of labels for anything other then loops and switches

`no-lone-blocks`
disallow unnecessary nested blocks

`no-loop-func`
disallow creation of functions within loops

`no-multi-space`
disallow use of multiple spaces

`no-multi-str`
disallow use of multiline strings

`no-native-reassign`
disallow reassignments of native objects

`no-new`
disallow use of new operator when not part of the assignment or comparison

`no-new-func`
disallow use of new operator for Function object

`no-new-wrappers`
disallows creating new instances of String, Number, and Boolean

`no-octal`
disallow use of (old style) octal literals

`no-octal-escape`
disallow use of octal escape sequences in string literals, such as
var foo = Copyright \ERROR5WARNING;

`no-param-reassign`
disallow reassignment of function parameters
disallow parameter object manipulation
rule: http:eslint.org/docs/rules/no-param-reassign.html

`no-process-env`
disallow use of process.env

`no-proto`
disallow usage of __proto__ property

`no-redeclare`
disallow declaring the same variable more then once

`no-return-assign`
disallow use of assignment in return statement

`no-script-url`
disallow use of `javascript:` urls.

`no-self-compare`
disallow comparisons where both sides are exactly the same

`no-sequences`
disallow use of comma operator

`no-throw-literal`
restrict what can be thrown as an exception

`no-unmodified-loop-condition`
disallow unmodified conditions of loops
http:eslint.org/docs/rules/no-unmodified-loop-condition

`no-unused-expressions`
disallow usage of expressions in statement position

`no-unused-labels`
disallow unused labels
http:eslint.org/docs/rules/no-unused-labels

`no-useless-call`
disallow unnecessary .call() and .apply()

`no-useless-escape`
disallow unnecessary string escaping
http:eslint.org/docs/rules/no-useless-escape

`no-void`
disallow use of void operator

`no-warning-comments`
disallow usage of configurable warning terms in comments: e.g. todo

`no-with`
disallow use of the with statement

`radix`
require use of the second argument for parseInt()

`vars-on-top`
requires to declare all vars on top of their containing scope

`wrap-iife`
require immediate function invocation to be wrapped in parentheses
http:eslint.org/docs/rules/wrap-iife.html

`yoda`
require or disallow Yoda conditions

Errors
-------

ES6 / ESNext / ES20whatever
-------

IMPORT
-------

LEGACY
-------

Node
-------

React
-------

Strict
-------

Style
-------

Variables
-------
