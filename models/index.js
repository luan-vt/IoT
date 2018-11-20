"use strict"

var fs = require("fs");
var path = require("path");
var Sequelize = require("sequelize");
var config = require(path.join(__dirname, '..', 'config', 'config.json'));
var Op = Sequelize.Op;
var sequelize = new Sequelize(config.database, config.username, config.password, {host: config.host, dialect: config.dialect, logging: config.logging, operatorsAliases: {
	$and: Op.and,
	$or: Op.or,
	$eq: Op.eq,
	$gt: Op.gt,
	$lt: Op.lt,
	$lte: Op.lte,
	$like: Op.like
}});
var db = {};
 
 
fs
    .readdirSync(__dirname)
    .filter(function(file) {
        return (file.indexOf(".") !== 0) && (file !== "index.js");
    })
    .forEach(function(file) {
        var model = sequelize.import(path.join(__dirname, file));
        db[model.name] = model;
        console.log(model.name);
    });
 
Object.keys(db).forEach(function(modelName) {
    if ("associate" in db[modelName]) {
        db[modelName].associate(db);
    }
});
 
 
db.sequelize = sequelize;
db.Sequelize = Sequelize;
 
module.exports = db;