const mongoose = require('mongoose');

// Define the InventoryItem schema
const InventoryItemSchema = new mongoose.Schema({
  // Basic product information
  name: {
    type: String,
    required: true,
    trim: true
  },
  
  // Detailed product description
  description: {
    type: String,
    trim: true
  },
  
  // Category from predefined list
  category: {
    type: String,
    enum: [
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
    required: true
  },
  
  // Inventory tracking
  quantity: {
    type: Number,
    required: true,
    min: 0,
    default: 0
  },
  
  // Minimum stock level for alerts
  minimumStockLevel: {
    type: Number,
    default: 5,
    min: 0
  },
  
  // Pricing information
  price: {
    type: mongoose.Schema.Types.Decimal128,
    required: true,
    min: 0
  },
  
  // Unique identifiers
  sku: {
    type: String,
    unique: true,
    trim: true
  },
  
  barcode: {
    type: String,
    unique: true,
    trim: true
  },
  
  // Warehouse location
  location: {
    type: String,
    trim: true
  },
  
  // Supplier information
  supplier: {
    name: {
      type: String,
      trim: true
    },
    contactInfo: {
      type: String,
      trim: true
    }
  },
  
  // Product specifications
  specifications: {
    brand: {
      type: String,
      trim: true
    },
    model: {
      type: String,
      trim: true
    },
    color: {
      type: String,
      trim: true
    },
    weight: {
      type: mongoose.Schema.Types.Decimal128,
      min: 0
    },
    dimensions: {
      length: mongoose.Schema.Types.Decimal128,
      width: mongoose.Schema.Types.Decimal128,
      height: mongoose.Schema.Types.Decimal128
    }
  },
  
  // Condition tracking
  condition: {
    type: String,
    enum: ['New', 'Used', 'Refurbished', 'Damaged'],
    default: 'New'
  },
  
  // Additional tracking
  tags: [{
    type: String,
    trim: true
  }],
  
  // Tracking for low stock and reorder
  isLowStock: {
    type: Boolean,
    default: false
  },
  
  // Timestamps for tracking
  createdAt: {
    type: Date,
    default: Date.now
  },
  
  lastUpdated: {
    type: Date,
    default: Date.now
  }
}, {
  // Enable timestamps
  timestamps: true,
  
  // Add methods to the schema
  methods: {
    // Method to check if item is low stock
    checkLowStock() {
      this.isLowStock = this.quantity <= this.minimumStockLevel;
      return this.isLowStock;
    },
    
    // Method to update quantity
    updateQuantity(amount) {
      this.quantity += amount;
      this.lastUpdated = new Date();
      this.checkLowStock();
      return this.quantity;
    }
  },
  
  // Static methods for the model
  statics: {
    // Find items by category
    findByCategory(category) {
      return this.find({ category: category });
    },
    
    // Find low stock items
    findLowStockItems() {
      return this.find({ 
        $expr: { $lte: ['$quantity', '$minimumStockLevel'] } 
      });
    }
  }
});

// Create indexes for performance
InventoryItemSchema.index({ category: 1 });
InventoryItemSchema.index({ sku: 1 });
InventoryItemSchema.index({ barcode: 1 });
InventoryItemSchema.index({ isLowStock: 1 });

// Middleware to update low stock status before save
InventoryItemSchema.pre('save', function(next) {
  this.checkLowStock();
  next();
});

// Create the model
const InventoryItem = mongoose.model('InventoryItem', InventoryItemSchema);

module.exports = InventoryItem;