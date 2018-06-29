"use strict";

angular.module('EVmiRNA')
    .controller('BrowseController', BrowseController);

function BrowseController($scope,$http,$window,$mdDialog,EVmiRNAService) {
    console.log("BrowseController loaded");
   var base_url = EVmiRNAService.getAPIBaseUrl();
   var base_url = "/#!/";

// 定义分割函数
   function fenge(d){
     var d = d.sort();
      var result = [];
      for(var i=0,len=d.length;i<len;i+=5){
         result.push(d.slice(i,i+5));
      }
      return result
   }
   function fenge1(d){
     var d = d.sort();
      var result = [];
      for(var i=0,len=d.length;i<len;i+=3){
         result.push(d.slice(i,i+3));
      }
      return result
   }

    // browse mv
   $scope.microvesicles = function () {
        //browse source
        $http({
           url:  '/api/browse_mv',
            method: 'GET',
        }).then(
           function (response) {
            console.log(response);

            $scope.type = response.data.type;
            $scope.Breast = fenge(response.data.Breast);
            $scope.Colon = fenge(response.data.Colon);
            $scope.Fibroblasts = fenge(response.data.Fibroblasts);
            $scope.Urine = fenge(response.data.Urine);
            $scope.Mesenchymal_Stem_Cells = fenge(response.data.Mesenchymal_Stem_Cells);
            $scope.Blood = fenge(response.data.Blood);
            $scope.Colon_carcinoma = fenge(response.data.Colon_carcinoma);
            $scope.Breast_adenocarcinoma = fenge(response.data.Breast_adenocarcinoma);
            $scope.chronic_myelocytic_leukemia = fenge(response.data.chronic_myelocytic_leukemia);
    }
	)
     };
//    $scope.microvesicles();


    // browse exo
   $scope.exosomes = function () {
        //browse source
        $http({
           url:  '/api/browse_exo',
            method: 'GET',
        }).then(
           function (response) {
            console.log(response);

            $scope.type = response.data.type;
            $scope.Lymph = fenge(response.data.Lymph);
            $scope.Tongue = fenge(response.data.Tongue);
            $scope.Blood = fenge(response.data.Blood);
            $scope.Seminal_fluid = fenge(response.data.Seminal_fluid);
            $scope.Human_mast_cells = fenge(response.data.Human_mast_cells);
            $scope.Human_Mammary_Epithelial_Cells = fenge(response.data.Human_Mammary_Epithelial_Cells);
            $scope.Kidney = fenge(response.data.Kidney);
            $scope.Breast = fenge(response.data.Breast);
            $scope.CLL_cells = fenge(response.data.CLL_cells);
            $scope.Human_epithelial_cells = fenge(response.data.Human_epithelial_cells);
            $scope.Colon = fenge(response.data.Colon);
            $scope.Blymphoblastoid_cells = fenge(response.data.Blymphoblastoid_cells);
            $scope.Saliva = fenge(response.data.Saliva);
            $scope.Breast_milk = fenge(response.data.Breast_milk);
            $scope.Mesenchymal_Stem_Cells = fenge(response.data.Mesenchymal_Stem_Cells);
            $scope.Breast_adenocarcinoma = fenge(response.data.Breast_adenocarcinoma);
            $scope.Lymphoma = fenge(response.data.Lymphoma);
            $scope.Oral_cancer = fenge(response.data.Oral_cancer);
            $scope.Prostate_Cancer = fenge(response.data.Prostate_Cancer);
            $scope.Colon_carcinoma = fenge(response.data.Colon_carcinoma);
            $scope.Squamous_cell_carcinoma = fenge(response.data.Squamous_cell_carcinoma);
    }
	)
     };
    // $scope.exosomes();

    $scope.exo_source = new Array("Lymph","Tongue","Blood","Seminal fluid","Human mast cell","Human mammary epithelial cell","Kidney","Breast","Chronic lymphocytic leukemia cell","Human epithelial cell","Colon","B-lymphoblastoid cell","Saliva","Breast milk","Mesenchymal stem cell");
    $scope.exo_source = fenge1($scope.exo_source);
    $scope.exo_cancer = new Array("Breast adenocarcinoma","Lymphoma","Oral cancer","Prostate cancer","Colon carcinoma","Squamous cell carcinoma","Chronic lymphocytic leukemia");
    $scope.exo_cancer = fenge1($scope.exo_cancer);
    $scope.mv_source = new Array("Breast","Colon","Fibroblast","Urine","Mesenchymal stem cell","Blood");
    $scope.mv_source = fenge1($scope.mv_source);
    $scope.mv_cancer = new Array("Colon carcinoma","Breast adenocarcinoma","Chronic myelocytic leukemia","Prostate cancer","Pancreatic cancer");
    $scope.mv_cancer = fenge1($scope.mv_cancer);
}
