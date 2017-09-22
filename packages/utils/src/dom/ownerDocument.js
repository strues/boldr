module.exports = function ownerDocument(node) {
  return (node && node.ownerDocument) || document;
};
