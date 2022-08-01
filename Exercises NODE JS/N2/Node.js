var http = require('http');
var dt = require('./myModule');

var fs = require('fs');

http.createServer(function(req, res){
    res.writeHead(200,
         {'Content-Type':'text/html'});
    res.write("The date and time are at this point is: "+ dt.myDate());
    res.end();
}).listen(8080);

