import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const WarehouseAssistant = () => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [inventory, setInventory] = useState([]);

  // Simulate fetching inventory (would be replaced with actual API call)
  useEffect(() => {
    const fetchInventory = async () => {
      // Placeholder for actual inventory fetch
      const mockInventory = [
        { id: 1, name: 'Fender Stratocaster', category: 'Electric Guitars', quantity: 15, location: 'Shelf A1', price: 1999.99 },
        { id: 2, name: 'Gibson Les Paul', category: 'Electric Guitars', quantity: 8, location: 'Shelf A2', price: 2499.99 },
        { id: 3, name: 'Yamaha Stage Piano', category: 'Keyboards', quantity: 5, location: 'Shelf B3', price: 1799.99 }
      ];
      setInventory(mockInventory);
    };

    fetchInventory();
  }, []);

  const handleQuery = async () => {
    // Simulate AI query processing
    const processQuery = (queryText) => {
      // Basic query processing logic
      const lowercaseQuery = queryText.toLowerCase();
      
      // Location query
      const locationMatch = inventory.find(item => 
        lowercaseQuery.includes(item.name.toLowerCase())
      );
      
      if (locationMatch) {
        return `The ${locationMatch.name} is located at ${locationMatch.location}. We currently have ${locationMatch.quantity} in stock, priced at $${locationMatch.price}.`;
      }
      
      // Category query
      if (lowercaseQuery.includes('guitars')) {
        const guitars = inventory.filter(item => item.category.toLowerCase().includes('guitar'));
        return `We have ${guitars.length} guitars in stock: ${guitars.map(g => g.name).join(', ')}`;
      }
      
      // Low stock query
      if (lowercaseQuery.includes('low stock')) {
        const lowStockItems = inventory.filter(item => item.quantity < 10);
        return `Low stock items: ${lowStockItems.map(item => `${item.name} (${item.quantity} remaining)`).join(', ')}`;
      }
      
      return "I'm sorry, I couldn't understand your query. Could you please rephrase?";
    };

    const aiResponse = processQuery(query);
    setResponse(aiResponse);
  };

  return (
    <Card className="w-full max-w-md mx-auto mt-10">
      <CardHeader>
        <CardTitle>Mustock AI Assistant</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Input 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask about inventory, locations, stock levels..."
            className="w-full"
          />
          <Button onClick={handleQuery} className="w-full">
            Query Warehouse
          </Button>
          {response && (
            <div className="mt-4 p-3 bg-gray-100 rounded">
              <p>{response}</p>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <p className="text-sm text-gray-500">
          Total Unique Items: {inventory.length}
        </p>
      </CardFooter>
    </Card>
  );
};

export default WarehouseAssistant;