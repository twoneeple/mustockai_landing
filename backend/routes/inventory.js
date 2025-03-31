const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventoryController');

// Route to add a new inventory item
router.post('/items', inventoryController.addItem);

// Route to update item quantity
router.put('/items/:id/quantity', inventoryController.updateItemQuantity);

// Route to find items by category
router.get('/category/:category', inventoryController.findByCategory);

// Route to get low stock items
router.get('/low-stock', inventoryController.getLowStockItems);

// Route to search items
router.get('/search', inventoryController.searchItems);

module.exports = router;