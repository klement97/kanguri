const express     = require('express');
const http        = require('http');
const compression = require('compression');

const app = express();

app.use(express.static('./dist/kanguri'));
app.use(compression()); //compressing dist folder
app.get('*', (req, res) => {
  res.sendFile('index.html', {root: 'dist/kanguri/'});
});

const port = process.env.PORT || '4201';
app.set('port', port);

const server = http.createServer(app);
server.listen(port, () => console.log('Running at port ' + port));
