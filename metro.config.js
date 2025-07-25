const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// iOS-compatible configuration with Supabase support
config.resolver.alias = {
  '@': __dirname,
  // Add polyfills for Node.js modules that Supabase needs
  'stream': 'readable-stream',
  'util': 'util',
};

// Set up resolver fallbacks for Node.js modules
config.resolver.fallback = {
  "http": false,
  "https": false,
  "url": false,
  "fs": false,
  "net": false,
  "crypto": false,
};

// Only block problematic node-fetch module 
config.resolver.blockList = [
  /node_modules\/@supabase\/node-fetch/,
];

config.transformer.getTransformOptions = async () => ({
  transform: {
    experimentalImportSupport: false,
    inlineRequires: false, // Keep this false for iOS compatibility
  },
});

config.resolver.platforms = ['native', 'android', 'ios', 'web'];
config.resolver.resolverMainFields = ['react-native', 'browser', 'main'];
config.resolver.assetExts.push('db');

module.exports = config;