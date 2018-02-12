/*

  If don't want to embrace the JAMstack, this is your starting point.
  But consider reading this before : https://jamstack.org/

*/

const express = require('express');
const app = express();
const path = require('path')
const staticFile = require('connect-static-file');

app.use('/public', express.static(path.join(__dirname + '/public')));
app.use('/img', express.static(path.join(__dirname + '/img')));
app.use('/', staticFile(`${__dirname}/index.html`));

app.listen(3001);
console.log(path.join(__dirname + 'public'))
console.log('Server listening on http://localhost:3001. The React app will be built and served at http://localhost:3000.');
