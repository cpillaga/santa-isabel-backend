const express = require('express');

const app = express();

const cors = require('cors');

app.use(cors({ origin: '*' }));


app.use(require('./sector'));
app.use(require('./actividad'));
app.use(require('./festividad'));
app.use(require('./informacion'));
app.use(require('./noticia'));
app.use(require('./lugar'));
app.use(require('./publicidad'));
app.use(require('./ruta'));
app.use(require('./coordRuta'));
app.use(require('./senderos'));
app.use(require('./tipo'));
app.use(require('./agenda'));
app.use(require('./upload'));

module.exports = app;