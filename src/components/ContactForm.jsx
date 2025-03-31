import React, { useState } from "react";

const ContactForm = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const data = new FormData(form);

    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(data).toString(),
    })
      .then(() => {
        setSubmitted(true);
        form.reset();
      })
      .catch((error) => alert("There was a problem submitting the form."));
  };

  return (
    <div className="space-y-4 max-w-md mx-auto bg-white p-6 rounded-2xl shadow-md">
      {submitted ? (
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">🎉 You're on the list!</h2>
          <p className="text-gray-600">Thanks for signing up! We'll be in touch soon.</p>
        </div>
      ) : (
        <form
          name="contact"
          method="POST"
          data-netlify="true"
          netlify-honeypot="bot-field"
          onSubmit={handleSubmit}
        >
          <input type="hidden" name="form-name" value="contact" />

          <p hidden>
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
      )}
    </div>
  );
};

export default ContactForm;
