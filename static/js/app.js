/**
 * Created by mboguslavskiy on 07/02/17.
 */

'use strict';

var app = angular.module('tasks', []);

app.controller('AngularJSCtrl', function ($scope, $http) {
    $http(
        {
            method: 'GET',
            url: 'tasks/json'
        })
        .then(function (response) {
            console.log('success');
            console.log(response.data);
            $scope.data = response.data.Tasks;
        }, function (response) {
            console.log('error');
            console.log(response.data);
        });

});


/** TODO:
 * REQUIRED SCOPE
 В предположении, что сервер запущен на 3000 порту:
 3. Новые задачи должны появляться на http://localhost:3000/tasks без перезагрузки страниц.
 **/

/** TODO:
 * ADDITIONAL SCOPE
 В предположении, что сервер запущен на 3000 порту:
 1. Причесать визуально страницу
 2. Сделать обработку ошибок
 3. Добавить лоадинг
 **/

//My request: curl -X POST -d '{"priority":4,"title":"Покрасить забор","description":"Покрасить забор вокруг дома розовым цветом до полуночи сегодня."}' -H "Content-type: application/json" http://localhost:5000/tasks
//TODO: curl -X POST -d '{"priority":4,"title":"Покрасить забор","description":"Покрасить забор вокруг дома розовым цветом до полуночи сегодня."}' -H "Content-type: application/json" http://localhost:5000/tasks