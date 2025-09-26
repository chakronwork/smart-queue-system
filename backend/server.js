// File: smart-queue-system/backend/server.js
// THIS IS THE CORRECT AND COMPLETE FILE FOR LOGIN.

const express = require('express');
const http = require('http');
const { Server } = require("socket.io");
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const server = http.createServer(app);
const PORT = 3001;
const JWT_SECRET = 'your-super-secret-key-that-should-be-in-a-env-file';

const io = new Server(server, { cors: { origin: "*" } });

app.use(cors());
app.use(express.json());

const db = new sqlite3.Database('./queue.db', (err) => {
    if (err) console.error('Error opening database', err.message);
    else {
        console.log('Successfully connected to the SQLite database.');
        db.run(`CREATE TABLE IF NOT EXISTS queues (id INTEGER PRIMARY KEY, name TEXT, phone TEXT, status TEXT, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)`);
    }
});

// Correct Admin User Credentials
// Username: admin
// Password: 123456789
const ADMIN_USERNAME = 'admin';
const ADMIN_HASH = '$2b$10$kXeKsKU8mxG07XTaXn9t6OJ6yJPw/7qzBRpKkuKeF7m68LaLfx796';

// --- Auth Endpoint ---
app.post('/login', async (req, res) => {
    // This console.log is the spy. It will show us what the server receives.
    console.log('Login attempt received with body:', req.body);
    
    const { username, password } = req.body;

    if (!username || !password) {
        console.log('Login failed: Missing username or password.');
        return res.status(400).json({ error: 'Username and password are required.' });
    }

    if (username !== ADMIN_USERNAME) {
        console.log(`Login failed: Username '${username}' is incorrect.`);
        return res.status(401).json({ error: 'Invalid credentials.' });
    }

    const isMatch = await bcrypt.compare(password, ADMIN_HASH);

    if (!isMatch) {
        console.log(`Login failed: Password for user '${username}' is incorrect.`);
        return res.status(401).json({ error: 'Invalid credentials.' });
    }

    console.log('Login successful! Creating JWT.');
    const token = jwt.sign({ username: ADMIN_USERNAME, role: 'admin' }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ message: 'Login successful', token });
});

io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);
    socket.on('disconnect', () => console.log('User disconnected:', socket.id));
});

// --- API Routes (unchanged) ---
app.post('/queue/add', (req, res) => {
    const { name, phone } = req.body; if (!name || !phone) return res.status(400).json({ error: 'Name and phone are required.' });
    db.run('INSERT INTO queues (name, phone, status) VALUES (?, ?, ?)', [name, phone, 'Waiting'], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        io.emit('queue_updated'); res.status(201).json({ data: { id: this.lastID, name, phone, status: 'Waiting' } });
    });
});
app.get('/queue/list', (req, res) => {
    db.all("SELECT * FROM queues ORDER BY created_at ASC", [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ data: rows });
    });
});
app.patch('/queue/call/:id', (req, res) => {
    db.run("UPDATE queues SET status = 'Called' WHERE id = ?", req.params.id, function (err) {
        if (err || this.changes === 0) return res.status(err ? 500 : 404).json({ error: err ? err.message : 'Not Found' });
        io.emit('queue_updated'); res.json({ message: `Called item ${req.params.id}.` });
    });
});
app.delete('/queue/finish/:id', (req, res) => {
    db.run('DELETE FROM queues WHERE id = ?', req.params.id, function (err) {
        if (err || this.changes === 0) return res.status(err ? 500 : 404).json({ error: err ? err.message : 'Not Found' });
        io.emit('queue_updated'); res.json({ message: `Finished item ${req.params.id}.` });
    });
});

server.listen(PORT, () => console.log(`Backend with Auth is running on http://localhost:${PORT}`));