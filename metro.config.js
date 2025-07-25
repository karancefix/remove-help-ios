const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Fix iOS require issues
config.transformer.getTransformOptions = async () => ({
  transform: {
    experimentalImportSupport: false,
    inlineRequires: false, // This was causing the issue
  },
});

// Ensure proper resolver configuration
config.resolver.platforms = ['native', 'android', 'ios', 'web'];

// Add alias for @ to project root  
config.resolver.alias = {
  '@': __dirname,
};

// Fix resolver main fields for iOS compatibility
config.resolver.resolverMainFields = ['react-native', 'main'];

// Add proper asset extensions
config.resolver.assetExts.push('db');

module.exports = config;