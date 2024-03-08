// Imports
const express = require('express');
const path = require('path');

// Server app setup
const app = express();
const port = process.env.PORT || 3000;

// Routes

// Main route that is called when no path is specified. Returns a simple string.
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Named route with a parameter. 
// When a route has a part of its path containing a colon then it contains a parameter. 
// The name of the parameter in this example is key.
// Parameters are stored in the request objects params dictionary.
app.get('/name/:key', async (req, res) => {
  var user = req.params['key'];
  let ejs = require('ejs');
  var html = await ejs.renderFile(path.join(__dirname, 'views/hello.ejs'), {user: user});
  res.send(html);
});

// Middleware for serving static files
app.use(express.static(path.join(__dirname, 'public')));

// Start server on specified port
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});