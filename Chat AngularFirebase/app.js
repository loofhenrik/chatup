/*

REGISTER - CONTROLLER
CHATPRESENTATION - CONTROLLER
CHATINPUT - CONTROLLER
SLEFDESTRUCT - CONTROLLER

 */


var myApp = angular.module("myApp", ["firebase"]);

myApp.filter('reverse', function() {
    return function(items) {
        return items.slice().reverse();
    };
});

myApp.controller("MyController", ["$scope", "$firebaseArray",
    function($scope, $firebaseArray){
        var ref = new Firebase("https://shutupplication.firebaseio.com/");

        var currentdate = new Date();

        //Gather messages from db
        $scope.messages = $firebaseArray(ref);
        $scope.toggleContent = true;
        $scope.toggleDestroy = true;


        $scope.addUser = function (e) {
            if(e.keyCode === 13){
                var saveUser = document.querySelector("#nameInput").value;
                $scope.toggleContent = false;
            }
        };

        $scope.addUserclick = function (){
            var saveUser = document.querySelector("#nameInput").value;
            $scope.toggleContent = false;
        };

        //Add message method
        $scope.addMessage = function (e) {
            if(e.keyCode === 13 && $scope.msg){
                var name = $scope.name || "anonymous";

                $scope.date = currentdate.getHours() + ":"
                    + currentdate.getMinutes() + ":"
                    + currentdate.getSeconds() + " || "
                    + currentdate.getDate() + "/"
                    + (currentdate.getMonth()+1) + "/"
                    + currentdate.getFullYear();

                $scope.messages.$add({ username: name, text: $scope.msg, date: $scope.date });

                $scope.msg = "";
            }
        };

        $scope.addMessageclick = function () {
            if($scope.msg){
                var name = $scope.name || "anonymous";

                $scope.date = currentdate.getHours() + ":"
                    + currentdate.getMinutes() + ":"
                    + currentdate.getSeconds() + " || "
                    + currentdate.getDate() + "/"
                    + (currentdate.getMonth()+1) + "/"
                    + currentdate.getFullYear();

                $scope.messages.$add({ username: name, text: $scope.msg, date: $scope.date });

                $scope.msg = "";
            }
        };

        $scope.eraseChat = function () {
            $scope.toggleDestroy = false;
            setTimeout(function(){
                $scope.toggleDestroy = true;
                ref.remove();
                $scope.toggleContent = true;
                document.querySelector("#nameInput").value= "";
            }, 4000);
        }
    }
]);