/**
 * Created by mboguslavskiy on 07/02/17.
 */

var express = require('express');
var fs = require("fs");
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json());

app.get('/tasks', function (req, res) {
    fs.readFile(__dirname + "/" + "tasks.json", 'utf8', function (err, data) {
        console.log(data);
        res.end(data);
    });
});

app.post('/tasks', function (req, res) {
    var newTask = req.body; //Get the parsed information
    if (!newTask.title || !newTask.description || !newTask.priority) {
        res.status(400);
        res.json({message: "Bad Request"});
    } else {
        fs.readFile(__dirname + "/" + "tasks.json", 'utf8', function (err, data) {
            data = JSON.parse(data);
            data.push(newTask);
            json = JSON.stringify(data);
            fs.writeFile(__dirname + "/" + "tasks.json", json, 'utf8', function (err) {
                if (err) throw err;
            });
            res.end(json);
        });
    }
});

var server = app.listen(3000, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log("Example app listening at http://%s:%s", host, port)

});

/** TODO:
 Необходимо написать веб сервер, прототип  очереди задач.
 Каждая задача имеет строковое название, текстовое описание и целочисленный приоритет.
 В предположении, что сервер запущен на 3000 порту:
 1. При открытии http://localhost:3000/tasks должен быть виден список задач, чем выше приоритет - тем выше задача.
 2. При отправке запроса вида
 curl -X POST -d '{"priority":4,"name":"Покрасить забор","description":"Покрасить забор вокруг дома розовым цветом до полуночи сегодня."}' http://localhost:3000/tasks
 должна создаваться новая задача с соответствующими данными.
 3. Новые задачи должны появляться на http://localhost:3000/tasks без перезагрузки страниц.
 4. Список задач должен сохраняться после рестарта веб сервера.
 **/

//TODO: отображение страницы списка задач
//TODO: отображение списка без перезагрузки
//TODO: реализация через другое хранилище (mongodb, redis, sqlite)