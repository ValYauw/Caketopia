const express = require("express");
const session = require('express-session');
const router = require('./routes/index');

const app = express();
const port = 3000;

app.set('views', './views');
app.use('/public', express.static('public'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended:false}));

const sessionMiddleware = session({
  secret: 'thepasswordisalwaysswordfish',
  resave: false, //Forces the session to be saved back to the session store
  saveUninitialized: false, // Forces a session that is "uninitialized" to be saved to the store
  cookie: { 
    secure: false,
    sameSite: true
  }
});

app.use(sessionMiddleware);

app.use(router);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
