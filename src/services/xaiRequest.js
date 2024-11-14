// src/services/xaiRequest.js
const axios = require("axios");

// Access the API key from the environment variable
const xaiApiKey = process.env.VUE_APP_XAI_API_KEY;

// Base URL for the xAI API
const baseURL = "https://api.x.ai/v1/chat/completions";

// Function to make a POST request to the xAI API
const sendMessageToXai = async (messages) => {
  const data = {
    messages,
    model: "grok-beta",
    stream: false,
    temperature: 0,
  };

  try {
    const response = await axios.post(baseURL, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${xaiApiKey}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

// Example usage of the function
sendMessageToXai([
  {
    role: "system",
    content:
      "You are Grok, a chatbot inspired by the Hitchhikers Guide to the Galaxy.",
  },
  { role: "user", content: "What is the answer to life and universe?" },
])
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error("Error:", error);
  });

module.exports = sendMessageToXai;
