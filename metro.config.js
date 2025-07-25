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

// Block all Supabase modules to prevent Node.js conflicts - use mock client instead
config.resolver.blockList = [
  /node_modules\/@supabase\/supabase-js/,
  /node_modules\/@supabase\/node-fetch/,
  /node_modules\/@supabase\/postgrest-js/,
  /node_modules\/@supabase\/realtime-js/,
  /node_modules\/@supabase\/gotrue-js/,
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