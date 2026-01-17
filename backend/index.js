const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Mock Data (Moved from frontend)
const trendingEvents = [
    {
        id: 1,
        category: "CODECHEF CHAPTER",
        title: "HackOverflow 2.0",
        tags: ["Tech", "Coding", "Free"],
    },
    {
        id: 2,
        category: "STUDENT CLUB",
        title: "NextGen AI Summit",
        tags: ["AI", "Workshop", "Paid"],
    },
];

const upcomingEvents = [
    {
        id: 1,
        date: "2026-01-16",
        title: "HackOverflow 2.0",
        description: "The biggest coding competition on campus",
        attending: 142,
    },
];

// Routes
app.get('/', (req, res) => {
    res.json({ message: 'Clyq Backend is running 🚀' });
});

// Get trending events
app.get('/api/events/trending', (req, res) => {
    // In a real app, you would fetch from DB
    res.json(trendingEvents);
});

// Get upcoming events
app.get('/api/events/upcoming', (req, res) => {
    // In a real app, you would fetch from DB
    res.json(upcomingEvents);
});

// Mock Posts Data
let posts = [
    {
        id: 1,
        content: "Just accepted the challenge for HackOverflow 2.0! 🚀 #coding",
        author: "Alex",
        timestamp: new Date().toISOString(),
        likes: 5
    },
    {
        id: 2,
        content: "Anyone going to the AI Summit tomorrow?",
        author: "Sarah",
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        likes: 2
    }
];

// Get all posts
app.get('/api/posts', (req, res) => {
    res.json(posts);
});

// Create a new post
app.post('/api/posts', (req, res) => {
    const { content } = req.body;
    if (!content) {
        return res.status(400).json({ error: "Content is required" });
    }

    const newPost = {
        id: posts.length + 1,
        content,
        author: "You", // Hardcoded for now until auth is real
        timestamp: new Date().toISOString(),
        likes: 0
    };

    posts.unshift(newPost); // Add to top
    res.status(201).json(newPost);
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
