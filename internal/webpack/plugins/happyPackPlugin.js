import HappyPack from 'happypack';

function happyPackPlugin({ name, loaders }) {
  return new HappyPack({
    id: name,
    verbose: false,
    threads: 3,
    loaders,
  });
}
export default happyPackPlugin;
