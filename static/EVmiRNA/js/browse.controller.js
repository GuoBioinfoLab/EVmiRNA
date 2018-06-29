"use strict";

angular.module('EVmiRNA')
    .controller('BrowseController', BrowseController);

function BrowseController($scope,$http,$window,$mdDialog,EVmiRNAService) {
    console.log("BrowseController loaded");
   var base_url = EVmiRNAService.getAPIBaseUrl();

   function fenge1(d){
     var d = d.sort();
      var result = [];
      for(var i=0,len=d.length;i<len;i+=6){
         result.push(d.slice(i,i+6));
      }
      return result
   }
   
   
   function fenge2(d){
     var d = d.sort();
      var result = [];
      for(var i=0,len=d.length;i<len;i+=6){
         result.push(d.slice(i,i+6));
      }
      return result
   }

    $scope.exo_source = new Array("Lymph","Tongue","Blood","Seminal fluid","Human mast cell","Human mammary epithelial cell","Kidney","Breast","Chronic lymphocytic leukemia cell","Human epithelial cell","Colon","B-lymphoblastoid cell","Saliva","Breast milk","Mesenchymal stem cell");
    $scope.exo_source = fenge1($scope.exo_source);
    $scope.exo_source_a = {
        'Blood':'Blood_Exo',
        'B-lymphoblastoid cell':'B-lymphoblastoid cell lines_Exo',
        'Breast milk':'Breast milk_Exo',
        'Breast':'Breast_Exo',
        'Chronic lymphocytic leukemia cell':'Chronic lymphocytic leukemia cell_Exo',
        'Colon':'Colon_Exo',
        'Human epithelial cell':'Human epithelial cells_Exo',
        'Human mammary epithelial cell':'Human mammary epithelial cell_Exo',
        'Human mast cell':'Human mast cell_Exo',
        'Kidney':'Kidney_Exo',
        'Lymph':'Lymph_Exo',
        'Mesenchymal stem cell':'Mesenchymal Stem Cells_Exo',
        'Saliva':'Saliva_Exo',
        'Seminal fluid':'Seminal fluid_Exo',
        'Tongue':'Tongue_Exo'
    };
    $scope.exo_source_img = {
        'Blood':'blood.png',
        'B-lymphoblastoid cell':'bcell.png',
        'Breast milk':'breastmilk.png',
        'Breast':'breast.png',
        'Chronic lymphocytic leukemia cell':'Chroniclymphocyticleukemiacell.png',
        'Colon':'colon.png',
        'Human epithelial cell':'noimg.png',
        'Human mammary epithelial cell':'noimg.png',
        'Human mast cell':'humanmastcell.png',
        'Kidney':'kidney.png',
        'Lymph':'Lymph.png',
        'Mesenchymal stem cell':'msc.png',
        'Saliva':'noimg.png',
        'Seminal fluid':'semen.png',
        'Tongue':'tongue.png'
    }
    $scope.exo_source_st = {
        'Blood':'Blood',
        'B-lymphoblastoid cell':'B cell',
        'Breast milk':'Breast milk',
        'Breast':'Breast',
        'Chronic lymphocytic leukemia cell':'CLL cell',
        'Colon':'Colon',
        'Human epithelial cell':'HEC',
        'Human mammary epithelial cell':'HMEC',
        'Human mast cell':'HMC',
        'Kidney':'Kidney',
        'Lymph':'Lymph',
        'Mesenchymal stem cell':'MSC',
        'Saliva':'Saliva',
        'Seminal fluid':'Seminal',
        'Tongue':'Tongue'
    }


    $scope.exo_cancer = new Array("Breast adenocarcinoma","Lymphoma",'Leukemia',"Oral cancer","Prostate cancer","Colon carcinoma","Squamous cell carcinoma","Chronic lymphocytic leukemia");
    $scope.exo_cancer = fenge1($scope.exo_cancer);
    $scope.exo_cancer_a = {
        'Breast adenocarcinoma':'Breast adenocarcinoma_Exo',
        'Chronic lymphocytic leukemia':'Chronic lymphocytic leukemia_Exo',
        'Colon carcinoma':'Colon carcinoma_Exo',
        'Leukemia':'Leukemia_Exo',
        'Lymphoma':'Lymphoma_Exo',
        'Oral cancer':'Oral cancer_Exo',
        'Prostate cancer':'Prostate cancer_Exo',
        'Squamous cell carcinoma':'Squamous cell carcinoma_Exo'
    }
    $scope.exo_cancer_img = {
        'Breast adenocarcinoma':'breastcancer.png',
        'Chronic lymphocytic leukemia':'Chroniclymphocyticleukemiacell.png',
        'Colon carcinoma':'coloncancer.png',
        'Leukemia':'luekemia.png',
        'Lymphoma':'lymphoma.png',
        'Oral cancer':'oralcancer.png',
        'Prostate cancer':'prostatecancer.png',
        'Squamous cell carcinoma':'squamouscellcarcinoma.png'
    }


    $scope.mv_source = new Array("Breast","Colon","Fibroblast","Urine","Mesenchymal stem cell","Blood");
    $scope.mv_source = fenge1($scope.mv_source);
    $scope.mv_source_a = {
        'Breast':'Breast_MV',
        'Colon':'Colon_MV',
        'Fibroblast':'Fibroblasts_MV',
        'Urine':'Urine_MV',
        'Mesenchymal stem cell':'Mesenchymal Stem Cells_MV',
        'Blood':'Blood_MV'
    }
    $scope.mv_source_img = {
        'Breast':'breast.png',
        'Colon':'colon.png',
        'Fibroblast':'fibroblast.png',
        'Urine':'urine.png',
        'Mesenchymal stem cell':'msc.png',
        'Blood':'blood.png'
    }
    $scope.mv_source_st = {
        'Breast':'Breast',
        'Colon':'Colon',
        'Fibroblast':'Fibroblast',
        'Urine':'Urine',
        'Mesenchymal stem cell':'MSC',
        'Blood':'Blood'
    }

    $scope.mv_cancer = new Array("Colon carcinoma","Breast adenocarcinoma","Chronic myelocytic leukemia","Prostate cancer","Pancreatic cancer");
    $scope.mv_cancer = fenge2($scope.mv_cancer);
    $scope.mv_cancer_a = {
        'Breast adenocarcinoma':'Breast adenocarcinoma_MV',
        'Chronic myelocytic leukemia':'Chronic myelocytic leukemia_MV',
        'Colon carcinoma':'Colon carcinoma_MV',
        'Pancreatic cancer':'Pancreatic cancer_MV',
        'Prostate cancer':'Prostate cancer_MV',
    }
    $scope.mv_cancer_img = {
        'Breast adenocarcinoma':'breastcancer.png',
        'Chronic myelocytic leukemia':'cml.png',
        'Colon carcinoma':'coloncancer.png',
        'Pancreatic cancer':'pancreaticcancer.png',
        'Prostate cancer':'prostatecancer.png'
    }
}
