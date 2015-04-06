var express = require('express');
var moviesCtrl = require('./controllers/movies');
var favoritesCtrl = require('./controllers/favorites');
var app = express();

app.set('view engine','ejs');

app.use('/movies',moviesCtrl);
app.use('/favorites',favoritesCtrl);

app.use(express.static(__dirname + '/public'));

app.get('/',function(req,res){
    res.render('index');
});

// app.get('/movies',function(req,res){
    // res.send(req.query);
    // res.render('search',req.query)
// });

// app.get('/',function(req,res) {
//     // res.send(req.params.imdbId);
// });

app.listen(process.env.PORT || 3000,function(){
    console.log('Server is connected');
});