/**
 * Created by Ak on 2/19/2015.
 */
var app = angular.module("AdminApp",
    [
        'ui.select',
        'ngSanitize',
        'ngImgCrop',
        'ui.bootstrap',
        'ui.router',
        'ngUpload',
        'ngAnimate',
        'ngResource',
        'angular-loading-bar',
        'adminApp.directives',
        'adminApp.controllers',
        'adminApp.services',
        'ngCookies']);

app.config(['$urlRouterProvider', '$stateProvider',
    function ($urlRouterProvider, $stateProvider) {
        $stateProvider.state('vendors',
            {
                url: '/vendors',
                templateUrl: 'partials/vendors/dashboard.html',
                resolve: {
                    'active': ['$rootScope', function ($rootScope) {
                        $rootScope.active_nav = 'vendors';
                    }],
                    'hasHistory': ['$rootScope', function ($rootScope) {
                        $rootScope.hasHistory = false;
                    }],
                    'Vendors': ['VendorService', function (VendorService) {
                        return VendorService.query({});
                    }]
                },
                controller: ['$scope', 'VendorService', 'Vendors', function ($scope, VendorService, Vendors) {
                    $scope.models = Vendors;

                    $scope.addVendor = function (vendor, event) {
                        VendorService.save(vendor,function(response){
                            $scope.models.push(response);
                        },function(){
                            alert('Failed To Create');
                        });
                        event.preventDefault();
                    };
                    $scope.deleteItem = function (id,index) {
                        VendorService.delete({id: id}, function (response) {
                            $scope.models.splice(index,1);
                        }, function (response) {
                            alert(response);
                        });
                    }
                }]
            });

        $stateProvider.state('gadgets',
            {
                url: '/gadgets',
                templateUrl: 'partials/gadgets/dashboard.html',
                resolve: {
                    'active': ['$rootScope', function ($rootScope) {
                        $rootScope.active_nav = 'gadgets';
                    }],
                    'hasHistory': ['$rootScope', function ($rootScope) {
                        $rootScope.hasHistory = false;
                    }],
                    'GadgetCategories': ['GadgetCategoryService', function (GadgetCategoryService) {
                        return GadgetCategoryService.query({});
                    }]
                },
                controller: ['$scope', 'GadgetCategoryService', 'GadgetCategories', function ($scope, GadgetCategoryService, GadgetCategories) {
                    $scope.models = GadgetCategories;

                    $scope.addGadgetCategory = function (category, event) {
                        GadgetCategoryService.save(category,function(response){
                            $scope.models.push(response);
                        },function(){
                            alert('Failed To Create');
                        });

                        event.preventDefault();
                    };
                    $scope.deleteItem = function (id,index) {
                        GadgetCategoryService.delete({id: id}, function (response) {
                            $scope.models.splice(index,1);
                        }, function (response) {
                            alert(response);
                        });
                    }
                }]
            }
        );

        $stateProvider.state('advisers',
            {
                url: '/advisers',
                abstract: true,
                templateUrl: 'partials/advisers/dashboard.html',
                controller: function () {
                },
                resolve: {
                    'active': ['$rootScope', function ($rootScope) {
                        $rootScope.active_nav = 'advisers';
                    }]
                }
            }
        );

        $stateProvider.state('advisers.menu',
            {
                url: '/menu',
                templateUrl: 'partials/advisers/menu.html',
                controller: ['$scope', 'advisers', function ($scope, advisers) {
                    $scope.advisers = advisers;
                }],
                resolve: {
                    'hasHistory': ['$rootScope', function ($rootScope) {
                        $rootScope.hasHistory = false;
                    }],
                    'advisers': ['AdvisersServ', function (AdvisersServ) {
                        return AdvisersServ.query({limit: 6});
                    }]
                }
            }
        );

        $stateProvider.state('advisers.list',
            {
                url: '/list',
                templateUrl: 'partials/advisers/list.html',
                controller: ['$scope', 'advisers', 'AdvisersServ', function ($scope, advisers, AdvisersServ) {
                    $scope.advisers = advisers;

                    $scope.deleteItem = function (id) {
                        AdvisersServ.delete({id: id}, function (response) {
                            location.reload();
                        }, function (response) {
                            alert(response);
                        });
                    }
                }],
                resolve: {
                    'hasHistory': ['$rootScope', function ($rootScope) {
                        $rootScope.hasHistory = true;
                    }],
                    'advisers': ['AdvisersServ', function (AdvisersServ) {
                        return AdvisersServ.query();
                    }]
                }
            }
        );

        $stateProvider.state('advisers.add',
            {
                url: '/add',
                templateUrl: 'partials/advisers/add/add.html',
                controller: ['$scope', 'AdvisersServ', '$state', function ($scope, AdvisersServ, $state) {
                    $scope.createAdviser = function (adviser) {
                        AdvisersServ.save(adviser, function (adviser) {
                            console.log(adviser);
                            $state.go('advisers.list');
                        }, function (error) {
                            alert("Ensure values are all filled correctly");
                        });
                    }
                }],
                resolve: {
                    'hasHistory': ['$rootScope', function ($rootScope) {
                        $rootScope.hasHistory = true;
                    }]
                }
            }
        );
        
        $stateProvider.state('ticket',
            {
                url: '/ticket',
                abstract: true,
                templateUrl: 'partials/ticket/dashboard.html',
                controller: function () {
                },
                resolve: {
                    'active': ['$rootScope', function ($rootScope) {
                        $rootScope.active_nav = 'ticket';
                    }]
                }
            }
        );

        $stateProvider.state('ticket.menu',
            {
                url: '/menu',
                templateUrl: 'partials/ticket/menu.html',
                controller: ['$scope', 'Tickets','ShowSettings', function ($scope, Tickets,ShowSettings) {
                    $scope.showSettings = ShowSettings;
                    $scope.tickets = Tickets.data;
                }],
                resolve: {
                    'hasHistory': ['$rootScope', function ($rootScope) {
                        $rootScope.hasHistory = false;
                    }],
                    'Tickets': ['TicketService', function (TicketService) {
                        return TicketService.get({limit: 6});
                    }],
                    'ShowSettings':['CurrentUser',function(CurrentUser){
                        return CurrentUser.get().role  != 'adviser';
                    }]
                }
            }
        );

        $stateProvider.state('ticket.list',
            {
                url: '/list',
                templateUrl: 'partials/ticket/list.html',
                controller: ['$scope', 'Tickets', 'TicketService', function ($scope, Tickets, TicketService) {
                    $scope.tickets = Tickets;

                    $scope.deleteItem = function (id) {
                        TicketService.delete({id: id}, function (response) {
                            location.reload();
                        }, function (response) {
                            alert(response);
                        });
                    }
                }],
                resolve: {
                    'hasHistory': ['$rootScope', function ($rootScope) {
                        $rootScope.hasHistory = true;
                    }],
                    'Tickets': ['TicketService', function (TicketService) {
                        return TicketService.get({limit: 20});
                    }]
                }
            }
        );

        $stateProvider.state('ticket.import',
            {
                url: '/import',
                templateUrl: 'partials/ticket/import.html',
                controller: ['$scope', 'Tickets', 'TicketService', function ($scope, Tickets, TicketService) {
                    $scope.tickets = Tickets;
                    $scope.upload = {
                        working: false,
                        response: {},
                        complete: false
                    };

                    $scope.uploadedExcelDocument = function(content,isComplete){
                        console.log(content);
                        $scope.upload.working = true;
                        if(isComplete){
                            console.log('is complete');
                            $scope.upload.working = false;
                            $scope.upload.complete = true;
                            $scope.upload.response = JSON.parse(content);
                        }else{
                            $scope.upload.working = true;
                            $scope.upload.complete = false;
                            console.log('is incomplete');
                        }
                    };

                    $scope.deleteItem = function (id) {
                        TicketService.delete({id: id}, function (response) {
                            location.reload();
                        }, function (response) {
                            alert(response);
                        });
                    }
                }],
                resolve: {
                    'hasHistory': ['$rootScope', function ($rootScope) {
                        $rootScope.hasHistory = true;
                    }],
                    'Tickets': ['TicketService', function (TicketService) {
                        return TicketService.query();
                    }]
                }
            }
        );

        $stateProvider.state('ticket.config',
            {
                url: '/config',
                templateUrl: 'partials/ticket/config.html',
                controller: ['$scope', 'TicketConfigServ','GradingSystem','GradingSystemServ','ToastService',
                    function ($scope, TicketConfigServ,GradingSystem,GradingSystemServ,ToastService) {
                    $scope.columns = [];
                    $scope.gradingSystem = GradingSystem;

                    TicketConfigServ.query({},function(result){
                        $scope.columns = result;
                    });

                    $scope.deleteItem = function (column) {
                        TicketConfigServ.delete({id: 0,column_title: column}, function (response) {
                            location.reload();
                        }, function (response) {
                            alert(response);
                        });
                    };

                    $scope.createColumn = function (title) {
                        TicketConfigServ.save({column_title: title}, function (response) {
                            location.reload();
                        }, function (response) {
                            alert(response);
                        });
                    };

                    $scope.updateGrade = function (grade) {
                        grade.status = 'loading';
                        //grade.status = 'failure';
                        var res = GradingSystemServ.update({id: grade.id},grade).$promise;
                        res.then(function(){
                            grade.status = 'success';
                            ToastService.success(grade.presentation + " updated");
                        },function(){
                            grade.status = 'failure';
                            ToastService.error(grade.presentation + " update failed");
                        });
                    };

                }],
                resolve: {
                    'hasHistory': ['$rootScope', function ($rootScope) {
                        $rootScope.hasHistory = true;
                    }],
                    'GradingSystem': ['GradingSystemServ',function(GradingSystemServ){
                        return GradingSystemServ.get({});
                    }]

                }
            }
        );

        $stateProvider.state('ticket.add',
            {
                url: '/add',
                templateUrl: 'partials/ticket/add/base.html',
                controller: 'NewTicketController',
                resolve: {
                    'hasHistory': ['$rootScope', function ($rootScope) {
                        $rootScope.hasHistory = true;
                    }],
                    'GadgetCategories': ['GadgetCategoryService', function (GadgetCategoryService) {
                        return GadgetCategoryService.query({});
                    }],
                    'Vendors': ['VendorService', function (VendorService) {
                        return VendorService.query({});
                    }]
                }
            }
        );

        $stateProvider.state('ticket.add.stepOne',
            {
                url: '/step-one',
                templateUrl: 'partials/ticket/add/step-one.html',
                resolve: {
                    'hasHistory': ['$rootScope', function ($rootScope) {
                        $rootScope.hasHistory = true;
                    }]
                }
            }
        );

        $stateProvider.state('ticket.add.stepTwo',
            {
                url: '/step-two',
                templateUrl: 'partials/ticket/add/step-two.html',
                resolve: {
                    'hasHistory': ['$rootScope', function ($rootScope) {
                        $rootScope.hasHistory = true;
                    }]
                }
            }
        );

        $stateProvider.state('ticket.add.stepThree',
            {
                url: '/step-three',
                templateUrl: 'partials/ticket/add/step-three.html',
                resolve: {
                    'hasHistory': ['$rootScope', function ($rootScope) {
                        $rootScope.hasHistory = true;
                    }]
                }
            }
        );

        $stateProvider.state('ticket.add.stepFour',
            {
                url: '/step-three',
                templateUrl: 'partials/ticket/add/step-four.html',
                resolve: {
                    'hasHistory': ['$rootScope', function ($rootScope) {
                        $rootScope.hasHistory = true;
                    }]
                }
            }
        );

        $stateProvider.state('ticket.add.final',
            {
                url: '/final',
                templateUrl: 'partials/ticket/add/final.html',
                resolve: {
                    'hasHistory': ['$rootScope', function ($rootScope) {
                        $rootScope.hasHistory = true;
                    }]
                }
            }
        );

        $stateProvider.state('ticket.show',
            {
                url: '/show/{id}',
                templateUrl: 'partials/ticket/show.html',
                controller: ['$scope', '$stateParams', 'TicketService', '$state', 'Ticket', 'GadgetCategories', 'Vendors',
                    function ($scope, $stateParams, TicketService, $state, Ticket, GadgetCategories, Vendors) {
                        $scope.ticket = Ticket;
                        $scope.editTicket = JSON.parse(JSON.stringify(Ticket));
                        $scope.vendors = Vendors;
                        $scope.gadget_categories = GadgetCategories;

                        $scope.saveTicket = function (ticket) {
                            angular.forEach($scope.gadget_categories, function (value, key) {
                                if (value.id == ticket.gadget_category_id) {
                                    ticket.gadget_category = value;
                                }
                            });

                            angular.forEach($scope.vendors, function (value, key) {
                                if (value.id == ticket.vendor_id) {
                                    ticket.vendor = value;
                                }
                            });

                            ticket = calculatePremium(ticket);

                            TicketService.update({id: ticket.id}, ticket).$promise.then(function (response) {
                                console.log(response);
                                $scope.ticket = response;
                                $scope.editMode = false;
                            }, function (error) {
                                console.log(error);
                                alert('Failed to Update, try again');
                            });
                        };

                        $scope.deleteItem = function (id) {
                            TicketService.delete({id: id}, function (response) {
                                $state.go('ticket.list');
                            }, function (response) {
                                alert(response);
                            });
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
                    }],
                resolve: {
                    'hasHistory': ['$rootScope', function ($rootScope) {
                        $rootScope.hasHistory = true;
                    }],
                    'Ticket': ['TicketService', '$stateParams', function (TicketService, $stateParams) {
                        return TicketService.get({id: $stateParams.id});
                    }],
                    'GadgetCategories': ['GadgetCategoryService', function (GadgetCategoryService) {
                        return GadgetCategoryService.query({});
                    }],
                    'Vendors': ['VendorService', function (VendorService) {
                        return VendorService.query({});
                    }]
                }
            }
        );

        $stateProvider.state('ticket.search',
            {
                url: '/search?q',
                templateUrl: 'partials/ticket/search.html',
                controller: ['$scope', 'result', '$stateParams', function ($scope, result, $stateParams) {
                    console.log(result);
                    $scope.result = result;
                    $scope.search = $stateParams.q;
                }],
                resolve: {
                    'result': ['$stateParams', 'TicketService', function ($stateParams, TicketService) {
                        return TicketService.query({q: $stateParams.q});
                    }],
                    'hasHistory': ['$rootScope', function ($rootScope) {
                        $rootScope.hasHistory = true;
                    }]
                }
            }
        );

        $stateProvider.state('config',
            {
                url: '/config',
                templateUrl: 'partials/config/form.html',
                controller: function () {
                },
                resolve: {
                    'active': ['$rootScope', function ($rootScope) {
                        $rootScope.active_nav = 'config';
                    }]
                }
            }
        );


        $urlRouterProvider.otherwise('/ticket/menu');
    }]);

app.factory('sessionInjector', ['$location', function ($location) {
    return {
        request: function (config) {
            config.headers['X-Requested-With'] = 'XMLHttpRequest';
            console.log('Header modified');
            return config;
        },
        responseError: function (response) {
            if (response.status == 401) {
                location.href = '/auth/login';
                return response;
            }
            return response;
        },
        response: function (response) {
            if (response.status == 401) {
                location.href = '/auth/login';
                return response;
            }
            return response;
        }
    };
}]);

app.config(['$httpProvider', function ($httpProvider) {
    $httpProvider.interceptors.push('sessionInjector');
}]);

app.run(['$http', '$rootScope', 'CSRF_TOKEN','$timeout',
    function ($http, $rootScope, CSRF_TOKEN,$timeout) {
        $rootScope.CSRF_TOKEN = CSRF_TOKEN;
        $http.defaults.headers.common['csrf_token'] = CSRF_TOKEN;
        $rootScope.toast  = { messages: [],show: false,type: 'info' };
    }]);