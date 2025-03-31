const express = require('express');
const router = express.Router();
const InventoryItem = require('../models/InventoryItem');
const config = require('../config/config');

// NLP service (to be implemented)
const NLPService = require('../services/NLPService');

// Error handling utility
const handleError = (res, error, statusCode = 500) => {
  console.error('Assistant Routes Error:', error);
  res.status(statusCode).json({
    message: 'An error occurred while processing your request',
    error: process.env.NODE_ENV === 'development' ? error.message : 'Internal Server Error'
  });
};

// Natural Language Query Endpoint
router.post('/query', async (req, res) => {
  try {
    const { query } = req.body;
    
    // Validate input
    if (!query) {
      return res.status(400).json({
        message: 'Query is required'
      });
    }
    
    // Process query using NLP
    const nlpService = new NLPService();
    const intent = await nlpService.classifyIntent(query);
    
    // Route query based on intent
    let response;
    switch (intent.type) {
      case 'inventory_search':
        response = await handleInventorySearch(intent.entities);
        break;
      case 'low_stock_check':
        response = await handleLowStockCheck(intent.entities);
        break;
      case 'location_query':
        response = await handleLocationQuery(intent.entities);
        break;
      case 'product_details':
        response = await handleProductDetails(intent.entities);
        break;
      default:
        response = {
          message: 'I could not understand your specific request. Could you rephrase?',
          suggestedActions: [
            'Ask about inventory',
            'Check low stock items',
            'Find product location',
            'Get product details'
          ]
        };
    }
    
    res.json({
      query: query,
      intent: intent.type,
      response: response
    });
  } catch (error) {
    handleError(res, error);
  }
});

// Helper function to handle inventory search
async function handleInventorySearch(entities) {
  try {
    const filter = {};
    
    // Apply filters based on extracted entities
    if (entities.category) filter.category = entities.category;
    if (entities.minPrice) filter.price = { $gte: entities.minPrice };
    if (entities.maxPrice) filter.price = { 
      ...filter.price, 
      $lte: entities.maxPrice 
    };
    
    const items = await InventoryItem.find(filter).limit(10);
    
    return {
      message: items.length 
        ? `Found ${items.length} matching items` 
        : 'No items found matching your search',
      items: items.map(item => ({
        name: item.name,
        category: item.category,
        quantity: item.quantity,
        price: item.price.toString()
      }))
    };
  } catch (error) {
    console.error('Inventory search error:', error);
    return {
      message: 'Error searching inventory',
      error: error.message
    };
  }
}

// Helper function to handle low stock check
async function handleLowStockCheck(entities) {
  try {
    const filter = {};
    if (entities.category) filter.category = entities.category;
    
    const lowStockItems = await InventoryItem.find({
      ...filter,
      $expr: { $lte: ['$quantity', '$minimumStockLevel'] }
    });
    
    return {
      message: lowStockItems.length 
        ? `Found ${lowStockItems.length} low stock items` 
        : 'No low stock items found',
      items: lowStockItems.map(item => ({
        name: item.name,
        category: item.category,
        currentQuantity: item.quantity,
        minimumStockLevel: item.minimumStockLevel
      }))
    };
  } catch (error) {
    console.error('Low stock check error:', error);
    return {
      message: 'Error checking low stock items',
      error: error.message
    };
  }
}

// Helper function to handle location query
async function handleLocationQuery(entities) {
  try {
    const item = await InventoryItem.findOne({ 
      name: { $regex: entities.productName, $options: 'i' } 
    });
    
    if (!item) {
      return {
        message: `Could not find location for ${entities.productName}`
      };
    }
    
    return {
      message: `Location found for ${item.name}`,
      location: item.location,
      additionalInfo: {
        quantity: item.quantity,
        category: item.category
      }
    };
  } catch (error) {
    console.error('Location query error:', error);
    return {
      message: 'Error finding product location',
      error: error.message
    };
  }
}

// Helper function to handle product details query
async function handleProductDetails(entities) {
  try {
    const item = await InventoryItem.findOne({ 
      name: { $regex: entities.productName, $options: 'i' } 
    });
    
    if (!item) {
      return {
        message: `Could not find details for ${entities.productName}`
      };
    }
    
    return {
      message: `Details for ${item.name}`,
      details: {
        name: item.name,
        category: item.category,
        description: item.description,
        price: item.price.toString(),
        quantity: item.quantity,
        specifications: item.specifications,
        condition: item.condition
      }
    };
  } catch (error) {
    console.error('Product details error:', error);
    return {
      message: 'Error retrieving product details',
      error: error.message
    };
  }
}

// Barcode lookup route
router.get('/barcode/:barcode', async (req, res) => {
  try {
    const { barcode } = req.params;
    
    const item = await InventoryItem.findOne({ barcode });
    
    if (!item) {
      return res.status(404).json({
        message: 'No item found with this barcode',
        barcode
      });
    }
    
    res.json({
      message: 'Item found',
      item: {
        name: item.name,
        category: item.category,
        quantity: item.quantity,
        price: item.price.toString(),
        location: item.location
      }
    });
  } catch (error) {
    handleError(res, error);
  }
});

module.exports = router;
