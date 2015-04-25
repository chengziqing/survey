//外网
//var HTTP_HOST="http://www.share-net.cn:8082/ReaisService.asmx";
//var WEB_HOST = "http://www.share-net.cn:8081";

//内网
var HTTP_HOST = "http://192.168.1.32:8082/ReaisService.asmx";
var WEB_HOST = "http://192.168.1.32:8081";

var USER_ID="";
var SITE_STSTUS="00";

var NowLocation = {
  SignLng: "117.212085",
  SignLat: "31.856291",
  Altitude: "10"
};
var PROJECT_ID="";
var surveyApp = angular.module('surveyApp', ['ionic','surveyControllers', 'surveyServices']);
surveyApp.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider, $compileProvider) {
		$ionicConfigProvider.platform.android.tabs.position("bottom");
		$ionicConfigProvider.tabs.style('standard');
		$ionicConfigProvider.backButton.text('返回').icon('ion-ios7-arrow-thin-left');
		$ionicConfigProvider.backButton.previousTitleText(false);
		$ionicConfigProvider.navBar.alignTitle('center');
		//增加连接调用白名单
		$compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|smsto|tel|sms):/);
		$stateProvider
			.state('signin', {
				url: '/sign-in',
				templateUrl: 'templates/sign-in.html',
				controller: 'SignInCtrl'
			})
			.state('tabs', {
				url: "/tab",
				abstract: true,
				templateUrl: "templates/tabs.html",
				controller: 'TabsCtrl'
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
				url: "/baseform/:TaskId/:SiteId/:TypeID/:PropertyID/:IsPropertyGroup/:PropertylName/:GroupPropertyID",
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
				url: "/talk/:TaskId",
				views: {
					'working-tab': {
						templateUrl: "templates/talk.html",
						controller: 'TalkTabCtrl'
					}
				}
			});
		$urlRouterProvider.otherwise("/sign-in");
	}), surveyApp.run(['$ionicPlatform', '$ionicPopup', '$rootScope', '$location', function($ionicPlatform, $ionicPopup, $rootScope, $location) {
		$ionicPlatform.registerBackButtonAction(function(e) {
			e.preventDefault();

			function showConfirm() {
					var confirmPopup = $ionicPopup.confirm({
						title: '<strong>退出应用?</strong>',
						template: '你确定要退出应用吗?',
						okText: '退出',
						cancelText: '取消'
					});
					confirmPopup.then(function(res) {
						if (res) {
							ionic.Platform.exitApp();
						} else {
							// Don't close
						}
					});
				}
				// Is there a page to go back to?
			if ($location.path() == '/sign-in') {
				showConfirm();
			} else if ($rootScope.$viewHistory.backView) {
				console.log('currentView:', $rootScope.$viewHistory.currentView);
				$rootScope.$viewHistory.backView.go();
			} else {
				// This is the last page: Show confirmation popup
				showConfirm();
			}
			return false;
		}, 101);
	}]), surveyApp.filter('sitestatus', function() {
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
			if (status == "0" || status == "False" || status == "") {
				return "未提交";
			}
			if (status == "1" || status == "True") {
				return "已提交";
			}
		};
	})
	.filter('imagetypestatus', function() {
		return function(status) {
			if (status == "0" || status == "False" || status == "") {
				return "已指定图片";
			}
			if (status == "1" || status == "True") {
				return "自定义图片";
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
			if (str == "now") {
				return new Date().Format("yyyy-MM-dd");
			} else {
				return str;
			}
		};
	})
	.filter('imagecheckstatus', function() {
		return function(status) {
			if (status == "0") {
				return "待处理";
			}
			if (status == "1") {
				return "不符合";
			}
			if (status == "2") {
				return "符合";
			}
			return "未知状态";
		};
	})
	.filter('imagecheckstatuscolor', function() {
		return function(status) {
			if (status == "0") {
				return {
					color: ''
				};
			}
			if (status == "1") {
				return {
					color: 'red'
				};
			}
			if (status == "2") {
				return {
					color: 'green'
				};
			}
			return {
				color: ''
			};
		};
	})
	.filter('localpicture', function() {
		return function(url) {
			if (url.indexOf("file:") != -1) {
				return url;
			} else {
				if (url == "") {
					return "img/nopic.png";
				} else {
					if (navigator.onLine) {
						return WEB_HOST + url;
					} else {
						return "img/offuppic.jpg";
					}
				}
			}
		};
	});

var network = function($ionicLoading, $ionicPopup) {
	$ionicPopup.alert({
		title: '<strong>错误信息</strong>',
		template: '服务请求异常!',
		okText: "确定"
	});
}

//图片下载处理Begin
//1、图片路径本地存储处理
var pushPicData = function(obj) {
	var data = JSON.parse(window.LS.get("reais3_getSitePicName_" + USER_ID + "_" + obj.TaskId + "_" + obj.SiteId + "_" + obj.DirectoryID));
	for (var i = 0; i < data.root.length; i++) {
		if (data.root[i].PicId == obj.PicId) {
			data.root[i] = obj;
			break;
		}
	}
	window.LS.set("reais3_getSitePicName_" + USER_ID + "_" + obj.TaskId + "_" + obj.SiteId + "_" + obj.DirectoryID, JSON.stringify(data));
	//console.log("+++++++++++++"+JSON.stringify(data));
}
//2、图片下载整个过程。
var downloadPic = function(data) {
	for (var j = 0; j < data.root.length; j++) {
		if (data.root[j].PicPath != "") {
			window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem) {           
				var imageurl = data.root[j].PicPath; //文件远程路径
				var filename = imageurl.substring(imageurl.lastIndexOf('/') + 1); //文件名称带aa.jpg?t=xxxx
				var _imagename = filename.substring(0, filename.lastIndexOf('?'));//图片名称aa.jpg
				var _filepath = "com.share-net.cn/" + data.root[j].TaskId +
					"/" + data.root[j].SiteId +
					"/" + data.root[j].DirectoryName + "/" + _imagename;      //保存本地相对路径
				var _localFile = fileSystem.root.fullPath + "/" + _filepath;  //保存本地绝对路径

				(function(newdata,n) {

					fileSystem.root.getFile(_filepath, null, function(fileEntry) {
						newdata.PicPath = fileEntry.fullPath;
						newdata.SmallPicPath = fileEntry.fullPath;
						//console.log("======found file:" + JSON.stringify(newdata));
						pushPicData(newdata);
					},function(){
						//console.log("=========file not found=====")
						var fileTransfer = new FileTransfer();
						window.LS.set("reais3_getSitePicName_" + USER_ID + "_" + newdata.TaskId + "_" + newdata.SiteId + "_" + newdata.DirectoryID + "_" + n, "0");
						fileTransfer.download(encodeURI(WEB_HOST + imageurl), _localFile, function(entry) {
							newdata.PicPath = entry.fullPath;
							newdata.SmallPicPath = entry.fullPath;
							pushPicData(newdata);

						}, function(error) {
							//alert("Some error");   
						});

					});

				})(data.root[j],j);

			}, function(evt) {
				console.log("加载文件系统出现错误");
			});
		}

	}
}
//图片下载处理End