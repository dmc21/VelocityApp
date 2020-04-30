const express = require('express');
const app = express();
const cors = require('cors');
//const indexRoutes = require('./routes/index');
const tasksRoutes = require('./routes/tasks');
const path = require('path');

// settings
//app.set('views',path.join(__dirname,'views'));
app.set('port', process.env.PORT || 3000);
/*app.engine('html', require('ejs').renderFile);
app.set('view engine','ejs');*/

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//routes
//app.use(indexRoutes);
app.use(tasksRoutes);

// static files angular index view
//app.use(express.static(path.join(__dirname,'dist')));

//start server
app.listen(app.get("port"), "192.168.1.150", () =>{
    console.log('server on port '+app.get('port'));
});