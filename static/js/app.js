/**
 * Created by mboguslavskiy on 07/02/17.
 */

'use strict';

var tasks = angular.module('tasks', []);

tasks.service('dataService', function ($http) {
    delete $http.defaults.headers.common['X-Requested-With'];
    this.getData = function () {
        // $http() returns a $promise that we can add handlers with .then()
        return $http({
            method: 'GET',
            url: 'http://localhost/tasks/json'
        });
    }
});

tasks.controller('AngularJSCtrl', function ($scope, dataService) {
    $scope.data = null;
    dataService.getData().then(function (dataResponse) {
        console.log(dataResponse);
        $scope.data = dataResponse;
    });
});


/** TODO:
 В предположении, что сервер запущен на 3000 порту:
 1. При открытии http://localhost:3000/tasks должен быть виден список задач, чем выше приоритет - тем выше задача.
 3. Новые задачи должны появляться на http://localhost:3000/tasks без перезагрузки страниц.
 **/

//My request: curl -X POST -d '{"priority":4,"title":"Покрасить забор","description":"Покрасить забор вокруг дома розовым цветом до полуночи сегодня."}' -H "Content-type: application/json" http://localhost:5000/tasks
//TODO: curl -X POST -d '{"priority":4,"title":"Покрасить забор","description":"Покрасить забор вокруг дома розовым цветом до полуночи сегодня."}' -H "Content-type: application/json" http://localhost:5000/tasks