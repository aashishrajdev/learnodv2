"use client";

import React, { useState } from "react";
import { FaEnvelope, FaCheck, FaSpinner } from "react-icons/fa";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus("loading");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        setMessage(data.message);
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.error || "Something went wrong");
      }
    } catch (error) {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }

    // Reset status after 3 seconds
    setTimeout(() => {
      setStatus("idle");
      setMessage("");
    }, 3000);
  };

  return (
    <div className="mt-6">
      <h4 className="text-sm font-semibold text-white mb-2">Stay Updated</h4>
      <form onSubmit={handleSubmit} className="space-y-2">
        <div className="flex">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-l-md text-white text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            disabled={status === "loading"}
            required
          />
          <button
            type="submit"
            disabled={status === "loading" || !email.trim()}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white text-sm font-medium rounded-r-md transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 flex items-center justify-center min-w-[80px]"
          >
            {status === "loading" ? (
              <FaSpinner className="animate-spin" size={14} />
            ) : status === "success" ? (
              <FaCheck size={14} />
            ) : (
              "Subscribe"
            )}
          </button>
        </div>

        {message && (
          <p
            className={`text-xs ${
              status === "success"
                ? "text-green-400"
                : status === "error"
                  ? "text-red-400"
                  : "text-gray-400"
            }`}
          >
            {message}
          </p>
        )}
      </form>
    </div>
  );
}
