"use strict";

angular.module('EVmiRNA').controller('SpecialController', SpecialController);

function SpecialController($scope,$http,$window,$mdDialog,EVmiRNAService) {
   console.log("SpecialController loaded");
   var base_url = EVmiRNAService.getAPIBaseUrl();
 

// 定义分割函数
   function fenge(d){
     var d = d.sort();
      var result = [];
      for(var i=0,len=d.length;i<len;i+=5){
         result.push(d.slice(i,i+5));
      }
      return result;
   }
   function fenge1(d){
     var d = d.sort();
      var result = [];
      for(var i=0,len=d.length;i<len;i+=3){
         result.push(d.slice(i,i+3));
      }
      return result;
   }
   
   $scope.pic = function(tm){
        $mdDialog.show(
            {
                controller: MirexpController,
                locals:{tm:tm},
                templateUrl: '/static/EVmiRNA/pages/topmirna.html',
                parent: angular.element(document.body),
                targetEvent: tm,
                clickOutsideToClose:true,
                // fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
                })
                .then(function(answer) {
                $scope.status = 'You said the information was "' + answer + '".';
                }, function() {
                $scope.status = 'You cancelled the dialog.';
                });
    }

    // browse mv
   $scope.microvesicles = function () {
        //browse source
        $http({
           url:  base_url+'/api/browse_mv',
            method: 'GET',
        }).then(
           function (response) {
            console.log(response);

            $scope.type_mv = response.data.type;
            $scope.Breast_mv = fenge(response.data.Breast);
            $scope.Colon_mv = fenge(response.data.Colon);
            $scope.Fibroblasts_mv = fenge(response.data.Fibroblasts);
            $scope.Urine_mv = fenge(response.data.Urine);
            $scope.Mesenchymal_Stem_Cells_mv = fenge(response.data.Mesenchymal_Stem_Cells);
            $scope.Blood_mv = fenge(response.data.Blood);
            $scope.Colon_carcinoma_mv = fenge(response.data.Colon_carcinoma);
            $scope.Breast_adenocarcinoma_mv = fenge(response.data.Breast_adenocarcinoma);
            $scope.chronic_myelocytic_leukemia_mv = fenge(response.data.chronic_myelocytic_leukemia)
            $scope.Prostate_cancer_mv = fenge(response.data.Prostate_cancer)
            $scope.Pancreatic_cancer_mv = fenge(response.data.Pancreatic_cancer)
    })
     };
    $scope.microvesicles();


    // browse exo
   $scope.exosomes = function () {
        //browse source
        $http({
           url:  base_url+'/api/browse_exo',
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
            $scope.CLL = fenge(response.data.CLL);
            $scope.Leukemia = fenge(response.data.Leukemia);
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
     $scope.exosomes();
   function clearhtml(){
        $("#activeT1").hide();
        $("#activeT2").hide();
        $("#activeT3").hide();
        $("#activeT3a").hide();
        $("#activeT3b").hide();
        $("#activeTab10").hide();
        $("#activeTab11").hide();
        $("#activeTab12").hide();
        $("#activeTab13").hide();
        $("#activeTab14").hide();
        $("#activeTab15").hide();
        $("#activeTb1").hide();
        $("#activeTb2").hide();
        $("#activeTb2b").hide();
        $("#activeTb3").hide();
        $("#activeTb3b").hide();
        $("#activeTb4").hide();
        $("#activeTb5").hide();
        $("#activeTb6").hide();
        $("#activeTabb10").hide();
        $("#activeTabb11").hide();
        $("#activeTabb12").hide();
        $("#activeTabb13").hide();
        $("#activeTabb14").hide();
        $("#activeTabb15").hide();
        $("#activeTabb16").hide();
        $("#activeTabb17").hide();
        $("#activeTabb18").hide();
        $("#activeTabb19").hide();
        $("#activeTabb20").hide();
        $("#activeTabb21").hide();
        $("#activeTabb22 ").hide();
        $("#activeTabb23").hide();
        $("#activeTabb24").hide();
    }
    clearhtml();
    $("#activeTb1").show();
//treeview
    var data = [
        {
            text:"Exosomes",
            backColor:"#FF4500",
            state:{
                expanded:true
            },
            nodes:[
            {
                text:"Cancer",
                backColor:"#98FB98",
                state:{
                expanded:true
                },
                nodes:[
                {
                    text:"BRCA&nbsp;<span data-toggle='tooltip' data-placement='right' title='Breast adenocarcinoma'><i class='fa fa-question-circle-o'></i></span>",
                    tags:['Breast adenocarcinoma(EXOs)'],
                    state:{
                        checked:true,
                        selected:true
                    }
                },
                {
                    text:"Colon carcinoma",
                    tags:['Colon carcinoma(EXOs)']
                },
                {
                    text:"CLL&nbsp;<span data-toggle='tooltip' data-placement='right' title='Chronic lymphocytic leukemia'><i class='fa fa-question-circle-o'></i></span>",
                    tags:['CLL(EXOs)']
                },
                {
                    text:"Lymphoma",
                    tags: ['Lymphoma(EXOs)']
                },
                {
                    text:"Leukemia",
                    tags: ['Leukemia(EXOs)']
                },
                {
                    text:"Oral cancer",
                    tags:['Oral cancer(EXOs)']
                },
                {
                    text:"Prostate cancer",
                    tags:['Prostate Cancer(EXOs)']
                },
                {
                    text:"SCC&nbsp;<span data-toggle='tooltip' data-placement='right' title='Squamous Cell Carcinoma'><i class='fa fa-question-circle-o'></i></span>",
                    tags: ['Squamous cell carcinoma(EXOs)']
                },
                
                ]
            },
            {
                text:"Source",
                backColor:"#98FB98",
                state:{
                expanded:true
                },
                nodes:[
                {
                    text:"Blood",
                    tags:['Blood(EXOs)']
                },
                {
                    text:"Breast",
                    tags: ['Breast(EXOs)']
                },
                {
                    text:"Breast milk",
                    tags: ['Breast milk(EXOs)']
                },
                {
                    text:"B cells&nbsp;<span data-toggle='tooltip' data-placement='right' title='B-lymphoblastoid cells'><i class='fa fa-question-circle-o'></i></span>",
                    tags:['B-lymphoblastoid cells(EXOs)']
                },
                {
                    text:"Colon",
                    tags:['Colon(EXOs)']
                },
                {
                    text:"CLL cells",
                    tags:['CLL cells(EXOs)']
                },
                {
                    text:"Epithelial cells<span data-toggle='tooltip' data-placement='right' title='Human epithelial cells'><i class='fa fa-question-circle-o'></i></span>",
                    tags:['Human epithelial cells(EXOs)']
                },
                {
                    text:"HMEC<span data-toggle='tooltip' data-placement='right' title='Human mammary endothelial cells'><i class='fa fa-question-circle-o'></i></span>",
                    tags:['Human mammary endothelial cells(EXOs)']
                },
                {
                    text:"Mast cells<span data-toggle='tooltip' data-placement='right' title='Human mast cells'><i class='fa fa-question-circle-o'></i></span>",
                    tags:['Human mast cells(EXOs)']
                },{
                    text:"Kidney",
                    tags:['Kidney(EXOs)']
                },
                {
                    text:"Lymph",
                    tags:['Lymph(EXOs)']
                },
                {
                    text:"MSC<span data-toggle='tooltip' data-placement='right' title='Mesenchymal Stem Cells'><i class='fa fa-question-circle-o'></i></span>",
                    tags:['Mesenchymal Stem Cells(EXOs)']
                },
                {
                    text:"Saliva",
                    tags:['Saliva(EXOs)']
                },
                {
                    text:"Seminal fluid",
                    tags:['Seminal fluid(EXOs)']
                },
                {
                    text:"Tongue",
                    tags:['Tongue(EXOs)']
                }
                ]
            }]
        }
    ,{
            text:"MicroVesicles",
            backColor:"#FB4500",
            state:{
                expanded:true
            },
            nodes:[
            {
                text:"Cancer",
                backColor:"#98FB98",
                state:{
                    expanded:true
                },
                nodes:[
                {
                    text:"BRCA&nbsp;<span data-toggle='tooltip' data-placement='right' title='Breast adenocarcinoma'><i class='fa fa-question-circle-o'></i></span>",
                    tags: ['Breast adenocarcinoma(MVs)']
                },
                {
                    text:"Colon carcinoma",
                    tags: ['Colon carcinoma(MVs)']
                },{
                    text:"CML&nbsp;<span data-toggle='tooltip' data-placement='right' title='Chronic Myelocytic Leukemia'><i class='fa fa-question-circle-o'></i></span>",
                    tags:['Chronic Myelocytic Leukemia(MVs)']
                },
                {
                    text:"Prostate cancer",
                    tags:['Prostate_cancer(MVs)']
                },
                {
                    text:"Pancreatic cancer",
                    tags:['Pancreatic cancer(MVs)']
                }
                ]
            },
            {
                text:"Source",
                backColor:"#98FB98",
                state:{
                    expanded:true
                },
                nodes:[
                {
                    text:"Blood",
                    tags:['Blood(MVs)']
                },{
                    text:"Breast",
                    tags: ['Breast(MVs)']
                },
                {
                    text:"Colon",
                    tags :['Colon(MVs)']
                },
                {
                    text:"Fibroblasts",
                    tags: ['Fibroblasts(MVs)']
                },
                {
                    text:"MSC&nbsp;<span data-toggle='tooltip' data-placement='right' title='Mesenchymal Stem Cells'><i class='fa fa-question-circle-o'></i></span>",
                    tags: ['Mesenchymal Stem Cells(MVs)']
                },
                {
                    text:"Urine",
                    tags :['Urine(MVs)']
                }
                ]
            }
            ]
    }
    ];
$('#tree').treeview({
    data:data,
    borderColor: 'black',
    showTags:false,
    onNodeSelected:function(event,node){
        console.log(node.tags[0]);
        clearhtml();
        switch(node.tags[0]){
            case "Breast adenocarcinoma(MVs)":
            clearhtml();
            $("#activeT1").show();;
            break;
            case "Colon carcinoma(MVs)":
            clearhtml(); 
            $("#activeT2").show();
            break;
            case "Chronic Myelocytic Leukemia(MVs)":
            clearhtml();
            $("#activeT3").show();
            break;
            case "Prostate_cancer(MVs)":
            clearhtml();
            $("#activeT3a").show();
            break;
            case "Pancreatic cancer(MVs)":
            clearhtml();
            $("#activeT3b").show();
            break;
            case "Blood(MVs)":
            clearhtml();
            $("#activeTab10").show();
            break;
            case "Breast(MVs)":
            clearhtml();
            $("#activeTab11").show();
            break;
            case "Colon(MVs)":
            clearhtml();
            $("#activeTab12").show();
            break;
            case "Fibroblasts(MVs)":
            clearhtml();
            $("#activeTab13").show();
            break;
            case "Mesenchymal Stem Cells(MVs)":
            clearhtml();
            $("#activeTab14").show();
            break;
            case "Urine(MVs)":
            clearhtml();
            $("#activeTab15").show();
            break;
            case "Breast adenocarcinoma(EXOs)":
            clearhtml();
            $("#activeTb1").show();
            break;
            case "Colon carcinoma(EXOs)":
            clearhtml();
            $("#activeTb2").show();
            break;
            case "CLL(EXOs)":
            clearhtml();
            $("#activeTb2b").show();
            break;
            case "Lymphoma(EXOs)":
            clearhtml();
            $("#activeTb3").show();
            break;
            case "Leukemia(EXOs)":
            clearhtml();
            $("#activeTb3b").show();
            break;
            case "Oral cancer(EXOs)":
            clearhtml();
            $("#activeTb4").show();
            break;
            case "Prostate Cancer(EXOs)":
            clearhtml();
            $("#activeTb5").show();
            break;
            case "Squamous cell carcinoma(EXOs)":
            clearhtml();
            $("#activeTb6").show();
            break;
            case "Blood(EXOs)":
            clearhtml();
            $("#activeTabb10").show();
            break;
            case "Breast(EXOs)":
            clearhtml();
            $("#activeTabb11").show();
            break;
            case "Breast milk(EXOs)":
            clearhtml();
            $("#activeTabb12").show();
            break;
            case "B-lymphoblastoid cells(EXOs)":
            clearhtml();
            $("#activeTabb13").show();
            break;
            case "Colon(EXOs)":
            clearhtml();
            $("#activeTabb14").show();
            break;
            case "CLL cells(EXOs)":
            clearhtml();
            $("#activeTabb15").show();
            break;
            case "Human epithelial cells(EXOs)":
            clearhtml();
            $("#activeTabb16").show();
            break;
            case "Human mammary endothelial cells(EXOs)":
            clearhtml();
            $("#activeTabb17").show();
            break;
            case "Human mast cells(EXOs)":
            clearhtml();
            $("#activeTabb18").show();
            break;
            case "Kidney(EXOs)":
            clearhtml();
            $("#activeTabb19").show();
            break;
            case "Lymph(EXOs)":
            clearhtml();
            $("#activeTabb20").show();
            break;
            case "Mesenchymal Stem Cells(EXOs)":
            clearhtml();
            $("#activeTabb21").show();
            break;
            case "Saliva(EXOs)":
            clearhtml();
            $("#activeTabb22").show();
            break;
            case "Seminal fluid(EXOs)":
            clearhtml();
            $("#activeTabb23").show();
            break;
            case "Tongue(EXOs)":
            clearhtml();
            $("#activeTabb24").show();
            break;
        }
    },
    onNodeUnselected:function(event,node){},
    silent: true
    });
}
