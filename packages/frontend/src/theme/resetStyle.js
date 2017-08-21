import { injectGlobal } from 'styled-components';

/*
 * Reset
 * Improved version of normalize.css merged with resetting css and some ideas from sanitize.css
 * Head commit during last update:
 * https://github.com/necolas/normalize.css/commit/4559de001bc15838c0314c713645086bdef64bc3
 */

export const injectResetStyle = () => {
  // eslint-disable-next-line no-unused-expressions
  injectGlobal`
   * {
     font-size: inherit;
     line-height: inherit;
   }

   ::before,
   ::after {
     text-decoration: inherit;
     vertical-align: inherit;
   }
   *,
   ::before,
   ::after {
     border-width: 0;
     border-style: solid;
   }
   html {
     text-size-adjust: 100%;
   }
   body,
   h1,
   h2,
   h3,
   h4,
   h5,
   h6 {
     margin: 0;
   }
   article,
   aside,
   footer,
   header,
   nav,
   section {
     display: block;
   }

   blockquote,
   figcaption,
   figure,
   main {
     display: block;
   }

   pre,
   ol,
   ul,
   dl,
   dd,
   figure,
   hr {
     margin: 0;
   }

   hr {
     overflow: visible;
     height: 0;
   }

   pre {
     overflow: auto;
     font-size: 1em;
     font-family: 'monospace', 'monospace';
   }
   table {
     border-collapse: collapse;
     border-spacing: 0;
     border-width: 0;
   }

   p {
     margin: 0;
   }
   a {
     background-color: transparent;
   }
   abbr[title] {
     border-bottom-width: 1px;
     border-bottom-style: dotted;
     text-decoration: none;
   }
   b,
   strong {
     font-weight: inherit;
   }

   b,
   strong {
     font-weight: 600;
   }

   code,
   kbd,
   samp {
     font-size: 1em;
     font-family: 'monospace', 'monospace';
   }

   dfn {
     font-style: italic;
   }

   abbr[title],
   dfn[title] {
     cursor: help;
   }

   mark {
     color: #000;
     background-color: #ff0;
   }

   small {
     font-size: 80%;
   }
   sub,
   sup {
     position: relative;
     font-size: 75%;
     line-height: 0;
     vertical-align: baseline;
   }

   sup {
     top: -0.5em;
   }

   sub {
     bottom: -0.25em;
   }
   audio,
   video {
     display: inline-block;
   }
   audio:not([controls]) {
     display: none;
     height: 0;
   }
   img {
     border-width: 0;
     font-style: italic;
   }
   svg:not(:root) {
     overflow: hidden;
   }

   button,
   input,
   optgroup,
   select,
   textarea {
     margin: 0;
     font-family: inherit;
   }
   optgroup {
     font-weight: 600;
   }

   input,
   textarea,
   select,
   button { outline-width: 0; }

   input,
   button {
     overflow: visible;
   }

   select,
   button {
     text-transform: none;
   }

   button,
   html [type="button"],
   [type="reset"],
   [type="submit"] {
     appearance: button;
   }


   button::-moz-focus-inner,
   [type="button"]::-moz-focus-inner,
   [type="reset"]::-moz-focus-inner,
   [type="submit"]::-moz-focus-inner {
     padding: 0;
     border-width: 0;
   }

   fieldset {
     padding: 0;
     border-width: 0;
     margin: 0;
   }

   legend {
     box-sizing: border-box;
     display: table;
     max-width: 100%;
     padding: 0;
     color: inherit;
     white-space: normal;
   }

   progress {
     display: inline-block;
     vertical-align: baseline;
   }

   textarea {
     overflow: auto;
     resize: vertical;
   }

   [type="checkbox"],
   [type="radio"] {
     box-sizing: border-box;
     padding: 0;
   }

   [type="number"]::-webkit-inner-spin-button,
   [type="number"]::-webkit-outer-spin-button {
     height: auto;
   }

   [type="search"] {
     outline-offset: -2px;
     appearance: textfield;
   }

   ::-webkit-file-upload-button {
     font: inherit;
     appearance: button;
   }

   details,
   menu {
     display: block;
   }

   summary {
     display: list-item;
   }

   canvas {
     display: inline-block;
   }

   template {
     display: none;
   }

   [hidden] {
     display: none;
   }
   `;
};
