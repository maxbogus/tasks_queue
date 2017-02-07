/**
 * Created by mboguslavskiy on 07/02/17.
 */

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/my_db');

var express = require('express');
var bodyParser = require('body-parser');
var tasks = require('./js/routes.js');

var personSchema = mongoose.Schema({
    name: String,
    age: Number,
    nationality: String
});

var Person = mongoose.model("Person", personSchema);

var app = express();

//both index.js and things.js should be in same directory
app.set('view engine', 'pug');
app.set('views', './views');
app.use('/tasks', tasks);

app.get('/first_template', function (req, res) {
    res.render('first_view');
});

app.get('/people', function (req, res) {
    Person.find(function (err, response) {
        res.json(response);
    });
});

app.post('/person', function (req, res) {
    var personInfo = req.body; //Get the parsed information
    if (!personInfo.name || !personInfo.age || !personInfo.nationality) {
        res.render('show_message', {message: "Sorry, you provided worng info", type: "error"});
    } else {
        var newPerson = new Person({
            name: personInfo.name,
            age: personInfo.age,
            nationality: personInfo.nationality
        });
        newPerson.save(function (err, res) {
            if (err)
                res.render('show_message', {message: "Database error", type: "error"});
            else
                res.render('show_message', {message: "New person added", type: "success", person: personInfo});
        });
    }
});

app.get('/dynamic_view', function (req, res) {
    res.render('dynamic', {user: {name: "Ayush", age: "20"}});
});

app.use(bodyParser.json());

app.listen(3000);