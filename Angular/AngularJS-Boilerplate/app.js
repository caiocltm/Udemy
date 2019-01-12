angular.module('app', ['ngRoute', 'lista-telefonica'])

.config(function($routeProvider, $locationProvider){
    
    $routeProvider
        
        .when("/", {
            templateUrl: "modules/lista-telefonica/index.html",
            controller: "listaTelefonicaController"
        })
        
        .otherwise({redirectTo: "/"});
        
        $locationProvider.html5Mode(true);
    
})