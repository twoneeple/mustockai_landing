// config.js
require('dotenv').config();

const config = {
  // Server configuration
  server: {
    port: process.env.PORT || 5000,
    host: process.env.HOST || 'localhost',
    env: process.env.NODE_ENV || 'development'
  },
  
  // Database configuration
  database: {
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/mustock-ai',
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  },
  
  // NLP service configuration
  nlp: {
    // Training data configuration
    trainingDataPath: process.env.TRAINING_DATA_PATH || './data/training-data.json',
    modelSavePath: process.env.MODEL_SAVE_PATH || './models/nlp-model',
    // Define confidence threshold for NLP queries
    confidenceThreshold: parseFloat(process.env.NLP_CONFIDENCE_THRESHOLD) || 0.7
  },
  
  // Scanner configuration
  scanner: {
    // Define supported barcode types
    supportedBarcodeTypes: ['CODE_128', 'CODE_39', 'EAN_13', 'UPC_A', 'QR_CODE'],
    // Scanner API endpoint (if using external scanner service)
    apiEndpoint: process.env.SCANNER_API_ENDPOINT
  },
  
  // Authentication configuration
  auth: {
    jwtSecret: process.env.JWT_SECRET || 'your-default-secret-key',
    jwtExpiration: process.env.JWT_EXPIRATION || '1d',
    // User roles
    roles: ['admin', 'manager', 'worker', 'viewer']
  },
  
  // Inventory settings
  inventory: {
    // Default threshold for low stock alerts
    defaultLowStockThreshold: parseInt(process.env.DEFAULT_LOW_STOCK_THRESHOLD) || 5,
    // Categories specific to music equipment
    categories: [
      'Electric Guitars',
      'Acoustic Guitars',
      'Bass Guitars',
      'Keyboards',
      'Drums & Percussion',
      'Studio Equipment',
      'Amplifiers',
      'Effects Pedals',
      'Accessories',
      'Vintage Equipment'
    ],
    // Automatic reorder settings
    autoReorder: {
      enabled: process.env.AUTO_REORDER_ENABLED === 'true',
      thresholdPercentage: parseFloat(process.env.AUTO_REORDER_THRESHOLD) || 0.2
    }
  },
  
  // Integration settings
  integrations: {
    // Point of sale integration
    pos: {
      enabled: process.env.POS_INTEGRATION_ENABLED === 'true',
      apiEndpoint: process.env.POS_API_ENDPOINT,
      apiKey: process.env.POS_API_KEY
    },
    // E-commerce platform integration
    ecommerce: {
      enabled: process.env.ECOMMERCE_INTEGRATION_ENABLED === 'true',
      platforms: ['shopify', 'woocommerce', 'magento'],
      syncInterval: parseInt(process.env.ECOMMERCE_SYNC_INTERVAL) || 3600 // in seconds
    }
  },
  
  // Notification settings
  notifications: {
    // Email notifications
    email: {
      enabled: process.env.EMAIL_NOTIFICATIONS_ENABLED === 'true',
      service: process.env.EMAIL_SERVICE || 'smtp',
      host: process.env.EMAIL_HOST,
      port: parseInt(process.env.EMAIL_PORT) || 587,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      },
      from: process.env.EMAIL_FROM || 'mustock-ai@example.com'
    },
    // Push notifications
    push: {
      enabled: process.env.PUSH_NOTIFICATIONS_ENABLED === 'true',
      provider: process.env.PUSH_PROVIDER || 'firebase',
      apiKey: process.env.PUSH_API_KEY
    }
  }
};

module.exports = config;