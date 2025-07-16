 const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const DATA_FILE = path.join(__dirname, 'data.txt');

app.use(express.json());

app.post('/write', (req, res) => {
  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ error: 'message field missing' });
  }

  fs.writeFile(DATA_FILE, message, 'utf8', (err) => {
    if (err) {
      return res.status(500).json({ error: 'File write failed' });
    }
    res.json({ status: 'success', saved: message });
  });
});

app.get('/read', (req, res) => {
  fs.readFile(DATA_FILE, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'File read failed / File not found' });
    }
    res.json({ data });
  });
});

app.use((err, req, res, next) => {
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log('Server chal raha hai: http://localhost:' + PORT);
});
