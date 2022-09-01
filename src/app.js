const express = require('express');
const { engine } = require('express-handlebars');
const myconnection = require('express-myconnection');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const router = require('./controllers/TaskController');

const app = express();
app.set('port', process.env.PORT || 4000);

app.use(myconnection(mysql, {
    host: 'btdakeeot7opltvjmw3m-mysql.services.clever-cloud.com',
    user: 'uyr8df7hn82k9cr4',
    password: 'dUnhfAtTeiGuSKDVC4Mu',
    port: 3306,
    database: 'btdakeeot7opltvjmw3m'
}));

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.set('views', __dirname + '/views');
app.engine('.hbs', engine({
    extname: '.hbs'
}));
app.set('view engine' , 'hbs');


app.listen(app.get('port'), () => {
    console.log('listening on port' , app.get('port'));
});

app.use('/', router);

app.get('/', (req, res) => {
    res.render('home')
});