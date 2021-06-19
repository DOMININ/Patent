const { alias, aliasJest } = require('react-app-rewire-alias');

const aliasMap = {
  '@components': 'src/components',
  '@socket': 'socket',
};

module.exports = alias(aliasMap);
module.exports.jest = aliasJest(aliasMap);
