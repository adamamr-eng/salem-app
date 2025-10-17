const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Serve static files from current directory
app.use(express.static(path.join(__dirname)));

// Redirect root to signin.html (if exists)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'signin.html'));
});

// Listen on all network interfaces
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Salem static server running on http://0.0.0.0:${PORT}`);
});
