const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Fix iOS Node.js module resolution issues
config.resolver.alias = {
  '@': __dirname,
  // Resolve Node.js modules for React Native
  'stream': 'readable-stream',
  'util': 'util',
};

// Add Node.js polyfills for React Native
config.resolver.fallback = {
  'stream': require.resolve('readable-stream'),
  'http': false,
  'https': false,
  'url': false,
  'fs': false,
  'net': false,
  'crypto': false,
  'util': require.resolve('util'),
};

// Block problematic modules
config.resolver.blockList = [
  /node_modules\/@supabase\/node-fetch/,
];

config.transformer.getTransformOptions = async () => ({
  transform: {
    experimentalImportSupport: false,
    inlineRequires: false,
  },
});

config.resolver.platforms = ['native', 'android', 'ios', 'web'];
config.resolver.resolverMainFields = ['react-native', 'browser', 'main'];
config.resolver.assetExts.push('db');

module.exports = config;