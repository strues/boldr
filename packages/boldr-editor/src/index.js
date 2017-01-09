import insertDataBlock from './utils/insertDataBlock';
import Editor from './components/Editor';
import Icons from './components/Buttons/';
import * as convert from './utils/convert';

const BE = {
  editorStateFromRaw: convert.editorStateFromRaw,
  editorStateFromHtml: convert.editorStateFromHtml,
  editorStateToJSON: convert.editorStateToJSON,
  editorStateToHtml: convert.editorStateToHtml,
  insertDataBlock,
  Editor,
  Icons,
};

module.exports = BE;
