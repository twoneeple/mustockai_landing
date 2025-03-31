import React from "react";

const ContactForm = () => {
  return (
    <form
      name="contact"
      method="POST"
      data-netlify="true"
      netlify-honeypot="bot-field"
      className="space-y-4 max-w-md mx-auto bg-white p-6 rounded-2xl shadow-md"
    >
      {/* Hidden field for Netlify form handling */}
      <input type="hidden" name="form-name" value="contact" />

      {/* Honeypot field for bots */}
      <p className="hidden">
        <label>
          Don’t fill this out: <input name="bot-field" />
        </label>
      </p>

      <div>
        <label className="block font-medium text-gray-700">
          Name:
          <input
            type="text"
            name="name"
            required
            className="mt-1 w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring"
          />
        </label>
      </div>

      <div>
        <label className="block font-medium text-gray-700">
          Email:
          <input
            type="email"
            name="email"
            required
            className="mt-1 w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring"
          />
        </label>
      </div>

      <div>
        <label className="block font-medium text-gray-700">
          Message:
          <textarea
            name="message"
            rows="4"
            required
            className="mt-1 w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring"
          ></textarea>
        </label>
      </div>

      <div>
        <button
          type="submit"
          className="bg-black text-white py-2 px-4 rounded-xl hover:bg-gray-800 transition"
        >
          Send Message
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
