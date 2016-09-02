'use strict';


var myApp = angular.module('myApp', [
 'ngRoute',
  'myApp.version',
  'ui.bootstrap'
])
.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider,$http) {
	$locationProvider.hashPrefix('!');
	$routeProvider.otherwise({redirectTo: '/user'});
}])
.controller('users',  ['$scope','$http','$routeParams','$httpParamSerializerJQLike','userFactory','edit_user','edit_user_submit',function($scope,$http,displayUsers,$httpParamSerializerJQLike,userFactory,edit_user,edit_user_submit) {

	$scope.add_user = function () {

		var temp1 = userFactory.insert_user($scope.user_name,$scope.user_email).then(function mysuccess1(response){
       		var obj = { user_name:$scope.user_name, user_email:$scope.user_email,user_id:response.data};
            $scope.user_data.push(obj);
       		//console.log(response);
       		$scope.user_name = "";
       		$scope.user_email = "";
       });
      //var temp1 = userFactory.insert_user();

 // another solution
		/*var email = $scope.user_email;
		var name = $scope.user_name;

	 	$http({
		    method : "POST",
		    url : "ci/index.php/api/User/add_user",
		    data: $httpParamSerializerJQLike({ "user_name":$scope.user_name,"user_email":$scope.user_email}),
	        headers: {
	       		'Content-Type': 'application/x-www-form-urlencoded'
	       	}
		}).then(function myres(res){
			var obj = { user_email:email,user_id:res.data,user_name:name};
            $scope.user_data.push(obj);
		});*/ 
	};


	$scope.delete_user = function (obj) {
		// console.log(obj);
		var temp = userFactory.delete_user(obj.user_id).then(function success(res){

   			var index = -1;		
			var comArr = eval( $scope.user_data );

			for( var i = 0; i < comArr.length; i++ ) {
				if( comArr[i].user_id === obj.user_id ) {
					index = i;
					break;
				}
			}
			
			if( index === -1 ) {
				alert( "Something gone wrong" );
			}
			else
			{
				$scope.user_data.splice( index, 1 );	
				alert( "User Deleted Successfully" );	
			}
		});
	};

	$scope.edit_modal = function(obj){
		var temp1 = edit_user.openmodal(obj.user_id,obj.user_name,obj.user_email);
	};
}])
.factory('edit_user',['$uibModal',function($uibModal){

	var factory1 = {};

	factory1.openmodal = function(user_id,user_name,user_email){

		var editopen = $uibModal.open({
			animation:true,
			size:'sm',
			//template:"<div>USer id :: "+user_id+"<br/>User Name :: "+user_name+"</div>",
			templateUrl:'myModalContent.html',
			controller:'xyz',
			resolve: {
		        message: function(){
		            return user_id;
		        },
		        message1: function(){
		            return user_name;
		        },
		        message2: function(){
		            return user_email;
		        },
			}
			//controller:'xyz'
		}); 
	};

	return factory1;
	
}])
.factory('userFactory', ['$route','$http','$httpParamSerializerJQLike', function($route,$http,$httpParamSerializerJQLike) {

	var factory = {};

	factory.getuserlist = function() {
		return $http({
		    method : "POST",
		    url : "ci/index.php/api/User/get_user_list",
		    data : {},
		    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		});
	};

	factory.insert_user = function(user_name,user_email) {
		return $http({
		    method : "POST",
		    url : "ci/index.php/api/User/add_user",
		    data: $httpParamSerializerJQLike({ "user_name":user_name,"user_email":user_email}),
	        headers: {
	       		'Content-Type': 'application/x-www-form-urlencoded'
	       	}
		});
	};


	factory.delete_user = function(user_id) {
		return $http({
		    method : "POST",
		    url : "ci/index.php/api/User/delete_user",
		    data: $httpParamSerializerJQLike({ "user_id":user_id}),
	        headers: {
	       		'Content-Type': 'application/x-www-form-urlencoded'
	       	}
		});
	};

	return factory;
}])
.directive('displayUsers', function () {
    "use strict";
        
    return {
       	controller :function($scope,userFactory){
       		// console.log("this is directive");
       		// console.log(userFactory.getuserlist());
       		var temp = userFactory.getuserlist().then(function mysuccess(response){
       			//console.log(response.data);
       			$scope.user_data = response.data;
       		},function myerror(response){
       			$scope.user_data = [];
       		});
       	},
       	templateUrl:'./user/user.html'
   	};
})
// .controller('my_modal',['$scope','$uibModal',function($scope,$uibModal){
// 	$scope.custom_modal = function(){
		
// 		var modalopen = $uibModal.open({
// 			animation:true,
// 			//size:'md',
// 			template:"<div>asasdsa</div>",
// 			// templateUrl:'myModalContent1.html',
// 			// controller:'xyz1'
// 		})
// 	};
// }])
.controller('xyz',['$scope','$uibModalInstance','message','message1','message2','edit_user_submit','userFactory',function($scope,$uibModalInstance,message,message1,message2,edit_user_submit,userFactory){
	
	$scope.message = message;
	$scope.message1 = message1;
	$scope.message2 = message2;

	$scope.ok = function(){
		$uibModalInstance.close();

		if($scope.user_id == undefined || $scope.user_id == "")
			$scope.user_id = message;

		if($scope.user_id == undefined || $scope.user_id == "")
			$scope.user_id = message;

		if($scope.user_name == undefined || $scope.user_name == "")
			$scope.user_name = message1;

		if($scope.user_email == undefined || $scope.user_email == "")
			$scope.user_email = message2;

		var temp1 = edit_user_submit.edit_user_info($scope.user_id,$scope.user_name,$scope.user_email).then(function mysuccess1(response){      		
       		//console.log(response.data);

       		var temp = userFactory.getuserlist().then(function mysuccess(response){
						console.log(response.data);
			       			//$scope.user_data = response.data;
			    		},function myerror(response){
		       			//$scope.user_data = [];
		       		});

      //  		var s =  {
		    //    	controller :function($scope,userFactory){
		    //    		// console.log("this is directive");
		    //    		// console.log(userFactory.getuserlist());
		    //    		var temp = userFactory.getuserlist().then(function mysuccess(response){
		    //    			console.log(response.data);
		    //    			$scope.user_data = response.data;
		    //    		},function myerror(response){
		    //    			$scope.user_data = [];
		    //    		});
		    //    	},
		    //    	templateUrl:'./user/user.html'
		   	// };
       		// $scope.user_email = "";
       });
	};

	$scope.cancel=function(){
		$uibModalInstance.close();
	};
}])
.factory('edit_user_submit',['$http','$httpParamSerializerJQLike',function($http,$httpParamSerializerJQLike){
	
	var my_factory = {};
	my_factory.edit_user_info = function(user_id,user_name,user_email) {
		return $http({
		    method : "POST",
		    url : "ci/index.php/api/User/update_user_info",
		    data: $httpParamSerializerJQLike({ "user_id":user_id,"user_name":user_name,"user_email":user_email}),
	        headers: {
	       		'Content-Type': 'application/x-www-form-urlencoded'
	       	}
		});
	};

	return my_factory;

}]);