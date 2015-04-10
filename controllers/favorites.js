var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var router = express.Router();

var db = require('../models');

router.use(bodyParser.urlencoded({extended:false}));

router.get('/',function(req,res) {
    db.favorite.findAll({order: 'id DESC', include: [db.comment]}).then(function(favs){
        // res.send(favs);
        res.render('favorites',{favs:favs,tag:false});
    });
});

router.get('/:id/comments',function(req,res) {
    db.comment.findAll({where: {favoriteId:parseInt(req.params.id)}}).then(function(comments) {
        // res.send(comments);
        res.render('comments',{comments:comments,movieId:req.params.id})
    });
});

router.post('/:id/comments/add',function(req,res) {
    db.comment.create(req.body).then(function(comment) {
        db.favorite.find(req.params.id).then(function(favorite) {
            favorite.addComment(comment);
            res.send({text:comment.text});
        });
    });
});

router.get('/:tag',function(req,res) {
    // console.log("In route",req.params.tag);
    var tagName = req.params.tag.replace(/[+,%20]/g,' ').toLowerCase();

    db.tag.find({where: {name:tagName}}).then(function(tag) {
        // console.log("In tag find");
        tag.getFavorites({order: 'id DESC', include: [db.comment]}).then(function(favorites) {
            // res.send(favorites);
            res.render('favorites',{favs:favorites,tag:tagName});
        })
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
        console.log(fav.id);
        res.send({id:fav.id});
    });
});

router.delete('/:id',function(req,res) {
    // res.send(req.body);
    db.favorite.destroy({where: {id: req.params.id}}).then(function(){
        res.send('removed from favorites');
    });
})

    module.exports = router;