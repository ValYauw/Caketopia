const express = require("express");
const session = require('express-session');
const router = require('./routes/index');

const app = express();
const port = 3000;

app.set('views', './views');
app.use('/public', express.static('public'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended:false}));

app.use(router);

app.use(session({
  secret: 'thepasswordisalwaysswordfish',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
