var surveyControllers = angular.module('surveyControllers', []);
surveyControllers.controller('NavBarCtrl', function($scope, $ionicHistory) {
		console.log('NavBarCtrl');
		$scope.ClearCacheGoBack = function() {
			$ionicHistory.clearCache();
			$ionicHistory.goBack();
		};
	}),
	surveyControllers.controller('TabsCtrl', function($scope, $state) {
		console.log('TabsCtrl');
		$scope.recover1 = function() {
			$state.go("tabs.wait");
		};
		$scope.recover2 = function() {
			$state.go("tabs.working");
		};
		$scope.recover3 = function() {
			$state.go("tabs.already");
		};
	}),
	surveyControllers.controller('SignInCtrl', function($scope, $state, $ionicPopup, $http, $ionicLoading, $ionicPopup,ReaisService) {
		var account=window.LS.get("reais3_account")==null?{userId:"",username:"",password:"",isSave:false}:JSON.parse(window.LS.get("reais3_account"));
		$scope.user = account;
		$scope.signIn = function(user) {
			if (user.username == "") {
				$ionicPopup.alert({
					title: '错误提示',
					template: '用户名不能为空!',
					okText: "确定"
				});
				return
			}
			if (user.password == "") {
				$ionicPopup.alert({
					title: '错误提示',
					template: '密码不能为空!',
					okText: "确定"
				});
				return
			}
			$ionicLoading.show({
				template: '正在加载中...'
			});
			ReaisService.GetUserInfo(user.username,user.password,user.isSave,function(data){
				$ionicLoading.hide();
				if (data.root.length == 0) {
					$ionicPopup.alert({
						title: '错误提示',
						template: '用户或密码不正确!',
						okText: "确定"
					});
					return
				}
				var accountInfo = data.root[0];
				USER_ID = accountInfo.UserId;
				user.userId=USER_ID;
				if (user.isSave) {
					window.LS.set("reais3_account",JSON.stringify(user));
				} else {
					window.LS.remove("reais3_account");
				}
				$state.go('tabs.wait');
			},function(data){
				$ionicLoading.hide();
				network($ionicLoading, $ionicPopup);
			});
		};

	}),
	surveyControllers.controller('WaitTabCtrl', function($scope, $http, $ionicLoading, $ionicPopup,ReaisService) {
		console.log('WaitTabCtrl');
		ReaisService.GetItemList("0",function(data){
			$scope.items = data.root;
		},function(data){
			network($ionicLoading, $ionicPopup);
		});
	}),
	surveyControllers.controller('WorkingTabCtrl', function($scope, $http, $timeout, $ionicLoading, $ionicPopup,ReaisService) {
		console.log('WorkingTabCtrl');
		ReaisService.GetItemList("1",function(data){
			$scope.items = data.root;
		},function(data){
			network($ionicLoading, $ionicPopup);
		});
	}),
	surveyControllers.controller('AlreadyTabCtrl', function($scope, $http, $ionicLoading, $ionicPopup) {
		console.log('AlreadyTabCtrl');
		$http.jsonp(HTTP_HOST + "/GetItemList?page=1&rolekind=7&currentstatus=2&userid=" + USER_ID + "&jsoncallback=JSON_CALLBACK").
		success(function(data, status) {
			$scope.items = data.root;
		}).
		error(function(data, status) {
			network($ionicLoading, $ionicPopup);
		});
	}),
	surveyControllers.controller('AccountTabCtrl', function($scope, $http, $ionicModal, $state, $ionicLoading, $ionicPopup, $ionicHistory,ReaisService) {
		console.log('AccountTabCtrl');
		$ionicModal.fromTemplateUrl('templates/password.html', {
			scope: $scope
		}).then(function(modal) {
			$scope.modal = modal;
			$scope.modifyPassword = function(e) {
				if (e.newPsd != e.newPsdAgain) {
					$ionicPopup.alert({
						title: '错误提示',
						template: "两次密码输入不一样!",
						okText: "确定"
					});
					return
				}
				$ionicLoading.show({
					template: '正在加载中...'
				});
				$http.jsonp(HTTP_HOST + "/modifyPassword?&userid=" + USER_ID + "&oldpass=" + e.oldPsd + "&newpass=" + e.newPsd + "&jsoncallback=JSON_CALLBACK").
				success(function(data, status) {
					$ionicLoading.hide();
					if (data.result.toLowerCase() == "ok") {
						$ionicPopup.alert({
							title: '成功提示',
							template: "密码修改成功!",
							okText: "确定"
						});
						modal.hide();
					} else {
						$ionicPopup.alert({
							title: '错误提示',
							template: "密码修改失败!",
							okText: "确定"
						});
					}
				}).
				error(function(data, status) {
					$ionicLoading.hide();
					network($ionicLoading, $ionicPopup);
				});
			}
		});
		$scope.exit = function() {
			USER_ID = "";
			$ionicHistory.clearHistory();
			$state.go('signin');

		}
		$scope.offline=window.LS.get("reais3_offline_"+USER_ID)==null?{checked: false }:JSON.parse(window.LS.get("reais3_offline_"+USER_ID));
		$scope.offlineChange=function(){
			if (navigator.onLine) {
				$ionicLoading.show({
					template: '正在同步数据中...'
				});
				ReaisService.DownloadOffLineData($scope.offline.checked,function(data){
					$ionicLoading.hide();
					if (data.result=="ok") {
						console.log("切换成功");
					}
				},function(data){
					$ionicLoading.hide();
					if (data.result=="error") {
						console.log("切换失败");
					}
				})
				window.LS.set("reais3_offline_"+USER_ID, JSON.stringify($scope.offline));
			}else{
				$ionicPopup.alert({
					title: '提示信息',
					template: "请在在线状态下切换模式!",
					okText: "确定"
				});
				$scope.offline.checked=!$scope.offline.checked;
				window.LS.set("reais3_offline_"+USER_ID, JSON.stringify($scope.offline));
			}
		}
	}),
	surveyControllers.controller('StationTabCtrl', function($scope, $http, $stateParams, $ionicLoading, $ionicPopup,ReaisService) {
		console.log('StationTabCtrl');
		$scope.TaskId = $stateParams.TaskId;
		$scope.ProjectId = $stateParams.ProjectId;
		PROJECT_ID = $stateParams.ProjectId;
		$scope.setSiteState = function(e) {
			SITE_STSTUS = e.Status;
		}
		ReaisService.GetItemSiteList($scope.TaskId,function(data){
			$scope.items = data.root;
		},function(data){
			network($ionicLoading, $ionicPopup);
		});
	}),
	surveyControllers.controller('ContentTabCtrl', function($scope, $http, $stateParams, $ionicLoading, $ionicPopup,ReaisService) {
		console.log('ContentTabCtrl');
		$scope.TaskId = $stateParams.TaskId;
		$scope.SiteId = $stateParams.SiteId;

		$scope.tip = function() {
			$ionicPopup.alert({
				title: '提示信息',
				template: "请先签到!",
				okText: "确定"
			});
		}
		ReaisService.GetSiteAllStatus($scope.TaskId,$scope.SiteId,function(data){
			$scope.item = data.root[0];
		},function(data){
			network($ionicLoading, $ionicPopup);
		});
	}),
	surveyControllers.controller('CheckinTabCtrl', function($scope, $stateParams, $http, $timeout, $ionicLoading, $ionicPopup) {
		console.log('CheckinTabCtrl');
		$scope.checkintext = "开始签到";
		$scope.TaskId = $stateParams.TaskId;
		$scope.SiteId = $stateParams.SiteId;

		$scope.displaySubmitBtn = true;
		if (SITE_STSTUS.length > 1 && SITE_STSTUS.substring(1, 2) == "2") {
			$scope.displaySubmitBtn = false;
		}
		$timeout(function() {
			var map = new BMap.Map("map");

			function LocationControl() {
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
				div.onmouseover = function(e) {
					div.style.background = "url(img/location.png) -324px 0px no-repeat";
				};
				div.onmouseout = function(e) {
					div.style.background = "url(img/location.png) -288px 0px no-repeat";
				};
				div.onclick = function(e) {
					console.log('重新定位');
					map.clearOverlays();
					var p = new BMap.Point(parseFloat(NowLocation.SignLng), parseFloat(NowLocation.SignLat));
					var marker = new BMap.Marker(p);
					map.addOverlay(marker);
					map.centerAndZoom(p, 17);
				};
				map.getContainer().appendChild(div);
				return div;
			}
			var myLocationControl = new LocationControl();
			map.addControl(myLocationControl);
			$ionicLoading.show({
				template: '正在加载中...'
			});
			$http.jsonp(HTTP_HOST + "/GetSiteSign?TaskId=" + $scope.TaskId + "&SiteId=" + $scope.SiteId + "&jsoncallback=JSON_CALLBACK").
			success(function(data, status) {
				$ionicLoading.hide();
				if (data.root[0].SignLng != "" && data.root[0].SignLat != "") {
					$scope.checkintext = "重新签到";
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
				$ionicLoading.hide();
				network($ionicLoading, $ionicPopup);
			});

		}, 500);



		$scope.checkin = function(e) {
			$ionicLoading.show({
				template: '正在加载中...'
			});
			$http.jsonp(WEB_HOST + "/Public/goSign.aspx?UserId=" + USER_ID + "&ProjectId=" + PROJECT_ID + "&TaskId=" + $scope.TaskId + "&SiteId=" + $scope.SiteId + "&SignLng=" + NowLocation.SignLng + "&SignLat=" + NowLocation.SignLat + "&Altitude=" + NowLocation.Altitude + "&jsoncallback=JSON_CALLBACK").
			success(function(data, status) {
				$ionicLoading.hide();
				if (data.result.toLowerCase() == "ok") {
					$ionicPopup.alert({
						title: '提示信息',
						template: "签到成功!",
						okText: "确定"
					});
					$scope.checkintext = "重新签到";
				} else {
					$ionicPopup.alert({
						title: '提示信息',
						template: "签到失败!",
						okText: "确定"
					});
				}
			}).
			error(function(data, status) {
				$ionicLoading.hide();
				network($ionicLoading, $ionicPopup);
			});
		}
	}),
	surveyControllers.controller('InfotypesTabCtrl', function($scope, $http, $stateParams, $ionicHistory, $ionicLoading, $ionicPopup,ReaisService) {
		console.log('InfotypesTabCtrl');
		$scope.TaskId = $stateParams.TaskId;
		$scope.SiteId = $stateParams.SiteId;
		$scope.displaySubmitBtn = true;
		if (SITE_STSTUS.length > 1 && SITE_STSTUS.substring(1, 2) == "2") {
			$scope.displaySubmitBtn = false;
		}
		$scope.submit = function(e) {
			var confirmPopup = $ionicPopup.confirm({
				title: '确认信息',
				template: '确定提表单信息吗?',
				cancelText: "取消",
				okText: "确定"
			});
			confirmPopup.then(function(res) {
				if (res) {
					$ionicLoading.show({
						template: '正在加载中...'
					});
					$http.jsonp(HTTP_HOST + "/TaskFormStatusSubmit?UserId=" + USER_ID + "&SiteId=" + $scope.SiteId + "&TaskId=" + $scope.TaskId + "&jsoncallback=JSON_CALLBACK").
					success(function(data, status) {
						$ionicLoading.hide();
						if (data.result.toLowerCase() == "ok") {
							$ionicHistory.clearCache();
							$ionicHistory.goBack();
						} else {
							$ionicPopup.alert({
								title: '错误提示',
								template: data.msg,
								okText: "确定"
							});
						}
					}).
					error(function(data, status) {
						$ionicLoading.hide();
						network($ionicLoading, $ionicPopup);
					});
				} else {
					console.log('You are not sure');
				}
			});
		}
		ReaisService.GetTaskInfoTypes($scope.TaskId,$scope.SiteId,function(data){
			$scope.items = data.root;
		},function(data){
			network($ionicLoading, $ionicPopup);
		});
	}),
	surveyControllers.controller('FormTabCtrl', function($scope, $http, $stateParams, $ionicLoading, $ionicPopup,ReaisService) {
		console.log('FormTabCtrl');
		$scope.TaskId = $stateParams.TaskId;
		$scope.SiteId = $stateParams.SiteId;
		$scope.TypeID = $stateParams.TypeID;

		$scope.displayHref = true;
		if (SITE_STSTUS.length > 1 && SITE_STSTUS.substring(1, 2) == "2") {
			$scope.displayHref = false;
		}
		ReaisService.GetTaskPropertys($scope.TaskId,$scope.SiteId,$scope.TypeID,function(data){
			$scope.items = data.root;
		},function(data){
			network($ionicLoading, $ionicPopup);
		});
	}),
	surveyControllers.controller('GroupFormTabCtrl', function($scope, $http, $stateParams, $ionicLoading, $ionicPopup,ReaisService) {
		console.log('GroupFormTabCtrl');

		$scope.TaskId = $stateParams.TaskId;
		$scope.SiteId = $stateParams.SiteId;
		$scope.TypeID = $stateParams.TypeID;
		$scope.PropertyID = $stateParams.PropertyID;
		$scope.PropertylName = $stateParams.PropertylName;
		$scope.IsPropertyGroup = $stateParams.IsPropertyGroup;

		$scope.displayHref = true;
		if (SITE_STSTUS.length > 1 && SITE_STSTUS.substring(1, 2) == "2") {
			$scope.displayHref = false;
		}
		ReaisService.GetTaskPropertyControl($scope.TaskId, $scope.SiteId, $scope.TypeID, $scope.PropertyID, $scope.IsPropertyGroup, function(data) {
			$scope.items = data.root;
		}, function(data) {
			network($ionicLoading, $ionicPopup);
		})
	}),
	surveyControllers.controller('BaseFormTabCtrl', function($scope, $http, $stateParams, $ionicHistory, $ionicLoading, $ionicPopup,ReaisService) {
		console.log('BaseFormTabCtrl');
		$scope.title = $stateParams.PropertylName;

		$scope.TaskId = $stateParams.TaskId;
		$scope.SiteId = $stateParams.SiteId;
		$scope.TypeID = $stateParams.TypeID;
		$scope.PropertyID = $stateParams.PropertyID;
		$scope.PropertylName = $stateParams.PropertylName;
		$scope.IsPropertyGroup = $stateParams.IsPropertyGroup;

		//确定按钮事件
		$scope.confirm = function(e) {
			var inputValue = "";
			if ($scope.item.ShowType == "0" || $scope.item.ShowType == "1" || $scope.item.ShowType == "2") {
				inputValue = $scope.item.Defaults;
				console.log(inputValue);
			}
			if ($scope.item.ShowType == "3" || $scope.item.ShowType == "4") {
				inputValue = $scope.data.clientSide;
			}
			//当是多选框的时候,获取多选值
			if ($scope.item.ShowType == "5") {
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
							template: '请选择或输入内容!',
							okText: "确定"
						});
						return;
					}
					break;
				case "Num":
					var re = /^[0-9]*$/
					if (inputValue == "" || !re.test(inputValue)) {
						$ionicPopup.alert({
							title: '错误提示',
							template: '请填写数字!',
							okText: "确定"
						});
						return;
					}
					break;
				case "NumOrNull":
					var re = /^[0-9]*$/
					if (inputValue == "" || !re.test(inputValue)) {
						$ionicPopup.alert({
							title: '错误提示',
							template: '请填写数字或不填!',
							okText: "确定"
						});
						return;
					}
					break;
				case "Phone":
					var re = /^(\(\d{3,4}\)|\d{3,4}-)?\d{7,8}$/
					if (inputValue == "" || !re.test(inputValue)) {
						$ionicPopup.alert({
							title: '错误提示',
							template: '请填写正确电话号码!',
							okText: "确定"
						});
						return;
					}
					break;
				case "PhoneOrNull":
					var re = /^(\(\d{3,4}\)|\d{3,4}-)?\d{7,8}$/
					if (inputValue != "" && re.test(inputValue)) {
						$ionicPopup.alert({
							title: '错误提示',
							template: '请填写正确的电话号码或不填!',
							okText: "确定"
						});
						return;
					}
					break;
				case "Mobile":
					var re = /^(13[0-9]|15[0|3|6|7|8|9]|18[8|9])\d{8}$/
					if (inputValue == "" || !re.test(inputValue)) {
						$ionicPopup.alert({
							title: '错误提示',
							template: '请填写正确的手机号码!',
							okText: "确定"
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
								template: '请填写正确的手机号码或不填!',
								okText: "确定"
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
								template: '请填写正确的手机号码或电话号码或不填!',
								okText: "确定"
							});
							retrun;
						}
					}
					break;
				case "Email":
					var re = /^\w{3,}@\w+(\.\w+)+$/
					if (inputValue == "" || !re.test(inputValue)) {
						$ionicPopup.alert({
							title: '错误提示',
							template: '请填写正确的邮箱地址!',
							okText: "确定"
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
								template: '请填写正确的邮箱地址或不填!',
								okText: "确定"
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
							template: '请填写正确的日期!',
							okText: "确定"
						});
						retrun;
					}
					break;
			}
			//发送数据到后台服务器
			$ionicLoading.show({
				template: '正在加载中...'
			});
			ReaisService.TaskFormDataUpload($scope.TypeID, $scope.TaskId, $scope.SiteId, $scope.PropertyID, $scope.PropertylName, inputValue, function(data) {
				$ionicLoading.hide();
				if (data.result.toLowerCase() == "ok") {
					$ionicHistory.clearCache();
					$ionicHistory.goBack();
				}
			}, function(data) {
				$ionicLoading.hide();
				network($ionicLoading, $ionicPopup);
			});
		};
		//从后台获取表单类型
		ReaisService.GetTaskPropertyControl($scope.TaskId,$scope.SiteId,$scope.TypeID,$scope.PropertyID,$scope.IsPropertyGroup,function(data){
			$scope.item = data.root[0];
			$scope.data = {
				clientSide: $scope.item.Defaults
			};
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
						value: optional[i]
					};
					radios.push(radio);
				}
				$scope.radios = radios;
			}
			//如果是多选框
			if ($scope.item.ShowType == "5") {
				var checkboxs = new Array();
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
		
		},function(data){
			network($ionicLoading, $ionicPopup);
		});
	}),
	surveyControllers.controller('ImagetypesTabCtrl', function($scope, $stateParams, $http, $ionicLoading, $ionicPopup,ReaisService) {
		console.log('ImagetypesTabCtrl');
		$scope.TaskId = $stateParams.TaskId;
		$scope.SiteId = $stateParams.SiteId;
		ReaisService.getSiteDirectory($scope.TaskId,$scope.SiteId,function(data){
			$scope.items = data.root;
		},function(data){
			network($ionicLoading, $ionicPopup);
		});
	}),
	surveyControllers.controller('ImageupTabCtrl', function($scope, $stateParams, $http, $ionicModal, $ionicLoading, $ionicPopup,ReaisService) {
		console.log('ImageupTabCtrl');
		$scope.TaskId = $stateParams.TaskId;
		$scope.SiteId = $stateParams.SiteId;
		$scope.DirectoryID = $stateParams.DirectoryID;
		$scope.web_host = WEB_HOST;
		$scope.PicId = "";
		$scope.PicName = "";

		$scope.displayHref = true;
		if (SITE_STSTUS.length > 1 && SITE_STSTUS.substring(1, 2) == "2") {
			$scope.displayHref = false;
		}
		$scope.isShow = function(item) {
			var offlinedel = false;
			if (navigator.onLine) {
				offlinedel = true;
			} else {
				if (item.PicPath.indexOf("file:") != -1) {
					offlinedel = true;
				} else {
					offlinedel = false;
				}
			}
			if ($scope.displayHref && (item.PicStatus != '2') && offlinedel) {
				return true;
			}
			return false;
		};
		ReaisService.getSitePicName($scope.TaskId,$scope.SiteId,$scope.DirectoryID,"0",function(data){
			$scope.items = data.root;
		},function(data){
			network($ionicLoading, $ionicPopup);
		});
		$ionicModal.fromTemplateUrl('templates/imageupmodal.html?9', {
			scope: $scope
		}).then(function(modal) {
			$scope.modal = modal;
			$scope.modal.PicId = $scope.PicId;
			$scope.modal.PicName = $scope.PicName;
			$scope.cameraEvent = function(e) {
				console.log("相机");
				//判断图片是否填写名称

				if (modal.PicName == "") {
					$ionicPopup.alert({
						title: '错误提示',
						template: "请填写图片名称!",
						okText: "确定"
					});
					return
				}
				ReaisService.CheckLimitAndName($scope.TaskId, $scope.SiteId, $scope.DirectoryID, modal.PicId, modal.PicName, function(data) {
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
						var imageURI = data;
						var params = {
							"UserId": USER_ID,
							"ProjectId": PROJECT_ID,
							"TaskId": $scope.TaskId,
							"SiteId": $scope.SiteId,
							"PicId": modal.PicId,
							"PicName": modal.PicName,
							"DirectoryID": $scope.DirectoryID,
							"DirectoryName": ""
						};
						$ionicLoading.show({
							template: '上传中,请等待...'
						});
						ReaisService.ImageUpUpload(params, imageURI, "camera", function(data) {
							$ionicLoading.hide();
							if (data.result.toLowerCase() == "ok") {
								modal.PicName = "";
								modal.PicId = "";
								$ionicPopup.alert({
									title: '成功提示',
									template: "图片上传成功!",
									okText: "确定"
								});
								ReaisService.getSitePicName($scope.TaskId, $scope.SiteId, $scope.DirectoryID, "0", function(data) {
									$scope.items = data.root;
								}, function(data) {
									$ionicLoading.hide();
								});
							}
						}, function(data) {
							$ionicLoading.hide();
							if (data.result.toLowerCase() == "error") {
								$ionicPopup.alert({
									title: '错误提示',
									template: data.msg,
									okText: "确定"
								});
							}
						});
					}, function(error) {
						//上传错误
						$ionicLoading.hide();
					}, options);
				}, function(data) {
					if (data.result == "error") {
						$ionicPopup.alert({
							title: '错误提示',
							template: data.msg,
							okText: "确定"
						});
						return
					}
				});
			};
			$scope.albumEvent = function(e) {
				console.log("相册");
				//判断图片是否填写名称
				if (modal.PicName == "") {
					$ionicPopup.alert({
						title: '错误提示',
						template: "请填写图片名称!",
						okText: "确定"
					});
					return
				}
				ReaisService.CheckLimitAndName($scope.TaskId, $scope.SiteId, $scope.DirectoryID, modal.PicId, modal.PicName, function(data) {
					//相机
					event.preventDefault();
					var source = navigator.camera.PictureSourceType.PHOTOLIBRARY;
					//描述类型，取文件路径
					var destinationType = navigator.camera.DestinationType.FILE_URI;
					var mediaType = navigator.camera.MediaType.PICTURE;
					var options = {
						destinationType: destinationType,
						allowEdit: false,
						sourceType: source,
						targetWidth: 1280,
						targetHeight: 768,
						mediaType: mediaType
					};

					navigator.camera.getPicture(function(data) {
						var imageURI = data.substring(0, data.lastIndexOf('?'));
						var params = {
							"UserId": USER_ID,
							"ProjectId": PROJECT_ID,
							"TaskId": $scope.TaskId,
							"SiteId": $scope.SiteId,
							"PicId": modal.PicId,
							"PicName": modal.PicName,
							"DirectoryID": $scope.DirectoryID,
							"DirectoryName": ""
						};
						$ionicLoading.show({
							template: '上传中,请等待...'
						});
						ReaisService.ImageUpUpload(params, imageURI, "album", function(data) {
							$ionicLoading.hide();
							if (data.result.toLowerCase() == "ok") {
								modal.PicName = "";
								modal.PicId = "";
								$ionicPopup.alert({
									title: '成功提示',
									template: "图片上传成功!",
									okText: "确定"
								});
								ReaisService.getSitePicName($scope.TaskId, $scope.SiteId, $scope.DirectoryID, "0", function(data) {
									$scope.items = data.root;
								}, function(data) {
									//$ionicLoading.hide();
								});
							}
						}, function(data) {
							$ionicLoading.hide();
							if (data.result.toLowerCase() == "error") {
								$ionicPopup.alert({
									title: '错误提示',
									template: data.msg,
									okText: "确定"
								});
							}
						});
					}, function(error) {
						//上传错误
						$ionicLoading.hide();
					}, options);
				}, function(data) {
					if (data.result == "error") {
						$ionicPopup.alert({
							title: '错误提示',
							template: data.msg,
							okText: "确定"
						});
						return
					}
				});
			};
		});
		$scope.imageUpload = function() {
			$scope.modal.show();
		}
		$scope.upImage = function(e) {
			$scope.modal.PicId = e.PicId;
			$scope.modal.PicName = e.PicName;
			$scope.modal.show();
		}
		$scope.delImage = function(e) {
			var confirmPopup = $ionicPopup.confirm({
				title: '确认提示',
				template: '确定删除(' + e.PicName + '),这张图片吗?',
				cancelText: "取消",
				okText: "确定"
			});
			confirmPopup.then(function(res) {
				if (res) {
					$ionicLoading.show({
						template: '正在加载中...'
					});
					ReaisService.DelPicture($scope.TaskId,$scope.SiteId,$scope.DirectoryID,e.PicId,function(data){
						$ionicLoading.hide();
						if (data.result.toLowerCase() == "ok") {
							$ionicPopup.alert({
								title: '成功提示',
								template: "删除成功!",
								okText: "确定"
							});
							ReaisService.getSitePicName($scope.TaskId, $scope.SiteId, $scope.DirectoryID, "0", function(data) {
								$scope.items = data.root;
							}, function(data) {
								//
							});
						}
					},function(error){
						$ionicPopup.alert({
							title: '失败提示',
							template: data.msg,
							okText: "确定"
						});
					});
				} else {
					console.log('You are not sure');
				}
			});
		}
		$scope.photoSwipe = function(pic) {

			//如果离线,不是本地图片的,就不让点
			if (!navigator.onLine) {
				if (pic.PicPath.indexOf("file:") == -1 || pic.PicPath == "") {
					return
				}
			}

			var pswpElement = document.querySelectorAll('.pswp')[0];
			// build items array
			var items = new Array();
			var showIndex = 0;
			var newItems =new Array();

			for (var i = 0; i < $scope.items.length; i++) {
				if (!navigator.onLine) {
					if ($scope.items[i].PicPath.indexOf("file:") != -1 && $scope.items[i].PicPath != "") {
						newItems.push($scope.items[i]);
					}
				}else{
					if ($scope.items[i].PicPath != "") {
						newItems.push($scope.items[i]);
					}
				}
			}
			for (var i = 0; i < newItems.length; i++) {
				if (pic.PicId == newItems[i].PicId) {
					showIndex = i;
				}
				if (newItems[i].PicPath.indexOf("file:") != -1 && newItems[i].PicPath != "") {
					var image = {
						src: newItems[i].PicPath,
						w: newItems[i].w,
						h: newItems[i].h
					}
					items.push(image);
				}else{
					var image = {
						src: WEB_HOST +newItems[i].PicPath,
						w: newItems[i].w,
						h: newItems[i].h
					}
					items.push(image);
				}
			}

			// define options (if needed)
			var options = {
				// history & focus options are disabled on CodePen        
				history: false,
				focus: false,
				index: showIndex,
				showAnimationDuration: 0,
				hideAnimationDuration: 0,
				shareEl: false,
				fullscreenEl: false
			};
			if (items.length > 0) {
				var gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
				gallery.init();
			}
		}
	}),
	surveyControllers.controller('ImagelistTabCtrl', function($scope, $stateParams, $http, $ionicModal, $ionicLoading, $ionicPopup,ReaisService) {
		console.log('ImagelistTabCtrl');
		$scope.TaskId = $stateParams.TaskId;
		$scope.SiteId = $stateParams.SiteId;
		$scope.DirectoryID = $stateParams.DirectoryID;
		$scope.web_host = WEB_HOST;

		$scope.PicId = "";
		$scope.PicName = "";

		$scope.displayHref = true;
		if (SITE_STSTUS.length > 1 && SITE_STSTUS.substring(1, 2) == "2") {
			$scope.displayHref = false;
		}


		$ionicModal.fromTemplateUrl('templates/imagemodal.html?4', {
			scope: $scope
		}).then(function(modal) {
			$scope.modal = modal;
			$scope.modal.PicId = $scope.PicId;
			$scope.modal.PicName = $scope.PicName;

			$scope.cameraEvent = function(e) {
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
					var imageURI = data;
					var params = {
						"UserId": USER_ID,
						"ProjectId": PROJECT_ID,
						"TaskId": $scope.TaskId,
						"SiteId": $scope.SiteId,
						"PicId": modal.PicId,
						"PicName": modal.PicName,
						"DirectoryID": $scope.DirectoryID,
						"DirectoryName": ""
					};
					fuOptions = new FileUploadOptions();
					fuOptions.fileKey = "file";
					fuOptions.fileName = imageURI.substr(imageURI.lastIndexOf('/') + 1);
					fuOptions.mimeType = "multipart/form-data";
					fuOptions.params = params;

					$ionicLoading.show({
						template: '上传中,请等待...'
					});
					ReaisService.ImageUpUpload(params, imageURI, "camera", function(data) {
						$ionicLoading.hide();
						if (data.result.toLowerCase() == "ok") {
							ReaisService.getSitePicName($scope.TaskId, $scope.SiteId, $scope.DirectoryID, modal.PicId, function(data) {
								if (data.root.length == 0) {
									ReaisService.getSitePicName($scope.TaskId, $scope.SiteId, $scope.DirectoryID, "0", function(data) {
										$scope.items = data.root;
									}, function(data) {});
									$ionicPopup.alert({
										title: '成功提示',
										template: "图片上传成功!",
										okText: "确定"
									});
									modal.hide();
									return
								}
								var nextItem = data.root[0];
								modal.PicId = nextItem.PicId;
								modal.PicName = nextItem.PicName;
								var confirmPopup = $ionicPopup.confirm({
									title: '提示信息',
									template: '拍照成功!是否拍下一张图片(' + nextItem.PicName + ')?',
									cancelText: "取消",
									okText: "确定"
								});
								confirmPopup.then(function(res) {
									if (res) {
										modal.PicName = nextItem.PicId;
										modal.PicName = nextItem.PicName;
										$scope.cameraEvent();
									} else {
										ReaisService.getSitePicName($scope.TaskId, $scope.SiteId, $scope.DirectoryID, "0", function(data) {
											$scope.items = data.root;
										}, function(data) {});
										modal.hide();
									}
								});
							}, function(data) {});
						}
					}, function(data) {
						$ionicLoading.hide();
						if (data.result.toLowerCase() == "error") {
							$ionicPopup.alert({
								title: '错误提示',
								template: data.msg,
								okText: "确定"
							});
						}
					});

				}, function(error) {
					$ionicLoading.hide();
				}, options);

			};
			$scope.albumEvent = function(e) {
				console.log("相册");
				//相机
				event.preventDefault();
				var source = navigator.camera.PictureSourceType.PHOTOLIBRARY;
				//描述类型，取文件路径
				var destinationType = navigator.camera.DestinationType.FILE_URI;
				var mediaType = navigator.camera.MediaType.PICTURE;
				var options = {
					destinationType: destinationType,
					allowEdit: false,
					sourceType: source,
					targetWidth: 1280,
					targetHeight: 768,
					mediaType: mediaType
				};

				navigator.camera.getPicture(function(data) {
					var imageURI = data.substring(0, data.lastIndexOf('?'));
					var params = {
						"UserId": USER_ID,
						"ProjectId": PROJECT_ID,
						"TaskId": $scope.TaskId,
						"SiteId": $scope.SiteId,
						"PicId": modal.PicId,
						"PicName": modal.PicName,
						"DirectoryID": $scope.DirectoryID,
						"DirectoryName": ""
					};
					fuOptions = new FileUploadOptions();
					fuOptions.fileKey = "file";
					fuOptions.fileName = imageURI.substr(imageURI.lastIndexOf('/') + 1);
					fuOptions.mimeType = "multipart/form-data";
					fuOptions.params = params;
					$ionicLoading.show({
						template: '上传中,请等待...'
					});

					ReaisService.ImageUpUpload(params, imageURI, "album", function(data) {
						$ionicLoading.hide();
						if (data.result.toLowerCase() == "ok") {
							ReaisService.getSitePicName($scope.TaskId, $scope.SiteId, $scope.DirectoryID, modal.PicId, function(data) {
								if (data.root.length == 0) {
									ReaisService.getSitePicName($scope.TaskId, $scope.SiteId, $scope.DirectoryID, "0", function(data) {
										$scope.items = data.root;
									}, function(data) {});
									$ionicPopup.alert({
										title: '成功提示',
										template: "图片上传成功!",
										okText: "确定"
									});
									modal.hide();
									return
								}
								var nextItem = data.root[0];
								modal.PicId = nextItem.PicId;
								modal.PicName = nextItem.PicName;
								var confirmPopup = $ionicPopup.confirm({
									title: '提示信息',
									template: '拍照成功!是否选择下一张图片(' + nextItem.PicName + ')?',
									cancelText: "取消",
									okText: "确定"
								});
								confirmPopup.then(function(res) {
									if (res) {
										modal.PicName = nextItem.PicId;
										modal.PicName = nextItem.PicName;
										$scope.albumEvent();
									} else {
										ReaisService.getSitePicName($scope.TaskId, $scope.SiteId, $scope.DirectoryID, "0", function(data) {
											$scope.items = data.root;
										}, function(data) {});
										modal.hide();
									}
								});
							}, function(data) {});
						}
					}, function(data) {
						$ionicLoading.hide();
						if (data.result.toLowerCase() == "error") {
							$ionicPopup.alert({
								title: '错误提示',
								template: data.msg,
								okText: "确定"
							});
						}
					});

				}, function(error) {
					$ionicLoading.hide();
				}, options);
			};
		});

		ReaisService.getSitePicName($scope.TaskId, $scope.SiteId, $scope.DirectoryID, "0", function(data) {
			$scope.items = data.root;
		}, function(data) {
			network($ionicLoading, $ionicPopup);
		});

		$scope.upImage = function(e) {
			$scope.modal.PicId = e.PicId;
			$scope.modal.PicName = e.PicName;
			$scope.modal.show();
		}
		$scope.photoSwipe = function(pic) {
			var pswpElement = document.querySelectorAll('.pswp')[0];
			// build items array
			var items = new Array();
			var showIndex = 0;
			for (var i = 0; i < $scope.items.length; i++) {
				if ($scope.items[i].PicPath != "") {
					if (pic.PicId == $scope.items[i].PicId) {
						showIndex = i;
					}
					if ($scope.items[i].PicPath.indexOf("file:") != -1) {
						var image = {
							src: $scope.items[i].PicPath,
							w: $scope.items[i].w,
							h: $scope.items[i].h
						}
						items.push(image);
					}else{
						if (navigator.onLine){
							var image = {
								src: WEB_HOST + $scope.items[i].PicPath,
								w: $scope.items[i].w,
								h: $scope.items[i].h
							}
							items.push(image);
						}
					}
				}
			}

			// define options (if needed)
			var options = {
				// history & focus options are disabled on CodePen        
				history: false,
				focus: false,
				index: showIndex,
				showAnimationDuration: 0,
				hideAnimationDuration: 0,
				shareEl: false,
				fullscreenEl: false
			};
			if (items.length > 0) {
				var gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
				gallery.init();
			}
		}

	}),
	surveyControllers.controller('PeriodTabCtrl', function($scope, $stateParams, $http, $ionicHistory, $ionicLoading, $ionicPopup) {
		console.log('PeriodTabCtrl');
		$scope.TaskId = $stateParams.TaskId;
		$scope.SiteId = $stateParams.SiteId;
		$scope.displayHref = true;
		if (SITE_STSTUS.length > 1 && SITE_STSTUS.substring(1, 2) == "2") {
			$scope.displayHref = false;
		}

		$scope.pushData = function(e) {

			var confirmPopup = $ionicPopup.confirm({
				title: '确认提示',
				template: '确定采用(' + e.TaskName + ')的数据吗?',
				cancelText: "取消",
				okText: "确定"
			});
			confirmPopup.then(function(res) {
				if (res) {
					$ionicLoading.show({
						template: '正在加载中...'
					});
					$http.jsonp(HTTP_HOST + "/SetCurrentPropertyValue?&FromTaskId=" + e.TaskId + "&ToTaskId=" + $scope.TaskId + "&ToSiteId=" + $scope.SiteId + "&jsoncallback=JSON_CALLBACK").
					success(function(data, status) {
						$ionicLoading.hide();
						if (data.result.toLowerCase() == "ok") {
							$ionicHistory.clearCache();
							$ionicHistory.goBack();
						} else {
							$ionicPopup.alert({
								title: '错误提示',
								template: data.msg,
								okText: "确定"
							});
						}
					}).
					error(function(data, status) {
						network($ionicLoading, $ionicPopup);
					});
				} else {
					console.log('You are not sure');
				}
			});
		}
		$http.jsonp(HTTP_HOST + "/GetHistoryTask?&page=1&TaskId=" + $scope.TaskId + "&SiteId=" + $scope.SiteId + "&jsoncallback=JSON_CALLBACK").
		success(function(data, status) {
			$scope.items = data.root;
		}).
		error(function(data, status) {
			network($ionicLoading, $ionicPopup);
		});
	}),
	surveyControllers.controller('TalkTabCtrl', function($scope, $stateParams, $http, $ionicLoading, $ionicPopup) {
		console.log('TalkTabCtrl');
		$scope.TaskId = $stateParams.TaskId;
		$scope.doWeixin = function(e) {
			startMMUI();
		}
		$http.jsonp(HTTP_HOST + "/getTaskMemberList?&TaskId=" + $scope.TaskId + "&jsoncallback=JSON_CALLBACK").
		success(function(data, status) {
			$scope.items = data.root;
		}).
		error(function(data, status) {
			network($ionicLoading, $ionicPopup);
		});
	});