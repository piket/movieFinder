var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var router = express.Router();

var db = require('../models');

router.use(bodyParser.urlencoded({extended:false}));

router.get('/',function(req,res) {
    db.favorite.findAll().then(function(favs){
        // res.send(favs);
        res.render('favorites',{favs:favs,page:parseInt(req.query.p) || 1});
    });
});

router.post('/save',function(req,res) {
    // res.send(req.body);
    db.favorite.findOrCreate({where: {imdbid:req.body.id}, defaults:{title:req.body.title}}).spread(function(fav,created){
        if (created) {
            fav.year = req.body.year;
            fav.poster = req.body.poster;
            fav.save();
        }
        res.redirect('/favorites');
    });
});

router.post('/delete',function(req,res) {
    // res.send(req.body);
    db.favorite.destroy({where: {id: parseInt(req.body.id)}}).then(function(){
        res.redirect('/favorites');
    });
})

    module.exports = router;