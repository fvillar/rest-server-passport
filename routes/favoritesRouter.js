var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Favorites = require('../models/favorite');
var Verify = require('./verify');

var favoriteRouter = express.Router();
favoriteRouter.use(bodyParser.json());

favoriteRouter.route('/')
    .all(Verify.verifyOrdinaryUser)
    .get(function (req, res, next) {
        Favorites.find({ "postedBy": mongoose.Types.ObjectId(req.decoded._id) })
            .populate('postedBy')
            .populate('dishes')
            .exec(function (err, fav) {
                if (err) throw err;
                res.json(fav);
            });
    })

    .post(function (req, res, next) {
        Favorites.findOne({ "postedBy": mongoose.Types.ObjectId(req.decoded._id) }, function (err, fav) {
            if (!fav) {
                Favorites.create(req.body, function (err, fav) {
                    if (err)
                        throw err;
                    fav.postedBy = mongoose.Types.ObjectId(req.decoded._id);
                    console.log('Favorite has been created!');
                    fav.dishes.push(req.body._id);
                    fav.save(function (err, fav) {
                        if (err) throw err;
                        console.log('Dish added to Favorite');
                        res.json(fav);
                    });
                });
            } else {
                var isFav = fav.dishes.indexOf(req.body._id);

                if (isFav > -1) {
                    var err = new Error('Already a favorite');
                    err.status = 401;
                    return next(err);
                } else {
                    fav.dishes.push(req.body._id);
                    fav.save(function (err, fav) {
                        if (err)
                            throw err;
                        console.log('Dish added to favorite');
                        res.json(fav);
                    });
                }
            }
        });
    })

    .delete(function (req, res, next) {
        Favorites.remove({ "postedBy": mongoose.Types.ObjectId(req.decoded._id) }, function (err, resp) {
            if (err)
                throw err;
            res.json(resp);
        });
    });

favoriteRouter.route('/:favId')
    .all(Verify.verifyOrdinaryUser)
    .delete(function (req, res, next) {
        Favorites.findOne({ postedBy: mongoose.Types.ObjectId(req.decoded._id) }, function (err, fav) {
            if (err)
                throw err;
            if (fav) {
                var index = fav.dishes.indexOf(req.params.favId);
                if (index > -1) {
                    fav.dishes.splice(index, 1);
                }

                fav.save(function (err, fav) {
                    if (err)
                        throw err;
                    res.json(fav);
                });
            } else {
                var err = new Error('No Favorites');
                err.status = 401;
                return next(err);
            }
        });
    });

module.exports = favoriteRouter;