! function() {
  "use strict";

  function t(t) {
    t.state("login", {
      url: "/login",
      data: {
        noAuth: !0
      },
      templateUrl: "app/modules/profile/auth/login.html",
      controller: "LoginController",
      controllerAs: "vm"
    }).state("app.profile", {
      url: "/profile",
      templateUrl: "app/modules/profile/edit/edit.html",
      controller: "ProfileController",
      controllerAs: "vm"
    })
  }
  var s = angular.module("app.profile", ["ui.router"]);
  s.config(t), t.$inject = ["$stateProvider"]
}(),
  function() {
    "use strict";

    function t(t, s, e) {
      var a = this;
      a.user = $.extend(!0, {}, s.getCurrentUser()), a.responseErrorMsg = "", a.update = function() {
        t.put("/api/profile", a.user).success(function(t) {
          s.setCurrentUser(t), e.success("Profile changes saved")
        }).error(function(t) {
          a.responseErrorMsg = t.message
        })
      }, a.cancel = function() {
        a.responseErrorMsg = "", a.user = $.extend(!0, {}, s.getCurrentUser())
      }
    }
    angular.module("app.profile").controller("ProfileController", t), t.$inject = ["$http", "session", "notificator"]
  }(),
  function() {
    "use strict";

    function t(t) {
      var s = this;
      s.user = {}, s.responseErrorMsg = "", this.login = function() {
        t.login(s.user).then(null, function(t) {
          s.responseErrorMsg = t.data.message
        })
      }
    }

    function s(t, s, e) {
      t.logout = e.logout, t.$on("$userLoggedIn", function() {
        s.go("app.dashboard")
      }), t.$on("$userLoggedOut", function() {
        s.go("login")
      })
    }
    angular.module("app.profile").controller("LoginController", t).run(s), t.$inject = ["authenticationService"], s.$inject = ["$rootScope", "$state", "authenticationService"]
  }(),
  function() {
    "use strict";

    function t(t) {
      t.state("app.posts", {
        url: "/posts/:interval",
        templateUrl: "app/modules/post/list/posts.html",
        resolve: {
          posts: ["$stateParams", "postsUtils", "postResource", function(t, s, e) {
            return e.query().$promise.then(function(e) {
              return t.interval ? s.postsDuringInterval(e, t.interval) : e
            })
          }]
        },
        controller: "PostListController as vm"
      }).state("app.editPost", {
        url: "/posts/edit/:id",
        templateUrl: "app/modules/post/edit/edit.html",
        resolve: {
          data: ["$stateParams", "postResource", function(t, s) {
            return t.id ? s.get({
              id: t.id
            }).$promise : {}
          }]
        },
        controller: "PostController",
        controllerAs: "vm"
      })
    }
    var s = angular.module("app.post", ["ui.router", "ngResource", "app.data", "app.common"]);
    s.config(t), t.$inject = ["$stateProvider"]
  }(),
  function() {
    "use strict";

    function t(t, s) {
      var e = this;
      e.posts = t, e.delete = s.getDeleteMethod(e.posts)
    }
    angular.module("app.post").controller("PostListController", t), t.$inject = ["posts", "deletePostModal"]
  }(),
  function() {
    "use strict";

    function t(t, s, e, a, o) {
      var r = this;
      r.post = t, r.showReturnBtn = r.post.id && a.from.state.name, r.update = function() {
        r.post.date = (new Date).toISOString(), s.update(r.post, function() {
          o.success("Post was successfully updated")
        })
      }, r.return = function() {
        e.go(a.from.state.name, a.from.params)
      }, r.save = function() {
        r.post.date = (new Date).toISOString(), s.save(this.post, function() {
          a.goTo("from"), o.success("Post was successfully saved")
        })
      }
    }
    angular.module("app.profile").controller("PostController", t), t.$inject = ["data", "postResource", "$state", "shortHistory", "notificator"]
  }(),
  function() {
    "use strict";

    function t(t) {
      t.state("app.dashboard", {
        url: "/dashboard",
        templateUrl: "app/modules/dashboard/dashboard.html",
        resolve: {
          posts: ["postResource", function(t) {
            return t.query().$promise
          }]
        },
        controller: "dashboardController",
        controllerAs: "vm"
      })
    }
    var s = angular.module("app.dashboard", ["ui.router", "ngResource", "app.data"]);
    s.config(t), t.$inject = ["$stateProvider"]
  }(),
  function() {
    "use strict";

    function t() {
      return {
        restrict: "EA",
        transclude: !0,
        replace: !0,
        scope: {
          widgetClass: "@",
          iconClass: "@",
          iconText: "@"
        },
        templateUrl: "app/modules/dashboard/widget-stat/widget_stat.html"
      }
    }
    angular.module("app.dashboard").directive("widgetStat", t)
  }(),
  function() {
    "use strict";

    function t(t, s) {
      t.state("app", {
        url: "/app",
        "abstract": !0,
        templateUrl: "app/modules/core/app.html"
      }), s.otherwise(function(t) {
        var s = t.get("$state");
        s.go("app.dashboard")
      })
    }
    var s = angular.module("app.core", ["ngResource", "ui.router", "ngAnimate", "toastr"]);
    s.config(t), t.$inject = ["$stateProvider", "$urlRouterProvider"]
  }(),
  function() {
    "use strict";

    function t(t) {
      function s(t) {
        $("body").toggleClass("nav-shown", t)
      }
      var e = {
        click: function(t) {
          t.on("click", function(t) {
            s(), t.preventDefault()
          })
        },
        swipe: function(e) {
          function a() {
            try {
              return t[0].createEvent("TouchEvent"), !0
            } catch (s) {
              return !1
            }
          }
          a() && e.swipe({
            swipeLeft: function() {
              s(!1)
            },
            swipeRight: function() {
              s(!0)
            }
          })
        }
      };
      return {
        restrict: "A",
        scope: {
          type: "@"
        },
        link: function(t, s) {
          e[t.type](s, t)
        }
      }
    }
    t.$inject = ["$document"], angular.module("app.core").directive("navCollapseToggler", t)
  }(),
  function() {
    "use strict";
    angular.module("app.common", ["ui.bootstrap", "ui.router"])
  }(),
  function() {
    "use strict";

    function t() {
      function t(t, s) {
        s.addClass("widget")
      }
      return {
        link: t,
        restrict: "EA"
      }
    }
    angular.module("app.common").directive("widget", t)
  }(),
  function() {
    "use strict";

    function t(t) {
      var e = {
          backdrop: !0,
          keyboard: !0,
          modalFade: !0,
          templateUrl: "app/modules/common/modal/modal.html"
        },
        a = {
          closeButtonText: "Close",
          actionButtonText: "OK",
          headerText: "Proceed?",
          bodyText: "Perform this action?"
        };
      this.show = function(o, r) {
        var l = {},
          n = {};
        return angular.extend(l, e, o), angular.extend(n, a, r), l.controller || (l.controller = s(l, n)), t.open(l).result
      }
    }

    function s(t, s) {
      function e(t, e) {
        t.modalOptions = s, t.modalOptions.ok = function(t) {
          e.close(t)
        }, t.modalOptions.close = t.modalOptions.close || function() {
            e.dismiss("cancel")
          }
      }
      return e.$inject = ["$scope", "$modalInstance"], e
    }
    angular.module("app.common").service("commonModal", t), t.$inject = ["$modal"]
  }(),
  function() {
    "use strict";

    function t(t, s, e) {
      var a = this;
      this.modalOptions = {
        closeButtonText: "Cancel",
        actionButtonText: "Delete",
        headerText: "Confirm post deletion",
        bodyText: "The post will be deleted permanently, do you want to continue?"
      }, this.modalDefaults = {
        windowClass: "small-modal"
      }, this.getDeleteMethod = function(o) {
        return function(r) {
          s.show(a.modalDefaults, a.modalOptions).then(function() {
            t.delete(r, function() {
              var t = o.indexOf(r);
              o.splice(t, 1), e.success("Post was successfully deleted")
            })
          })
        }
      }
    }
    var s = angular.module("app.post");
    s.service("deletePostModal", t), t.$inject = ["postResource", "commonModal", "notificator"]
  }(),
  function() {
    "use strict";
    angular.module("app.data", ["ngResource"])
  }(),
  function() {
    "use strict";

    function t(t) {
      return t("/api/posts/:id", {
        id: "@id"
      }, {
        update: {
          method: "PUT"
        }
      })
    }

    function s() {
      function t(t, s) {
        var e = new Date,
          a = 864e5 * s,
          o = [];
        return t.forEach(function(t) {
          var s = new Date(t.date);
          a > e - s && o.push(t)
        }), o
      }

      function s(t, s) {
        return t.sort(function(t, s) {
          return t.date < s.date ? 1 : t.date == s.date ? 0 : -1
        }), t.slice(0, s || 1)
      }

      function e(t) {
        var s = t[0];
        return t.forEach(function(t) {
          s = s.date < t.date ? s : t
        }), s
      }
      return {
        postsDuringInterval: t,
        lastEdited: e,
        recent: s
      }
    }
    angular.module("app.data").factory("postResource", t).factory("postsUtils", s), t.$inject = ["$resource"], s.$inject = ["postResource"]
  }(),
  function() {
    "use strict";

    function t(t, s, e, a) {
      t.posts = e, t.postsLastMonth = a.postsDuringInterval(e, 30), t.lastEditedPost = a.lastEdited(e), t.postsRecently = a.recent(e, 5), t.alerts = [{
        type: "warning",
        msg: s.trustAsHtml('<span class="fw-semi-bold">Warning:</span> Best check your self, you\'re not looking too good.')
      }, {
        type: "success",
        msg: s.trustAsHtml('<span class="fw-semi-bold">Success:</span> You successfully read this important alert message.')
      }, {
        type: "info",
        msg: s.trustAsHtml('<span class="fw-semi-bold">Info:</span> This alert needs your attention, but it\'s not super important.')
      }, {
        type: "danger",
        msg: s.trustAsHtml('<span class="fw-semi-bold">Danger:</span> Change this and that and try again.<a class="btn btn-default btn-xs pull-right mr" href="#">Ignore</a><a class="btn btn-danger btn-xs pull-right mr-xs" href="#">Take this action</a>')
      }], t.addAlert = function() {
        t.alerts.push({
          type: "warning",
          msg: s.trustAsHtml("Another alert!")
        })
      }, t.closeAlert = function(s) {
        t.alerts.splice(s, 1)
      }
    }
    angular.module("app.dashboard").controller("dashboardController", t), t.$inject = ["$scope", "$sce", "posts", "postsUtils"]
  }(),
  function() {
    "use strict";

    function t(t, s, e, a, o, r) {
      var l = this;
      l.title = t.appTitle, s.app = t, s.$state = e, a.$on("$stateChangeStart", function(t, s, e) {
        r.checkAccess(t, s, e)
      }), s.$on("$stateChangeSuccess", function() {
        $("body").toggleClass("nav-shown", !1)
      }), a.$on("$userSet", function(t, s) {
        l.currentUser = s
      }), o.init(s)
    }
    angular.module("app.core").controller("App", t), t.$inject = ["config", "$scope", "$state", "$rootScope", "shortHistory", "authorize", "session"]
  }(),
  function() {
    "use strict";
    var t = angular.module("app.core"),
      s = {
        name: "Angular dashboard seed",
        appTitle: "ADD",
        version: "0.1.1"
      };
    t.value("config", s)
  }(),
  function() {
    "use strict";

    function t(t) {
      return {
        success: function(s, e) {
          t.success(s, e)
        },
        warning: function(s, e) {
          t.warning(s, e)
        },
        error: function(s, e) {
          t.error(s, e)
        },
        info: function(s, e) {
          t.info(s, e)
        }
      }
    }

    function s(t, s, e) {
      t.$on("$userLoggedIn", function() {
        s.success("Hey there!"), e(function() {
          s.info("Welcome to Digitizer! A platform for Business Procedure Modelling and Digitization. ", {
            timeOut: 1e4
          })
        }, 3e3), e(function() {
          s.info("Use the Dashboard to draw your business idea, or navigate to the projects or services views.", {
            timeOut: 1e4
          })
        }, 15e3)
      }), t.$on("$userLoggedOut", function() {
        s.success("Logged out successfully")
      })
    }

    function e(t) {
      angular.extend(t, {
        timeOut: 3e3
      })
    }
    angular.module("app.common").config(e).factory("notificator", t).run(s), t.$inject = ["toastr"], s.$inject = ["$rootScope", "notificator", "$timeout"], e.$inject = ["toastrConfig"]
  }(),
  function() {
    "use strict";

    function t(t) {
      function s(t, s, a) {
        e[t] = {
          state: s,
          params: a
        }
      }
      var e = this;
      this.init = function(t) {
        t.$on("$stateChangeSuccess", function(t, e, a, o, r) {
          s("from", o, r), s("to", e, a)
        })
      }, this.goTo = function(s) {
        t.go(e[s].state.name, e[s].params)
      }
    }

    function s(t, s, e) {
      var a = this;
      this.fetchCurrentUser = function(e) {
        var o;
        return o = a.getCurrentUser() ? s(function(t) {
          t(a.getCurrentUser())
        }) : t.get(e)
      }, this.getCurrentUser = function() {
        return this.user
      }, this.setCurrentUser = function(t) {
        this.user = t, e.$broadcast("$userSet", this.user)
      }
    }

    function e(t, s) {
      this.checkAccess = function(e, a, o) {
        t.getCurrentUser() || a.data && a.data.noAuth || (e.preventDefault(), t.fetchCurrentUser("/api/profile").success(function(e) {
          t.setCurrentUser(e), s.go(a.name, o)
        }).error(function() {
          s.go("login")
        }))
      }
    }

    function a(t, s, e) {
      this.login = function(a) {
        return t.post("/api/login", a).success(function(t) {
          e.setCurrentUser(t), s.$broadcast("$userLoggedIn")
        })
      }, this.logout = function() {
        return t.get("/api/logout").success(function() {
          e.setCurrentUser(null), s.$broadcast("$userLoggedOut")
        })
      }
    }
    angular.module("app.common").service("shortHistory", t).service("session", s).service("authorize", e).service("authenticationService", a), t.$inject = ["$state"], s.$inject = ["$http", "$q", "$rootScope"], e.$inject = ["session", "$state", "$urlRouter", "$rootScope"], a.$inject = ["$http", "$rootScope", "session"]
  }(),
  function() {
    "use strict";
    angular.module("app", ["app.core", "app.profile", "app.post", "app.dashboard", "app.data", "app.common"])
  }(), angular.module("app").run(["$templateCache", function(t) {
  t.put("app/modules/core/app.html", '<nav id="sidebar" class="sidebar" role="navigation" data-ng-include="\'app/modules/core/navigation/sidebar.html\'"></nav><div class="content-wrap" nav-collapse-toggler="" type="swipe"><main role="main"><nav class="page-controls navbar navbar-default" data-ng-include="\'app/modules/core/navigation/navbar.html\'"></nav><div id="content" class="content view-animate fade-up" data-ui-view=""></div></main></div>'), t.put("app/modules/dashboard/dashboard.html", '<ol class="breadcrumb"><li><span class="text-muted">You are here</span></li><li class="active">Dashboard</li></ol>' +
    '<div class="row"><div class="col-md-3 col-sm-6"><widget-stat widget-class="bg-sidebar" ui-sref="app.posts" icon-text="{{posts.length}}" icon-class="text-success">projects total</widget-stat></div><div class="col-md-3 col-sm-6"><widget-stat widget-class="bg-sidebar" icon-class="fa fa-cogs mt-n-xs text-white">new services</widget-stat></div><div class="col-md-3 col-sm-6"><widget-stat widget-class="bg-sidebar" ui-sref="app.editPost({id: lastEditedPost.id})" icon-class="fa fa-calendar text-white">last edited</widget-stat></div><div class="col-md-3 col-sm-6"><widget-stat widget-class="bg-sidebar" ui-sref="app.posts" icon-text="{{postsLastMonth.length}}" icon-class="text-warning">projects last month</widget-stat></div></div>' +
    '<div class="row"><div class="col-md-12"><widget><small class="pull-right"><a class="td-underline text-muted" href="#"><span class="text-muted">Options</span></a></small><h5 class="widget-title">Recent <span class="fw-semi-bold">Projects </span> <span class="badge bg-success">5</span></h5><p class="text-muted mt-n-sm small">projects that have been created or modified recently</p><table class="table table-no-border table-sm mb-0"><tr ng-repeat="post in postsRecently"><td>{{post.date | date:\' MMM dd, hh:mm\'}}</td><td><a ui-sref="app.editPost({id: post.id})">{{post.title}}</a></td></tr></table></widget></div></div>'), t.put("app/modules/common/modal/modal.html", '<div class="modal-header"><h3>{{modalOptions.headerText}}</h3></div><div class="modal-body"><p>{{modalOptions.bodyText}}</p></div><div class="modal-footer"><button type="button" class="btn" data-ng-click="modalOptions.close()">{{modalOptions.closeButtonText}}</button> <button class="btn btn-primary" data-ng-click="modalOptions.ok();">{{modalOptions.actionButtonText}}</button></div>'), t.put("app/modules/core/navigation/navbar.html", '<div class="container-fluid"><div class="navbar-header"><ul class="nav navbar-nav"><li><a class="visible-xs navbar-toggle toggle-navigation-collapse" nav-collapse-toggler="" type="click" href="#" title="Show/hide sidebar" data-placement="bottom" data-tooltip=""><span class="icon-bar"></span> <span class="icon-bar"></span> <span class="icon-bar"></span></a></li></ul><a class="navbar-brand visible-xs">{{app.name}}</a></div><div class="collapse navbar-collapse"><ul class="nav navbar-nav navbar-right"><li class="dropdown" dropdown=""><a href="#" dropdown-toggle=""><i class="glyphicon glyphicon-user mr-xs"></i> {{vm.currentUser.firstName}} <span class="fw-semi-bold">{{vm.currentUser.lastName}}</span> <span class="badge bg-warning ml-xs">0</span></a><div class="dropdown-menu animated fadeInUp" data-sn-notifications-menu=""><section class="panel notifications"><header class="panel-heading"><h6 class="text-center mt-xs mb-xs"><strong>You have 0 notifications</strong></h6></header><div id="notifications-list" class="list-group thin-scroll"><footer class="panel-footer text-sm"><button class="btn btn-xs btn-link pull-right"><i class="fa fa-refresh"></i></button> <small>Synced at: 13 Apr 2016 18:36</small></footer></section></div></li><li class=""></li><li><a href="" ng-click="logout()">Logout</a></li></ul></div></div>'), t.put("app/modules/core/navigation/sidebar.html", '<header class="logo"><a>Digitizer <sup class="text-danger fw-semi-bold">beta</sup></a></header><ul class="sidebar-nav"><li><a ui-sref="app.dashboard" ui-sref-active="active"><i class="glyphicon glyphicon-dashboard mr-xs"></i> Dashboard</a></li><li><a data-target="#sidebar-dashboard" data-toggle="collapse" data-parent="#sidebar" ng-class="$state.includes(\'app.posts\') || $state.includes(\'app.editPost\') ? \'active\' : \'\'"><i class="glyphicon glyphicon-list-alt mr-xs"></i> Projects <b class="caret"></b></a><ul id="sidebar-dashboard" class="collapse in"><li><a ui-sref="app.posts" ui-sref-active="active">Show all</a></li><li><a ui-sref="app.editPost" ui-sref-active="active">{{$state.includes(\'app.editPost\') && $state.params.id ? \'Post editing\' : \'Create new\'}}</a></li></ul></li><li><a ui-sref="app.profile" ui-sref-active="active"><i class="glyphicon glyphicon-user mr-xs"></i> Profile</a></li><li class="hidden-md hidden-lg"><a href="#" ng-click="logout()">Logout</a></li></ul><footer class="sidebar-footer"><p class="small text-gray-lighter opacity-60 ml-xs mr-xs mb-xs">58% ready</p><div class="progress progress-xs mb-sm"><div class="progress-bar progress-bar-success" style="width: 58%"></div></div></footer>'), t.put("app/modules/dashboard/widget-stat/widget_stat.html", '<div class="widget bg-transparent text-center"><p><span class="rounded rounded-lg {{widgetClass}}" style="font-size: 36px"><span class="{{iconClass}} fw-bold">{{iconText}}</span></span></p><div ng-transclude=""></div></div>'), t.put("app/modules/post/edit/edit.html", '<ol class="breadcrumb"><li><span class="text-muted">You are here</span></li><li class="active">{{vm.post.id ? \'Edit post\' : \'Create new\'}}</li></ol><div class="row"><div class="col-md-8"><widget><h4 class="mt-0">{{vm.post.id ? \'Edit post\' : \'Create new\'}} project</h4><form novalidate="" role="form" name="postForm" class="form-horizontal mt" ng-submit="postForm.$valid && (vm.post.id ? vm.update() : vm.save())"><div class="form-group"><label class="col-sm-2 control-label" for="title">Title</label><div class="col-sm-10"><input type="text" id="title" name="title" class="form-control" ng-model="vm.post.title" required="" ng-minlength="3" ng-maxlength="100"><div ng-show="postForm.title.$invalid && (postForm.title.$dirty || postForm.$submitted)"><small class="error" ng-show="postForm.title.$error.required">Title is required.</small> <small class="error" ng-show="postForm.title.$error.minlength">Title is required to be at least 3 characters</small> <small class="error" ng-show="postForm.title.$error.maxlength">Title cannot be longer than 100 characters</small></div></div></div><div class="form-group"><label class="control-label col-sm-2" for="description">Description</label><div class="col-sm-10"><textarea name="description" class="form-control" rows="5" ng-model="vm.post.description" required="" ng-minlength="3">\n                        <div ng-show="postForm.description.$invalid && (postForm.description.$dirty || postForm.$submitted)">\n                            <small class="error" ng-show="postForm.description.$error.required">\n                                Description is required.\n                            </small>\n                            <small class="error" ng-show="postForm.description.$error.minlength">\n                                Description is required to be at least 5 characters\n                            </small>\n                        </div>\n                    </textarea></div></div><div class="text-right"><span ng-if="vm.showReturnBtn"><button type="button" class="btn" ng-click="vm.return()">Return</button></span> <button type="submit" class="btn btn-primary">Save</button></div></form></widget></div></div>'), t.put("app/modules/post/list/posts.html", '<ol class="breadcrumb"><li><span class="text-muted">You are here</span></li><li class="active">Projects</li></ol><div class="row"><div class="col-md-12"><widget><header><button type="button" class="btn btn-sm btn-gray mt-n-xs pull-right" ui-sref="app.editPost({id: null})">Create new project</button><h4 class="widget-title">Projects</h4></header><table class="table table-striped"><thead><tr><th>Title</th><th>Last updated</th></tr></thead><tbody><tr ng-repeat="post in vm.posts"><td>{{post.title}}</td><td width="30%">{{post.description}}</td><td><span>{{post.date | date: \'short\'}}</span></td><td class="text-right"><button type="button" class="btn btn-default" ui-sref="app.editPost({id: post.id})">Edit</button><button type="button" class="btn btn-danger" ng-click="vm.delete(post)">Delete</button></td></tr></tbody></table></widget></div></div>'), t.put("app/modules/profile/auth/login.html", '<div class="container"><main id="content" class="widget-login-container" role="main"><div class="row"><div class="col-lg-4 col-sm-6 col-xs-10 col-lg-offset-4 col-sm-offset-3 col-xs-offset-1"><h5 class="text-center text-muted">Digitizer <sup class="fw-semi-bold text-warning">beta</sup></h5><widget class="widget-login"><header><h3 class="mt-0">Login to Digitizer</h3></header><div class="widget-body"><p class="fs-mini text-muted">Use your username and password to sign in<br>Don\'t have an account? Sign up now!</p><form role="form" novalidate="" name="loginForm" class="login-form mt-lg" ng-submit="loginForm.$valid && vm.login()"><div class="alert alert-danger" role="alert" ng-show="vm.responseErrorMsg">{{vm.responseErrorMsg}}</div><div class="form-group"><input type="text" class="form-control" required="" ng-minlength="3" ng-maxlength="20" ng-model="vm.user.username" name="username" placeholder="Username"><div ng-show="loginForm.username.$invalid && (loginForm.username.$dirty || loginForm.$submitted)"><small class="error" ng-show="loginForm.username.$error.required">Username is required.</small> <small class="error" ng-show="loginForm.username.$error.minlength">Username is required to be at least 3 characters</small> <small class="error" ng-show="loginForm.username.$error.maxlength">Username cannot be longer than 20 characters</small></div></div><div class="form-group"><input class="form-control" required="" ng-minlength="3" ng-maxlength="20" ng-model="vm.user.password" name="password" type="password" placeholder="Password"><div ng-show="loginForm.password.$invalid && (loginForm.password.$dirty || loginForm.$submitted)"><small class="error" ng-show="loginForm.password.$error.required">Password is required.</small> <small class="error" ng-show="loginForm.password.$error.minlength">Password is required to be at least 3 characters</small> <small class="error" ng-show="loginForm.password.$error.maxlength">Password cannot be longer than 20 characters</small></div></div><div class="clearfix"><div class="btn-toolbar pull-right"><button type="reset" class="btn btn-default btn-sm">Create an account</button> <button type="submit" class="btn btn-sidebar btn-sm">Login</button></div><a class="mt-sm pull-right fs-mini" href="#">Trouble with account?</a></div></form></div></widget></div></div></main><footer class="page-footer">2015 &copy; Digitizer. Business Procedure Modelling and Digitization Toolbox</footer></div>'), t.put("app/modules/profile/edit/edit.html", '<ol class="breadcrumb"><li><span class="text-muted">You are here</span></li><li class="active">Profile</li></ol><div class="row"><div class="col-md-8"><widget><h4 class="mt-0">Profile</h4><form novalidate="" role="form" name="profileForm" class="form-horizontal mt" ng-submit="profileForm.$valid && vm.update()"><div class="alert alert-danger" role="alert" ng-show="vm.responseErrorMsg">{{vm.responseErrorMsg}}</div><div class="form-group"><label class="col-sm-2 control-label" for="username">Username</label><div class="col-sm-10"><input type="text" class="form-control" name="username" ng-model="vm.user.username" required="" ng-minlength="3" ng-maxlength="20"><div ng-show="profileForm.username.$invalid && (profileForm.username.$dirty || profileForm.$submitted)"><small class="error" ng-show="profileForm.username.$error.required">Username is required.</small> <small class="error" ng-show="profileForm.username.$error.minlength">Username is required to be at least 3 characters</small> <small class="error" ng-show="profileForm.username.$error.maxlength">Username cannot be longer than 20 characters</small></div></div></div><div class="form-group"><label class="col-sm-2 control-label" for="email">Email</label><div class="col-sm-10"><input type="email" class="form-control" name="email" ng-model="vm.user.email" required=""><div ng-show="profileForm.email.$invalid && (profileForm.email.$dirty || profileForm.$submitted)"><small class="error" ng-show="profileForm.email.$error.required">Email is required.</small> <small class="error" ng-show="profileForm.email.$error.email">Email is incorrect</small></div></div></div><div class="form-group"><label class="col-sm-2 control-label" for="password">Password</label><div class="col-sm-10"><input type="password" name="password" class="form-control" ng-model="vm.user.password" required="" ng-minlength="3" ng-maxlength="20"><div ng-show="profileForm.password.$invalid && (profileForm.password.$dirty || profileForm.$submitted)"><small class="error" ng-show="profileForm.password.$error.required">Password is required.</small> <small class="error" ng-show="profileForm.password.$error.minlength">Password is required to be at least 3 characters</small> <small class="error" ng-show="profileForm.password.$error.maxlength">Password cannot be longer than 20 characters</small></div></div></div><div class="form-group"><label class="col-sm-2 control-label" for="newPassword">New password</label><div class="col-sm-10"><input type="password" name="newPassword" class="form-control" ng-model="vm.user.newPassword" ng-minlength="3" ng-maxlength="20"><div ng-show="profileForm.newPassword.$invalid && (profileForm.newPassword.$dirty || profileForm.$submitted)"><small class="error" ng-show="profileForm.newPassword.$error.minlength">Password is required to be at least 3 characters</small> <small class="error" ng-show="profileForm.newPassword.$error.maxlength">Password cannot be longer than 20 characters</small></div></div></div><div class="text-right"><button type="button" class="btn" ng-click="vm.cancel()">Cancel</button> <button type="submit" class="btn btn-primary">Save</button></div></form></widget></div></div>')
}]);
