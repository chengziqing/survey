var HTTP_HOST="http://192.168.1.32:8082/ReaisService.asmx";
var WEB_HOST = "http://192.168.1.32:8081";
var USER_ID="";

var NowLocation = {
  SignLng: "",
  SignLat: "",
  Altitude: "10"
};
var PROJECT_ID="";
angular.module('ionicApp', ['ionic'])
.config(function($stateProvider, $urlRouterProvider,$ionicConfigProvider) {
  $ionicConfigProvider.platform.android.tabs.position("bottom");
  $ionicConfigProvider.tabs.style('standard');
  $ionicConfigProvider.backButton.text('返回').icon('ion-ios7-arrow-thin-left');
  $ionicConfigProvider.backButton.previousTitleText(true);
  $ionicConfigProvider.navBar.alignTitle('center');

  $stateProvider
    .state('signin', {
      url: '/sign-in',
      templateUrl: 'templates/sign-in.html',
      controller: 'SignInCtrl'
    })
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
    .state('tabs.account', {
      url: "/account",
      views: {
        'account-tab': {
          templateUrl: "templates/account.html",
          controller: 'AccountTabCtrl'
        }
      }
    })
    .state('tabs.station', {
      url: "/station/:ProjectId/:TaskId",
      views: {
        'working-tab': {
          templateUrl: "templates/station.html",
          controller: 'StationTabCtrl'
        }
      }
    })
    .state('tabs.content', {
      url: "/content/:TaskId/:SiteId",
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
      url: "/infotypes/:TaskId/:SiteId",
      views: {
        'working-tab': {
          templateUrl: "templates/infotypes.html",
          controller: 'InfotypesTabCtrl'
        }
      }
    })
    .state('tabs.form', {
      url: "/form/:TaskId/:SiteId/:TypeID",
      views: {
        'working-tab': {
          templateUrl: "templates/form.html",
          controller: 'FormTabCtrl'
        }
      }
    })
    .state('tabs.groupform', {
      url: "/groupform/:TaskId/:SiteId/:TypeID/:PropertyID/:IsPropertyGroup/:PropertylName",
      views: {
        'working-tab': {
          templateUrl: "templates/groupform.html",
          controller: 'GroupFormTabCtrl'
        }
      }
    })
    .state('tabs.baseform', {
      url: "/baseform/:TaskId/:SiteId/:TypeID/:PropertyID/:IsPropertyGroup/:PropertylName",
      views: {
        'working-tab': {
          templateUrl: "templates/baseform.html",
          controller: 'BaseFormTabCtrl'
        }
      }
    })
    .state('tabs.imagetypes', {
      url: "/imagetypes/:TaskId/:SiteId",
      views: {
        'working-tab': {
          templateUrl: "templates/imagetypes.html",
          controller: 'ImagetypesTabCtrl'
        }
      }
    })
    .state('tabs.imageup', {
      url: "/imageup/:TaskId/:SiteId/:DirectoryID",
      views: {
        'working-tab': {
          templateUrl: "templates/imageup.html",
          controller: 'ImageupTabCtrl'
        }
      }
    })
    .state('tabs.imagelist', {
      url: "/imagelist/:TaskId/:SiteId/:DirectoryID",
      views: {
        'working-tab': {
          templateUrl: "templates/imagelist.html",
          controller: 'ImagelistTabCtrl'
        }
      }
    })
    .state('tabs.period', {
      url: "/period/:TaskId/:SiteId",
      views: {
        'working-tab': {
          templateUrl: "templates/period.html",
          controller: 'PeriodTabCtrl'
        }
      }
    })
    .state('tabs.talk', {
      url: "/talk/:TaskId/:SiteId",
      views: {
        'working-tab': {
          templateUrl: "templates/talk.html",
          controller: 'TalkTabCtrl'
        }
      }
    });
   $urlRouterProvider.otherwise("/sign-in");
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
    if (status == "0" || status=="False" || status=="") {
      return "未提交";
    }
    if (status == "1" || status=="True"){
      return "已提交";
    }
  };
})
.filter('strtodate', function() {
  return function(str) {
    return new Date(Date.parse(str.replace(/-/g, "/")));
  };
})
.filter('strnowtodate', function() {
  return function(str) {
    if (str=="now") {
      return new Date().Format("yyyy-MM-dd");
    }else{
      return str;
    }
  };
})
.controller('SignInCtrl', function($scope, $state,$ionicPopup,$http) {
  var loginForm = {
    username: window.localStorage.getItem("reais3_username")==null?"":window.localStorage.getItem("reais3_username"),
    password: window.localStorage.getItem("reais3_password")==null?"":window.localStorage.getItem("reais3_password"),
    isSave: (window.localStorage.getItem("reais3_isSave")==null) || (window.localStorage.getItem("reais3_isSave")=="false")?false:true
  }
  $scope.user=loginForm;
  $scope.signIn = function(user) {
    console.log(user);
    if (user.username=="") {
        $ionicPopup.alert({
          title: '错误提示',
          template: '用户名不能为空!'
        });
        return
    }
    if (user.password=="") {
        $ionicPopup.alert({
          title: '错误提示',
          template: '密码不能为空!'
        });
        return
    }
    $http.jsonp(HTTP_HOST + "/GetUserInfo?username="+user.username+"&password="+user.password+"&jsoncallback=JSON_CALLBACK").
      success(function(data, status) {
        if (data.root.length == 0) {
          $ionicPopup.alert({
            title: '错误提示',
            template: '用户或密码不正确!'
          });
          return
        }
        var accountInfo = data.root[0];
        USER_ID=accountInfo.UserId;
        if (user.isSave) {
          window.localStorage.setItem("reais3_username", user.username);
          window.localStorage.setItem("reais3_password", user.password);
          window.localStorage.setItem("reais3_isSave", user.isSave);
        }else{
          window.localStorage.setItem("reais3_username", "");
          window.localStorage.setItem("reais3_password", "");
          window.localStorage.setItem("reais3_isSave", false);
        }

        //window.plugins.ToastPlugin.ShowToast('欢迎'+accountInfo.UserName+'进入系统!',3000);
        $state.go('tabs.wait');
      }).
      error(function(data, status) {
        console.log("error");
    });

  };
  
})
.controller('WaitTabCtrl', function($scope,$http) {
  console.log('WaitTabCtrl');
  $http.jsonp(HTTP_HOST+"/GetItemList?page=1&rolekind=7&currentstatus=0&userid="+USER_ID+"&jsoncallback=JSON_CALLBACK").
    success(function(data, status) {
      $scope.items=data.root;   
    }).
    error(function(data, status) {
      console.log("error");
  });
})
.controller('WorkingTabCtrl',function($scope,$http,$timeout){
  console.log('WorkingTabCtrl');
  $http.jsonp(HTTP_HOST+"/GetItemList?page=1&rolekind=7&currentstatus=1&userid="+USER_ID+"&jsoncallback=JSON_CALLBACK").
    success(function(data, status) {
      $scope.items=data.root;   
    }).
    error(function(data, status) {
      console.log("error");
  });
})
.controller('AlreadyTabCtrl', function($scope, $http) {
  console.log('AlreadyTabCtrl');
  $http.jsonp(HTTP_HOST+"/GetItemList?page=1&rolekind=7&currentstatus=2&userid="+USER_ID+"&jsoncallback=JSON_CALLBACK").
    success(function(data, status) {
      $scope.items=data.root;   
    }).
    error(function(data, status) {
      console.log("error");
  });
})
.controller('AccountTabCtrl', function($scope, $http,$ionicModal) {
  console.log('AccountTabCtrl');
  $ionicModal.fromTemplateUrl('templates/password.html', {scope: $scope}).then(function(modal) {
    $scope.modal = modal;
  });

})
.controller('StationTabCtrl',function($scope,$http,$stateParams){
  console.log('StationTabCtrl');
  $scope.TaskId=$stateParams.TaskId;
  $scope.ProjectId=$stateParams.ProjectId;
  PROJECT_ID=$stateParams.ProjectId;
  $http.jsonp(HTTP_HOST+"/GetItemSiteList?page=1&itemid="+$scope.TaskId+"&userid="+USER_ID+"&jsoncallback=JSON_CALLBACK").
    success(function(data, status) {
      $scope.items=data.root;
    }).
    error(function(data, status) {
      console.log("error");
  });
})
.controller('ContentTabCtrl',function($scope,$http,$stateParams){
  console.log('ContentTabCtrl');
  $scope.TaskId=$stateParams.TaskId;
  $scope.SiteId=$stateParams.SiteId;
  $http.jsonp(HTTP_HOST+"/GetSiteAllStatus?TaskId="+$scope.TaskId+"&SiteId="+$scope.SiteId+"&jsoncallback=JSON_CALLBACK").
    success(function(data, status) {
      $scope.item=data.root[0];
    }).
    error(function(data, status) {
      console.log("error");
  });
})
.controller('CheckinTabCtrl',function($scope,$stateParams,$http,$ionicPopup,$timeout){
  console.log('CheckinTabCtrl');
  $scope.checkintext="开始签到";
  $scope.TaskId=$stateParams.TaskId;
  $scope.SiteId=$stateParams.SiteId;
  
  $timeout(function() {
    var map = new BMap.Map("map"); 
    function LocationControl(){      
      // 设置默认停靠位置和偏移量    
      this.defaultAnchor = BMAP_ANCHOR_TOP_LEFT;      
      this.defaultOffset = new BMap.Size(10, 10);      
    }
    LocationControl.prototype = new BMap.Control();
    LocationControl.prototype.initialize = function(map) {  
      var div = document.createElement("div");  
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
      div.onclick = function(e) {
          console.log('重新定位');
          map.clearOverlays();
          var p = new BMap.Point(parseFloat(NowLocation.SignLng), parseFloat(NowLocation.SignLat));
          var marker = new BMap.Marker(p);
          map.addOverlay(marker);
          map.centerAndZoom(p,17);      
      }; 
      map.getContainer().appendChild(div);
      return div;
    }
    var myLocationControl = new LocationControl();           
    map.addControl(myLocationControl); 

    $http.jsonp(HTTP_HOST + "/GetSiteSign?TaskId=" + $scope.TaskId + "&SiteId=" + $scope.SiteId + "&jsoncallback=JSON_CALLBACK").
    success(function(data, status) {
      if (data.root[0].SignLng != "" && data.root[0].SignLat != "") {
        $scope.checkintext="重新签到";
        point = new BMap.Point(parseFloat(data.root[0].SignLng), parseFloat(data.root[0].SignLat));
        map.clearOverlays();
        marker = new BMap.Marker(point);
        map.addOverlay(marker);
        map.centerAndZoom(point, 17);
      } else {
        point = new BMap.Point(parseFloat(NowLocation.SignLng), parseFloat(NowLocation.SignLat));
        map.clearOverlays();
        marker = new BMap.Marker(point);
        map.addOverlay(marker);
        map.centerAndZoom(point, 17);
      }
    }).
    error(function(data, status) {
      console.log("error");
    });

  }, 500);



  $scope.checkin=function(e){
    $http.jsonp(WEB_HOST+"/Public/goSign.aspx?UserId="+USER_ID+"&ProjectId="+PROJECT_ID+"&TaskId="+$scope.TaskId+"&SiteId="+$scope.SiteId+"&SignLng="+NowLocation.SignLng+"&SignLat="+NowLocation.SignLat+"&Altitude="+NowLocation.Altitude+"&jsoncallback=JSON_CALLBACK").
      success(function(data, status) {
        if (data.result.toLowerCase()=="ok") {
          $ionicPopup.alert({
            title: '提示信息',
            template: "签到成功!"
          });
          $scope.checkintext="重新签到";
        }else{
          $ionicPopup.alert({
            title: '提示信息',
            template: "签到失败!"
          });
        }
      }).
      error(function(data, status) {
        console.log("error");
    });
  }
})
.controller('InfotypesTabCtrl',function($scope,$http,$stateParams,$ionicHistory,$ionicPopup){
  console.log('InfotypesTabCtrl');
  $scope.TaskId=$stateParams.TaskId;
  $scope.SiteId=$stateParams.SiteId;
  $scope.submit=function(e){
    var confirmPopup = $ionicPopup.confirm({
      title: '确认信息',
      template: '确定提表单信息吗?'
    });
    confirmPopup.then(function(res) {
      if (res) {
        $http.jsonp(HTTP_HOST + "/TaskFormStatusSubmit?UserId=" + USER_ID + "&SiteId=" + $scope.SiteId + "&TaskId=" + $scope.TaskId + "&jsoncallback=JSON_CALLBACK").
        success(function(data, status) {
          console.log(data);
          if (data.result.toLowerCase()=="ok") {
            $ionicHistory.clearCache();
            $ionicHistory.goBack();
          }else{
            $ionicPopup.alert({
              title: '错误提示',
              template: data.msg
            });
          }
        }).
        error(function(data, status) {
          console.log("error");
        });
      } else {
        console.log('You are not sure');
      }
    });
  }
  $http.jsonp(HTTP_HOST+"/GetTaskInfoTypes?TaskId="+$scope.TaskId+"&jsoncallback=JSON_CALLBACK").
    success(function(data, status) {
      $scope.items=data.root;
    }).
    error(function(data, status) {
      console.log("error");
  });

})
.controller('FormTabCtrl',function($scope,$http,$stateParams){
  console.log('FormTabCtrl');
  $scope.TaskId=$stateParams.TaskId;
  $scope.SiteId=$stateParams.SiteId;
  $scope.TypeID=$stateParams.TypeID;
  $http.jsonp(HTTP_HOST+"/GetTaskPropertys?TaskId="+$scope.TaskId+"&SiteId="+$scope.SiteId+"&TypeID="+$scope.TypeID+"&jsoncallback=JSON_CALLBACK").
    success(function(data, status) {
      $scope.items=data.root;
    }).
    error(function(data, status) {
      console.log("error");
  });

})
.controller('GroupFormTabCtrl',function($scope,$http,$stateParams){
  console.log('GroupFormTabCtrl');

  $scope.TaskId=$stateParams.TaskId;
  $scope.SiteId=$stateParams.SiteId;
  $scope.TypeID=$stateParams.TypeID;
  $scope.PropertyID=$stateParams.PropertyID;
  $scope.PropertylName=$stateParams.PropertylName;
  $scope.IsPropertyGroup=$stateParams.IsPropertyGroup;

  $http.jsonp(HTTP_HOST+"/GetTaskPropertyControl?TaskId="+$scope.TaskId+"&SiteId="+$scope.SiteId+"&TypeID="+$scope.TypeID+"&PropertyID="+$scope.PropertyID+"&IsPropertyGroup="+$scope.IsPropertyGroup+"&jsoncallback=JSON_CALLBACK").
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
.controller('BaseFormTabCtrl',function($scope,$http,$stateParams,$ionicHistory,$ionicPopup){
  console.log('BaseFormTabCtrl');
  $scope.title=$stateParams.PropertylName;

  $scope.TaskId=$stateParams.TaskId;
  $scope.SiteId=$stateParams.SiteId;
  $scope.TypeID=$stateParams.TypeID;
  $scope.PropertyID=$stateParams.PropertyID;
  $scope.PropertylName=$stateParams.PropertylName;
  $scope.IsPropertyGroup=$stateParams.IsPropertyGroup;

  //确定按钮事件
  $scope.confirm=function(e){
    var inputValue = "";
    if ($scope.item.ShowType == "0" || $scope.item.ShowType == "1" || $scope.item.ShowType == "2") {
      inputValue = $scope.item.Defaults;
      console.log(inputValue);
    }
    if ($scope.item.ShowType == "3" || $scope.item.ShowType == "4") {
      inputValue = $scope.data.clientSide;
    }
    //当是多选框的时候,获取多选值
    if ($scope.item.ShowType=="5") {
      for (var i = 0; i < $scope.checkboxs.length; i++) {
        if ($scope.checkboxs[i].checked) {
          if (inputValue == "") {
            inputValue = $scope.checkboxs[i].text;
          } else {
            inputValue = inputValue + "," + $scope.checkboxs[i].text;
          }
        }
      }
    }
    switch ($scope.item.Validator) {
      case "NotNull":
        if (inputValue == "") {
          $ionicPopup.alert({
            title: '错误提示',
            template: '请选择或输入内容!'
          });
          return;
        }
        break;
      case "Num":
        var re=/^[0-9]*$/
        if (inputValue == "" || !re.test(inputValue)) {
          $ionicPopup.alert({
            title: '错误提示',
            template: '请填写数字!'
          });
          return;
        }
        break;
      case "NumOrNull":
        var re=/^[0-9]*$/
        if (inputValue == "" || !re.test(inputValue)) {
          $ionicPopup.alert({
            title: '错误提示',
            template: '请填写数字或不填!'
          });
          return;
        }
        break;
      case "Phone":
        var re = /^(\(\d{3,4}\)|\d{3,4}-)?\d{7,8}$/
        if (inputValue == "" || !re.test(inputValue)) {
          $ionicPopup.alert({
            title: '错误提示',
            template: '请填写正确电话号码!'
          });
          return;
        }
        break;
      case "PhoneOrNull":
        var re = /^(\(\d{3,4}\)|\d{3,4}-)?\d{7,8}$/
        if (inputValue != "" && re.test(inputValue)) {
          $ionicPopup.alert({
            title: '错误提示',
            template: '请填写正确的电话号码或不填!'
          });
          return;
        }
        break;
      case "Mobile":
        var re = /^(13[0-9]|15[0|3|6|7|8|9]|18[8|9])\d{8}$/
        if (inputValue == "" || !re.test(inputValue)) {
          $ionicPopup.alert({
            title: '错误提示',
            template: '请填写正确的手机号码!'
          });
          return;
        }
        break;
      case "MobileOrNull":
          var re = /^(13[0-9]|15[0|3|6|7|8|9]|18[8|9])\d{8}$/
          if (inputValue != "") {
            if (!re.test(inputValue)) {
              $ionicPopup.alert({
                title: '错误提示',
                template: '请填写正确的手机号码或不填!'
              });
              retrun;
            }
          }
        break;
      case "MobileOrPhoneOrNull":
        if (inputValue != "") {
          var mre = /^(13[0-9]|15[0|3|6|7|8|9]|18[8|9])\d{8}$/;
          var pre = /^(\(\d{3,4}\)|\d{3,4}-)?\d{7,8}$/;
          if (!mre.test(inputValue) || !pre.test(inputValue)) {
            $ionicPopup.alert({
              title: '错误提示',
              template: '请填写正确的手机号码或电话号码或不填!'
            });
            retrun;
          }
        }
        break;
      case "Email":
        var re=/^\w{3,}@\w+(\.\w+)+$/
        if (inputValue == "" || !re.test(inputValue)) {
          $ionicPopup.alert({
            title: '错误提示',
            template: '请填写正确的邮箱地址!'
          });
          retrun;
        }
        break;
      case "EmailOrNull":
        var re = /^\w{3,}@\w+(\.\w+)+$/
        if (inputValue != "") {
          if (!re.test(inputValue)) {
            $ionicPopup.alert({
              title: '错误提示',
              template: '请填写正确的邮箱地址或不填!'
            });
            retrun;
          }
        }
        break;
      case "Date":
        var re = /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/;
        if (!re.test(inputValue)) {
          $ionicPopup.alert({
            title: '错误提示',
            template: '请填写正确的日期!'
          });
          retrun;
        }
        break;
    }
    //发送数据到后台服务器
    $http.jsonp(HTTP_HOST+"/TaskFormDataUpload?UserId="+USER_ID+"&ProjectId="+PROJECT_ID+"&TaskId="+$scope.TaskId+"&SiteId="+$scope.SiteId+"&PropertyID="+$scope.PropertyID+"&PropertylName="+$scope.PropertylName+"&PropertyInstance_Value="+inputValue+"&jsoncallback=JSON_CALLBACK").
      success(function(data, status) {
         if (data.result.toLowerCase()=="ok") {
          $ionicHistory.clearCache();
          $ionicHistory.goBack();
         }
      }).
      error(function(data, status) {
        console.log("error");
    });
  };
  //从后台获取表单类型
  $http.jsonp(HTTP_HOST+"/GetTaskPropertyControl?TaskId="+$scope.TaskId+"&SiteId="+$scope.SiteId+"&TypeID="+$scope.TypeID+"&PropertyID="+$scope.PropertyID+"&IsPropertyGroup="+$scope.IsPropertyGroup+"&jsoncallback=JSON_CALLBACK").
    success(function(data, status) {
      $scope.item=data.root[0];
      $scope.data={clientSide:$scope.item.Defaults};

      //处理日期
      if ($scope.item.ShowType == "1") {
        if ($scope.item.Defaults.toLowerCase() == "now" || $scope.item.Defaults == "") {
          $scope.item.Defaults = new Date().Format("yyyy-MM-dd");
        }
      }
      //处理下拉框,单选框
      if ($scope.item.ShowType == "3" || $scope.item.ShowType == "4" || $scope.item.ShowType == "5") {
        var radios = new Array();
        var optional = $scope.item.PropertyValue.split(",");

        for (var i = 0; i < optional.length; i++) {
          var radio = {
            text: optional[i],
            value:optional[i]
          };
          radios.push(radio);
        }
        $scope.radios = radios;
      }
      //如果是多选框
      if ($scope.item.ShowType == "5"){
        var checkboxs =new Array();
        var optional = $scope.item.PropertyValue.split(",");
        var defaults = $scope.item.Defaults.split(",");
        for (var i = 0; i < optional.length; i++) {
          var checkbox = {
            "text": optional[i],
            "checked": false
          };
          for (var j = 0; j < defaults.length; j++) {
            if (optional[i] == defaults[j]) {
              checkbox.checked = true;
              break;
            }
          }
          checkboxs.push(checkbox);
        }
        $scope.checkboxs = checkboxs;
      }
    }).
    error(function(data, status) {
      console.log("error");
  });

})
.controller('ImagetypesTabCtrl',function($scope,$stateParams,$http){
  console.log('ImagetypesTabCtrl');
  $scope.TaskId=$stateParams.TaskId;
  $scope.SiteId=$stateParams.SiteId;
  $http.jsonp(HTTP_HOST+"/getSiteDirectory?TaskId="+$scope.TaskId+"&SiteId="+$scope.SiteId+"&jsoncallback=JSON_CALLBACK").
    success(function(data, status) {
      $scope.items=data.root;
    }).
    error(function(data, status) {
      console.log("error");
  });
})
.controller('ImageupTabCtrl',function($scope,$stateParams,$http){
  console.log('ImageupTabCtrl');
  $scope.TaskId=$stateParams.TaskId;
  $scope.SiteId=$stateParams.SiteId;
  $scope.DirectoryID=$stateParams.DirectoryID;

  $http.jsonp(HTTP_HOST+"/getSitePicName?&page=1&TaskId="+$scope.TaskId+"&SiteId="+$scope.SiteId+"&DirectoryID="+$scope.DirectoryID+"&PicId=&IsNextPic=0&jsoncallback=JSON_CALLBACK").
    success(function(data, status) {
      $scope.items=data.root;
    }).
    error(function(data, status) {
      console.log("error");
  });
})
.controller('ImagelistTabCtrl',function($scope,$stateParams,$http,$ionicModal){
  console.log('ImagelistTabCtrl');
  $scope.TaskId=$stateParams.TaskId;
  $scope.SiteId=$stateParams.SiteId;
  $scope.DirectoryID=$stateParams.DirectoryID;

  $scope.web_host=WEB_HOST;

  $ionicModal.fromTemplateUrl('templates/imagemodal.html', {scope: $scope}).then(function(modal) {
    $scope.modal = modal;
    $scope.cameraEvent=function(e){
      console.log("相机");
      //相机
      event.preventDefault();
      var destinationType = navigator.camera.DestinationType;
      var options = {
        //quality: 50,
        destinationType: destinationType.FILE_URI,
        targetWidth: 1280,
        targetHeight: 768
      };
      navigator.camera.getPicture(function(data) {
        var imageURI=data;
        var params = {"UserId": USER_ID,"ProjectId": PROJECT_ID,"TaskId":$scope.TaskId,"SiteId":$scope.SiteId,"PicId":$scope.PicId,"PicName":$scope.PicName,"DirectoryID":$scope.DirectoryID,"DirectoryName":""};
        fuOptions = new FileUploadOptions();
        fuOptions.fileKey = "file";
        fuOptions.fileName = imageURI.substr(imageURI.lastIndexOf('/')+1);
        fuOptions.mimeType = "multipart/form-data";
        fuOptions.params = params; 
        var ft = new FileTransfer();
        ft.onprogress = showUploadingProgress;
        navigator.notification.progressStart("", "当前上传进度");

        ft.upload(imageURI, encodeURI(WEB_HOST + '/Public/uploadfile.aspx'), function(r) {
          navigator.notification.progressStop();
          var result=JSON.parse(r.response);
          if (result.result.toLowerCase() == "ok") {
            navigator.notification.alert("图片上传成功", function(){},"操作提示","确定");
          } else {
            navigator.notification.alert("提交上传失败", function() {
            }, "错误提示", "确定");
          }
          //删除上传的图片
          deletePictureFromCache(imageURI);
        }, null, fuOptions);

      }, function(error) {
        console.log('Error');
      }, options);

    };
    $scope.albumEvent=function(e){
      console.log("相册");
      //相机
      event.preventDefault();
      var source = navigator.camera.PictureSourceType.PHOTOLIBRARY; 
      //描述类型，取文件路径
      var destinationType = navigator.camera.DestinationType.FILE_URI; 
      var mediaType = navigator.camera.MediaType.PICTURE; 
      var options={ destinationType : destinationType,allowEdit:false, sourceType : source,targetWidth: 1280,targetHeight:768, mediaType : mediaType}; 
      
      navigator.camera.getPicture(function(data) {
        var imageURI=data.substring(0,data.lastIndexOf('?'));
        var params = {"UserId": USER_ID,"ProjectId": PROJECT_ID,"TaskId":$scope.TaskId,"SiteId":$scope.SiteId,"PicId":$scope.PicId,"PicName":$scope.PicName,"DirectoryID":$scope.DirectoryID,"DirectoryName":""};
        fuOptions = new FileUploadOptions();
        fuOptions.fileKey = "file";
        fuOptions.fileName = imageURI.substr(imageURI.lastIndexOf('/')+1);
        fuOptions.mimeType = "multipart/form-data";
        fuOptions.params = params; 
        var ft = new FileTransfer();
        ft.onprogress = showUploadingProgress;
        navigator.notification.progressStart("", "当前上传进度");

        ft.upload(imageURI, encodeURI(WEB_HOST + '/Public/uploadfile.aspx'), function(r) {
          navigator.notification.progressStop();
          var result=JSON.parse(r.response);
          if (result.result.toLowerCase() == "ok") {
            navigator.notification.alert("图片上传成功", function(){},"操作提示","确定");
          } else {
            navigator.notification.alert("提交上传失败", function() {
            }, "错误提示", "确定");
          }
        }, null, fuOptions);

      }, function(error) {
        console.log('Error');
      }, options);
    };
  });

  $http.jsonp(HTTP_HOST+"/getSitePicName?&page=1&TaskId="+$scope.TaskId+"&SiteId="+$scope.SiteId+"&DirectoryID="+$scope.DirectoryID+"&PicId=&IsNextPic=0&jsoncallback=JSON_CALLBACK").
    success(function(data, status) {
      $scope.items=data.root;
    }).
    error(function(data, status) {
      console.log("error");
  });
  $scope.upImage=function(e){
    $scope.PicId=e.PicId;
    $scope.PicName=e.PicName;
    $scope.modal.show();
  }
})
.controller('PeriodTabCtrl',function($scope,$stateParams,$http,$ionicPopup,$ionicHistory){
  console.log('PeriodTabCtrl');
  $scope.TaskId=$stateParams.TaskId;
  $scope.SiteId=$stateParams.SiteId;

  $scope.pushData = function(e) {

    var confirmPopup = $ionicPopup.confirm({
      title: '确认提示',
      template: '确定采用('+e.TaskName+')的数据吗?'
    });
    confirmPopup.then(function(res) {
      if (res) {
        $http.jsonp(HTTP_HOST + "/SetCurrentPropertyValue?&FromTaskId="+e.TaskId+"&ToTaskId=" + $scope.TaskId + "&ToSiteId="+$scope.SiteId+"&jsoncallback=JSON_CALLBACK").
        success(function(data, status) {
          if (data.result.toLowerCase()=="ok") {
            $ionicHistory.clearCache();
            $ionicHistory.goBack();
          }else{
            $ionicPopup.alert({
              title: '错误提示',
              template: data.msg
            });
          }
        }).
        error(function(data, status) {
          console.log("error");
        });
      } else {
        console.log('You are not sure');
      }
    });
  }
  $http.jsonp(HTTP_HOST+"/GetHistoryTask?&page=1&SiteId="+$scope.SiteId+"&jsoncallback=JSON_CALLBACK").
    success(function(data, status) {
      $scope.items=data.root;
    }).
    error(function(data, status) {
      console.log("error");
  });
})
.controller('TalkTabCtrl',function($scope,$stateParams,$http){
  console.log('TalkTabCtrl');
});
