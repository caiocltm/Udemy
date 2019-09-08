const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
//const expHandlebars = require('express-handlebars');

const admin = require('./routes/admin');
const shop = require('./routes/shop');
const rootDir = require('./helpers/path');

const app = express();

//Handlebars Engine
// app.engine('hbs', expHandlebars({
//     layoutsDir: 'views/layouts/', 
//     defaultLayout:'main-layout', 
//     extname:'hbs'
// }));
// app.set('view engine', 'pug'); // Pug Engine
app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', admin.routes);
app.use(shop);

app.use((req, res, next) => {
    res.status(404).render('404', {pageTitle: '404 | Not Found'});
});

app.listen(3000);