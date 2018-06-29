"use strict";

angular.module('EVmiRNA', ['ui.bootstrap', 'ngRoute', 'pageslide-directive', 'ui.bootstrap-slider', 'bw.paging','ngMaterial', 'ngMessages', 'material.svgAssetsCache', 'ngAnimate', 'ui.bootstrap'])
    .config(function ($routeProvider, $locationProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "/static/EVmiRNA/pages/home.html",
                controller: "HomeController",
            })
            .when("/browse",{
                templateUrl:"/static/EVmiRNA/pages/browse.html",
                controller:"BrowseController",
            })
            .when("/special",{
                templateUrl:"/static/EVmiRNA/pages/special.html",
                controller:"SpecialController",
            })            
            .when("/mirnalist",{
                templateUrl:"/static/EVmiRNA/pages/mirnalist.html",
                controller:"MirnalistController",
            })
	          .when("/miRNA_info",{
		             templateUrl:"/static/EVmiRNA/pages/miRNA_info.html",
                 controller:"MirnaController",
               })
            .when("/search",{
                templateUrl:"/static/EVmiRNA/pages/search.html",
                controller:"SearchController",
            })
            .when("/download",{
                templateUrl:"/static/EVmiRNA/pages/download.html",
                controller:"DownloadController",
            })
            .when("/document",{
                templateUrl:"/static/EVmiRNA/pages/document.html",
                controller:"DocumentController",
            })
            .when("/contact",{
                templateUrl:"/static/EVmiRNA/pages/contact.html",
                controller:"ContactController",
            })
            .when("/detail",{
                templateUrl:"/static/EVmiRNA/pages/detail.html",
                controller:"DetailController",
            })
            .when("/test",{
                 templateUrl:"/static/EVmiRNA/pages/test.html",
                 controller:"TestController",
            })
           .when("/family",{
                 templateUrl:"/static/EVmiRNA/pages/mirnafam.html",
                 controller:"MirnafamController",
	          })
           .when("/sample",{
                templateUrl:"/static/EVmiRNA/pages/sample.html",
                controller :"SampleController",
	          })	           
            .when("/sraexp",{
                templateUrl:"/static/EVmiRNA/pages/sraexp.html",
                controller :"SraexpController",
            })
            .when("/conditionalExp",{
                templateUrl:"/static/EVmiRNA/pages/conexp.html",
                controller:"ConexpController",
            })
            .otherwise({
              templateUrl: "/static/EVmiRNA/pages/home.html",
              controller: "HomeController",
            });
	           $locationProvider.html5Mode(false);
    })

    .config(
	     function ($interpolateProvider) {
         $interpolateProvider.startSymbol('{$');
         $interpolateProvider.endSymbol('$}');
    	})


    .config( [
        '$compileProvider',
        function( $compileProvider )
        {
            $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|tel|file|sms):/);
            // Angular v1.2 之前使用 $compileProvider.urlSanitizationWhitelist(...)
        }
    ])

.service('EVmiRNAService',function () {
    this.getAPIBaseUrl = function () {
        // return "";
        return "/EVmiRNA/";
    }
});
