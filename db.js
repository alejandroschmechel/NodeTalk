var databaseURI = "localhost:27017/nodechat";
var collections = ["messages", "users"];
var db = require("mongojs").connect(databaseURI, collections);

module.exports = db;