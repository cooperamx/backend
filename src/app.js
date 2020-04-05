/* eslint no-console: 0 */
const express = require('express');

const app = express();
const port = 8080;

app.get('/', (req, res) => res.send('Hello Coopera.mx!'));

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
