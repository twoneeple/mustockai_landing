import React from 'react';
import MustockLandingPage from './components/MustockLandingPage';
import ContactForm from "./components/ContactForm";

function App() {
  return (
    <div className="App">
      <MustockLandingPage />
      
      {/* You can place this at the bottom or wherever you want it to appear */}
      <section className="mt-12 p-6 bg-gray-50">
        <h2 className="text-2xl font-semibold text-center mb-6">Get in Touch</h2>
        <ContactForm />
      </section>
    </div>
  );
}

export default App;
