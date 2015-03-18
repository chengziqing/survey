angular.module('ionicApp', ['ionic'])
.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('tabs', {
      url: "/tab",
      abstract: true,
      templateUrl: "templates/tabs.html"
    })
    .state('tabs.wait', {
      url: "/wait",
      views: {
        'wait-tab': {
          templateUrl: "templates/wait.html",
          controller: 'WaitTabCtrl'
        }
      }
    })
    .state('tabs.working', {
      url: "/working",
      views: {
        'working-tab': {
          templateUrl: "templates/working.html",
          controller: 'WorkingTabCtrl'
        }
      }
    })
    .state('tabs.already', {
      url: "/already",
      views: {
        'already-tab': {
          templateUrl: "templates/already.html",
          controller: 'AlreadyTabCtrl'
        }
      }
    })
    .state('tabs.station', {
      url: "/station",
      views: {
        'working-tab': {
          templateUrl: "templates/station.html",
          controller: 'StationTabCtrl'
        }
      }
    })
    .state('tabs.facts2', {
      url: "/facts2",
      views: {
        'working-tab': {
          templateUrl: "facts2.html"
        }
      }
    })
    .state('tabs.checkin', {
      url: "/checkin",
      views: {
        'working-tab': {
          templateUrl: "checkin.html",
          controller: 'CheckinTabCtrl'
        }
      }
    })
    .state('tabs.form', {
      url: "/form",
      views: {
        'working-tab': {
          templateUrl: "form.html",
          controller: 'FormTabCtrl'
        }
      }
    })
    .state('tabs.baseform', {
      url: "/baseform",
      views: {
        'working-tab': {
          templateUrl: "baseform.html",
          controller: 'BaseFormTabCtrl'
        }
      }
    });
   $urlRouterProvider.otherwise("/tab/working");

})
.controller('WaitTabCtrl', function($scope, $timeout) {
  console.log('WaitTabCtrl');
})
.controller('WorkingTabCtrl',function($scope,$timeout){
  console.log('WorkingTabCtrl');
  $scope.items = ['勘察任务1', '勘察任务2', '勘察任务3'];
  $scope.doRefresh = function() {
    console.log('Refreshing!');
    $timeout( function() {
      $scope.items.push('勘察任务' + Math.floor(Math.random() * 100) + 4);
      $scope.$broadcast('scroll.refreshComplete');
    }, 500);
  };
})
.controller('AlreadyTabCtrl', function($scope, $timeout) {
  console.log('AlreadyTabCtrl');
})
.controller('StationTabCtrl',function($scope,$timeout,$http){
  console.log('StationTabCtrl');
  $scope.items = ['基站1', '基站2', '基站3'];
  $scope.doRefresh = function() {
    console.log('Refreshing!');
    $timeout( function() {
      $scope.items.push('基站' + Math.floor(Math.random() * 100) + 4);
      $scope.$broadcast('scroll.refreshComplete');
    }, 500);
  };
})
.controller('CheckinTabCtrl',function($scope,$timeout){
  console.log('CheckinTabCtrl');
  var map = new BMap.Map("map");            // 创建Map实例
  var point = new BMap.Point(116.404, 39.915); // 创建点坐标
  map.centerAndZoom(point,15);                 // 初始化地图,设置中心点坐标和地图级别。
  map.addControl(new BMap.ZoomControl());      //添加地图缩放控件
  console.log('CheckinTabCtrl123');
})
.controller('FormTabCtrl',function($scope,$timeout){
  console.log('FormTabCtrl');
  $scope.items = ['基本信息', '电源信息', '网络信息'];
})
.controller('BaseFormTabCtrl',function($scope,$timeout){
  console.log('BaseFormTabCtrl');
});
