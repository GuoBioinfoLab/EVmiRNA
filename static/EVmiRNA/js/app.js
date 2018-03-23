"use strict";

angular.module('EVmiRNA', ['ui.bootstrap', 'ngRoute', 'pageslide-directive', 'ui.bootstrap-slider', 'bw.paging'])
    .config(function ($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "/static/EVmiRNA/pages/home.html",
                controller: "HomeController",
            })
            .when("/browse",{
                templateUrl:"/static/EVmiRNA/pages/browse.html",
                controller:"BrowseController",
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
            .otherwise({
                redirectTo: "/404.html",
            });
    })
    .config(
	function ($interpolateProvider) {
        $interpolateProvider.startSymbol('{$');
        $interpolateProvider.endSymbol('$}');
    	}
	)
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
        //return "/EVmiRNA"
        return ""
    }
});
