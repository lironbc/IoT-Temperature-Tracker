var express = require("express");
var app = express();
var bodyParser = require("body-parser");

var indexRoutes = require('./routes/index');
var apiRoutes = require('./routes/api');

app.set('port', (process.env.PORT || 3000));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/assets'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//******** ROUTES ********//
app.use('/', indexRoutes);
app.use('/api/', apiRoutes);

app.listen(app.get('port'), process.env.IP, function(){
   console.log("Started on port " + app.get('port'));
});