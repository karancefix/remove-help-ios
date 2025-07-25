const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Simple iOS-compatible configuration
config.resolver.alias = {
  '@': __dirname,
};

// Block all Supabase modules to prevent Node.js conflicts
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
    inlineRequires: false,
  },
});

config.resolver.platforms = ['native', 'android', 'ios', 'web'];
config.resolver.resolverMainFields = ['react-native', 'browser', 'main'];
config.resolver.assetExts.push('db');

module.exports = config;