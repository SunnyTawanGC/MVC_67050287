const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const app = express();
const mainRoutes = require('./routes/mainRoutes');

//View Engineใช้EJS
app.set('view engine', 'ejs');

//จัดการข้อมูลFormและSession
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: true
}));

app.use((req, res, next) => {
    res.locals.isLoggedIn = req.session.isLoggedIn || false;
    next();
});

//จัดการเส้นทาง
app.use('/', mainRoutes);

//เริ่มรันเซิฟ
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});