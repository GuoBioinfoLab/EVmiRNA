"use strict";

angular.module('EVmiRNA')
	.controller('SearchController',SearchController);

function SearchController($scope,$http,$window,$routeParams,EVmiRNAService){
	console.log("SearchController loaded");
	var base_url = EVmiRNAService.getAPIBaseUrl();
	var flag = 0;
	var mirnalist = [];
	var mircomplete = [];
	$scope.check = function (query_item) {
        	if(/[@#\$%\^&\*]+/g.test(query_item)){
            		alert("Invalid input");
            		flag=1;
            		history.back();
        }
        };
	$scope.filter_id = function(){
		$scope.check($scope.query_miRNA);
		if(flag == 0){
			var tempbit = $scope.query_miRNA.search(/hsa-miR/i);
			if (tempbit != 0){
				var query_item = $scope.query_miRNA.replace(/hsa-miR/i,"miR");
				window.open(base_url+"#!miRNA_info?miRNA="+"hsa-"+query_item,"_self");
			}
			else{
			window.open(base_url+"#!miRNA_info?miRNA="+"hsa-"+$scope.query_miRNA,"_self");
			}
		}
	};
	$.get("/api/mirnalist",function(content){
		var mirnalist = content;
		$(function(){
			$("#mirnaid").autocomplete({
				source: mirnalist
			},
			{
				minLength:7
			});
		});
	});
}
