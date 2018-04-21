"use strict";

angular.module('EVmiRNA')
	.controller('SampleController',SampleController);

function SampleController($http,$scope,$window,$routeParams,EVmiRNAService){
	console.log("SampleController loaded");
	var base_url = EVmiRNAService.getAPIBaseUrl();
	if($routeParams.sample == "source"){
		$scope.one =1;
		getSourceexp();
	}
	else if ($routeParams.sample == "cell_line"){
		$scope.two = 1;
		getCelllineexp();
	}
	else if($routeParams.sample == "desease"){
		$scope.three = 1;
		getDeseaseexp();
	}
	function getSourceexp(){
		$http({
			url:base_url+"/api/sourceexp",
			method:"GET",
			params:{source:$routeParams.source}
		}).then(
			function(response){
				console.log(response);
				$scope.sourceexplist = response.data.sourceexp_list;
				$scope.source = $routeParams.source;
			}
		);
	}
	function getCelllineexp(){
		$http({
			url:base_url+"/api/cellinexp",
			method:"GET",
			params:{cell_line:$routeParams.cellline}
		}).then(
			function(response){
				console.log(response);
				$scope.celllinelist = response.data.celllineexp_list;
				$scope.cellline = $routeParams.cellline;
			}
		);
	}
	function getDeseaseexp(){
		$http({
			url:base_url+"/api/cancerexp",
			method:"GET",
			params:{desease:$routeParams.desease}
		}).then(
			function(response){
				console.log(response);
				$scope.deseaselist = response.data.cancerexp_list;
				$scope.desease = $routeParams.desease;
			}
		);
	}
}
