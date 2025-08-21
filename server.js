const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, 'waitlist.json');

app.use(express.json());
app.use(express.static(__dirname)); // serve HTML/CSS/JS

// Endpoint per aggiungere alla waitlist
app.post('/waitlist', (req, res) => {
  const entry = req.body;

  fs.readFile(DATA_FILE, 'utf8', (err, data) => {
    let list = [];
    if (!err && data) list = JSON.parse(data);

    list.push(entry);

    fs.writeFile(DATA_FILE, JSON.stringify(list, null, 2), (err) => {
      if (err) return res.status(500).send('Error saving data');
      res.status(200).send('Saved');
    });
  });
});

// Avvio server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));