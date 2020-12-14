const express = require('express');

const app = express();

app.use(require('./sector'));
app.use(require('./actividad'));
app.use(require('./festividad'));
app.use(require('./informacion'));
app.use(require('./noticia'));
app.use(require('./lugar'));


module.exports = app;