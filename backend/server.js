// server.js
require('dotenv').config();
console.log('Environment variables loaded:', {
  MONGODB_URI_EXISTS: !!process.env.MONGODB_URI,
  GOOGLE_CLIENT_ID_EXISTS: !!process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET_EXISTS: !!process.env.GOOGLE_CLIENT_SECRET
});

// Debug MongoDB URI
console.log('MongoDB URI first 20 chars:', process.env.MONGODB_URI ? process.env.MONGODB_URI.substring(0, 20) + '...' : 'Not found');
console.log('MongoDB URI format check:', process.env.MONGODB_URI ? 
  process.env.MONGODB_URI.startsWith('mongodb://') || process.env.MONGODB_URI.startsWith('mongodb+srv://') 
  ? 'Valid format' : 'Invalid format' 
  : 'URI not found');

const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Passport config
require('./config/passport');

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  serverSelectionTimeoutMS: 5000
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => {
  console.error('MongoDB connection error details:', {
    name: err.name,
    message: err.message,
    code: err.code
  });
});

// Auth routes
app.get('/api/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get('/api/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('http://localhost:3000/dashboard');
  }
);

app.get('/api/auth/user', (req, res) => {
  if (req.user) {
    res.json(req.user);
  } else {
    res.status(401).json({ message: 'Not authenticated' });
  }
});

app.get('/api/auth/logout', (req, res) => {
  req.logout(() => {
    res.redirect('http://localhost:3000');
  });
});

// News API route
app.get('/api/news', async (req, res) => {
  try {
    const url = `https://cryptopanic.com/api/v1/posts/?auth_token=${process.env.CRYPTOPANIC_API_KEY}&public=true`;
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch news" });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));