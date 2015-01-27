'use strict';

//message d'erreur global
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
 * Routing
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
    var url = "http://www.pronos-conduite.com/api/getNotification";
    $(".shadowing").show();
    $http.get(url)
    .success(function(response) {
        $scope.notifications = response.notifications;
        $(".shadowing").hide();
    })
    .error(function() {
        $(".shadowing").hide();
        alert(errorMsg);
    });
});

//classement controlleur
app.controller("ClassementCtrl", function($scope, $http) {
    var url = "http://www.pronos-conduite.com/api/getClassement";
    $(".shadowing").show();
    $http.get(url)
    .success(function(response) {
        $scope.classement = response[0];
        $(".shadowing").hide();
    })
    .error(function() {
        $(".shadowing").hide();
        alert(errorMsg);
    });
});

//pronostiques statistiques controlleur
app.controller("PronostiqueCtrl", function($scope, $http) {
    var url = "http://www.pronos-conduite.com/api/getPcClassement";
    $(".shadowing").show();
    $http.get(url)
    .success(function(response) {
        
        $scope.pronostiques = response;
        $(".shadowing").hide();
    })
    .error(function() {
        $(".shadowing").hide();
        alert(errorMsg);
    });
});

//ajouter-prono controlleur
app.controller("AddPronoCtrl", function($scope, $element, $http) {
    //récupère les données (equipes qui jouent, cotes du match, etc...)
    var url = "http://www.pronos-conduite.com/api/getNextMatch";
    $(".shadowing").show();
    $http.get(url)
    .success(function(response) {
        $scope.match = response;
        $(".shadowing").hide();
    })
    .error(function() {
        $(".shadowing").hide();
        alert(errorMsg);
    });

    //prise en compte du pronostique
    $scope.addProno = function() {
        //poste les données vers le serveur
        var url = "http://www.pronos-conduite.com/api/getNextMatch";
        $(".shadowing").show();
        $http
        .post(url, { 
            
        })
        .success(function(response) {
            $scope.notifications = response;
            $(".shadowing").hide();
        })
        .error(function() {
            $(".shadowing").hide();
            alert(errorMsg);
        });
    }
});
