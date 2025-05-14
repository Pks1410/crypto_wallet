// server.js
const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const app = express();
const PORT = 5000;
const CRYPTOPANIC_API_KEY = "e59ec7289a377f45bd30cc48dcc6d35cbf5169fd"; // Replace with your key

app.use(cors());

app.get('/api/news', async (req, res) => {
  try {
    const url = `https://cryptopanic.com/api/v1/posts/?auth_token=${CRYPTOPANIC_API_KEY}&public=true`;
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch news" });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));