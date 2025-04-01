import React, { useState } from "react";

export default function TestNetlifyForm() {
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(formData).toString(),
    })
      .then(() => {
        setSuccess(true);
        form.reset();
      })
      .catch(() => alert("Something went wrong"));
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white shadow-lg rounded-xl">
      {success ? (
        <div className="text-center">
          <h2 className="text-xl font-bold">🎉 You're on the list!</h2>
          <p className="mt-2 text-gray-600">Thanks for signing up.</p>
        </div>
      ) : (
        <form
          name="test-form"
          method="POST"
          data-netlify="true"
          netlify-honeypot="bot-field"
          onSubmit={handleSubmit}
        >
          <input type="hidden" name="form-name" value="test-form" />
          <p hidden>
            <label>
              Don’t fill this out: <input name="bot-field" />
            </label>
          </p>

          <div className="mb-4">
            <label>
              Email:
              <input
                type="email"
                name="email"
                required
                className="block w-full border mt-1 p-2 rounded"
              />
            </label>
          </div>

          <button
            type="submit"
            className="bg-black text-white py-2 px-4 rounded"
          >
            Submit
          </button>
        </form>
      )}
    </div>
  );
}
