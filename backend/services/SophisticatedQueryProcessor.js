const natural = require('natural');
const compromise = require('compromise');

class SophisticatedQueryProcessor {
  constructor(inventoryData) {
    this.inventoryData = inventoryData;
    this.tokenizer = new natural.WordTokenizer();
    this.stemmer = natural.PorterStemmer;
    this.classifier = new natural.BayesClassifier();
    
    this.initializeQueryClassifier();
  }

  // Initialize query intent classifier
  initializeQueryClassifier() {
    const trainingData = [
      { text: 'find fender guitar', intent: 'search' },
      { text: 'how many stratocasters in stock', intent: 'quantity' },
      { text: 'where is les paul located', intent: 'location' },
      { text: 'list electric guitars', intent: 'list_category' },
      { text: 'what instruments are low in stock', intent: 'low_stock' },
      { text: 'price of yamaha keyboard', intent: 'price' }
    ];

    trainingData.forEach(item => {
      this.classifier.addDocument(item.text, item.intent);
    });
    this.classifier.train();
  }

  // Advanced query interpretation
  processQuery(query) {
    // Use compromise for advanced natural language parsing
    const doc = compromise(query);
    const intent = this.classifier.classify(query);

    // Extract potential entities
    const entities = this.extractEntities(doc);

    // Process query based on interpreted intent
    switch(intent) {
      case 'search':
        return this.searchItems(entities);
      case 'quantity':
        return this.checkQuantity(entities);
      case 'location':
        return this.findLocation(entities);
      case 'list_category':
        return this.listCategory(entities);
      case 'low_stock':
        return this.checkLowStock(entities);
      case 'price':
        return this.checkPrice(entities);
      default:
        return this.fallbackResponse(query);
    }
  }

  // Advanced entity extraction
  extractEntities(doc) {
    const extractedEntities = {
      names: doc.nouns().text(),
      categories: doc.adjectives().text(),
      quantities: doc.numbers().text()
    };

    // Match with inventory items
    const matchedItems = this.inventoryData.filter(item => 
      extractedEntities.names.includes(item.name) ||
      extractedEntities.categories.includes(item.category)
    );

    return {
      ...extractedEntities,
      items: matchedItems
    };
  }

  // Search items with advanced matching
  searchItems(entities) {
    if (entities.items.length === 0) {
      // Fuzzy search if no direct match
      const fuzzyMatches = this.inventoryData.filter(item => 
        natural.JaroWinklerDistance(item.name.toLowerCase(), entities.names.toLowerCase()) > 0.8
      );

      return fuzzyMatches.length > 0
        ? `Possible matches: ${fuzzyMatches.map(item => item.name).join(', ')}`
        : "No items found. Try a different search term.";
    }

    return entities.items.map(item => 
      `Found: ${item.name} (${item.category}) - Quantity: ${item.quantity}, Location: ${item.location}`
    ).join('\n');
  }

  // Check quantity with contextual understanding
  checkQuantity(entities) {
    if (entities.items.length === 0) {
      return "Could not identify specific items. Please be more specific.";
    }

    return entities.items.map(item => 
      `We currently have ${item.quantity} ${item.name} in stock.`
    ).join('\n');
  }

  // Find location with additional context
  findLocation(entities) {
    if (entities.items.length === 0) {
      return "Could not determine item location. Please provide a more specific item name.";
    }

    return entities.items.map(item => 
      `${item.name} is located in ${item.location}. Additional details: ${item.category}, Quantity: ${item.quantity}`
    ).join('\n');
  }

  // List items by category with more details
  listCategory(entities) {
    const categoryToSearch = entities.categories || entities.names;

    if (!categoryToSearch) {
      // If no category specified, return all unique categories
      const categories = [...new Set(this.inventoryData.map(item => item.category))];
      return `Available categories: ${categories.join(', ')}`;
    }

    const matchedItems = this.inventoryData.filter(item => 
      item.category.toLowerCase().includes(categoryToSearch.toLowerCase())
    );

    if (matchedItems.length === 0) {
      return "No items found in that category.";
    }

    return `Items in ${categoryToSearch} category:\n` + 
      matchedItems.map(item => 
        `- ${item.name} (Quantity: ${item.quantity}, Location: ${item.location})`
      ).join('\n');
  }

  // Check low stock with additional insights
  checkLowStock(entities) {
    const lowStockThreshold = 10;
    const lowStockItems = this.inventoryData.filter(item => item.quantity <= lowStockThreshold);

    if (lowStockItems.length === 0) {
      return "Great news! No items are currently low in stock.";
    }

    return "Low Stock Alert:\n" + 
      lowStockItems.map(item => 
        `- ${item.name} (${item.quantity} remaining, Location: ${item.location})`
      ).join('\n') + 
      `\n\nTotal low stock items: ${lowStockItems.length}`;
  }

  // Check price with contextual information
  checkPrice(entities) {
    if (entities.items.length === 0) {
      return "Could not identify specific items. Please provide a clear item name.";
    }

    return entities.items.map(item => 
      `${item.name} is priced at $${item.price}. Category: ${item.category}, Current Stock: ${item.quantity}`
    ).join('\n');
  }

  // Comprehensive fallback response
  fallbackResponse(query) {
    return `I'm sorry, I couldn't fully understand: "${query}"

Possible reasons:
- Item name might be unclear
- Category not specified
- Query too complex

Try these example queries:
- Find Fender guitar
- How many Stratocasters in stock?
- Where is Les Paul located?
- List electric guitars
- What instruments are low in stock?
- Price of Yamaha keyboard`;
  }
}

module.exports = SophisticatedQueryProcessor;