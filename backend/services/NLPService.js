// backend/services/NLPService.js

module.exports = {
    processQuery: (text) => {
      console.log("Received input:", text);
      // return mock response for now
      return `You said: ${text}`;
    }
  };
  