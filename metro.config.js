const { getDefaultConfig } = require('@expo/metro-config');

const config = getDefaultConfig(__dirname);

// Add this to properly configure Hermes
config.resolver.sourceExts = [...config.resolver.sourceExts, 'cjs'];
config.transformer = {
  ...config.transformer,
  unstable_allowRequireContext: true,
  enableBabelRuntime: true,
  babelTransformerPath: require.resolve('metro-react-native-babel-transformer'),
};

module.exports = config;