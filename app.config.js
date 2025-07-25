import Constants from 'expo-constants';

export default () => {
  // Debug: Log environment variables during build
  // Only log in development to prevent production crashes
  if (process.env.NODE_ENV === 'development') {
    console.log('Building with env vars:', {
      supabaseUrl: process.env.EXPO_PUBLIC_SUPABASE_URL,
      hasAnonKey: !!process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY
    });

    // Validate environment variables
    if (!process.env.EXPO_PUBLIC_SUPABASE_URL || !process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY) {
      console.warn('⚠️ Missing Supabase environment variables!');
    }
  }

  return {
    name: "Remove.Help",
    slug: "remove",
    version: "1.0.1",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "myapp",
    userInterfaceStyle: "automatic",
    splash: {
      image: "./assets/images/icon.png",
      resizeMode: "contain",
      backgroundColor: "#facc15"
    },
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.remove.help",
      infoPlist: {
        ITSAppUsesNonExemptEncryption: false,
        NSCameraUsageDescription: "This app uses the camera to allow you to take photos for background removal."
      }
    },
    android: {
      package: "com.remove.help",
      versionCode: 1,
      adaptiveIcon: {
        foregroundImage: "./assets/images/icon.png",
        backgroundColor: "#facc15"
      },
      permissions: [
        "CAMERA",
        "READ_EXTERNAL_STORAGE",
        "WRITE_EXTERNAL_STORAGE",
        "INTERNET",
        "ACCESS_NETWORK_STATE"
      ]
    },
    web: {
      bundler: "metro",
      output: "single",
      favicon: "./assets/images/favicon.png"
    },
    plugins: [
      "expo-router",
      "expo-font",
      [
        "expo-camera",
        {
          "cameraPermission": "This app uses the camera to allow you to take photos for background removal."
        }
      ],
              [
          "expo-build-properties",
          {
            android: {
              enableProguardInReleaseBuilds: false,
              enableShrinkResourcesInReleaseBuilds: false
            },
            ios: {
              deploymentTarget: "15.1"
            }
          }
        ]
    ],
    experiments: {
      typedRoutes: true
    },
    owner: "cursor4",
    extra: {
      // Ensure environment variables are available at runtime
      EXPO_PUBLIC_SUPABASE_URL: process.env.EXPO_PUBLIC_SUPABASE_URL,
      EXPO_PUBLIC_SUPABASE_ANON_KEY: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY,
      router: {},
      eas: {
        projectId: "9ee765c5-e232-4967-ba0c-b45b89e4dc31"
      }
    }
  };
}; 