'use strict';

const OFF = 0;
const WARNING = 1;
const ERROR = 2;
const maxLenIgnorePattern = '^(?:var|let|const)\\s+[a-zA-Z_\\$][a-zA-Z_\\$\\d]*' +
  '\\s*=\\s*require\\(["\'a-zA-Z_\\+\\.\\s\\d_\\-\\/]+\\)[^;\\n]*[;\\n]';
module.exports = {
  env: {
    es6: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 2017,
    impliedStrict: true,
    sourceType: 'module',
    ecmaFeatures: { experimentalObjectRestSpread: true }
  },
  ecmaFeatures: {
    jsx: true,
  },
  parser: 'babel-eslint',
  plugins: [
    'babel',
    'import',
    'flowtype',
  ],
  settings: {
    'import/resolver': 'babel-module',
    'import/core-modules': ['babel-polyfill', 'isomorphic-fetch'],
    'import/extensions': ['.js', '.jsx'],
    'import/ignore': ['node_modules', '.(scss|less|css|styl)$', '.json$']
  },
  rules: {
    // enforces getter/setter pairs in objects
    'accessor-pairs': OFF,
    // enforces return statements in callbacks of array's methods
    // http://eslint.org/docs/rules/array-callback-return
    'array-callback-return': OFF,
    // treat var statements as if they were block scoped
    'block-scoped-var': ERROR,
    // specify the maximum cyclomatic complexity allowed in a program
    'complexity': [OFF, WARNING],
    // require return statements to either always or never specify values
    'consistent-return': OFF,
    // specify curly brace conventions for all control statements
    'curly': [ERROR, 'multi-line'],
    // require default case in switch statements
    'default-case': ERROR,
    // encourages use of dot notation whenever possible
    'dot-notation': [ERROR, {
      'allowKeywords': true,
      'allowPattern': '^[a-z]+(?:[_-\\s][a-z]+)+$'
    }],
    // enforces consistent newlines before or after dots
    'dot-location': OFF,
    // require the use of === and !==
    'eqeqeq': ERROR,
    // make sure for-in loops have an if statement
    'guard-for-in': ERROR,
    // Blacklist certain identifiers to prevent them being used
    // http://eslint.org/docs/rules/id-blacklist
    'id-blacklist': OFF,
    // disallow the use of alert, confirm, and prompt
    'no-alert': WARNING,
    // disallow use of arguments.caller or arguments.callee
    'no-caller': ERROR,
    // disallow lexical declarations in case/default clauses
    // http://eslint.org/docs/rules/no-case-declarations.html
    'no-case-declarations': OFF,
    // disallow division operators explicitly at beginning of regular expression
    'no-div-regex': OFF,
    // disallow else after a return in an if
    'no-else-return': OFF,
    // disallow Unnecessary Labels
    // http://eslint.org/docs/rules/no-extra-label
    'no-extra-label': ERROR,
    // disallow comparisons to null without a type-checking operator
    'no-eq-null': OFF,
    // disallow use of eval()
    'no-eval': ERROR,
    // disallow adding to native types
    'no-extend-native': WARNING,
    // disallow unnecessary function binding
    'no-extra-bind': WARNING,
    // disallow fallthrough of case statements
    'no-fallthrough': WARNING,
    // disallow the use of leading or trailing decimal points in numeric literals
    'no-floating-decimal': ERROR,
    // disallow the type conversions with shorter notations
    'no-implicit-coercion': OFF,
    // disallow use of eval()-like methods
    'no-implied-eval': ERROR,
    // disallow this keywords outside of classes or class-like objects
    'no-invalid-this': OFF,
    // disallow usage of __iterator__ property
    'no-iterator': ERROR,
    // disallow use of labels for anything other then loops and switches
    'no-labels': [ERROR, {
      allowLoop: false,
      allowSwitch: false
    }],
    // disallow unnecessary nested blocks
    'no-lone-blocks': ERROR,
    // disallow creation of functions within loops
    'no-loop-func': ERROR,
    // disallow use of multiple spaces
    'no-multi-spaces': ERROR,
    // disallow use of multiline strings
    'no-multi-str': ERROR,
    // disallow reassignments of native objects
    'no-native-reassign': [ERROR, {
      exceptions: ['Map', 'Set']
    }],
    // disallow use of new operator when not part of the assignment or comparison
    'no-new': ERROR,
    // disallow use of new operator for Function object
    'no-new-func': ERROR,
    // disallows creating new instances of String, Number, and Boolean
    'no-new-wrappers': ERROR,
    // disallow use of (old style) octal literals
    'no-octal': ERROR,
    // disallow use of octal escape sequences in string literals, such as
    // var foo = 'Copyright \ERROR5WARNING';
    'no-octal-escape': ERROR,
    // disallow reassignment of function parameters
    // disallow parameter object manipulation
    // rule: http://eslint.org/docs/rules/no-param-reassign.html
    'no-param-reassign': OFF,
    // disallow use of process.env
    'no-process-env': OFF,
    // disallow usage of __proto__ property
    'no-proto': ERROR,
    // disallow declaring the same variable more then once
    'no-redeclare': ERROR,
    // disallow use of assignment in return statement
    'no-return-assign': ERROR,
    // disallow use of `javascript:` urls.
    'no-script-url': ERROR,
    // disallow comparisons where both sides are exactly the same
    'no-self-compare': ERROR,
    // disallow use of comma operator
    'no-sequences': OFF,
    // restrict what can be thrown as an exception
    'no-throw-literal': WARNING,
    // disallow unmodified conditions of loops
    // http://eslint.org/docs/rules/no-unmodified-loop-condition
    'no-unmodified-loop-condition': OFF,
    // disallow usage of expressions in statement position
    'no-unused-expressions': OFF,
    // disallow unused labels
    // http://eslint.org/docs/rules/no-unused-labels
    'no-unused-labels': ERROR,
    // disallow unnecessary .call() and .apply()
    'no-useless-call': OFF,
    // disallow unnecessary string escaping
    // http://eslint.org/docs/rules/no-useless-escape
    'no-useless-escape': ERROR,
    // disallow use of void operator
    'no-void': OFF,
    // disallow usage of configurable warning terms in comments: e.g. todo
    'no-warning-comments': OFF,
    // disallow use of the with statement
    'no-with': ERROR,
    // require use of the second argument for parseInt()
    'radix': ERROR,
    // requires to declare all vars on top of their containing scope
    'vars-on-top': ERROR,
    // require immediate function invocation to be wrapped in parentheses
    // http://eslint.org/docs/rules/wrap-iife.html
    'wrap-iife': [ERROR, 'outside'],
    // require or disallow Yoda conditions
    'yoda': [ERROR, 'never', {
      exceptRange: false,
      onlyEquality: false
    }],
    'comma-dangle': [ERROR, 'always-multiline'],
    // disallow assignment in conditional expressions
    'no-cond-assign': [ERROR, 'except-parens'],
    // disallow use of console
    'no-console': OFF,
    // disallow use of constant expressions in conditions
    'no-constant-condition': WARNING,
    // disallow control characters in regular expressions
    'no-control-regex': ERROR,
    // disallow use of debugger
    'no-debugger': WARNING,
    // disallow duplicate arguments in functions
    'no-dupe-args': ERROR,
    // disallow duplicate keys when creating object literals
    'no-dupe-keys': ERROR,
    // disallow a duplicate case label.
    'no-duplicate-case': ERROR,
    // disallow the use of empty character classes in regular expressions
    'no-empty-character-class': ERROR,
    // disallow empty statements
    'no-empty': ERROR,
    // can cause subtle bugs in IE 8, and we shouldn't do this anyways
    'no-ex-assign': WARNING,
    // disallow double-negation boolean casts in a boolean context
    'no-extra-boolean-cast': OFF,
    // disallow unnecessary parentheses
    // This is annoying with ES6 arrows.
    'no-extra-parens': OFF,
    // disallow unnecessary semicolons
    'no-extra-semi': ERROR,
    // disallow overwriting functions written as function declarations
    'no-func-assign': OFF,
    // disallow function or variable declarations in nested blocks
    'no-inner-declarations': ERROR,
    // disallow invalid regular expression strings in the RegExp constructor
    'no-invalid-regexp': ERROR,
    // disallow irregular whitespace outside of strings and comments
    'no-irregular-whitespace': ERROR,
    // disallow negation of the left operand of an in expression
    'no-negated-in-lhs': ERROR,
    // disallow the use of object properties of the global object (Math and JSON) as functions
    'no-obj-calls': ERROR,
    // disallow multiple spaces in a regular expression literal
    'no-regex-spaces': ERROR,
    // disallow sparse arrays
    'no-sparse-arrays': ERROR,
    // disallow unreachable statements after a return, throw, continue, or break statement
    'no-unreachable': ERROR,
    // disallow comparisons with the value NaN
    'use-isnan': ERROR,
    // ensure JSDoc comments are valid
    'valid-jsdoc': [OFF, {
      requireReturn: false,
      requireParamDescription: false,
      requireReturnDescription: false,
      requireReturnType: true,
      prefer: {
        return: 'returns'
      }
    }],
    // ensure that the results of typeof are compared against a valid string
    'valid-typeof': ERROR,
    // Avoid code that looks like two expressions but is actually one
    'no-unexpected-multiline': OFF,
     // enforces no braces where they can be omitted
    // http://eslint.org/docs/rules/arrow-body-style
    'arrow-body-style': OFF,
    // require parens in arrow function arguments
    'arrow-parens': OFF,
    // require space before/after arrow function's arrow
    // https://github.com/eslint/eslint/blob/master/docs/rules/arrow-spacing.md
    'arrow-spacing': [WARNING, {
      before: true,
      after: true
    }],
    // verify super() callings in constructors
    'constructor-super': ERROR,
    // enforce the spacing around the * in generator functions
    'generator-star-spacing': OFF,
    // disallow modifying variables of class declarations
    'no-class-assign': OFF,
    // disallow arrow functions where they could be confused with comparisons
    // http://eslint.org/docs/rules/no-confusing-arrow
    'no-confusing-arrow': [OFF, {
      allowParens: true
    }],
    // disallow modifying variables that are declared using const
    'no-const-assign': ERROR,
    // disallow duplicate class members
    // http://eslint.org/docs/rules/no-dupe-class-members
    'no-dupe-class-members': ERROR,
    // disallow importing from the same path more than once
    // http://eslint.org/docs/rules/no-duplicate-imports
    // doesnt work well with flow
    'no-duplicate-imports': OFF,
    // disallow symbol constructor
    // http://eslint.org/docs/rules/no-new-symbol
    'no-new-symbol': OFF,
    // disallow specific globals
    'no-restricted-globals': OFF,
    // disallow specific imports
    // http://eslint.org/docs/rules/no-restricted-imports
    'no-restricted-imports': OFF,
    // disallow to use this/super before super() calling in constructors.
    'no-this-before-super': ERROR,
    // require let or const instead of var
    'no-var': ERROR,
    // disallow unnecessary constructor
    // http://eslint.org/docs/rules/no-useless-constructor
    'no-useless-constructor': ERROR,
    // require method and property shorthand syntax for object literals
    // https://github.com/eslint/eslint/blob/master/docs/rules/object-shorthand.md
    'object-shorthand': [WARNING, 'always'],
    // suggest using arrow functions as callbacks
    'prefer-arrow-callback': ERROR,
    // suggest using of const declaration for variables that are never modified after declared
    'prefer-const': WARNING,
    // suggest using the spread operator instead of .apply()
    'prefer-spread': OFF,
    // suggest using Reflect methods where applicable
    'prefer-reflect': OFF,
    // use rest parameters instead of arguments
    // http://eslint.org/docs/rules/prefer-rest-params
    'prefer-rest-params': WARNING,
    // suggest using template literals instead of string concatenation
    // http://eslint.org/docs/rules/prefer-template
    'prefer-template': WARNING,
    // disallow generator functions that do not have yield
    'require-yield': OFF,
    // import sorting
    // http://eslint.org/docs/rules/sort-imports
    'sort-imports': OFF,
    // enforce usage of spacing in template strings
    // http://eslint.org/docs/rules/template-curly-spacing
    'template-curly-spacing': ERROR,
    // enforce spacing around the * in yield* expressions
    // http://eslint.org/docs/rules/yield-star-spacing
    'yield-star-spacing': OFF,
    // BABEL
    'babel/array-bracket-spacing': OFF,
    'babel/arrow-parens': OFF,
    'babel/generator-star-spacing': [WARNING, 'after'],
    'babel/object-curly-spacing': [ERROR, 'always'],
    'babel/object-shorthand': [WARNING, 'properties'], // methods are optional so you can specify a name if you want
    'babel/new-cap': OFF,
    //   no eslint version
    'babel/flow-object-type': OFF, // no opinion
    'babel/func-params-comma-dangle': OFF,
    'babel/no-await-in-loop': ERROR,
        'flowtype/define-flow-type': WARNING,
    'flowtype/require-valid-file-annotation': WARNING,
    'flowtype/require-return-type': OFF,
    'flowtype/space-after-type-colon': [ERROR, 'always'],
    'flowtype/space-before-generic-bracket': [ERROR, 'never'],
    'flowtype/space-before-type-colon': [ERROR, 'never'],
    'flowtype/type-id-match': OFF,
    'no-constant-condition': OFF,
    'flowtype/no-weak-types': OFF,
    'import/no-unresolved': OFF,
    'import/named': OFF,
    'import/default': OFF,
    'import/namespace': OFF,
    'import/export': ERROR,
    'import/no-named-as-default': OFF,
    'import/imports-first': WARNING,
    'import/no-duplicates': ERROR,
    // this is an in progress rule
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-deprecated.md
    'import/no-deprecated': OFF,
    'import/extensions': OFF,
    'import/newline-after-import': WARNING,
    'import/no-amd': ERROR,
    'import/no-commonjs': OFF,
    'import/no-extraneous-dependencies': OFF,
    'import/no-mutable-exports': ERROR,
    'import/no-named-as-default-member': OFF,
    'import/no-namespace': OFF,
    'import/no-nodejs-modules': OFF,
    'import/no-restricted-paths': OFF,
    'import/order': [WARNING, { 'groups': ['builtin', ['external', 'internal'], 'parent', ['sibling', 'index']] }],
    'import/prefer-default-export': OFF,
    'import/no-unassigned-import': OFF,
        'global-require': WARNING,
    // enforce return after a callback
    'callback-return': OFF,
    // enforces error handling in callbacks (node environment)
    'handle-callback-err': WARNING,
    // disallow mixing regular variable and require declarations
    'no-mixed-requires': [ERROR, { grouping: true, allowCall: false }],
    // disallow use of new operator with the require function
    'no-new-require': ERROR,
    // disallow string concatenation with __dirname and __filename
    'no-path-concat': OFF,
    // disallow process.exit()
    'no-process-exit': OFF,
    'no-process-env': OFF,
    // restrict usage of specified node modules
    'no-restricted-modules': OFF,
    // disallow use of synchronous methods (off by default)
    'no-sync': OFF,
     // Prevent missing displayName in a React component definition
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/display-name.md
    'react/display-name': [OFF, {
      ignoreTranspilerName: false
    }],
    // Forbid certain propTypes (any, array, object)
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/forbid-prop-types.md
    // irrelevant use flow
    'react/forbid-prop-types': OFF,
    // Enforce boolean attributes notation in JSX
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-boolean-value.md
    'react/jsx-boolean-value': [ERROR, 'never'],
    // Validate closing bracket location in JSX
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-closing-bracket-location.md
    'react/jsx-closing-bracket-location': [ERROR, 'line-aligned'],
    // Enforce or disallow spaces inside of curly braces in JSX attributes
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-curly-spacing.md
    'react/jsx-curly-spacing': [WARNING, 'always', {
      allowMultiline: true
    }],
    // Enforce event handler naming conventions in JSX
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-handler-names.md
    'react/jsx-handler-names': [OFF, {
      eventHandlerPrefix: 'handle',
      eventHandlerPropPrefix: 'on'
    }],
    // Validate props indentation in JSX
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-indent-props.md
    'react/jsx-indent-props': [ERROR, ERROR],
    // Validate JSX has key prop when in array or iterator
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-key.md
    'react/jsx-key': WARNING,
    // Limit maximum of props on a single line in JSX
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-max-props-per-line.md
    'react/jsx-max-props-per-line': OFF,
    // Prevent usage of .bind() and arrow functions in JSX props
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-bind.md
    'react/jsx-no-bind': [ERROR, {
      ignoreRefs: true,
      allowArrowFunctions: true,
      allowBind: false
    }],
    // Prevent duplicate props in JSX
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-duplicate-props.md
    'react/jsx-no-duplicate-props': [ERROR, {
      ignoreCase: false
    }],
    // Prevent usage of unwrapped JSX strings
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-literals.md
    'react/jsx-no-literals': OFF,
    // Disallow undeclared variables in JSX
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-undef.md
    'react/jsx-no-undef': ERROR,
    // Enforce PascalCase for user-defined JSX components
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-pascal-case.md
    'react/jsx-pascal-case': ERROR,
    // Enforce propTypes declarations alphabetical sorting
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/sort-prop-types.md
    'react/sort-prop-types': [OFF, {
      ignoreCase: false,
      callbacksLast: false
    }],
    // Enforce props alphabetical sorting
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-sort-props.md
    'react/jsx-sort-props': OFF,
    // Prevent React to be incorrectly marked as unused
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-uses-react.md
    'react/jsx-uses-react': 2,
    // Prevent variables used in JSX to be incorrectly marked as unused
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-uses-vars.md
    'react/jsx-uses-vars': 2,
    // Prevent usage of dangerous JSX properties
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-danger.md
    'react/no-danger': OFF,
    // Prevent usage of setState in componentDidMount
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-did-mount-set-state.md
    'react/no-did-mount-set-state': WARNING,
    // Prevent usage of setState in componentDidUpdate
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-did-update-set-state.md
    'react/no-did-update-set-state': ERROR,
    // Prevent direct mutation of this.state
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-direct-mutation-state.md
    'react/no-direct-mutation-state': OFF,
    // Prevent usage of isMounted
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-is-mounted.md
    'react/no-is-mounted': ERROR,
    // Prevent multiple component definition per file
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-multi-comp.md
    'react/no-multi-comp': [ERROR, {
      ignoreStateless: true
    }],
    // Prevent usage of setState
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-set-state.md
    'react/no-set-state': OFF,
    // Prevent using string references
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-string-refs.md
    'react/no-string-refs': OFF,
    // Prevent usage of unknown DOM property
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-unknown-property.md
    'react/no-unknown-property': ERROR,
    // Require ES6 class declarations over React.createClass
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/prefer-es6-class.md
    'react/prefer-es6-class': [WARNING, 'always'],
    // Require stateless functions when not using lifecycle methods, setState or ref
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/prefer-stateless-function.md
    'react/prefer-stateless-function': WARNING,
    // Prevent missing props validation in a React component definition
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/prop-types.md
    'react/prop-types': [ERROR, {
      ignore: [],
      customValidators: []
    }],
    // Prevent missing React when using JSX
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/react-in-jsx-scope.md
    'react/react-in-jsx-scope': ERROR,
    // Restrict file extensions that may be required
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/require-extension.md
    'react/require-extension': OFF,
    // Require render() methods to return something
    // https://github.com/yannickcr/eslint-plugin-react/pull/5OFFERROR
    'react/require-render-return': ERROR,
    // Prevent extra closing tags for components without children
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/self-closing-comp.md
    'react/self-closing-comp': ERROR,
    // Enforce spaces before the closing bracket of self-closing JSX elements
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-space-before-closing.md
    'react/jsx-space-before-closing': [ERROR, 'always'],
    // Enforce component methods order
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/sort-comp.md
    'react/sort-comp': [ERROR, {
      order: [
        'static-methods',
        'lifecycle',
        'everything-else',
        '/^render.+$/',
        'render'
      ]
    }],
    // Prevent missing parentheses around multilines JSX
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/wrap-multilines.md
    'react/wrap-multilines': [ERROR, {
      declaration: true,
      assignment: true,
      return: true
    }],
     // enforce spacing inside array brackets
    'array-bracket-spacing': [ERROR, 'never'],
    'block-spacing': OFF,
    // enforce one true brace style
    'brace-style': [WARNING, '1tbs', {
      'allowSingleLine': true
    }],
    // require camel case names
    'camelcase': [OFF, {
      'properties': 'always'
    }],
    // enforce spacing before and after comma
    'comma-spacing': [ERROR, {
      'before': false,
      'after': true
    }],
    // enforce one true comma style
    'comma-style': [ERROR, 'last'],
    // disallow padding inside computed properties
    'computed-property-spacing': [WARNING, 'never'],
    // enforces consistent naming when capturing the current execution context
    'consistent-this': OFF,
    // enforce newline at the end of file, with no multiple empty lines
    'eol-last': ERROR,
    // require function expressions to have a name
    'func-names': OFF,
    // enforces use of function declarations or expressions
    'func-style': [OFF, 'declaration'],
    // this option enforces minimum and maximum identifier lengths
    // (variable names, property names etc.)
    'id-length': OFF,
    'id-match': OFF,
    // this option sets a specific tab width for your code
    // https://github.com/eslint/eslint/blob/master/docs/rules/indent.md
    'indent': [ERROR, 2, {
      'SwitchCase': 1
    }],
    // specify whether double or single quotes should be used in JSX attributes
    // http://eslint.org/docs/rules/jsx-quotes
    'jsx-quotes': [ERROR, 'prefer-double'],
    // enforces spacing between keys and values in object literal properties
    'key-spacing': [ERROR, {
      'beforeColon': false,
      'afterColon': true
    }],
    // require a space before & after certain keywords
    'keyword-spacing': [ERROR, {
      'before': true,
      'after': true,
      'overrides': {
        'return': {
          'after': true
        },
        'throw': {
          'after': true
        },
        'case': {
          'after': true
        }
      }
    }],
    // enforces empty lines around comments
    'lines-around-comment': OFF,
    // disallow mixed 'LF' and 'CRLF' as linebreaks
    'linebreak-style': [OFF, 'unix'],
    'max-depth': [ERROR, 4],
    'max-len': [WARNING, 120, 2,
      {
        'ignorePattern': maxLenIgnorePattern
      }
    ],
    'max-lines': [ERROR, { max: 500, 'skipBlankLines': false, skipComments: false }],
    'max-statements-per-line': [ERROR, { max: 1 }],
    'max-statements': [ERROR, 30],
    // specify the maximum depth callbacks can be nested
    'max-nested-callbacks': OFF,
    // require a capital letter for constructors
    'new-cap': OFF,
    // disallow the omission of parentheses when invoking a constructor with no arguments
    'new-parens': OFF,
    // allow/disallow an empty newline after var statement
    'newline-after-var': OFF,
    // http://eslint.org/docs/rules/newline-before-return
    'newline-before-return': OFF,
    // enforces new line after each method call in the chain to make it
    // more readable and easy to maintain
    // http://eslint.org/docs/rules/newline-per-chained-call
    'newline-per-chained-call': [OFF, {
      'ignoreChainWithDepth': 3
    }],
    // disallow use of the Array constructor
    'no-array-constructor': ERROR,
    // disallow use of the continue statement
    'no-continue': OFF,
    // disallow comments inline after code
    'no-inline-comments': OFF,
    // disallow if as the only statement in an else block | doesn't play well with `if (__DEV__) {}`
    'no-lonely-if': OFF,
    // disallow mixed spaces and tabs for indentation
    'no-mixed-spaces-and-tabs': ERROR,
    // disallow multiple empty lines and only one newline at the end
    'no-multiple-empty-lines': [WARNING, {
      'max': 2,
      'maxEOF': 1
    }],
    // disallow nested ternary expressions
    'no-nested-ternary': OFF,
    // disallow use of the Object constructor
    'no-new-object': WARNING,
    // disallow space between function identifier and application
    'no-spaced-func': WARNING,
    // disallow the use of ternary operators
    'no-ternary': OFF,
    'no-tabs': ERROR,
    // disallow trailing whitespace at the end of lines
    'no-trailing-spaces': [ERROR, { skipBlankLines: true }],
    // disallow dangling underscores in identifiers because GROSS
    'no-underscore-dangle': OFF,
    // disallow the use of Boolean literals in conditional expressions
    // also, prefer `a || b` over `a ? a : b`
    // http://eslint.org/docs/rules/no-unneeded-ternary
    'no-unneeded-ternary': [WARNING, {
      'defaultAssignment': false
    }],
    // disallow whitespace before properties
    // http://eslint.org/docs/rules/no-whitespace-before-property
    'no-whitespace-before-property': ERROR,
    // require padding inside curly braces
    'object-curly-spacing': [ERROR, 'always'],
    // allow just one var statement per function
    'one-var': [ERROR, { uninitialized: 'always', initialized: 'never' }],
    // require a newline around variable declaration
    // http://eslint.org/docs/rules/one-var-declaration-per-line
    'one-var-declaration-per-line': [ERROR, 'always'],
    // prefer `x += 4` over `x = x + 4`
    'operator-assignment': OFF,
    // enforce operators to be placed before or after line breaks
    'operator-linebreak': OFF,
    // enforce padding within blocks
    'padded-blocks': [ERROR, 'never'],
    // require quotes around object literal property names
    // http://eslint.org/docs/rules/quote-props.html
    'quote-props': [ERROR, 'as-needed', {
      'keywords': false,
      'unnecessary': true,
      'numbers': false
    }],
    // specify whether double or single quotes should be used
    'quotes': [ERROR, 'single', 'avoid-escape'],
    // enforce spacing before and after semicolons
    'semi-spacing': [ERROR, {
      'before': false,
      'after': true
    }],
    // require or disallow use of semicolons instead of ASI
    'semi': [ERROR, 'always'],
    // sort variables within the same declaration block
    'sort-vars': OFF,
    'sort-keys': OFF,
    // require `if () {` instead of `if (){`
    'space-before-blocks': [WARNING, 'always'],
    // require `function foo()` instead of `function foo ()`
    'space-before-function-paren': [
      WARNING,
      {
        'anonymous': 'never',
        'named': 'never'
      }
    ],
    // require or disallow spaces inside parentheses
    'space-in-parens': [ERROR, 'never'],
    // require spaces around operators
    'space-infix-ops': ERROR,
    // Require or disallow spaces before/after unary operators
    'space-unary-ops': OFF,
    // require or disallow a space immediately following the // or /* in a comment
    'spaced-comment': [WARNING, 'always', {
      'exceptions': ['-', '+'],
      'markers': ['=', '!'] // space here to support sprockets directives
    }],
    // require regex literals to be wrapped in parentheses
    'wrap-regex': OFF,
     // enforce or disallow variable initializations at definition
    'init-declarations': OFF,
    // disallow the catch clause parameter name being the same as a variable in the outer scope
    'no-catch-shadow': OFF,
    // disallow deletion of variables | is a strict mode violation
    'no-delete-var': ERROR,
    // disallow var and named functions in global scope
    // http://eslint.org/docs/rules/no-implicit-globals
    'no-implicit-globals': OFF,
    // disallow labels that share a name with a variable
    'no-label-var': OFF,
    // disallow self assignment
    // http://eslint.org/docs/rules/no-self-assign
    'no-self-assign': ERROR,
    // redefining undefined, NaN, Infinity, arguments, and eval is bad, mkay?
    'no-shadow-restricted-names': ERROR,
    // disallow declaration of variables already declared in the outer scope
    'no-shadow': OFF,
    // disallow use of undefined when initializing variables
    'no-undef-init': WARNING,
    // disallow use of undeclared variables unless mentioned in a /*global */ block
    'no-undef': WARNING,
    // disallow use of undefined variable
    'no-undefined': OFF,
    // disallow declaration of variables that are not used in the code
    'no-unused-vars': OFF,
    // too noisy
    'no-use-before-define': OFF,
  },
};
