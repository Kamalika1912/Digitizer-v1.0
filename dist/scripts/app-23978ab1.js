!function(){"use strict";function e(e){e.state("app.projects",{url:"/projects/:interval",templateUrl:"app/modules/project/list/projects.html",resolve:{projects:["$stateParams","projectsUtils","projectResource",function(e,t,s){return s.query().$promise.then(function(s){return e.interval?t.projectsDuringInterval(s,e.interval):s})}]},controller:"ProjectListController as vm"}).state("app.editProject",{url:"/projects/edit/:id",templateUrl:"app/modules/project/edit/edit.html",resolve:{data:["$stateParams","projectResource",function(e,t){return e.id?t.get({id:e.id}).$promise:{}}]},controller:"ProjectController",controllerAs:"vm"})}var t=angular.module("app.project",["ui.router","ngResource","app.data","app.common"]);t.config(e),e.$inject=["$stateProvider"]}(),function(){"use strict";function e(e,t){var s=this;s.projects=e,s.delete=t.getDeleteMethod(s.projects)}angular.module("app.project").controller("ProjectListController",e),e.$inject=["projects","deleteProjectModal"]}(),function(){"use strict";function e(e){e.state("login",{url:"/login",data:{noAuth:!0},templateUrl:"app/modules/profile/auth/login.html",controller:"LoginController",controllerAs:"vm"}).state("app.profile",{url:"/profile",templateUrl:"app/modules/profile/edit/edit.html",controller:"ProfileController",controllerAs:"vm"})}var t=angular.module("app.profile",["ui.router"]);t.config(e),e.$inject=["$stateProvider"]}(),function(){"use strict";function e(e,t,s,a,r){var i=this;i.project=e,i.showReturnBtn=i.project.id&&a.from.state.name,i.update=function(){i.project.date=(new Date).toISOString(),t.update(i.project,function(){r.success("Project was successfully updated")})},i.return=function(){s.go(a.from.state.name,a.from.params)},i.save=function(){i.project.date=(new Date).toISOString(),t.save(this.project,function(){a.goTo("from"),r.success("Project was successfully saved")})}}angular.module("app.profile").controller("ProjectController",e),e.$inject=["data","projectResource","$state","shortHistory","notificator"]}(),function(){"use strict";function e(e,t,s){var a=this;a.user=$.extend(!0,{},t.getCurrentUser()),a.responseErrorMsg="",a.update=function(){e.put("/api/profile",a.user).success(function(e){t.setCurrentUser(e),s.success("Profile changes saved")}).error(function(e){a.responseErrorMsg=e.message})},a.cancel=function(){a.responseErrorMsg="",a.user=$.extend(!0,{},t.getCurrentUser())}}angular.module("app.profile").controller("ProfileController",e),e.$inject=["$http","session","notificator"]}(),function(){"use strict";function e(e){var t=this;t.user={},t.responseErrorMsg="",this.login=function(){e.login(t.user).then(null,function(e){t.responseErrorMsg=e.data.message})}}function t(e,t,s){e.logout=s.logout,e.$on("$userLoggedIn",function(){t.go("app.dashboard")}),e.$on("$userLoggedOut",function(){t.go("login")})}angular.module("app.profile").controller("LoginController",e).run(t),e.$inject=["authenticationService"],t.$inject=["$rootScope","$state","authenticationService"]}(),function(){"use strict";function e(e){e.state("app.digitalServices",{url:"/digitalservices/:interval",templateUrl:"app/modules/digitalservice/list/digitalservices.html",resolve:{digitalServices:["$stateParams","digitalServiceUtils","digitalServiceResource",function(e,t,s){return s.query().$promise.then(function(s){return e.interval?t.digitalServicesDuringInterval(s,e.interval):s})}]},controller:"DigitalServiceListController as vm"}).state("app.editDigitalService",{url:"/digitalservices/edit/:id",templateUrl:"app/modules/digitalservice/edit/edit.html",resolve:{data:["$stateParams","digitalServiceResource",function(e,t){return e.id?t.get({id:e.id}).$promise:{}}]},controller:"DigitalServiceController",controllerAs:"vm"})}var t=angular.module("app.digitalService",["ui.router","ngResource","app.data","app.common"]);t.config(e),e.$inject=["$stateProvider"]}(),function(){"use strict";function e(e,t){var s=this;s.digitalServices=e,s.delete=t.getDeleteMethod(s.digitalServices)}angular.module("app.digitalService").controller("DigitalServiceListController",e),e.$inject=["digitalServices","deleteDigitalServiceModal"]}(),function(){"use strict";function e(e,t,s,a,r){var i=this;i.digitalService=e,i.showReturnBtn=i.digitalService.id&&a.from.state.name,i.update=function(){i.digitalService.date=(new Date).toISOString(),t.update(i.digitalService,function(){r.success("Digital Service was successfully updated")})},i.return=function(){s.go(a.from.state.name,a.from.params)},i.save=function(){i.digitalService.date=(new Date).toISOString(),t.save(this.digitalService,function(){a.goTo("from"),r.success("Digital Service was successfully saved")})}}angular.module("app.profile").controller("DigitalServiceController",e),e.$inject=["data","digitalServiceResource","$state","shortHistory","notificator"]}(),function(){"use strict";function e(e){e.state("app.dashboard",{url:"/dashboard",templateUrl:"app/modules/dashboard/dashboard.html",resolve:{projects:["projectResource",function(e){return e.query().$promise}]},controller:"dashboardController",controllerAs:"vm"})}var t=angular.module("app.dashboard",["ui.router","ngResource","app.data"]);t.config(e),e.$inject=["$stateProvider"]}(),function(){"use strict";function e(){return{restrict:"EA",transclude:!0,replace:!0,scope:{widgetClass:"@",iconClass:"@",iconText:"@"},templateUrl:"app/modules/dashboard/widget-stat/widget_stat.html"}}angular.module("app.dashboard").directive("widgetStat",e)}(),function(){"use strict";function e(e,t){e.state("app",{url:"/app","abstract":!0,templateUrl:"app/modules/core/app.html"}),t.otherwise(function(e){var t=e.get("$state");t.go("app.dashboard")})}var t=angular.module("app.core",["ngResource","ui.router","ngAnimate","toastr"]);t.config(e),e.$inject=["$stateProvider","$urlRouterProvider"]}(),function(){"use strict";function e(e){function t(e){$("body").toggleClass("nav-shown",e)}var s={click:function(e){e.on("click",function(e){t(),e.preventDefault()})},swipe:function(s){function a(){try{return e[0].createEvent("TouchEvent"),!0}catch(t){return!1}}a()&&s.swipe({swipeLeft:function(){t(!1)},swipeRight:function(){t(!0)}})}};return{restrict:"A",scope:{type:"@"},link:function(e,t){s[e.type](t,e)}}}e.$inject=["$document"],angular.module("app.core").directive("navCollapseToggler",e)}(),function(){"use strict";angular.module("app.common",["ui.bootstrap","ui.router"])}(),function(){"use strict";function e(){function e(e,t){t.addClass("widget")}return{link:e,restrict:"EA"}}angular.module("app.common").directive("widget",e)}(),function(){"use strict";function e(e){var s={backdrop:!0,keyboard:!0,modalFade:!0,templateUrl:"app/modules/common/modal/modal.html"},a={closeButtonText:"Close",actionButtonText:"OK",headerText:"Proceed?",bodyText:"Perform this action?"};this.show=function(r,i){var o={},l={};return angular.extend(o,s,r),angular.extend(l,a,i),o.controller||(o.controller=t(o,l)),e.open(o).result}}function t(e,t){function s(e,s){e.modalOptions=t,e.modalOptions.ok=function(e){s.close(e)},e.modalOptions.close=e.modalOptions.close||function(){s.dismiss("cancel")}}return s.$inject=["$scope","$modalInstance"],s}angular.module("app.common").service("commonModal",e),e.$inject=["$modal"]}(),function(){"use strict";function e(e,t,s){var a=this;this.modalOptions={closeButtonText:"Cancel",actionButtonText:"Delete",headerText:"Confirm project deletion",bodyText:"The project will be deleted permanently, do you want to continue?"},this.modalDefaults={windowClass:"small-modal"},this.getDeleteMethod=function(r){return function(i){t.show(a.modalDefaults,a.modalOptions).then(function(){e.delete(i,function(){var e=r.indexOf(i);r.splice(e,1),s.success("Project was successfully deleted")})})}}}var t=angular.module("app.project");t.service("deleteProjectModal",e),e.$inject=["projectResource","commonModal","notificator"]}(),function(){"use strict";function e(e,t,s){var a=this;this.modalOptions={closeButtonText:"Cancel",actionButtonText:"Delete",headerText:"Confirm project deletion",bodyText:"The digital service will be deleted permanently, do you want to continue?"},this.modalDefaults={windowClass:"small-modal"},this.getDeleteMethod=function(r){return function(i){t.show(a.modalDefaults,a.modalOptions).then(function(){e.delete(i,function(){var e=r.indexOf(i);r.splice(e,1),s.success("The digital service was successfully deleted")})})}}}var t=angular.module("app.digitalService");t.service("deleteDigitalServiceModal",e),e.$inject=["digitalServiceResource","commonModal","notificator"]}(),function(){"use strict";angular.module("app.data",["ngResource"])}(),function(){"use strict";function e(e){return e("/api/projects/:id",{id:"@id"},{update:{method:"PUT"}})}function t(){function e(e,t){var s=new Date,a=864e5*t,r=[];return e.forEach(function(e){var t=new Date(e.date);a>s-t&&r.push(e)}),r}function t(e,t){return e.sort(function(e,t){return e.date<t.date?1:e.date==t.date?0:-1}),e.slice(0,t||1)}function s(e){var t=e[0];return e.forEach(function(e){t=t.date<e.date?t:e}),t}return{projectsDuringInterval:e,lastEdited:s,recent:t}}angular.module("app.data").factory("projectResource",e).factory("projectsUtils",t),e.$inject=["$resource"],t.$inject=["projectResource"]}(),function(){"use strict";function e(e){return e("/api/digitalservices/:id",{id:"@id"},{update:{method:"PUT"}})}function t(){function e(t,s){var a=new Date,r=864e5*s,i=[];return t.forEach(function(t){var s=new Date(t.date);r>a-s&&e.push(t)}),i}function t(e,t){return e.sort(function(e,t){return e.date<t.date?1:e.date==t.date?0:-1}),e.slice(0,t||1)}function s(e){var t=e[0];return e.forEach(function(e){t=t.date<e.date?t:e}),t}return{digitalServicesDuringInterval:e,lastEdited:s,recent:t}}angular.module("app.data").factory("digitalServiceResource",e).factory("digitalServiceUtils",t),e.$inject=["$resource"],t.$inject=["digitalServiceResource"]}(),function(){"use strict";function e(e,t,s,a){e.projects=s,e.projectsLastMonth=a.projectsDuringInterval(s,30),e.lastEditedproject=a.lastEdited(s),e.projectsRecently=a.recent(s,5),e.alerts=[{type:"warning",msg:t.trustAsHtml('<span class="fw-semi-bold">Warning:</span> Best check yo self, you\'re not looking too good.')},{type:"success",msg:t.trustAsHtml('<span class="fw-semi-bold">Success:</span> You successfully read this important alert message.')},{type:"info",msg:t.trustAsHtml('<span class="fw-semi-bold">Info:</span> This alert needs your attention, but it\'s not super important.')},{type:"danger",msg:t.trustAsHtml('<span class="fw-semi-bold">Danger:</span> Change this and that and try again.<a class="btn btn-default btn-xs pull-right mr" href="#">Ignore</a><a class="btn btn-danger btn-xs pull-right mr-xs" href="#">Take this action</a>')}],e.addAlert=function(){e.alerts.push({type:"warning",msg:t.trustAsHtml("Another alert!")})},e.closeAlert=function(t){e.alerts.splice(t,1)}}angular.module("app.dashboard").controller("dashboardController",e),e.$inject=["$scope","$sce","projects","projectsUtils"]}(),function(){"use strict";function e(e,t,s,a,r,i){var o=this;o.title=e.appTitle,t.app=e,t.$state=s,a.$on("$stateChangeStart",function(e,t,s){i.checkAccess(e,t,s)}),t.$on("$stateChangeSuccess",function(){$("body").toggleClass("nav-shown",!1)}),a.$on("$userSet",function(e,t){o.currentUser=t}),r.init(t)}angular.module("app.core").controller("App",e),e.$inject=["config","$scope","$state","$rootScope","shortHistory","authorize","session"]}(),function(){"use strict";var e=angular.module("app.core"),t={name:"Digitizer ",appTitle:"Digitizer",version:"1.1.1"};e.value("config",t)}(),function(){"use strict";function e(e){return{success:function(t,s){e.success(t,s)},warning:function(t,s){e.warning(t,s)},error:function(t,s){e.error(t,s)},info:function(t,s){e.info(t,s)}}}function t(e,t,s){e.$on("$userLoggedIn",function(){t.success("Hey there!"),s(function(){t.info("Welcome to Digitizer! A platform for Business Procedure Modelling and Digitization ",{timeOut:1e4})},3e3),s(function(){t.info("Use the Dashboard to draw your business idea, or navigate to the projects or services views;)",{timeOut:1e4})},15e3)}),e.$on("$userLoggedOut",function(){t.success("Logged out successfully")})}function s(e){angular.extend(e,{timeOut:3e3})}angular.module("app.common").config(s).factory("notificator",e).run(t),e.$inject=["toastr"],t.$inject=["$rootScope","notificator","$timeout"],s.$inject=["toastrConfig"]}(),function(){"use strict";function e(e){function t(e,t,a){s[e]={state:t,params:a}}var s=this;this.init=function(e){e.$on("$stateChangeSuccess",function(e,s,a,r,i){t("from",r,i),t("to",s,a)})},this.goTo=function(t){e.go(s[t].state.name,s[t].params)}}function t(e,t,s){var a=this;this.fetchCurrentUser=function(s){var r;return r=a.getCurrentUser()?t(function(e){e(a.getCurrentUser())}):e.get(s)},this.getCurrentUser=function(){return this.user},this.setCurrentUser=function(e){this.user=e,s.$broadcast("$userSet",this.user)}}function s(e,t){this.checkAccess=function(s,a,r){e.getCurrentUser()||a.data&&a.data.noAuth||(s.preventDefault(),e.fetchCurrentUser("/api/profile").success(function(s){e.setCurrentUser(s),t.go(a.name,r)}).error(function(){t.go("login")}))}}function a(e,t,s){this.login=function(a){return e.post("/api/login",a).success(function(e){s.setCurrentUser(e),t.$broadcast("$userLoggedIn")})},this.logout=function(){return e.get("/api/logout").success(function(){s.setCurrentUser(null),t.$broadcast("$userLoggedOut")})}}angular.module("app.common").service("shortHistory",e).service("session",t).service("authorize",s).service("authenticationService",a),e.$inject=["$state"],t.$inject=["$http","$q","$rootScope"],s.$inject=["session","$state","$urlRouter","$rootScope"],a.$inject=["$http","$rootScope","session"]}(),function(){"use strict";angular.module("app",["app.core","app.profile","app.project","app.digitalService","app.dashboard","app.data","app.common"])}(),angular.module("app").run(["$templateCache",function(e){e.put("app/modules/core/app.html",'<nav id="sidebar" class="sidebar" role="navigation" data-ng-include="\'app/modules/core/navigation/sidebar.html\'"></nav><div class="content-wrap" nav-collapse-toggler="" type="swipe"><main role="main"><nav class="page-controls navbar navbar-default" data-ng-include="\'app/modules/core/navigation/navbar.html\'"></nav><div id="content" class="content view-animate fade-up" data-ui-view=""></div></main></div>'),e.put("app/modules/dashboard/dashboard.html",'<ol class="breadcrumb"><li><span class="text-muted">You are here</span></li><li class="active">Dashboard</li></ol><div class="row"><div class="col-md-3 col-sm-6"><widget-stat widget-class="bg-sidebar" ui-sref="app.projects" icon-text="{{projects.length}}" icon-class="text-success">Projects</widget-stat></div><div class="col-md-3 col-sm-6"><widget-stat widget-class="bg-transparent" ui-sref="app.editProject" icon-class="fa fa-plus-square fa-lg">New project</widget-stat></div><div class="col-md-3 col-sm-6"><widget-stat widget-class="bg-transparent" ui-sref="app.editProject({id: lastEditedProject.id})" icon-class="fa fa-clock-o fa-lg">Last edited</widget-stat></div><div class="col-md-3 col-sm-6"><widget-stat widget-class="bg-sidebar" ui-sref="app.projects" icon-text="{{projectsLastMonth.length}}" icon-class="text-warning">projects last month</widget-stat></div></div><div class="row"><div class="col-md-6"><div ng-include="\'app/modules/dashboard/widget-tables/dash_projects.html\'"></div></div><div class="col-md-6"><div ng-include="\'app/modules/dashboard/widget-tables/dash_services.html\'"></div></div></div>'),e.put("app/modules/common/modal/modal.html",'<div class="modal-header"><h3>{{modalOptions.headerText}}</h3></div><div class="modal-body"><p>{{modalOptions.bodyText}}</p></div><div class="modal-footer"><button type="button" class="btn" data-ng-click="modalOptions.close()">{{modalOptions.closeButtonText}}</button> <button class="btn btn-primary" data-ng-click="modalOptions.ok();">{{modalOptions.actionButtonText}}</button></div>'),e.put("app/modules/core/navigation/navbar.html",'<div class="container-fluid"><div class="navbar-header"><ul class="nav navbar-nav"><li><a class="visible-xs navbar-toggle toggle-navigation-collapse" nav-collapse-toggler="" type="click" href="#" title="Show/hide sidebar" data-placement="bottom" data-tooltip=""><span class="icon-bar"></span> <span class="icon-bar"></span> <span class="icon-bar"></span></a></li></ul><a class="navbar-brand visible-xs">{{app.name}}</a></div><div class="collapse navbar-collapse"><ul class="nav navbar-nav navbar-right"><li class="dropdown" dropdown=""><a href="#" dropdown-toggle=""><i class="fa fa-user"></i> {{vm.currentUser.firstName}} <span class="fw-semi-bold">{{vm.currentUser.lastName}}</span> <span class="badge bg-warning ml-xs">3</span></a><div class="dropdown-menu animated fadeInUp" data-sn-notifications-menu=""><section class="panel notifications"><header class="panel-heading"><h6 class="text-center mt-xs mb-xs"><strong>You have no notifications</strong></h6></header><div id="notifications-list" class="list-group thin-scroll"><a class="list-group-item" ui-sref="app.digitalServices"><span class="thumb-sm pull-left mr"><span class="rounded bg-primary rounded-lg"><i class="fa fa-cloud text-white"></i></span></span><p class="text-ellipsis no-margin">New <strong>24</strong> services added.</p><time class="help-block no-margin">15 Apr 2016</time></a><div class="list-group-item"><span class="thumb-sm pull-left mr"><i class="fa fa-check-square-o fa-lg"></i></span><p class="no-margin overflow-hidden">User <a href="#">Jeff</a> wants to use your service &nbsp;&nbsp; <button class="btn btn-xs btn-success">Allow</button> <button class="btn btn-xs btn-danger">Deny</button><time class="help-block no-margin">12:18 AM</time></p></div><div class="list-group-item"><span class="thumb-sm pull-left mr"><i class="fa fa-shield fa-lg"></i></span><p class="no-margin overflow-hidden">Instructions for changing your Account password. Please check your account <a ui-sref="app.profile">profile page</a>.<time class="help-block no-margin">12:18 AM</time></p></div></div><footer class="panel-footer text-sm"><button class="btn btn-xs btn-link pull-right"><i class="fa fa-refresh"></i></button> <small>Synced at: 08 June 2016 18:36</small></footer></section></div></li><li class=""></li><li><a href="" ng-click="logout()">Logout</a></li></ul></div></div>'),e.put("app/modules/core/navigation/sidebar.html",'<header class="logo"><a>Digitizer <sup class="text-info fw-semi-bold">beta</sup></a></header><ul class="sidebar-nav"><li><a ui-sref="app.dashboard" ui-sref-active="active"><i class="fa fa-tachometer"></i> Dashboard</a></li><li><a data-target="#sidebar-project" data-toggle="collapse" data-parent="#sidebar" ng-class="$state.includes(\'app.projects\') || $state.includes(\'app.editProject\') ? \'active\' : \'\'"><i class="fa fa-list"></i> Projects <b class="caret"></b></a><ul id="sidebar-project" class="collapse in"><li><a ui-sref="app.projects" ui-sref-active="active">Show all</a></li><li><a ui-sref="app.editProject" ui-sref-active="active">{{$state.includes(\'app.editProject\') && $state.params.id ? \'Project editing\' : \'Create new\'}}</a></li></ul></li><li><a data-target="#sidebar-service" data-toggle="collapse" data-parent="#sidebar" ng-class="$state.includes(\'app.digitalServices\') || $state.includes(\'app.editDigitalService\') ? \'active\' : \'\'"><i class="fa fa-cloud"></i> Services <b class="caret"></b></a><ul id="sidebar-service" class="collapse in"><li><a ui-sref="app.digitalServices" ui-sref-active="active">Show all</a></li><li><a ui-sref="app.editDigitalService" ui-sref-active="active">{{$state.includes(\'app.editDigitalService\') && $state.params.id ? \'Editing Digital Service\' : \'Create new\'}}</a></li></ul></li><li><a ui-sref="app.profile" ui-sref-active="active"><i class="fa fa-user"></i> Profile</a></li><li class="hidden-md hidden-lg"><a href="#" ng-click="logout()">Logout</a></li></ul><footer class="sidebar-footer"><p class="small text-gray-lighter opacity-60 ml-xs mr-xs mb-xs">80% ready</p><div class="progress progress-xs mb-sm"><div class="progress-bar progress-bar-success" style="width: 80%"></div></div></footer>'),e.put("app/modules/dashboard/widget-stat/widget_stat.html",'<div class="widget bg-transparent text-center"><p><span class="circle {{widgetClass}}" style="font-size: 36px"><span class="{{iconClass}} fw-bold">{{iconText}}</span></span></p><div ng-transclude=""></div></div>'),e.put("app/modules/dashboard/widget-tables/dash_projects.html",'<div class="panel panel-default"><div class="panel-heading"><div class="pull-right mt-n-xs"><input ng-model="searchProject" class="form-control input-sm" type="search" placeholder="Search..."></div><h5 class="widget-title"><i class="fa fa-list">&emsp;</i>Recent <span class="fw-semi-bold">Projects</span></h5></div><widget><table class="table table-hover mb-0"><thead><tr><th>Date</th><th>Name</th></tr></thead><tbody><tr ng-repeat="project in projectsRecently | filter:searchProject"><td>{{project.date | date:\' MMM dd, hh:mm\'}}</td><td><a ui-sref="app.editProject({id: project.id})">{{project.title}}</a></td></tr></tbody></table></widget></div>'),e.put("app/modules/dashboard/widget-tables/dash_services.html",'<div class="panel panel-default"><div class="panel-heading"><div class="pull-right mt-n-xs"><input class="form-control input-sm" type="search" placeholder="Search..."></div><h5 class="widget-title"><i class="fa fa-cloud">&emsp;</i> Recently Added Services</h5></div><table class="table table-hover mb-0"><thead><tr><th>ID</th><th>Name</th><th>Provider</th><th>Tags</th></tr></thead><tbody><tr><td>1</td><td>Payment</td><td>PayPal</td><td><span class="label bg-gray-light">payment</span> <span class="label bg-gray-light">pay</span> <span class="label bg-gray-light">transactions</span></td></tr><tr><td>2</td><td>Tracking</td><td>deCarta</td><td><span class="label bg-gray-light">track</span> <span class="label bg-gray-light">GPS</span> <span class="label bg-gray-light">navigation</span></td></tr><tr><td>3</td><td>Wireless</td><td>Deutsche Telekom</td><td><span class="label bg-gray-light">message</span> <span class="label bg-gray-light">broadcast</span> <span class="label bg-gray-light">order</span> <span class="label bg-gray-light">call</span></td></tr></tbody></table></div>'),e.put("app/modules/digitalservice/edit/edit.html",'<ol class="breadcrumb"><li><span class="text-muted">YOU ARE HERE</span></li><li class="active">{{vm.digitalService.id ? \'Edit digitalService\' : \'Create new\'}}</li></ol><div class="row"><div class="col-md-12"><widget><h4 class="mt-0">{{vm.digitalService.id ? \'Edit digitalService\' : \'Create new\'}} Digital Service</h4><form novalidate="" role="form" name="digitalServiceForm" class="form-horizontal mt" ng-submit="digitalServiceForm.$valid && (vm.digitalService.id ? vm.update() : vm.save())"><div class="form-group"><label class="col-sm-2 control-label" for="title">Title</label><div class="col-sm-10"><input type="text" id="title" name="title" class="form-control" ng-model="vm.digitalService.title" required="" ng-minlength="3" ng-maxlength="100"><div ng-show="digitalServiceForm.title.$invalid && (digitalServiceForm.title.$dirty || digitalServiceForm.$submitted)"><small class="error" ng-show="digitalServiceForm.title.$error.required">Title is required.</small> <small class="error" ng-show="digitalServiceForm.title.$error.minlength">Title is required to be at least 3 characters</small> <small class="error" ng-show="digitalServiceForm.title.$error.maxlength">Title cannot be longer than 100 characters</small></div></div></div><div class="form-group"><label class="control-label col-sm-2" for="description">Description</label><div class="col-sm-10"><textarea name="description" class="form-control" rows="5" ng-model="vm.digitalService.description" required="" ng-minlength="3">\n                        <div ng-show="digitalServiceForm.description.$invalid && (digitalServiceForm.description.$dirty || digitalServiceForm.$submitted)">\n                            <small class="error" ng-show="digitalServiceForm.description.$error.required">\n                                Description is required.\n                            </small>\n                            <small class="error" ng-show="digitalServiceForm.description.$error.minlength">\n                                Description is required to be at least 5 characters\n                            </small>\n                        </div>\n                    </textarea></div></div><div class="text-right"><span ng-if="vm.showReturnBtn"><button type="button" class="btn" ng-click="vm.return()">Return</button></span> <button type="submit" class="btn btn-primary">Save</button></div></form></widget></div></div>'),e.put("app/modules/digitalservice/list/digitalservices.html",'<ol class="breadcrumb"><li><span class="text-muted">YOU ARE HERE</span></li><li class="active">Digital Services</li></ol><div class="row"><div class="col-md-12"><widget><header><button type="button" class="btn btn-sm btn-gray mt-n-xs pull-right" ui-sref="app.editDigitalService({id: null})">Create new Digital Service</button><h4 class="widget-title">Digital Services</h4></header><table class="table table-striped"><thead><tr><th>Title</th><th>Last updated</th></tr></thead><tbody><tr ng-repeat="digitalService in vm.digitalServices"><td>{{digitalService.title}}</td><td><span>{{digitalService.date | date: \'short\'}}</span></td><td class="text-right"><button type="button" class="btn btn-default" ui-sref="app.editDigitalService({id: digitalservice.id})">Edit</button> <button type="button" class="btn btn-danger" ng-click="vm.delete(digitalService)">Delete</button></td></tr></tbody></table></widget></div></div>'),e.put("app/modules/profile/auth/login.html",'<div class="container"><main id="content" class="widget-login-container" role="main"><div class="row"><div class="col-lg-4 col-sm-6 col-xs-10 col-lg-offset-4 col-sm-offset-3 col-xs-offset-1"><h5 class="text-center text-muted">Digitizer <sup class="fw-semi-bold text-info">beta</sup></h5><widget class="widget-login"><header><h3 class="mt-0">Login to Digitizer</h3></header><div class="widget-body"><p class="fs-mini text-muted">Use your username and password to sign in<br>Don\'t have an account? Sign up now!</p><form role="form" novalidate="" name="loginForm" class="login-form mt-lg" ng-submit="loginForm.$valid && vm.login()"><div class="alert alert-danger" role="alert" ng-show="vm.responseErrorMsg">{{vm.responseErrorMsg}}</div><div class="form-group"><div class="input-group margin-bottom-sm"><span class="input-group-addon"><i class="fa fa-user fa-fw"></i></span> <input type="text" class="form-control" required="" ng-minlength="3" ng-maxlength="20" ng-model="vm.user.username" name="username" placeholder="Username"></div><div ng-show="loginForm.username.$invalid && (loginForm.username.$dirty || loginForm.$submitted)"><small class="error" ng-show="loginForm.username.$error.required">Username is required.</small> <small class="error" ng-show="loginForm.username.$error.minlength">Username is required to be at least 3 characters</small> <small class="error" ng-show="loginForm.username.$error.maxlength">Username cannot be longer than 20 characters</small></div></div><div class="form-group"><div class="input-group margin-bottom-sm"><span class="input-group-addon"><i class="fa fa-lock fa-fw"></i></span> <input class="form-control" required="" ng-minlength="3" ng-maxlength="20" ng-model="vm.user.password" name="password" type="password" placeholder="Password"></div><div ng-show="loginForm.password.$invalid && (loginForm.password.$dirty || loginForm.$submitted)"><small class="error" ng-show="loginForm.password.$error.required">Password is required.</small> <small class="error" ng-show="loginForm.password.$error.minlength">Password is required to be at least 3 characters</small> <small class="error" ng-show="loginForm.password.$error.maxlength">Password cannot be longer than 20 characters</small></div></div><div class="clearfix"><div class="btn-toolbar pull-right"><button type="reset" class="btn btn-default btn-sm">Create an account</button> <button type="submit" class="btn btn-sidebar btn-sm">Login</button></div><a class="mt-sm pull-right fs-mini" href="#">Trouble with account?</a></div></form></div></widget></div></div></main><footer class="page-footer">2016 &copy; Digitizer. Business Procedure Modelling and Digitization Toolbox.</footer></div>'),e.put("app/modules/profile/edit/edit.html",'<ol class="breadcrumb"><li><span class="text-muted">YOU ARE HERE</span></li><li class="active">Profile</li></ol><div class="row"><div class="col-md-12"><widget><h4 class="mt-0">Profile</h4><form novalidate="" role="form" name="profileForm" class="form-horizontal mt" ng-submit="profileForm.$valid && vm.update()"><div class="alert alert-danger" role="alert" ng-show="vm.responseErrorMsg">{{vm.responseErrorMsg}}</div><div class="form-group"><label class="col-sm-2 control-label" for="username">Username</label><div class="col-sm-10"><input type="text" class="form-control" name="username" ng-model="vm.user.username" required="" ng-minlength="3" ng-maxlength="20"><div ng-show="profileForm.username.$invalid && (profileForm.username.$dirty || profileForm.$submitted)"><small class="error" ng-show="profileForm.username.$error.required">Username is required.</small> <small class="error" ng-show="profileForm.username.$error.minlength">Username is required to be at least 3 characters</small> <small class="error" ng-show="profileForm.username.$error.maxlength">Username cannot be longer than 20 characters</small></div></div></div><div class="form-group"><label class="col-sm-2 control-label" for="email">Email</label><div class="col-sm-10"><input type="email" class="form-control" name="email" ng-model="vm.user.email" required=""><div ng-show="profileForm.email.$invalid && (profileForm.email.$dirty || profileForm.$submitted)"><small class="error" ng-show="profileForm.email.$error.required">Email is required.</small> <small class="error" ng-show="profileForm.email.$error.email">Email is incorrect</small></div></div></div><div class="form-group"><label class="col-sm-2 control-label" for="password">Password</label><div class="col-sm-10"><input type="password" name="password" class="form-control" ng-model="vm.user.password" required="" ng-minlength="3" ng-maxlength="20"><div ng-show="profileForm.password.$invalid && (profileForm.password.$dirty || profileForm.$submitted)"><small class="error" ng-show="profileForm.password.$error.required">Password is required.</small> <small class="error" ng-show="profileForm.password.$error.minlength">Password is required to be at least 3 characters</small> <small class="error" ng-show="profileForm.password.$error.maxlength">Password cannot be longer than 20 characters</small></div></div></div><div class="form-group"><label class="col-sm-2 control-label" for="newPassword">New password</label><div class="col-sm-10"><input type="password" name="newPassword" class="form-control" ng-model="vm.user.newPassword" ng-minlength="3" ng-maxlength="20"><div ng-show="profileForm.newPassword.$invalid && (profileForm.newPassword.$dirty || profileForm.$submitted)"><small class="error" ng-show="profileForm.newPassword.$error.minlength">Password is required to be at least 3 characters</small> <small class="error" ng-show="profileForm.newPassword.$error.maxlength">Password cannot be longer than 20 characters</small></div></div></div><div class="text-right"><button type="button" class="btn" ng-click="vm.cancel()">Cancel</button> <button type="submit" class="btn btn-primary">Save</button></div></form></widget></div></div>'),e.put("app/modules/project/edit/edit.html",'<ol class="breadcrumb"><li><span class="text-muted">YOU ARE HERE</span></li><li class="active">{{vm.project.id ? \'Edit project\' : \'Create new\'}}</li></ol><div class="row"><div class="col-md-12"><widget><h4 class="mt-0">{{vm.project.id ? \'Edit project\' : \'Create new\'}} project</h4><form novalidate="" role="form" name="projectForm" class="form-horizontal mt" ng-submit="projectForm.$valid && (vm.project.id ? vm.update() : vm.save())"><div class="form-group"><label class="col-sm-2 control-label" for="title">Title</label><div class="col-sm-10"><input type="text" id="title" name="title" class="form-control" ng-model="vm.project.title" required="" ng-minlength="3" ng-maxlength="100"><div ng-show="projectForm.title.$invalid && (projectForm.title.$dirty || projectForm.$submitted)"><small class="error" ng-show="projectForm.title.$error.required">Title is required.</small> <small class="error" ng-show="projectForm.title.$error.minlength">Title is required to be at least 3 characters</small> <small class="error" ng-show="projectForm.title.$error.maxlength">Title cannot be longer than 100 characters</small></div></div></div><div class="form-group"><label class="control-label col-sm-2" for="description">Description</label><div class="col-sm-10"><textarea name="description" class="form-control" rows="5" ng-model="vm.project.description" required="" ng-minlength="3">\n                        <div ng-show="projectForm.description.$invalid && (projectForm.description.$dirty || projectForm.$submitted)">\n                            <small class="error" ng-show="projectForm.description.$error.required">\n                                Description is required.\n                            </small>\n                            <small class="error" ng-show="projectForm.description.$error.minlength">\n                                Description is required to be at least 5 characters\n                            </small>\n                        </div>\n                    </textarea></div></div><div class="text-right"><span ng-if="vm.showReturnBtn"><button type="button" class="btn" ng-click="vm.return()">Return</button></span> <button type="submit" class="btn btn-primary">Save</button></div></form></widget></div></div>'),e.put("app/modules/project/list/projects.html",'<ol class="breadcrumb"><li><span class="text-muted">YOU ARE HERE</span></li><li class="active">Projects</li></ol><div class="row"><div class="col-md-12"><widget><header><button type="button" class="btn btn-sm btn-gray mt-n-xs pull-right" ui-sref="app.editProject({id: null})">Create new project</button><h4 class="widget-title">Projects</h4></header><table class="table table-striped"><thead><tr><th>Title</th><th>Last updated</th></tr></thead><tbody><tr ng-repeat="project in vm.projects"><td>{{project.title}}</td><td><span>{{project.date | date: \'short\'}}</span></td><td class="text-right"><button type="button" class="btn btn-default" ui-sref="app.editProject({id: project.id})">Edit</button> <button type="button" class="btn btn-danger" ng-click="vm.delete(project)">Delete</button></td></tr></tbody></table></widget></div></div>')
}]);