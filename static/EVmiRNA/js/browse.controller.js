"use strict";

angular.module('EVmiRNA')
    .controller('BrowseController', BrowseController);

function BrowseController($scope,$http,$window,EVmiRNAService) {
    console.log("BrowseController loaded");
   var base_url = EVmiRNAService.getAPIBaseUrl();
   $scope.get_list = function () {
        var sc = '';
        sc = $scope.sc;
        $http({
           url:  '/api/browse',
            method: 'GET',
            params: {sc:sc}
        }).then(
           function (response) {
            console.log(response);
            $scope.browse = response.data;
             }
        )
	$http({
		url:"/api/mirna_list",
		method:"GET"
	}).then(
		function(response){
			console.log(response);
			$scope.mirnabrowse = response.data.mirna_list;
			$scope.records_number = response.data.records_num;
		}
	)
     };
    $scope.get_list();
    $scope.update_page = function(test,page,size,total){
	var condition = {};
	condition["page"] = page;
	$http({
                url:"/api/mirna_list",
                method:"GET",
		params:condition
        }).then(
                function(response){
			console.log(response);
                        $scope.mirnabrowse = response.data.mirna_list;
			 $scope.records_number = response.data.records_num;
                }
        )
	}
	$scope.filter_mirna = function(){
		window.open(base_url+"miRNA_info?miRNA="+$scope.query_mirna,"_blank");
	}
}
