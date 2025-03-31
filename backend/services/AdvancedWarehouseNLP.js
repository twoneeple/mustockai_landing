const natural = require('natural');
const { WordTokenizer, BrillPOSTagger } = natural;

class AdvancedWarehouseNLP {
  constructor(inventoryData) {
    this.inventoryData = inventoryData;
    this.tokenizer = new WordTokenizer();
    this.classifier = new natural.BayesClassifier();
    this.initializeClassifier();
  }

  // Initialize classifier with training data
  initializeClassifier() {
    // Training data for intent classification
    const trainingData = [
      { text: 'Where is the Fender Stratocaster', intent: 'location' },
      { text: 'How many Gibson Les Pauls do we have', intent: 'quantity' },
      { text: 'What are our low stock items', intent: 'low_stock' },
      { text: 'List all electric guitars', intent: 'category_list' },
      { text: 'Price of Yamaha keyboard', intent: 'price' }
    ];

    // Train classifier
    trainingData.forEach(item => {
      this.classifier.addDocument(item.text, item.intent);
    });
    this.classifier.train();
  }

  // Advanced query processing
  processQuery(query) {
    // Tokenize and clean the query
    const tokens = this.tokenizer.tokenize(query.toLowerCase());
    
    // Classify intent
    const intent = this.classifier.classify(query);
    
    // Extract key entities
    const entities = this.extractEntities(tokens);
    
    // Process based on intent
    switch(intent) {
      case 'location':
        return this.findItemLocation(entities);
      case 'quantity':
        return this.findItemQuantity(entities);
      case 'low_stock':
        return this.findLowStockItems();
      case 'category_list':
        return this.listItemsByCategory(entities);
      case 'price':
        return this.findItemPrice(entities);
      default:
        return this.fallbackResponse(query);
    }
  }

  // Entity extraction using named entity recognition techniques
  extractEntities(tokens) {
    const potentialEntities = [];
    
    // Match against inventory items
    this.inventoryData.forEach(item => {
      if (tokens.some(token => 
        item.name.toLowerCase().includes(token) || 
        item.category.toLowerCase().includes(token)
      )) {
        potentialEntities.push(item);
      }
    });
    
    return potentialEntities;
  }

  // Find item location
  findItemLocation(entities) {
    if (entities.length === 0) {
      return "I couldn't find a specific item. Can you be more specific?";
    }
    
    return entities.map(item => 
      `${item.name} is located at ${item.location}`
    ).join(', ');
  }

  // Find item quantity
  findItemQuantity(entities) {
    if (entities.length === 0) {
      return "I couldn't find a specific item. Can you be more specific?";
    }
    
    return entities.map(item => 
      `We currently have ${item.quantity} ${item.name} in stock`
    ).join(', ');
  }

  // Find low stock items
  findLowStockItems() {
    const lowStockItems = this.inventoryData.filter(item => item.quantity < 10);
    
    if (lowStockItems.length === 0) {
      return "Great news! No items are currently low in stock.";
    }
    
    return "Low stock items: " + lowStockItems.map(item => 
      `${item.name} (${item.quantity} remaining)`
    ).join(', ');
  }

  // List items by category
  listItemsByCategory(entities) {
    // If no specific category identified, return all categories
    if (entities.length === 0) {
      const categories = [...new Set(this.inventoryData.map(item => item.category))];
      return "Available categories: " + categories.join(', ');
    }
    
    return entities.map(item => 
      `${item.category} items: ${this.inventoryData
        .filter(i => i.category === item.category)
        .map(i => i.name)
        .join(', ')}`
    ).join('; ');
  }

  // Find item price
  findItemPrice(entities) {
    if (entities.length === 0) {
      return "I couldn't find a specific item. Can you be more specific?";
    }
    
    return entities.map(item => 
      `${item.name} is priced at $${item.price}`
    ).join(', ');
  }

  // Fallback response for unrecognized queries
  fallbackResponse(query) {
    return `I'm sorry, I couldn't understand the query: "${query}". 
    Try asking about item location, quantity, price, or category.
    Example queries:
    - Where is the Fender Stratocaster?
    - How many Gibson Les Pauls do we have?
    - What are our low stock items?`;
  }
}

module.exports = AdvancedWarehouseNLP;