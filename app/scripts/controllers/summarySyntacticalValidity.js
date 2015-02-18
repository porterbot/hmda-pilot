'use strict';

/**
 * @ngdoc function
 * @name hmdaPilotApp.controller:SummarySyntacticalValidityCtrl
 * @description
 * # SummarySyntacticalValidityCtrl
 * Controller for the Syntactical and Validity Summary view
 */
module.exports = /*@ngInject*/ function ($scope, $location, $q, $timeout, HMDAEngine, Wizard) {

    // Populate the $scope
    $scope.errors = {};
    $scope.isProcessing = false;

    // Get the list of errors from the HMDAEngine
    var editErrors = HMDAEngine.getErrors();

    $scope.syntacticalErrors = editErrors.syntactical || {};
    $scope.validityErrors = editErrors.validity || {};

    $scope.previous = function() {
        $location.path('/');
    };

    $scope.hasNext = function() {
        return angular.equals({}, $scope.syntacticalErrors) && angular.equals({}, $scope.validityErrors);
    };

    $scope.next = function() {
        // Toggle processing flag on so that we can notify the user
        $scope.isProcessing = true;

        $timeout(function() { $scope.process(); }, 100); // Pause before starting the validation so that the DOM can update
    };

    $scope.process = function() {
        // Run the second set of validations
        var ruleYear = HMDAEngine.getRuleYear();
        $q.all([HMDAEngine.runQuality(ruleYear), HMDAEngine.runMacro(ruleYear)])
        .then(function() {

            // Complete the current step in the wizard
            $scope.wizardSteps = Wizard.completeStep();

            // And go the next summary page
            $location.path('/summaryQualityMacro');

            // Toggle processing flag off
            $scope.isProcessing = false;
        })
        .catch(function(err) {
            // Toggle processing flag off
            $scope.isProcessing = false;

            $scope.errors.global = err.message;
            return;
        });
    };
};
