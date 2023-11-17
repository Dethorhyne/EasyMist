//////GLOBAL path
global.basedir = __dirname;

const express		    	= require('express');
const compression      = require("compression");

const http		  	  	= require('http');
const path		  	  	= require('path');
const bodyParser	  	= require('body-parser');

const engine          = require('ejs-mate');
const app 			    	= express();
const server		    	= http.createServer(app);
const port			     	= process.env.PORT || 453;

const mssql		      	= require('mssql');
const routes		    	= require('./routes');
const apiRoutes		    = require('./apiRoutes');

const basicAuth       = require('express-basic-auth')
const requestIp       = require('request-ip');

app.disable('etag');

app.use(compression());

app.use(function(req, res, next) {
  req.ClientIpAddress = requestIp.getClientIp(req); 
  next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.engine('ejs', engine);
app.set('views', 
    [
        path.join(__dirname, 'app/views'), 
        path.join(__dirname, 'app/layouts')
    ]);
app.set('view engine', 'ejs');

app.use(function (req, res, next) {

  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,PATCH,POST,DELETE');
  res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Access-Control-Allow-Origin");
  next();
});


app.use('/', routes)
app.use('/api', basicAuth({ challenge: true, users: { 'Tomo': 'Samsung14' } }), apiRoutes)
app.use(express.static(path.join(basedir, 'app/public')));


var dbConf = {
  server: 'localhost',
  port: 1433,
  user: 'easymist_admin',
  password: 'h97huh8z797opiu6',
  database: 'EASYMIST',
  connectionTimeout: 30000,
  requestTimeout: 150000,
  driver: 'tedious',
  stream: false,
  options: {
    appName: 'EasyMist',
    encrypt: false
  },
  pool: {
    max: 20,
    min: 0,
    idleTimeoutMillis: 30000
  }
}



mssql.connect(dbConf).then(pool =>
  {
    if (pool.connecting)
    {
      console.log('Connecting to database...');
    }
  
    if (pool.connected)
    {
      server.listen(port, () => {
        console.log('Server listening at port %d', port);
      });

    }
    //return pool;
  }).catch(err =>
  {
    console.log('Failed to open a SQL Database connection.', err.stack);
  });
  
  
  
  
  
