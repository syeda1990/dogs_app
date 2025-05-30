const express = require("express");
const database = require("./database");

const server = express();

server.set('view engine', 'ejs');
server.use(express.urlencoded({ extended: true }));

// list all dogs in the database
server.get("/dogs", function (request, response) {
   database.getAllDogs(function (err, rows) {
     if (err) throw err;
     response.render("dogs", { data: rows });
   })
});

// add a dog to database
server.post("/dogs", function (request, response) {
    const { name, age, nick } = request.body;
    database.createDog(name, age, nick, function (err, rows) {
        if (err) throw err;
        response.render("dogs", { data: rows });
    })
})

module.exports = server;