'use strict';

var errorMsg = "Impossible de récupérer les informations...";

document.addEventListener("deviceready", function() {
    //ici du code au chargement de l'appli
}, false);


/**
 * Creation de l'app "pcApp" (Pronos-Conduite App)
 */
var app = angular.module("pcApp", [
    "ngRoute"
]);


/**
 * Routes
 */
app.config(function($routeProvider) {
    $routeProvider
    .when("/notif", {
        templateUrl: "views/notif.html",
        name: "notif"
    })
    .when("/ajouter-prono", {
        templateUrl: "views/ajouter-prono.html",
        name: "addProno"
    })
    .when("/classement", {
        templateUrl: "views/classement.html",
        name: "classement"
    })
    .when("/voir-prono", {
        templateUrl: "views/voir-prono.html",
        name: "voirProno"
    })
    .when("/login", {
        templateUrl: "views/login.html",
        name: "login"
    })
    .otherwise({
        redirectTo: "/notif"
    });
});


/**
 * Controlleurs
 */
//navigation controlleur
app.controller("NavigationCtrl", function($scope, $location, $routeParams, $route) {
    //@todo voir sur quelle route on arrive pour setter le bon menu (get the current route name)
    $scope.menu = 'notif';
});

//notifications controlleur
app.controller("NotificationCtrl", function($scope, $http) {
    var url = "/json/notif.json";
    $(".shadowing").show();
    $http.get(url)
        .success(function(response) {
            $scope.notifications = response;
            $(".shadowing").hide();
        })
        .error(function() {
            alert(errorMsg);
        });
});

//ajouter prono controlleur
app.controller("AddPronoCtrl", function($scope, $http) {
    //récupère les données (equipe qui jouent, cotes du match, etc...) pour charger la page
    var url = "https://www.googleapis.com/urlshortener/v1/url?shortUrl=http://goo.gl/fbsS&projection=FULL";
    //var url = "/json/prono.json";
    $(".shadowing").show();
    $http.get(url)
        .success(function(response) {
            $scope.notifications = response;
            $(".shadowing").hide();
        })
        .error(function() {
            alert(errorMsg);
        });

    $scope.addProno = function() {
        //poste les données vers le serveur
        var url = "http://maps.googleapis.com/maps/api/geocode/json?address=2%20quai%20de%20la%20pr%C3%A9valaye%2035000%20Rennes&sensor=true";
        //var url = "/json/addProno.json";
        $(".shadowing").show();
        $http.get(url)
            .success(function(response) {
                $scope.notifications = response;
                $(".shadowing").hide();
            })
            .error(function() {
                alert(errorMsg);
            });
    }
});
