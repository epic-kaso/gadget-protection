/**
 * Created by Ak on 2/19/2015.
 */
var module = angular.module('adminApp.controllers', ['adminApp.services']);

module.controller('NewTicketController', [
    '$scope', 'Gadgets', '$state', '$stateParams', 'Vendors', 'ToastService',
    '$cookieStore',
    function ($scope, Gadgets, $state, $stateParams, Vendors, ToastService,
              $cookieStore) {
        $scope.vendors = Vendors;
        $scope.gadget_categories = Gadgets;
        $scope.activeStep = 'stepOne';
        $scope.isCreatingTicket = true;
        $scope.creationError = false;

        $scope.ticket = {};

        $scope.selected = {};
        $scope.activeNextButton = false;

        $scope.createTicket = function (ticket) {
        };


        $scope.nextStepOne = function () {
            $scope.activeStep = 'stepOne';
            $state.go('ticket.add.stepOne');
        };

        $scope.nextStepTwo = function () {
            $scope.activeStep = 'stepTwo';
            $state.go('ticket.add.stepTwo');
        };

        $scope.nextStepThree = function () {
            $scope.activeStep = 'stepThree';
            $state.go('ticket.add.stepThree');
        };

        $scope.nextStepFour = function () {
            $scope.activeStep = 'stepFour';
            $state.go('ticket.add.stepFour');
        };

        $scope.nextStepFinal = function () {
            $scope.activeStep = 'stepFinal';
            calculateDeviceReward();
            $state.go('ticket.add.final');
            $scope.createTicket($scope.ticket);
        };

        $scope.goHome = function () {
            $state.go('ticket.menu');
        };

        function calculateDeviceGrade() {
            return $scope.ticket.device_grade;
        }

        function calculateDeviceReward() {
            $scope.selected.grade = calculateDeviceGrade();
            $scope.selected.size = $scope.ticket.size_id;

            angular.forEach($scope.selected.device.sizes, function (value, key) {
                if (value.id == $scope.ticket.size_id) {
                    this.size = value.value;
                }
            }, $scope.selected);

            $scope.ticket.reward = GadgetEvaluationReward.calculate($scope.selected);
        }

        function stepTwoActive() {
            return $scope.activeStep == 'stepTwo';
        }

        function stepThreeActive() {
            return $scope.activeStep == 'stepThree';
        }

        function stepFourActive() {
            return $scope.activeStep == 'stepFour';
        }

        function stepFinalActive() {
            return $scope.activeStep == 'stepFinal';
        }

        function checkTestsPassed(obj) {
            var state = {ready: true};

            angular.forEach(obj, function (value, key) {
                if (value == 'no') {
                    this.ready = false;
                }
            }, state);

            return state.ready;
        }

        function setViewState(ready) {
            $scope.activeNextButton = ready;
            if (ready) {
                $scope.message = "Ok, proceed.";
            } else {
                $scope.message = "Sorry, Device doesn't Qualify to Continue";
            }
        }
    }]);