export default function blockStyleFn(block) {
  const blockAlignment = block.getData() && block.getData().get('textAlign');
  const blockFloat = block.getData() && block.getData().get('float');

  let result = null;

  if (blockAlignment) {
    result = `be-${blockAlignment}-aligned-block`;
  }

  if (blockFloat) {
    result += ` be-float-${blockFloat}`;
  }

  return result;
}
