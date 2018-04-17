"use strict";

angular.module('EVmiRNA')
    .controller('HomeController', HomeController);

function HomeController($scope,$http,$routeParams,EVmiRNAService) {
    console.log("HomeController loaded");
    var sampleNo = $routeParams.sample;
    var base_url=EVmiRNAService.getAPIBaseUrl();	
    $scope.get_list = function () {
         $http({
             url:  '/api/samplerun',
             method: 'GET',
	     params:{sample:sampleNo}
         }).then(
            function (response) {
            console.log(response);
            $scope.runlist = response.data.sample_run_list;
             }
        )
     };
    $scope.get_list();
    $scope.update_page = function(test,page,size,total){
                var condition = {};
                condition["page"] = page;
                $http({
                        url: base_url+'/api/rnaratio',
                        method: 'GET',
                        params: condition
                }).then(

                        function(response){
                        console.log(response);
                        var temp = response.data.sample_RNA_ratio_list;
                        if(temp.length == 0){
                                $scope.error=1;
                        }
                        $scope.sample_RNA_ratio_list = response.data.sample_RNA_ratio_list;
                        $scope.records_number = response.data.records_num;
                        }
                )
    };
    $scope.fetch_sampleratio = function(){
                $http({
                        url:base_url+'/api/rnaratio',
                        method:'GET'
                }).then(
                        function(response){
                                console.log(response);
                                $scope.sample_RNA_ratio_list = response.data.sample_RNA_ratio_list;
                                $scope.records_number = response.data.records_num;
                        });
        };
	$scope.fetch_sampleratio();

}
