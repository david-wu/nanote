global.rootRequire = function(path){
    return require(__dirname + '/' + path);
};

var http = require('http');
var express = require('express');
var routes = require('./routes');


var app = strapApp(express());
app.use('/', express.static('../client/build'));
app.use('/api', routes);

var server = http.createServer(app);
server.listen(9090);


function strapApp(app){
    var cors = require('cors');
    var bodyParser = require('body-parser');
    var cookieParser = require('cookie-parser');

    app.use(bodyParser.urlencoded({extended:true}));
    app.use(bodyParser.json());
    app.use(cookieParser());
    app.use(cors());
    return app;
}

