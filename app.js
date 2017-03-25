var express = require("express")
    ,app = express()
    ,fs = require('fs')
    ,logger = require('./logger');


app.get('/index.html', (req, res) => {
    logger.info('New connection');
});

var port = process.env.PORT || 33333;


app.use(express.static(__dirname + '/views',{
    etag: false
}));
app.use(express.static(__dirname + '/public',{
    etag: false
}));
app.get("/",function(req,res){
   res.send("hey");
});


app.listen(port, function (err) {
    console.log('running server on port ' + port);
});