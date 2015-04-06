var express = require('express');
var request = require('request');
var cheerio = require('cheerio');

var router = express.Router();

var db = require('../models');

router.get('/',function(req,res){
    if (!req.query.q) {
        res.render('index');
    }
    else {
    var url = "http://www.imdb.com/find?q=" + req.query.q.replace(/ /g,'+') + "&s=tt&ttype=ft";

   request(url,function(error,response,data){
        if (!error && response.statusCode == 200) {
            var $ = cheerio.load(data);
            console.log("Scraping...")
            var results = [];
            $('td.result_text').each(function(idx,item){
                var href = $('a',item).attr('href').substr(7);
                href = href.substring(0,href.indexOf('/'));
                var title = $(item).text().substr(0,$(item).text().indexOf('(')).trim();
                var year = $(item).text().substring($(item).text().indexOf('(')+1,$(item).text().indexOf(')')).trim();

                if (year !== "in development")
                    results.push({imdbID:href,Title:title,Year:year});
            }).get();
            console.log("...scrape complete")
            // res.send(results);
            res.render('search',{Search:results,error:false,q:req.query.q,page:parseInt(req.query.p) || 1})
        }
        else {
            console.log("connection error");
            res.render('search',{error:true,q:req.query.q,page:1});
        }
    });

        // var url = "http://www.omdbapi.com/?s=" + req.query.q.replace(/ /g,'+') + '&type=movie';

        // request(url,function(error,response,data) {
        //     if (!error && response.statusCode == 200) {
        //         // res.send(data);
        //         res.render('search',JSON.parse(data));
        //     }
        //     else {
        //         console.log("connection error",response.statusCode)
        //     }
        // });
    }
});

// router.get('/favorites',function(req,res) {

// });

router.get('/:imdbId',function(req,res) {
    var url = "http://www.omdbapi.com/?i=" + req.params.imdbId + "&tomatoes=true&plot=full";

    request(url,function(error,response,data){
        if (!error && response.statusCode == 200) {
            // res.send(data);
            db.favorite.find({where:{imdbid:req.params.imdbId}}).then(function(movie){
                var faved = false;
                if (movie !== null) {
                    var faved = true;
                }
                res.render('show',{data:JSON.parse(data),faved:faved});
                // res.send(JSON.parse(data));
            }).catch(function(){
                res.render('show',{data:JSON.parse(data),faved:false});
            })
        }
            else {
                res.render('show',{error:true,imdbId:req.params.imdbId})
                console.log("connection error")
            }
    });
    // res.send(req.params);
});

module.exports = router;