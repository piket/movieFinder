var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var router = express.Router();

var db = require('../models');

var sequelize = require('sequelize');

router.use(bodyParser.urlencoded({extended:false}));

router.get('/',function(req,res) {
    // SELECT tags.name, COUNT(favoritestags.tagId) FROM tags JOIN favoritestags ON favoritestags.tagId = tags.id GROUP BY tags.id
    // db.tag.findAll({attributes: [], include: {model: db.favorite, attributes: [[sequelize.fn('COUNT','tagsId'),'tagsId']], order: [['tagsId','DESC']],group: ['tag.id']}}).then(function(tags) {
    // sequelize.query('SELECT tags.name, COUNT(favoritestags.tagId) FROM tags JOIN favoritestags ON favoritestags.tagId = tags.id GROUP BY tags.id',{type: sequelize.QueryTypes.SELECT}).then(function(tags){
    db.tag.findAll({include: {model:db.favorite}}).then(function(tags){
        // res.send(tags.sort(function(a,b){return a.favorites.length > b.favorites.length ? -1:1}));
        res.render('tags',{tags:tags.sort(function(a,b){return a.favorites.length > b.favorites.length ? -1:1})});
    });
});

router.get('/add/:id',function(req,res) {
    db.favorite.find(req.params.id).then(function(fav) {
        res.render('add',{id:fav.id,title:fav.title});
    });
});

router.post('/add',function(req,res) {
    // res.send(req.body);
    var tagName = req.body.tagtext.toLowerCase();

    db.tag.findOrCreate({where: {name:tagName}}).spread(function(tag,created) {
        db.favorite.find(req.body.id).then(function(fav) {
            console.log(fav.get());
            fav.addTag(tag);
            // console.log("Tag",tagName,"added to",req.body.title);
            res.send({created:created,name:tag.name});
        });
    });
});

module.exports = router;