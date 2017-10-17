module.exports.routes = {
  route1: 'path1',
  route2: 'path2',
  route3: '$[key5.subKey1]',
  route4: '$[key5.subKey3]',
  route5: 'ServiceName($[key5.subKey3])',
  route6: 'ServiceName($[key5.subKey1])',
  route7: 'ServiceName($[key5.subKey3], $[key5.subKey1])',
  route8: `ServiceName($[key5.subKey3], $[key5.subKey1], 'test', 456)`,
};
