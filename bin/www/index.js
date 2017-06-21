var app = require('../../server/server');
var config = require('../../server/config/config');

var port = config.port;
console.log(port);
app.listen(port, function () {
    console.log('running at localhost:' + port);
});
