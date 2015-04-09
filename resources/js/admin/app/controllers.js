/**
 * Created by Ak on 2/19/2015.
 */
var module = angular.module('adminApp.controllers', ['adminApp.services']);

module.controller('NewTicketController', [
    '$scope', 'GadgetCategories', '$state', '$stateParams', 'Vendors', 'TicketService',
    function ($scope, GadgetCategories, $state, $stateParams, Vendors, TicketService) {
        $scope.vendors = Vendors;
        $scope.gadget_categories = GadgetCategories;

        console.log($scope.gadget_categories);
        console.log($scope.vendors);

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

        $scope.nextStepTwo = function (ticket) {
            $scope.activeStep = 'stepTwo';
            if (
                angular.isDefined(ticket.device_price) &&
                angular.isDefined(ticket.gadget_category)
            ) {
                $scope.ticket = calculatePremium(ticket);
                $state.go('ticket.add.stepTwo');
            } else {
                alert('Enter Price & Select Gadget Category');
            }
        };

        $scope.nextStepThree = function () {
            $scope.activeStep = 'stepThree';
            $state.go('ticket.add.stepThree');
        };

        $scope.nextStepFinal = function (ticket) {
            if (
                angular.isUndefined(ticket.device_price) ||
                angular.isUndefined(ticket.device_receipt_id) ||
                angular.isUndefined(ticket.vendor) ||
                angular.isUndefined(ticket.gadget_category) ||
                angular.isUndefined(ticket.device_model) ||
                angular.isUndefined(ticket.device_make) ||
                angular.isUndefined(ticket.device_premium)
            ) {
                $scope.ticket = ticket;
                console.log(ticket);
                $scope.nextStepOne();
                return;
            }

            if (
                angular.isUndefined(ticket.gpp_policy_number) ||
                angular.isUndefined(ticket.phone_number)
            ) {
                $scope.ticket = ticket;
                console.log(ticket);
                $scope.nextStepThree();
                return;
            }


            console.log(ticket);

            ticket.gadget_category_id = ticket.gadget_category.id;
            ticket.vendor_id = ticket.vendor.id;

            TicketService.save(ticket, function (response) {
                $scope.activeStep = 'stepFinal';
                $state.go('ticket.add.final');
            }, function (error) {
                alert('Failed To Save Ticket, try again');
            });
        };

        $scope.goHome = function () {
            $state.go('ticket.list');
        };


        function calculatePremium(ticket) {
            console.log('Calculate Premium');
            console.log(ticket);
            var percentage = parseFloat(ticket.gadget_category.percentage) / 100;
            var price = parseFloat(ticket.device_price);
            var fixed = parseFloat(ticket.gadget_category.fixed);
            ticket.device_premium = Math.round((price * percentage) + fixed);

            return ticket;
        }
    }]);