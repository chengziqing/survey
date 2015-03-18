angular.module('ionicApp', ['ionic'])
.config(function($stateProvider, $urlRouterProvider,$ionicConfigProvider) {
  $ionicConfigProvider.
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
    .state('tabs.content', {
      url: "/content",
      views: {
        'working-tab': {
          templateUrl: "templates/content.html",
          controller: 'ContentTabCtrl'
        }
      }
    })
    .state('tabs.checkin', {
      url: "/checkin",
      views: {
        'working-tab': {
          templateUrl: "templates/checkin.html",
          controller: 'CheckinTabCtrl'
        }
      }
    })
    .state('tabs.form', {
      url: "/form",
      views: {
        'working-tab': {
          templateUrl: "templates/form.html",
          controller: 'FormTabCtrl'
        }
      }
    })
    .state('tabs.baseform', {
      url: "/baseform",
      views: {
        'working-tab': {
          templateUrl: "templates/baseform.html",
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
.controller('ContentTabCtrl',function($scope,$timeout,$http){
  console.log('ContentTabCtrl');
})
.controller('CheckinTabCtrl',function($scope,$timeout){
  console.log('CheckinTabCtrl');
  var map = new BMap.Map("map");            // 创建Map实例
  var point = new BMap.Point(116.404, 39.915); // 创建点坐标
  map.centerAndZoom(point,15);                 // 初始化地图,设置中心点坐标和地图级别。

  // 定义一个控件类，即function 
  function LocationControl(){      
      // 设置默认停靠位置和偏移量    
      this.defaultAnchor = BMAP_ANCHOR_TOP_LEFT;      
      this.defaultOffset = new BMap.Size(10, 10);      
  }
  // 通过JavaScript的prototype属性继承于BMap.Control  
  LocationControl.prototype = new BMap.Control();
  // 自定义控件必须实现initialize方法，并且将控件的DOM元素返回     
  // 在本方法中创建个div元素作为控件的容器，并将其添加到地图容器中     
  LocationControl.prototype.initialize = function(map) {
    // 创建一个DOM元素     
    var div = document.createElement("div");
    // 设置样式      
    div.style.cursor = "pointer";
    div.style.width = "36px";
    div.style.height = "36px";
    div.style.background = "url(img/location.png) -324px 0px no-repeat";
    // 绑定事件，点击一次放大两级      
    div.onclick = function(e) {
        console.log('重新定位');
      }
      // 添加DOM元素到地图中     
    map.getContainer().appendChild(div);
    return div;
  }

  var myLocationControl = new LocationControl();      
  // 添加到地图当中      
  map.addControl(myLocationControl); 
})
.controller('FormTabCtrl',function($scope,$timeout){
  console.log('FormTabCtrl');
  $scope.items = ['基本信息', '电源信息', '网络信息'];
})
.controller('NavBarCtrl',function($scope,$ionicHistory){
  console.log('NavBarCtrl');
  $scope.ClearCacheGoBack = function() {
    $ionicHistory.clearCache();
    $ionicHistory.goBack();
  };
})
.controller('BaseFormTabCtrl',function($scope,$timeout){
  console.log('BaseFormTabCtrl');
});
