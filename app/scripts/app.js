'use strict';

require('angular');
require('angular-animate');
require('angular-aria');
require('angular-cookies');
require('angular-resource');
require('angular-route');
require('angular-sanitize');
require('angular-touch');
require('./modules/HMDAEngine');

/**
 * @ngdoc overview
 * @name hmdaPilotApp
 * @description
 * # hmdaPilotApp
 *
 * Main module of the application.
 */
angular
  .module('hmdaPilotApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'HMDAEngine'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/selectFile.html',
        controller: 'SelectFileCtrl'
      })
      .when('/summarySyntacticalValidity', {
        templateUrl: 'views/summarySyntacticalValidity.html',
        controller: 'SummarySyntacticalValidityCtrl'
      })
      .when('/summaryQualityMacro', {
        templateUrl: 'views/summaryQualityMacro.html',
        controller: 'SummaryQualityMacroCtrl'
      })
      .when('/summaryMSA-IRS', {
        templateUrl: 'views/summaryMSA-IRS.html',
        controller: 'SummaryMSAIRSCtrl'
      })
      .when('/submit', {
        templateUrl: 'views/submit.html',
        controller: 'SubmitCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

require('./services');
require('./directives');
require('./controllers');
