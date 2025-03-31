const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('./backend/config/config');

// Import routes
const inventoryRoutes = require('./backend/routes/inventory');
const assistantRoutes = require('./backend/routes/assistant');

// Initialize express app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from public directory
app.use(express.static('public'));

// Connect to MongoDB
mongoose.connect(config.database.uri, config.database.options)
  .then(() => {
    console.log('🚀 MongoDB connected successfully');
    console.log(`🔧 Connected to database: ${config.database.uri}`);
  })
  .catch(err => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });

// Mongoose connection event listeners
mongoose.connection.on('connected', () => {
  console.log('Mongoose default connection is open');
});

mongoose.connection.on('error', (err) => {
  console.error(`Mongoose default connection has occurred ${err} error`);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose default connection is disconnected');
});

// Routes
app.use('/api/inventory', inventoryRoutes);
app.use('/api/assistant', assistantRoutes);

// Root route for health check
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Mustock AI - Music Inventory Management System',
    status: 'healthy',
    version: '1.0.0'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'An unexpected error occurred',
    error: config.server.env === 'development' ? err.message : 'Internal Server Error'
  });
});

// 404 handler
app.use((req, res, next) => {
  res.status(404).json({
    message: 'Route not found',
    requestedUrl: req.originalUrl
  });
});

// Start server
const PORT = config.server.port;
const HOST = config.server.host;

const server = app.listen(PORT, HOST, () => {
  console.log(`🌐 Mustock AI Server running on http://${HOST}:${PORT}`);
  console.log(`🌍 Environment: ${config.server.env}`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('Mongoose default connection disconnected through app termination');
    server.close(() => {
      console.log('Server shut down');
      process.exit(0);
    });
  });
});

module.exports = app;