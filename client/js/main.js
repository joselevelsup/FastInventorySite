angular.module("fastinventory", [])

.controller("loginCtrl", function($scope, $http, $window, $timeout){
  $scope.formUser = {
    email:"",
    pass: ""
  }

  $scope.loginUser = function(){
    $http.post("/api/logindata", $scope.formUser)
    .success(function(data){
      $scope.creds = data;
      if(data){
        $timeout(function(){
          $window.location.href = "/example";
        }, 2000);
      }
     })
     .error(function(err){
       console.log("Messed up: "+err);
     });
  }

})
