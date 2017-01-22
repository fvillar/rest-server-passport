var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Leadership = require('../models/leadership');

var Verify = require('./verify');

var leadershipRouter = express.Router();
leadershipRouter.use(bodyParser.json());

leadershipRouter.route('/')
.get(function (req, res, next) {
    // Leadership.find({}, function (err, leader) {
        Leadership.find(req.query, function (err, leader) {
        if (err) return next(err);
        res.json(leader);
    });
})

.post(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
    Leadership.create(req.body, function (err, leader) {
        if (err) return next(err);
        console.log('leader created!');
        var id = leader._id;

        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        res.end('Added the leader with id: ' + id);
    });
})

.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin,function (req, res, next) {
    Leadership.remove({}, function (err, resp) {
        if (err) return next(err);
        res.json(resp);
    });
});

leadershipRouter.route('/:leaderId')
.get(function (req, res, next) {
    Leadership.findById(req.params.leaderId, function (err, leader) {
        if (err) return next(err);
        res.json(leader);
    });
})

.put(Verify.verifyOrdinaryUser, Verify.verifyAdmin,function (req, res, next) {
    Leadership.findByIdAndUpdate(req.params.leaderId, {
        $set: req.body
    }, {
        new: true
    }, function (err, leader) {
        if (err) return next(err);
        res.json(leader);
    });
})

.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin,function (req, res, next) {
    Leadership.findByIdAndRemove(req.params.leaderId, function (err, resp) {        if (err) return next(err);
        res.json(resp);
    });
});

module.exports = leadershipRouter;