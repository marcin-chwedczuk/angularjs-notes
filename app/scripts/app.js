'use strict';

angular
    .module('notesApp', [
        'ngAnimate',
        'ngCookies',
        'ngMessages',
        'ngResource',
        'ui.router',
        'ngSanitize',
        'ngTouch'
    ])
    .config(['$stateProvider', '$urlRouterProvider', 
    function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('notes', {
                url: '/',

                templateUrl: 'views/notes.html',
                
                controller: 'NotesController',
                controllerAs: 'vm'
            })
            .state('about', {
                url: '/about',

                templateUrl: 'views/about.html',

                controller: 'AboutController',
                controllerAs: 'vm'
            });
    }]);
