const express = require('express');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 8000;
const IP_ADDRESS = '0.0.0.0';  // Replace with your custom IP address

app.use(express.static(path.join(__dirname, 'build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, IP_ADDRESS, () => {
  console.log(`Server is running on http://${IP_ADDRESS}:${PORT}`);
});