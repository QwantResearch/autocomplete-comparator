const express = require('express');
const path = require('path');
const app = express();

app.use(express.static('./build'));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, './build', 'index.html'));
});

const PORT = process.env.PORT || 9000;
var server = app.listen(PORT, function (err) {
  console.log(`listening http://localhost:${PORT}/`);
  console.log(`You can play with GraphQL http://localhost:${PORT}/graphiql`);
});
