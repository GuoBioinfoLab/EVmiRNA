"use strict";

angular.module('EVmiRNA')
	.controller('SearchController',SearchController);

function SearchController($scope,$http,$window,$routeParams,EVmiRNAService){
	console.log("SearchController loaded");
	var base_url = EVmiRNAService.getAPIBaseUrl();
	var flag = 0;
	var mirnalist = [];
	var mircomplete = [];
	$scope.check = function (query_item){
        	if(/[@#\$%\^&\*]+/g.test(query_item)){
            		alert("Invalid input");
            		flag=1;
            		history.back();
        	}
        };
	$scope.filter_id = function(){
		$scope.check($scope.query_miRNA);
		if(flag == 0){
			console.log(flag);
                	var tempbit = $scope.query_miRNA.search(/hsa-miR/i);
			var query_mirna;
                	if (tempbit != 0){
                		var query_item = $scope.query_miRNA.replace(/hsa-miR/i,"miR");
                        	query_mirna = "hsa-"+query_item;
                	}
                	window.open(base_url+"#!miRNA_info?miRNA="+query_mirna,"_self");
			var tempbit = $scope.query_miRNA.search(/hsa-miR/i);
			if (tempbit != 0){
				var query_item = $scope.query_miRNA.replace(/hsa-miR/i,"miR");
				window.open(base_url+"#!miRNA_info?miRNA="+"hsa-"+query_item,"_self");
			}
			else{
				window.open(base_url+"#!miRNA_info?miRNA="+$scope.query_miRNA,"_self");
			}
		}
	};
	$scope.filter_fam = function(){
		window.open(base_url+"#!family?mirnafam="+$scope.query_fam,"_self");
	};
	$scope.filter_source = function(){
		window.open(base_url+"#!sample?sample=source&source="+$scope.query_source,"_self");
	};
	$scope.filter_cell_line = function(){
		window.open(base_url+"#!sample?sample=cell_line&cellline="+$scope.query_cellline,"_self");
	}
	$scope.filter_desease = function(){
		window.open(base_url+"#!sample?sample=desease&desease="+$scope.query_desease,"_self");
	}
	$.get("/api/mirnalist",function(content){
		var mirnalist = content;
		$(function(){
			$("#mirnaid").autocomplete({
				source: mirnalist
			},
			{
				minLength:3
			});
		});
	});
}
