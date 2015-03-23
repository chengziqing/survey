angular.module('ionicApp', ['ionic'])
.config(function($stateProvider, $urlRouterProvider,$ionicConfigProvider) {
  $ionicConfigProvider.platform.android.tabs.position("bottom");
  $ionicConfigProvider.tabs.style('standard');
  $ionicConfigProvider.backButton.text('').icon('ion-ios7-arrow-thin-left');
  $ionicConfigProvider.backButton.previousTitleText(true);
  $ionicConfigProvider.navBar.alignTitle('center');

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
      url: "/checkin/:TaskId/:SiteId",
      views: {
        'working-tab': {
          templateUrl: "templates/checkin.html",
          controller: 'CheckinTabCtrl'
        }
      }
    })
    .state('tabs.infotypes', {
      url: "/infotypes/:TaskId",
      views: {
        'working-tab': {
          templateUrl: "templates/infotypes.html",
          controller: 'InfotypesTabCtrl'
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
.filter('sitestatus', function() {
  return function(status) {
    if (status == "00") {
      return "待勘察";
    }
    if (status == "01") {
      return "勘察中";
    }
    if (status == "02") {
      return "已勘察";
    }
    if (status == "12") {
      return "未勘察标记";
    }
    if (status == "22") {
      return "作废标记";
    }
    return "未知状态";
  };
})
.filter('signstatus', function() {
  return function(status) {
    if (status == "0") {
      return "未签到";
    }
    if (status == "1") {
      return "已签到";

    }
    return "未知状态";
  };
})
.filter('collectstatus', function() {
  return function(status) {
    if (status == "0") {
      return "未提交";
    }
    if (status == "1") {
      return "已提交";
    }
  };
})
.controller('WaitTabCtrl', function($scope, $timeout) {
  console.log('WaitTabCtrl');
})
.controller('WorkingTabCtrl',function($scope,$http,$timeout){
  console.log('WorkingTabCtrl');
  $http.jsonp("/GetItemList?jsoncallback=JSON_CALLBACK").
    success(function(data, status) {
      $scope.items=data.root;
    }).
    error(function(data, status) {
      console.log("error");
  });

  $scope.doRefresh = function() {
    console.log('Refreshing!');
    $timeout( function() {
      var item ={TaskId:"10618694-4b9c-4a52-b210-f9cc0a1926be",TaskName:"勘察任务",Num:Math.floor(Math.random() * 100)};
      $scope.items.push(item);
      $scope.$broadcast('scroll.refreshComplete');
    }, 500);
  };
})
.controller('AlreadyTabCtrl', function($scope, $timeout) {
  console.log('AlreadyTabCtrl');
})
.controller('StationTabCtrl',function($scope,$timeout,$http){
  console.log('StationTabCtrl');
  $http.jsonp("/GetItemSiteList?jsoncallback=JSON_CALLBACK").
    success(function(data, status) {
      $scope.items=data.root;
    }).
    error(function(data, status) {
      console.log("error");
  });
})
.controller('ContentTabCtrl',function($scope,$http){
  console.log('ContentTabCtrl');
  $http.jsonp("/GetSiteAllStatus?jsoncallback=JSON_CALLBACK").
    success(function(data, status) {
      $scope.item=data.root[0];
    }).
    error(function(data, status) {
      console.log("error");
  });
})
.controller('CheckinTabCtrl',function($scope,$stateParams){
  console.log('CheckinTabCtrl');
  $scope.TaskId=$stateParams.TaskId;
  $scope.SiteId=$stateParams.SiteId;
  var map = new BMap.Map("map");            // 创建Map实例
  var point = new BMap.Point(117.211405, 31.855289); // 创建点坐标
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
    div.style.background = "url(img/location.png) -288px 0px no-repeat";
    div.onmouseover =function(e){
      div.style.background = "url(img/location.png) -324px 0px no-repeat";
    };
    div.onmouseout =function(e){
      div.style.background = "url(img/location.png) -288px 0px no-repeat";
    };
    // 绑定事件，点击一次放大两级      
    div.onclick = function(e) {
        console.log('重新定位');
        map.removeOverlay(marker1);
        var marker2 = new BMap.Marker(point);
        map.addOverlay(marker2);
    };
      // 添加DOM元素到地图中     
    map.getContainer().appendChild(div);
    return div;
  }
  var myLocationControl = new LocationControl();      
  // 添加到地图当中      
  map.addControl(myLocationControl); 
  var marker1 = new BMap.Marker(point);
  map.addOverlay(marker1);

})
.controller('InfotypesTabCtrl',function($scope,$http){
  console.log('InfotypesTabCtrl');
  $http.jsonp("/GetTaskInfoTypes?jsoncallback=JSON_CALLBACK").
    success(function(data, status) {
      $scope.items=data.root;
    }).
    error(function(data, status) {
      console.log("error");
  });

})
.controller('FormTabCtrl',function($scope,$http){
  console.log('FormTabCtrl');
  $http.jsonp("/GetTaskPropertys?jsoncallback=JSON_CALLBACK").
    success(function(data, status) {
      $scope.items=data.root;
    }).
    error(function(data, status) {
      console.log("error");
  });

})
.controller('NavBarCtrl',function($scope,$ionicHistory){
  console.log('NavBarCtrl');
  $scope.ClearCacheGoBack = function() {
    $ionicHistory.clearCache();
    $ionicHistory.goBack();
  };
})
.controller('BaseFormTabCtrl',function($scope,$http){
  console.log('BaseFormTabCtrl');
  $scope.title="核讹咯";
  $http.jsonp("/GetTaskPropertyControl?jsoncallback=JSON_CALLBACK").
    success(function(data, status) {
      $scope.item=data.root[0];
    }).
    error(function(data, status) {
      console.log("error");
  });

});
