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
                    $scope.tickets = Tickets;
                }],
                resolve: {
                    'hasHistory': ['$rootScope', function ($rootScope) {
                        $rootScope.hasHistory = false;
                    }],
                    'Tickets': ['TicketService', function (TicketService) {
                        return TicketService.query({limit: 6});
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
                        return TicketService.query();
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
/**
 * Created by Ak on 2/19/2015.
 */

var app =  angular.module('adminApp.directives',[]);

app.directive('backButton',function(){
    return {
        'restrict': 'EA',
        'template': '<a class="btn base-resize search-btn back-btn" href=""><span class="fa fa-chevron-left"></span></a>',
        'link': function link(scope, element, attrs) {
            element.bind('click',function(e){
                window.history.back();
                e.preventDefault();
            })
        }
    }
});



app.directive('webCamera',function(ScriptCam){
    return {
        'restrict': 'EA',
        'scope': {
            imageSrc: '=',
            imageEncoded: '=',
            showCamera: '='
        },
        'template':
            '<div style="width: 320px;height: 300px;margin-right: auto;margin-left: auto">' +
            '<div>' +
                '<div>' +
                    '<div id="webcamFrame"><div id="webcam"></div></div>' +
                    '<div style="margin-bottom: 10px;text-align: center;">' +
                        '<button class="btn btn-default btn-capture">Capture</button>' +
                        '<button class="btn btn-default goto-cam"><span class="fa fa-chevron-left"></span></button>' +
                        '<button class="btn btn-default goto-img"><span class="fa fa-chevron-right"></span></button>' +
                        '<button class="btn btn-primary save-img"><span class="fa fa-save"></span></button>' +
                    '</div>' +
                '</div>' +
            '</div>' +
            '<div class="preview">' +
            '<img ng-src="{{ imageSrc }}" class="img-responsive preview-img" alt=""/>' +
            '</div>' +
            '<div>' +
            '</div></div>'
        ,
        'link': function link(scope, element, attrs) {
            var webcam = element.find('#webcam');
            var webcamFrame = element.find('#webcamFrame');
            var previewImg = element.find('img.preview-img');
            var gotoCameraBtn = element.find('.btn.goto-cam');
            var gotoImgBtn = element.find('.btn.goto-img');
            var saveImgBtn = element.find('.btn.save-img');
            var captureImgBtn =  element.find('.btn-capture');

            webcam.scriptcam({
                path: ScriptCam.path,
                showMicrophoneErrors:false,
                onError:onError,
                cornerColor:'eee',
                uploadImage:ScriptCam.path+'upload.gif',
                onPictureAsBase:captureImage
            });

            captureImgBtn.on('click',function(){
                captureImage();
            });

            gotoCameraBtn.click(function(){
                scope.showCamera = true;
                scope.$apply();
            });

            gotoImgBtn.click(function(){
                scope.showCamera = false;
                scope.$apply();
            });

            scope.$watch('showCamera',function(newV,oldV){
               if(newV == true){
                   webcamFrame.show();
                   previewImg.hide();

                   captureImgBtn.show();
                   if(!angular.isDefined(scope.imageSrc) && scope.imageSrc != ''){
                       gotoImgBtn.show();
                   }
                   gotoCameraBtn.hide();
                   saveImgBtn.hide();

               }else{
                   webcamFrame.hide();
                   captureImgBtn.hide();

                   previewImg.show();
                   gotoImgBtn.hide();
                   gotoCameraBtn.show();
                   saveImgBtn.show();
               }
            });

            function captureImage(){
                scope.imageSrc = base64_toimage();
                scope.imageEncoded = base64_tofield();
                scope.showCamera = false;
                scope.$apply();
            }

            function base64_tofield() {
                return $.scriptcam.getFrameAsBase64();
            }

            function base64_toimage() {
                return "data:image/png;base64,"+$.scriptcam.getFrameAsBase64();
            }

            function onError(errorId,errorMsg) {
                element.find('btn-capture').attr( "disabled", true );
            }
        }
    }
});

app.directive('fileButton',function(){
    return {
        'restrict': 'EA',
        'scope': {
            'name': '@name',
            'label': '@'
        },
        'template': '<div class="input-group"><div class="input-group-btn"><span class="btn btn-info btn-file">Browse.. <input type="file" name="{{ name }}"/> </span></div><input class="form-control file-select-label" value="{{ label }}" placeholder="Select a file" name="file-name" type="text"/></div>',
        'link': function link(scope, element, attrs) {
            var fileInput = element.find('.btn-file input[type=file]');
            //var fileLabel = element.find('input[type=text].file-select-label');
            element.find('.btn.btn-file').css({
                position: 'relative',
                overflow: 'hidden',
                width: '70px',
                height: '34px'
            });

            fileInput.css({
                top: '0',
                right: '0',
                position: 'absolute',
                'min-width': 'inherit',
                'width': 'inherit',
                'min-height': 'inherit',
                'height': 'inherit',
                'font-size': '100px',
                'text-align': 'right',
                'filter': 'alpha(opacity=0)',
                'opacity': '0',
                'outline': 'none',
                'backgound': 'white',
                'cursor': 'inherit',
                'display': 'block'
            });

            fileInput.on('change',function(){
                console.log("file input change event");
                var input = $(this),numFiles = input.get(0).files ? input.get(0).files.length : 1;
                scope.label = input.val().replace(/\\/g,'/').replace(/.*\//,'');
                console.log(scope.label);
                scope.$apply();
            });
        }
    }
});


app.directive('toast',function($animate,$timeout){
    return {
        'restrict': 'EA',
        'template': '<div class="toast alert alert-{{ type }} text-center" ><ul><li ng-repeat="message in messages"> {{ message }}</li></ul></div>',
        scope: {
            type: '=type',
            messages: '=messages',
            show: '=show'
        },
        'link': function link(scope, element, attrs) {
            function showToast() {
                //$animate.addClass(element,'toast-alert');
                element.css({opacity: 1});
                $timeout(hideToast,10000);
            }

            function hideToast() {
                element.css({opacity: 0});
                //$animate.removeClass(element,'toast-alert');
            }
            showToast();
            scope.$watch(function() { return scope.show; },function(newV,oldV){
                if(newV == true){
                    showToast();
                }else{
                    hideToast();
                }
            })
        }
    }
});



app.directive('formItemUpdate',function($timeout){
    return {
        'restrict': 'A',
        'scope': {
            'status': '='
        },
        'link': function link(scope, element, attrs) {
            function showLoadingTick() {
                //element.remove('.loader-item');
                element.find('.input-form-item')
                    .html('<span class="loader-item" style="margin-left: 20px"><span class="fa fa-spin fa-spinner"></span></span>');

                $timeout(clear,3000);
            }

            function showErrorTick() {
                //element.remove('.loader-item');
                element.find('.input-form-item')
                    .html('<span class="loader-item" style="margin-left: 20px;color: red;"><span class="fa fa-close"></span></span>');

                $timeout(clear,3000);
            }

            function showGreenTick() {
               // element.remove('.loader-item');
                element.find('.input-form-item')
                    .html('<span class="loader-item" style="margin-left: 20px;color: green;"><span class="fa fa-check"></span></span>')
            }

            function clear(){
                element.find('.input-form-item')
                    .html('');
            }

            scope.$watch('status',function(newV,oldV){
                if(newV == 'success'){
                    showGreenTick();
                }else if(newV == 'failure'){
                    showErrorTick();
                }else if(newV == 'loading'){
                    showLoadingTick();
                }else{
                    clear();
                }
            })
        }
    }
});
/**
 * Created by Ak on 2/19/2015.
 */



/**
 * Created by Ak on 2/19/2015.
 */

var app =  angular.module('adminApp.services',[]);

app.factory('TicketService', ['$resource', 'URLServ', function ($resource, URLServ) {
    return $resource('/resources/ticket/:id', {id: '@id'}, {
        'update': {method: 'PUT'}
    });//URLServ.getResourceUrlFor("ticket"));
}]);

app.factory('VendorService', ['$resource', 'URLServ', function ($resource, URLServ) {
    return $resource('/resources/vendor/:id', {id: '@id'}, {
        'update': {method: 'PUT'}
    });//URLServ.getResourceUrlFor("ticket"));
}]);

app.factory('AdvisersServ', ['$resource', 'URLServ', function ($resource, URLServ) {
    return $resource('/resources/advisers/:id', {id: '@id'}, {
        'update': {method: 'PUT'}
    });//URLServ.getResourceUrlFor("ticket"));
}]);

app.factory('GadgetCategoryService', ['$resource', 'URLServ', function ($resource, URLServ) {
    return $resource('/resources/gadget-category/:id', {id: '@id'}, {
        'update': {method: 'PUT'}
    });//URLServ.getResourceUrlFor("ticket"));
}]);


app.factory('MailServ', ['$resource', function ($resource) {
    return $resource('/resources/mail', null);//URLServ.getResourceUrlFor("ticket"));
}]);


app.factory('URLServ', ['$rootScope', function ($rootScope) {
    return {
        "getResourceUrlFor": function(name){
            return $rootScope.data.resources[name];
        }
    }
}]);

app.factory('GadgetEvaluationReward', ['NetworksServ', '$cookieStore', function (NetworksServ, $cookieStore) {
    var reward = {result: ''};

    function getBaseLinePrice(device, size) {
        var baseLinePrice = 0;

        console.log('Device --reward');
        console.log(device);
        console.log(size);

        if(device.base_line_prices.length == 1 ){
            baseLinePrice = parseInt(device.base_line_prices[0].value);
        }else {

            angular.forEach(device.base_line_prices, function (v, k) {
                if (v.size == size) {
                    baseLinePrice = parseInt(v.value);
                }
            });
        }

        return baseLinePrice;
    }

    function calculatePriceFromGrade(device, grade, baseLinePrice) {
        console.log(baseLinePrice);
        console.log(device.brand.normal_condition);
        console.log(device.brand);
        console.log(grade);

        switch (grade) {
            case 'A':
                return parseFloat(parseInt(device.brand.normal_condition) / 100.0) * baseLinePrice;
            case 'B':
                return parseFloat(parseInt(device.brand.scratched_condition) / 100.0) * baseLinePrice;
            case 'C':
                return parseFloat(parseInt(device.brand.bad_condition) / 100.0) * baseLinePrice;
        }
    }

    return {
        "calculate": function (model) {
            reward.result = calculatePriceFromGrade(model, model.grade, getBaseLinePrice(model.device, model.size));
            console.log(reward.result);
            $cookieStore.put('last-reward', reward.result);
            return reward.result;
        },
        "getLastReward": function () {
            return $cookieStore.get('last-reward');
        },
        fetchAirtelBonus: function () {
            var network = NetworksServ.get({q: 'airtel'});
            return network;
        }
    }
}]);

app.factory('GradeDeviceServ', ['$rootScope', function ($rootScope) {

    var threshold = {
        'A': 8.1,
        'B': 5.85
    };

    function generateGradePoint(device) {
        var result = {gradePoint: 0};

        angular.forEach(device, function (value, key) {
            if (angular.isDefined(value.rating) && value.rating != '') {
                console.log(value.rating+" -- "+value.weight);
                this.gradePoint += parseInt(value.rating) * value.weight;
                console.log(this.gradePoint);
            }
        }, result);

        return result.gradePoint;
    }

    function generateGradeLetter(gradePoint) {
        var value = parseFloat(gradePoint);

        if (value >= threshold.A) {
            return 'A';
        } else if (value >= threshold.B) {
            return 'B';
        } else {
            return 'C';
        }
    }

    return {
        "getGrade": function (device) {
            var gradePoint = generateGradePoint(device);
            return generateGradeLetter(gradePoint);
        }
    }
}]);

app.factory('PreloadTemplates', ['$templateCache', '$http','PRELOAD_UI_LIST', function ($templateCache, $http,PRELOAD_UI_LIST) {
    var templates = PRELOAD_UI_LIST.get();
    return {
        run: function () {
            templates.forEach(function (currentItem) {
                $http.get(currentItem, {cache: $templateCache});
            });
        }
    }
}]);

app.factory('ToastService', ['$rootScope', function ($rootScope) {

    if(angular.isUndefined( $rootScope.toast)){
        $rootScope.toast  = {messages: [],show: false,type: 'info'};
    }

    return {
        error: function (message) {
            $rootScope.toast  = {messages: [message],show: true,type: 'danger'};
        },
        info: function(message){
            $rootScope.toast= {messages: [message],show: true,type: 'info'};
        },
        success: function(message){
            $rootScope.toast= {messages: [message],show: true,type: 'success'};
        }
    }
}]);
//# sourceMappingURL=admin_main.js.map