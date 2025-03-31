const InventoryItem = require('../models/InventoryItem');
const config = require('../config/config');

// Error handling utility
const handleError = (res, error, statusCode = 500) => {
  console.error('Inventory Controller Error:', error);
  res.status(statusCode).json({
    message: 'An error occurred while processing your request',
    error: process.env.NODE_ENV === 'development' ? error.message : 'Internal Server Error'
  });
};

// Inventory Controller Methods
exports.addItem = async (req, res) => {
  try {
    // Validate input
    const { name, category, quantity, price, sku, barcode } = req.body;
    
    // Check if item with same SKU or barcode already exists
    const existingItem = await InventoryItem.findOne({
      $or: [{ sku }, { barcode }]
    });
    
    if (existingItem) {
      return res.status(400).json({
        message: 'An item with this SKU or barcode already exists',
        itemId: existingItem._id
      });
    }
    
    // Create new inventory item
    const newItem = new InventoryItem({
      ...req.body,
      minimumStockLevel: req.body.minimumStockLevel || config.inventory.defaultLowStockThreshold
    });
    
    // Save the item
    const savedItem = await newItem.save();
    
    res.status(201).json({
      message: 'Item added successfully',
      item: savedItem
    });
  } catch (error) {
    handleError(res, error);
  }
};

exports.updateItemQuantity = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity, reason } = req.body;
    
    // Validate input
    if (quantity === undefined || quantity === null) {
      return res.status(400).json({
        message: 'Quantity is required'
      });
    }
    
    // Find the item
    const item = await InventoryItem.findById(id);
    
    if (!item) {
      return res.status(404).json({
        message: 'Item not found'
      });
    }
    
    // Update quantity
    const oldQuantity = item.quantity;
    item.quantity = quantity;
    
    // Save the updated item
    const updatedItem = await item.save();
    
    res.json({
      message: 'Quantity updated successfully',
      item: updatedItem,
      changes: {
        oldQuantity,
        newQuantity: quantity,
        difference: quantity - oldQuantity,
        reason: reason || 'No reason provided'
      }
    });
  } catch (error) {
    handleError(res, error);
  }
};

exports.findByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const { limit = 50, page = 1 } = req.query;
    
    // Validate category
    const validCategories = config.inventory.categories;
    if (!validCategories.includes(category)) {
      return res.status(400).json({
        message: 'Invalid category',
        validCategories
      });
    }
    
    // Pagination
    const options = {
      limit: parseInt(limit),
      skip: (page - 1) * limit
    };
    
    // Find items
    const items = await InventoryItem.find({ category }, null, options);
    const total = await InventoryItem.countDocuments({ category });
    
    res.json({
      message: `Items in category: ${category}`,
      items,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    handleError(res, error);
  }
};

exports.getLowStockItems = async (req, res) => {
  try {
    // Use the static method from the model
    const lowStockItems = await InventoryItem.findLowStockItems();
    
    res.json({
      message: 'Low stock items retrieved',
      items: lowStockItems,
      lowStockThreshold: config.inventory.defaultLowStockThreshold
    });
  } catch (error) {
    handleError(res, error);
  }
};

exports.searchItems = async (req, res) => {
  try {
    const { query, category, minPrice, maxPrice } = req.query;
    
    // Build search filter
    const filter = {};
    
    // Text search
    if (query) {
      filter.$or = [
        { name: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } },
        { 'specifications.model': { $regex: query, $options: 'i' } }
      ];
    }
    
    // Category filter
    if (category) {
      filter.category = category;
    }
    
    // Price range filter
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = parseFloat(minPrice);
      if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
    }
    
    // Perform search
    const items = await InventoryItem.find(filter);
    
    res.json({
      message: 'Search results',
      items,
      searchCriteria: { query, category, minPrice, maxPrice }
    });
  } catch (error) {
    handleError(res, error);
  }
};