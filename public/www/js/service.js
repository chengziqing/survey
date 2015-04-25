var surveyServices = angular.module('surveyServices', []);

surveyServices.service("ReaisService", ["$http", function($http) {
	return {
		GetUserInfo: function(username, password, isSave, success, error) {
			$http.jsonp(HTTP_HOST + "/GetUserInfo?username=" + username + "&password=" + password + "&jsoncallback=JSON_CALLBACK").success(function(data) {
				success(data);
			}).error(function(data) {
				var account = window.LS.get("reais3_account") == null ? {
					userId: "",
					username: "",
					password: "",
					isSave: false
				} : JSON.parse(window.LS.get("reais3_account"));
				if (account.username == username && account.password == password) {
					var result = {
						root: [{
							UserId: account.userId
						}]
					};
					success(result);
				} else {
					var result = {
						root: []
					};
					success(result);
				}
			});
		},
		GetItemList: function(currentstatus, success, error) {
			var offline = window.LS.get("reais3_offline_" + USER_ID) == null ? {
				checked: false
			} : JSON.parse(window.LS.get("reais3_offline_" + USER_ID));
			if (!offline.checked) {
				$http.jsonp(HTTP_HOST + "/GetItemList?page=1&rolekind=7&currentstatus=" + currentstatus + "&userid=" + USER_ID + "&jsoncallback=JSON_CALLBACK").
				success(function(data) {
					success(data);
				}).
				error(function(data) {
					error(data);
				});
			} else {
				var data = window.LS.get("reais3_GetItemList_" + currentstatus + "_" + USER_ID);
				if (data != null) {
					success(JSON.parse(data));
				} else {
					success({
						root: []
					});
				}
			}
		},
		GetItemSiteList: function(TaskId, success, error) {
			var offline = window.LS.get("reais3_offline_" + USER_ID) == null ? {
				checked: false
			} : JSON.parse(window.LS.get("reais3_offline_" + USER_ID));
			if (!offline.checked) {
				$http.jsonp(HTTP_HOST + "/GetItemSiteList?page=1&itemid=" + TaskId + "&userid=" + USER_ID + "&jsoncallback=JSON_CALLBACK").
				success(function(data) {
					success(data);
				}).
				error(function(data) {
					error(data);
				});
			} else {
				var data = window.LS.get("reais3_GetItemSiteList_" + USER_ID + "_" + TaskId);
				if (data != null) {
					success(JSON.parse(data));
				} else {
					success({
						root: []
					});
				}
			}
		},
		GetSiteAllStatus: function(TaskId, SiteId, success, error) {
			var offline = window.LS.get("reais3_offline_" + USER_ID) == null ? {
				checked: false
			} : JSON.parse(window.LS.get("reais3_offline_" + USER_ID));
			if (!offline.checked) {
				$http.jsonp(HTTP_HOST + "/GetSiteAllStatus?TaskId=" + TaskId + "&SiteId=" + SiteId + "&jsoncallback=JSON_CALLBACK").
				success(function(data) {
					success(data);
				}).
				error(function(data) {
					error(data);
				});
			} else {
				var data = window.LS.get("reais3_GetSiteAllStatus_" + USER_ID + "_" + TaskId + "_" + SiteId);
				if (data != null) {
					success(JSON.parse(data));
				} else {
					success({
						root: []
					});
				}
			}
		},
		GetTaskInfoTypes: function(TaskId, SiteId, success, error) {
			var offline = window.LS.get("reais3_offline_" + USER_ID) == null ? {
				checked: false
			} : JSON.parse(window.LS.get("reais3_offline_" + USER_ID));
			if (!offline.checked) {
				$http.jsonp(HTTP_HOST + "/GetTaskInfoTypes?TaskId=" + TaskId + "&SiteId=" + SiteId + "&jsoncallback=JSON_CALLBACK").
				success(function(data) {
					success(data);
				}).
				error(function(data) {
					error(data);
				});
			} else {
				var data = window.LS.get("reais3_GetTaskInfoTypes_" + USER_ID + "_" + TaskId + "_" + SiteId);
				if (data != null) {
					success(JSON.parse(data));
				} else {
					success({
						root: []
					});
				}
			}
		},
		GetTaskPropertys: function(TaskId, SiteId, TypeID, success, error) {
			var offline = window.LS.get("reais3_offline_" + USER_ID) == null ? {
				checked: false
			} : JSON.parse(window.LS.get("reais3_offline_" + USER_ID));
			if (!offline.checked) {
				$http.jsonp(HTTP_HOST + "/GetTaskPropertys?TaskId=" + TaskId + "&SiteId=" + SiteId + "&TypeID=" + TypeID + "&jsoncallback=JSON_CALLBACK").
				success(function(data) {
					success(data);
				}).
				error(function(data) {
					error(data);
				});
			} else {
				var data = window.LS.get("reais3_GetTaskPropertys_" + USER_ID + "_" + TaskId + "_" + SiteId + "_" + TypeID);
				if (data != null) {
					success(JSON.parse(data));
				} else {
					success({
						root: []
					});
				}
			}
		},
		GetTaskPropertyControl: function(TaskId, SiteId, TypeID, PropertyID, IsPropertyGroup, success, error) {
			var offline = window.LS.get("reais3_offline_" + USER_ID) == null ? {
				checked: false
			} : JSON.parse(window.LS.get("reais3_offline_" + USER_ID));
			if (!offline.checked) {
				$http.jsonp(HTTP_HOST + "/GetTaskPropertyControl?TaskId=" + TaskId + "&SiteId=" + SiteId + "&TypeID=" + TypeID + "&PropertyID=" + PropertyID + "&IsPropertyGroup=" + IsPropertyGroup + "&jsoncallback=JSON_CALLBACK").
				success(function(data) {
					success(data);
				}).
				error(function(data) {
					error(data);
				});
			} else {
				var data = window.LS.get("reais3_GetTaskPropertyControl_" + USER_ID + "_" + TaskId + "_" + SiteId + "_" + TypeID + "_" + PropertyID + "_" + IsPropertyGroup);
				if (data != null) {
					success(JSON.parse(data));
				} else {
					success({
						root: []
					});
				}
			}
		},
		TaskFormDataUpload: function(TypeID, TaskId, SiteId, PropertyID, PropertylName, PropertyInstance_Value, IsPropertyGroup, GroupPropertyID, success, error) {
			var offline = window.LS.get("reais3_offline_" + USER_ID) == null ? {
				checked: false
			} : JSON.parse(window.LS.get("reais3_offline_" + USER_ID));
			if (!offline.checked) {
				$http.jsonp(HTTP_HOST + "/TaskFormDataUpload?UserId=" + USER_ID + "&ProjectId=" + PROJECT_ID + "&TaskId=" + TaskId + "&SiteId=" + SiteId + "&PropertyID=" + PropertyID + "&PropertylName=" + PropertylName + "&PropertyInstance_Value=" + PropertyInstance_Value + "&jsoncallback=JSON_CALLBACK").
				success(function(data) {
					success(data);
				}).
				error(function(data) {
					error(data);
				});
			} else {
				var data = {
					TaskId: TaskId,
					ProjectId: PROJECT_ID,
					SiteId: SiteId,
					PropertyID: PropertyID,
					PropertylName: PropertylName,
					PropertyInstance_Value: PropertyInstance_Value
				};
				window.LS.set("reais3_TaskFormDataUpload_" + USER_ID + "_" + TaskId + "_" + SiteId + "_" + PropertyID, JSON.stringify(data));



				if (IsPropertyGroup == "0") {
					var GetTaskPropertys = JSON.parse(window.LS.get("reais3_GetTaskPropertys_" + USER_ID + "_" + TaskId + "_" + SiteId + "_" + TypeID));
					for (var i = 0; i < GetTaskPropertys.root.length; i++) {
						if (GetTaskPropertys.root[i].PropertyID == PropertyID) {
							GetTaskPropertys.root[i].Defaults = PropertyInstance_Value;
							window.LS.set("reais3_GetTaskPropertys_" + USER_ID + "_" + TaskId + "_" + SiteId + "_" + TypeID, JSON.stringify(GetTaskPropertys));

							var GetTaskPropertyControl = JSON.parse(window.LS.get("reais3_GetTaskPropertyControl_" + USER_ID + "_" + TaskId + "_" + SiteId + "_" + TypeID + "_" + PropertyID + "_0"));
							if (GetTaskPropertyControl.root[0].PropertyStatus == "0") {
								var GetSiteAllStatus = JSON.parse(window.LS.get("reais3_GetSiteAllStatus_" + USER_ID + "_" + TaskId + "_" + SiteId));
								GetSiteAllStatus.root[0].PropertyDoneNum = parseInt(GetSiteAllStatus.root[0].PropertyDoneNum) + 1;
								window.LS.set("reais3_GetSiteAllStatus_" + USER_ID + "_" + TaskId + "_" + SiteId, JSON.stringify(GetSiteAllStatus));
							}
							GetTaskPropertyControl.root[0].Defaults = PropertyInstance_Value;
							GetTaskPropertyControl.root[0].PropertyStatus = "1";
							window.LS.set("reais3_GetTaskPropertyControl_" + USER_ID + "_" + TaskId + "_" + SiteId + "_" + TypeID + "_" + PropertyID + "_0", JSON.stringify(GetTaskPropertyControl));
							break
						}
					}
					success({
						"result": "ok",
						"msg": ""
					});
				} else {
					var GetTaskPropertyControl = JSON.parse(window.LS.get("reais3_GetTaskPropertyControl_" + USER_ID + "_" + TaskId + "_" + SiteId + "_" + TypeID + "_" + GroupPropertyID + "_1"));
					for (var i = 0; i < GetTaskPropertyControl.root.length; i++) {
						if (GetTaskPropertyControl.root[i].PropertyID == PropertyID) {
							GetTaskPropertyControl.root[i].Defaults = PropertyInstance_Value;
							window.LS.set("reais3_GetTaskPropertyControl_" + USER_ID + "_" + TaskId + "_" + SiteId + "_" + TypeID + "_" + GroupPropertyID + "_1", JSON.stringify(GetTaskPropertyControl));

							var GetTaskPropertyControl1 = JSON.parse(window.LS.get("reais3_GetTaskPropertyControl_" + USER_ID + "_" + TaskId + "_" + SiteId + "_" + TypeID + "_" + PropertyID + "_0"));
							if (GetTaskPropertyControl1.root[0].PropertyStatus == "0") {
								var GetSiteAllStatus = JSON.parse(window.LS.get("reais3_GetSiteAllStatus_" + USER_ID + "_" + TaskId + "_" + SiteId));
								GetSiteAllStatus.root[0].PropertyDoneNum = parseInt(GetSiteAllStatus.root[0].PropertyDoneNum) + 1;
								window.LS.set("reais3_GetSiteAllStatus_" + USER_ID + "_" + TaskId + "_" + SiteId, JSON.stringify(GetSiteAllStatus));
							}
							GetTaskPropertyControl1.root[0].Defaults = PropertyInstance_Value;
							window.LS.set("reais3_GetTaskPropertyControl_" + USER_ID + "_" + TaskId + "_" + SiteId + "_" + TypeID + "_" + PropertyID + "_0", JSON.stringify(GetTaskPropertyControl1));
							break;
						}
					}
					success({
						"result": "ok",
						"msg": ""
					});
				}

			}
		},
		getSiteDirectory: function(TaskId, SiteId, success, error) {
			var offline = window.LS.get("reais3_offline_" + USER_ID) == null ? {
				checked: false
			} : JSON.parse(window.LS.get("reais3_offline_" + USER_ID));
			if (!offline.checked) {
				$http.jsonp(HTTP_HOST + "/getSiteDirectory?TaskId=" + TaskId + "&SiteId=" + SiteId + "&jsoncallback=JSON_CALLBACK").
				success(function(data) {
					success(data);
				}).
				error(function(data) {
					error(data);
				});
			} else {
				var data = window.LS.get("reais3_getSiteDirectory_" + USER_ID + "_" + TaskId + "_" + SiteId);
				if (data != null) {
					success(JSON.parse(data));
				} else {
					success({
						root: []
					});
				}
			}
		},
		getSitePicName: function(TaskId, SiteId, DirectoryID, IsNextPic, success, error) {
			var offline = window.LS.get("reais3_offline_" + USER_ID) == null ? {
				checked: false
			} : JSON.parse(window.LS.get("reais3_offline_" + USER_ID));
			if (!offline.checked) {
				$http.jsonp(HTTP_HOST + "/getSitePicName?&page=1&TaskId=" + TaskId + "&SiteId=" + SiteId + "&DirectoryID=" + DirectoryID + "&PicId=&IsNextPic=" + IsNextPic + "&jsoncallback=JSON_CALLBACK").
				success(function(data) {
					success(data);
				}).
				error(function(data) {
					error(data);
				});
			} else {
				if (IsNextPic == "0") {
					var data = JSON.parse(window.LS.get("reais3_getSitePicName_" + USER_ID + "_" + TaskId + "_" + SiteId + "_" + DirectoryID));
					if (data != null) {
						success(data);
					} else {
						success({
							root: []
						});
					}
				} else {
					var data = JSON.parse(window.LS.get("reais3_getSitePicName_" + USER_ID + "_" + TaskId + "_" + SiteId + "_" + DirectoryID));
					if (data != null) {
						//判断下一个图片是否有待上传图片
						console.log(data);
						console.log(IsNextPic);
						for (var i = 0; i < data.root.length; i++) {
							if (data.root[i].PicId == IsNextPic) {
								if ((i + 1) < data.root.length) {
									if (data.root[i + 1].SmallPicPath == "") {
										var rData = {
											root: []
										};
										rData.root.push(data.root[i + 1]);
										console.log(rData);
										success(rData);
										return
									}
								}
							}
						}
					}
					success({
						root: []
					});
				}
			}
		},
		ImageUpUpload: function(params, imageURI, source, success, error) {
			var offline = window.LS.get("reais3_offline_" + USER_ID) == null ? {
				checked: false
			} : JSON.parse(window.LS.get("reais3_offline_" + USER_ID));
			if (!offline.checked) {
				fuOptions = new FileUploadOptions();
				fuOptions.fileKey = "file";
				fuOptions.fileName = imageURI.substr(imageURI.lastIndexOf('/') + 1);
				fuOptions.mimeType = "multipart/form-data";
				fuOptions.params = params;
				var ft = new FileTransfer();
				ft.upload(imageURI, encodeURI(WEB_HOST + '/Public/uploadfile.aspx'), function(r) {
					var result = JSON.parse(r.response);
					try {
						deletePictureFromCache(imageURI);
					} catch (e) {
						console.log(e.message);
					}
					success(result);
				}, null, fuOptions);

			} else {
				var SaveLocal = function(imageURI) {
					var data = {
						params: params,
						imageURI: imageURI,
						PicId: ""
					};
					data.PicId = params.PicId == "" ? Math.uuid() : params.PicId;
					console.log(data);
					if (params.PicId == "") {
						var getSiteDirectory = JSON.parse(window.LS.get("reais3_getSiteDirectory_" + USER_ID + "_" + params.TaskId + "_" + params.SiteId));
						for (var i = 0; i < getSiteDirectory.root.length; i++) {
							if (getSiteDirectory.root[i].DirectoryID == params.DirectoryID) {
								getSiteDirectory.root[i].DoneNum = parseInt(getSiteDirectory.root[i].DoneNum) + 1;
								break;
							}
						}
						window.LS.set("reais3_getSiteDirectory_" + USER_ID + "_" + params.TaskId + "_" + params.SiteId, JSON.stringify(getSiteDirectory));
						window.LS.set("reais3_uploadfile_" + USER_ID + "_" + params.TaskId + "_" + params.SiteId + "_" + params.DirectoryID + "_" + data.PicId, JSON.stringify(data));
						//获取图片高度和宽度
						imgReady(imageURI, function() {
							var item = {
								"TaskId": params.TaskId,
								"SiteId": params.SiteId,
								"DirectoryID": params.DirectoryID,
								"DirectoryName": params.DirectoryName,
								"PicId": data.PicId,
								"PicName": params.PicName,
								"PicStatus": "0",
								"UploadDate": (new Date()).Format("yyyy-MM-dd hh:mm"),
								"SmallPicPath": imageURI,
								"PicPath": imageURI,
								"w": this.width,
								"h": this.height
							}
							console.log(item);
							//向图片目录添加一张
							var getSitePicName = JSON.parse(window.LS.get("reais3_getSitePicName_" + USER_ID + "_" + params.TaskId + "_" + params.SiteId + "_" + params.DirectoryID));
							getSitePicName.root.push(item);
							window.LS.set("reais3_getSitePicName_" + USER_ID + "_" + params.TaskId + "_" + params.SiteId + "_" + params.DirectoryID, JSON.stringify(getSitePicName));

							//内容页增加一个计数
							var GetSiteAllStatus = JSON.parse(window.LS.get("reais3_GetSiteAllStatus_" + USER_ID + "_" + params.TaskId + "_" + params.SiteId));
							GetSiteAllStatus.root[0].PicDoingNum = parseInt(GetSiteAllStatus.root[0].PicDoingNum) + 1;
							window.LS.set("reais3_GetSiteAllStatus_" + USER_ID + "_" + params.TaskId + "_" + params.SiteId, JSON.stringify(GetSiteAllStatus));

							success({
								result: "ok"
							});
						});
					} else { //修改
						window.LS.set("reais3_uploadfile_" + USER_ID + "_" + params.TaskId + "_" + params.SiteId + "_" + params.DirectoryID + "_" + data.PicId, JSON.stringify(data));
						var getSitePicName = JSON.parse(window.LS.get("reais3_getSitePicName_" + USER_ID + "_" + params.TaskId + "_" + params.SiteId + "_" + params.DirectoryID));
						imgReady(imageURI, function() {
							for (var i = 0; i < getSitePicName.root.length; i++) {
								if (getSitePicName.root[i].PicId == params.PicId) {
									try {
										deletePictureFromCache(getSitePicName.root[i].PicPath);
									} catch (e) {
										console.log(e.message);
									}
									var item = {
											"TaskId": params.TaskId,
											"SiteId": params.SiteId,
											"DirectoryID": params.DirectoryID,
											"DirectoryName": params.DirectoryName,
											"PicId": data.PicId,
											"PicName": params.PicName,
											"PicStatus": "0",
											"UploadDate": (new Date()).Format("yyyy-MM-dd hh:mm"),
											"SmallPicPath": imageURI,
											"PicPath": imageURI,
											"w": this.width,
											"h": this.height
										}
										//如果为空,说明是修改
									if (getSitePicName.root[i].SmallPicPath == "") {
										var getSiteDirectory = JSON.parse(window.LS.get("reais3_getSiteDirectory_" + USER_ID + "_" + params.TaskId + "_" + params.SiteId));
										for (var j = 0; j < getSiteDirectory.root.length; j++) {
											if (getSiteDirectory.root[j].DirectoryID == params.DirectoryID) {
												getSiteDirectory.root[j].DoneNum = parseInt(getSiteDirectory.root[j].DoneNum) + 1;
												break;
											}
										}
										window.LS.set("reais3_getSiteDirectory_" + USER_ID + "_" + params.TaskId + "_" + params.SiteId, JSON.stringify(getSiteDirectory));

										//内容页增加一个计数
										var GetSiteAllStatus = JSON.parse(window.LS.get("reais3_GetSiteAllStatus_" + USER_ID + "_" + params.TaskId + "_" + params.SiteId));
										GetSiteAllStatus.root[0].PicDoingNum = parseInt(GetSiteAllStatus.root[0].PicDoingNum) + 1;
										window.LS.set("reais3_GetSiteAllStatus_" + USER_ID + "_" + params.TaskId + "_" + params.SiteId, JSON.stringify(GetSiteAllStatus));
									}
									getSitePicName.root[i] = item;
									window.LS.set("reais3_getSitePicName_" + USER_ID + "_" + params.TaskId + "_" + params.SiteId + "_" + params.DirectoryID, JSON.stringify(getSitePicName));
									success({
										result: "ok"
									});
									break
								}
							}
						});
					}
				};
				if (source == "album") {
					window.resolveLocalFileSystemURI(imageURI, function(fileEntry) {
						var parent = imageURI.substring(0, imageURI.lastIndexOf('/')); //文件所在目录路径
						var parentName = parent.substring(parent.lastIndexOf('/') + 1); //文件所在目录名称
						var fileName = imageURI.substring(imageURI.lastIndexOf('/') + 1); //原文件名
						var parentEntry = new DirectoryEntry(parentName, parent);
						var newfileName = (new Date).Format("yyyyMMddhhmmss") + "." + fileName.substring(fileName.lastIndexOf('.') + 1);

						fileEntry.copyTo(parentEntry, newfileName, function(fileNewEntry) { //复制文件
							imageURI = fileNewEntry.fullPath;
							SaveLocal(imageURI);
						}, function(e) {
							console.log('error occured while copy file uri : ' + e.target.error.code);
						});
					}, function(e) {
						console.log('error occured while resolving file uri : ' + e.target.error.code);
					});
				} else {
					SaveLocal(imageURI);
				}
			}
		},
		CheckLimitAndName: function(TaskId, SiteId, DirectoryID, PicId, PicName, success, error) {
			var offline = window.LS.get("reais3_offline_" + USER_ID) == null ? {
				checked: false
			} : JSON.parse(window.LS.get("reais3_offline_" + USER_ID));
			if (!offline.checked) {
				$http.jsonp(HTTP_HOST + "/getSitePicName?&page=1&TaskId=" + TaskId + "&SiteId=" + SiteId + "&DirectoryID=" + DirectoryID + "&PicId=&IsNextPic=0&jsoncallback=JSON_CALLBACK").
				success(function(getSitePicName) {
					for (var i = 0; i < getSitePicName.root.length; i++) {
						if (getSitePicName.root[i].PicName == PicName) {
							error({
								result: "error",
								msg: "图片名称存在!"
							});
							return
						}
					}
					$http.jsonp(HTTP_HOST + "/getSiteDirectory?TaskId=" + TaskId + "&SiteId=" + SiteId + "&jsoncallback=JSON_CALLBACK").
					success(function(getSiteDirectory) {
						for (var i = 0; i < getSiteDirectory.root.length; i++) {
							if (getSiteDirectory.root[i].DirectoryID == DirectoryID) {
								if (parseInt(getSiteDirectory.root[i].LimitNum) == parseInt(getSiteDirectory.root[i].DoneNum)) {
									error({
										result: "error",
										msg: "超过最大图片数限制"
									});
									return
								}
							}
						}
						success({
							result: "ok",
							msg: ""
						});
					});
				});
			} else {
				var getSitePicName = JSON.parse(window.LS.get("reais3_getSitePicName_" + USER_ID + "_" + TaskId + "_" + SiteId + "_" + DirectoryID));
				for (var i = 0; i < getSitePicName.root.length; i++) {
					if (getSitePicName.root[i].PicName == PicName) {
						error({
							result: "error",
							msg: "图片名称存在!"
						});
						return
					}
				}
				if (PicId == "") {
					var getSiteDirectory = JSON.parse(window.LS.get("reais3_getSiteDirectory_" + USER_ID + "_" + TaskId + "_" + SiteId));
					for (var i = 0; i < getSiteDirectory.root.length; i++) {
						if (getSiteDirectory.root[i].DirectoryID == DirectoryID) {
							if (parseInt(getSiteDirectory.root[i].LimitNum) == parseInt(getSiteDirectory.root[i].DoneNum)) {
								error({
									result: "error",
									msg: "超过最大图片数限制"
								});
								return
							}
						}
					}
				}
				success({
					result: "ok",
					msg: "符合"
				});
			}
		},
		DelPicture: function(TaskId, SiteId, DirectoryID, PicId, success, error) {
			var offline = window.LS.get("reais3_offline_" + USER_ID) == null ? {
				checked: false
			} : JSON.parse(window.LS.get("reais3_offline_" + USER_ID));
			if (!offline.checked) {
				$http.jsonp(WEB_HOST + "/Public/DelPicture.aspx?PicId=" + PicId + "&jsoncallback=JSON_CALLBACK").
				success(function(data) {
					success(data);
				}).
				error(function(data) {
					error(data);
				});
			} else {
				console.log(TaskId + "," + SiteId + "," + DirectoryID + "," + PicId);
				window.LS.remove("reais3_uploadfile_" + USER_ID + "_" + TaskId + "_" + SiteId + "_" + DirectoryID + "_" + PicId);
				var getSitePicName = JSON.parse(window.LS.get("reais3_getSitePicName_" + USER_ID + "_" + TaskId + "_" + SiteId + "_" + DirectoryID));
				for (var i = 0; i < getSitePicName.root.length; i++) {
					if (getSitePicName.root[i].PicId == PicId) {
						try {
							deletePictureFromCache(getSitePicName.root[i].PicPath);
						} catch (e) {
							console.log(e.message);
						}
						getSitePicName.root = getSitePicName.root.del(i);

						break
					}
				}
				window.LS.set("reais3_getSitePicName_" + USER_ID + "_" + TaskId + "_" + SiteId + "_" + DirectoryID, JSON.stringify(getSitePicName));
				//内容页减少一个计数
				var GetSiteAllStatus = JSON.parse(window.LS.get("reais3_GetSiteAllStatus_" + USER_ID + "_" + TaskId + "_" + SiteId));
				GetSiteAllStatus.root[0].PicDoingNum = parseInt(GetSiteAllStatus.root[0].PicDoingNum) - 1;
				window.LS.set("reais3_GetSiteAllStatus_" + USER_ID + "_" + TaskId + "_" + SiteId, JSON.stringify(GetSiteAllStatus));

				//再减少一个计数
				var getSiteDirectory = JSON.parse(window.LS.get("reais3_getSiteDirectory_" + USER_ID + "_" + TaskId + "_" + SiteId));

				for (var i = 0; i < getSiteDirectory.root.length; i++) {
					if (getSiteDirectory.root[i].DirectoryID == DirectoryID) {
						getSiteDirectory.root[i].DoneNum = parseInt(getSiteDirectory.root[i].DoneNum) - 1;
						break;
					}
				}
				window.LS.set("reais3_getSiteDirectory_" + USER_ID + "_" + TaskId + "_" + SiteId, JSON.stringify(getSiteDirectory));
				success({
					result: "ok"
				});
			}
		},
		getTaskMemberList: function(TaskId, success, error) {
			var offline = window.LS.get("reais3_offline_" + USER_ID) == null ? {
				checked: false
			} : JSON.parse(window.LS.get("reais3_offline_" + USER_ID));
			if (!offline.checked) {
				$http.jsonp(HTTP_HOST + "/getTaskMemberList?&TaskId=" + TaskId + "&jsoncallback=JSON_CALLBACK").
				success(function(data, status) {
					success(data);
				}).
				error(function(data, status) {
					error(data);
				});
			} else {
				var data = window.LS.get("reais3_getTaskMemberList_" + USER_ID + "_" + TaskId);
				if (data != null) {
					success(JSON.parse(data));
				} else {
					success({
						root: []
					});
				}
			}
		},
		GetSiteSign: function(TaskId, SiteId, success, error) {
			var offline = window.LS.get("reais3_offline_" + USER_ID) == null ? {
				checked: false
			} : JSON.parse(window.LS.get("reais3_offline_" + USER_ID));
			if (!offline.checked) {
				$http.jsonp(HTTP_HOST + "/GetSiteSign?TaskId=" + TaskId + "&SiteId=" + SiteId + "&jsoncallback=JSON_CALLBACK").
				success(function(data, status) {
					success(data);
				}).
				error(function(data, status) {
					error(data);
				});
			} else {
				var data = window.LS.get("reais3_GetSiteSign_" + USER_ID + "_" + TaskId + "_" + SiteId);
				if (data != null) {
					success(JSON.parse(data));
				} else {
					success({
						root: []
					});
				}
			}
		},
		goSign: function(TaskId, SiteId, SignLng, SignLat, Altitude, success, error) {
			var offline = window.LS.get("reais3_offline_" + USER_ID) == null ? {
				checked: false
			} : JSON.parse(window.LS.get("reais3_offline_" + USER_ID));
			if (!offline.checked) {
				$http.jsonp(WEB_HOST + "/Public/goSign.aspx?UserId=" + USER_ID + "&ProjectId=" + PROJECT_ID + "&TaskId=" + TaskId + "&SiteId=" + SiteId + "&SignLng=" + SignLng + "&SignLat=" + SignLat + "&Altitude=" + Altitude + "&SignDate=&jsoncallback=JSON_CALLBACK").
				success(function(data, status) {
					success(data);
				}).
				error(function(data, status) {
					error(data);
				});
			} else {
				var data = {
					USER_ID: USER_ID,
					ProjectId: PROJECT_ID,
					TaskId: TaskId,
					SiteId: SiteId,
					SignLng: SignLng,
					SignLat: SignLat,
					Altitude: Altitude,
					SignDate: new Date().Format("yyyy-MM-dd hh:mm:ss")
				};
				//存入提交库
				window.LS.set("reais3_goSign_" + USER_ID + "_" + TaskId + "_" + SiteId, JSON.stringify(data));

				//修改经纬度
				var GetSiteSign = JSON.parse(window.LS.get("reais3_GetSiteSign_" + USER_ID + "_" + TaskId + "_" + SiteId));
				GetSiteSign.root[0].SignLng = SignLng;
				GetSiteSign.root[0].SignLat = SignLat;
				GetSiteSign.root[0].Altitude = Altitude;
				window.LS.set("reais3_GetSiteSign_" + USER_ID + "_" + TaskId + "_" + SiteId, JSON.stringify(GetSiteSign));

				//内容页修改提交状态
				var GetSiteAllStatus = JSON.parse(window.LS.get("reais3_GetSiteAllStatus_" + USER_ID + "_" + TaskId + "_" + SiteId));
				GetSiteAllStatus.root[0].SignStatus = "1";
				window.LS.set("reais3_GetSiteAllStatus_" + USER_ID + "_" + TaskId + "_" + SiteId, JSON.stringify(GetSiteAllStatus));

				//修改勘察站列表状态
				var GetItemSiteList = JSON.parse(window.LS.get("reais3_GetItemSiteList_" + USER_ID + "_" + TaskId));
				for (var i = 0; i < GetItemSiteList.root.length; i++) {
					if (GetItemSiteList.root[i].ObjectId == SiteId) {
						GetItemSiteList.root[i].Status = "01";
						break
					}
				}
				window.LS.set("reais3_GetItemSiteList_" + USER_ID + "_" + TaskId, JSON.stringify(GetItemSiteList));

				success({
					"result": "ok",
					"msg": ""
				});
			}
		},
		SelectSite: function(success, error) {
			$http.jsonp(HTTP_HOST + "/getMyTaskData?DataType=TaskSiteList&TaskStatus=&TaskId=&UserId=" + USER_ID + "&jsoncallback=JSON_CALLBACK").
			success(function(data) {
				success(data);
			});
		},
		DownloadOffLineData: function(SelectItems,offline, success, error) {
			//如果要切换到离线模式,下载带待勘察以及正在勘察中的数据
			var dn = 0;
			if (offline) {
				var GetItemList0 = {
					"root": []
				};
				var GetItemList1 = {
					"root": []
				};
				for (var k = 0; k < SelectItems.length; k++) {
					var SiteInfo = SelectItems[k].SiteInfo;
					var newSiteInfo = {
						"root": []
					};
					for (var h = 0; h < SiteInfo.length; h++) {
						if (SiteInfo[h].checked) {
							newSiteInfo.root.push(SiteInfo[h]);
						}
					}
					for (var h = 0; h < SiteInfo.length; h++) {
						if (SiteInfo[h].checked) {
							if (SelectItems[k].TaskStatus == 0) {
								var obj = SelectItems[k];
								delete obj.SiteInfo;
								obj.Num = newSiteInfo.root.length;
								GetItemList0.root.push(obj);
							} else {
								var obj = SelectItems[k];
								delete obj.SiteInfo;
								obj.Num = newSiteInfo.root.length;
								GetItemList1.root.push(obj);
							}
							//下载 信息沟通
							(function(TaskId) {
								dn = dn + 1;
								$http.jsonp(HTTP_HOST + "/getTaskMemberList?&TaskId=" + TaskId + "&jsoncallback=JSON_CALLBACK").
								success(function(data, status) {
									window.LS.set("reais3_getTaskMemberList_" + USER_ID + "_" + TaskId, JSON.stringify(data));
								});
							})(SelectItems[k].TaskId);
							break
						}
					}

					if(newSiteInfo.root.length>0){
						dn = dn + 1;
						window.LS.set("reais3_GetItemSiteList_" + USER_ID + "_" + SelectItems[k].TaskId, JSON.stringify(newSiteInfo));
					}
					for (var i = 0; i < newSiteInfo.root.length; i++) {
						var obj = newSiteInfo.root[i];
						//获取站的状态
						(function(TaskId, SiteId) {
							dn = dn + 1;
							$http.jsonp(HTTP_HOST + "/GetSiteAllStatus?TaskId=" + TaskId + "&SiteId=" + SiteId + "&jsoncallback=JSON_CALLBACK").
							success(function(data) {
								window.LS.set("reais3_GetSiteAllStatus_" + USER_ID + "_" + TaskId + "_" + SiteId, JSON.stringify(data));
							});
						})(obj.TaskId, obj.ObjectId);
						//获取站采集类别
						(function(TaskId, SiteId) {
							dn = dn + 1;
							$http.jsonp(HTTP_HOST + "/GetTaskInfoTypes?TaskId=" + TaskId + "&SiteId=&jsoncallback=JSON_CALLBACK").
							success(function(data) {
								window.LS.set("reais3_GetTaskInfoTypes_" + USER_ID + "_" + TaskId + "_" + SiteId, JSON.stringify(data));
								for (var i = 0; i < data.root.length; i++) {
									var obj = data.root[i];
									//采集类别属性
									(function(TaskId, SiteId, TypeID) {
										dn = dn + 1;
										$http.jsonp(HTTP_HOST + "/GetTaskPropertys?TaskId=" + TaskId + "&SiteId=" + SiteId + "&TypeID=" + TypeID + "&jsoncallback=JSON_CALLBACK").
										success(function(data) {
											window.LS.set("reais3_GetTaskPropertys_" + USER_ID + "_" + TaskId + "_" + SiteId + "_" + TypeID, JSON.stringify(data));

											//下载表单样式
											for (var i = 0; i < data.root.length; i++) {
												var obj = data.root[i];
												(function(TaskId, SiteId, TypeID, PropertyID, IsPropertyGroup) {
													dn = dn + 1;
													$http.jsonp(HTTP_HOST + "/GetTaskPropertyControl?TaskId=" + TaskId + "&SiteId=" + SiteId + "&TypeID=" + TypeID + "&PropertyID=" + PropertyID + "&IsPropertyGroup=" + IsPropertyGroup + "&jsoncallback=JSON_CALLBACK").
													success(function(data) {
														window.LS.set("reais3_GetTaskPropertyControl_" + USER_ID + "_" + TaskId + "_" + SiteId + "_" + TypeID + "_" + PropertyID + "_" + IsPropertyGroup, JSON.stringify(data));
														if (IsPropertyGroup == "1") {
															for (var i = 0; i < data.root.length; i++) {
																var obj = data.root[i];
																(function(TaskId, SiteId, TypeID, PropertyID, IsPropertyGroup) {
																	dn = dn + 1;
																	$http.jsonp(HTTP_HOST + "/GetTaskPropertyControl?TaskId=" + TaskId + "&SiteId=" + SiteId + "&TypeID=" + TypeID + "&PropertyID=" + PropertyID + "&IsPropertyGroup=" + IsPropertyGroup + "&jsoncallback=JSON_CALLBACK").
																	success(function(data) {
																		window.LS.set("reais3_GetTaskPropertyControl_" + USER_ID + "_" + TaskId + "_" + SiteId + "_" + TypeID + "_" + PropertyID + "_" + IsPropertyGroup, JSON.stringify(data));
																	});
																})(TaskId, SiteId, TypeID, obj.PropertyID, "0");
															}
														}

													});
												})(TaskId, SiteId, TypeID, obj.PropertyID, obj.IsPropertyGroup);
											}

										});
									})(TaskId, SiteId, obj.TypeID);
								}
							});
						})(obj.TaskId, obj.ObjectId);

						//获取站图片类别
						(function(TaskId, SiteId) {
							dn = dn + 1;
							$http.jsonp(HTTP_HOST + "/getSiteDirectory?TaskId=" + TaskId + "&SiteId=" + SiteId + "&jsoncallback=JSON_CALLBACK").
							success(function(data) {
								window.LS.set("reais3_getSiteDirectory_" + USER_ID + "_" + TaskId + "_" + SiteId, JSON.stringify(data));
								for (var i = 0; i < data.root.length; i++) {
									var obj = data.root[i];
									(function(TaskId, SiteId, DirectoryID) {
										dn = dn + 1;
										$http.jsonp(HTTP_HOST + "/getSitePicName?&page=1&TaskId=" + TaskId + "&SiteId=" + SiteId + "&DirectoryID=" + DirectoryID + "&PicId=&IsNextPic=0&jsoncallback=JSON_CALLBACK").
										success(function(data) {
											window.LS.set("reais3_getSitePicName_" + USER_ID + "_" + TaskId + "_" + SiteId + "_" + DirectoryID, JSON.stringify(data));
											//下载图片,PC下面要注释
											//downloadPic(data);
										});
									})(TaskId, SiteId, obj.DirectoryID);
								}
							});
						})(obj.TaskId, obj.ObjectId);

						//获取站的签到位置
						(function(TaskId, SiteId) {
							dn = dn + 1;
							$http.jsonp(HTTP_HOST + "/GetSiteSign?TaskId=" + TaskId + "&SiteId=" + SiteId + "&jsoncallback=JSON_CALLBACK").
							success(function(data) {
								window.LS.set("reais3_GetSiteSign_" + USER_ID + "_" + TaskId + "_" + SiteId, JSON.stringify(data));
							});
						})(obj.TaskId, obj.ObjectId);	
					}
				}
				dn = dn + 1;
				window.LS.set("reais3_GetItemList_" + "0" + "_" + USER_ID, JSON.stringify(GetItemList0));
				dn = dn + 1;
				window.LS.set("reais3_GetItemList_" + "1" + "_" + USER_ID, JSON.stringify(GetItemList1));

				//监测下载进度
				var sh;
				var n = window.LS.length();
				var checkLSLength = function() {
					var m = window.LS.length();
					console.log(n + "," + m + "," + dn);
					if (n == m && m >= dn) {
						clearInterval(sh);
						success({
							result: "ok"
						});
					} else {
						n = m;
					}
				}
				sh = window.setInterval(checkLSLength, 1000);
			} else { //如果要切换到在线模式,上传已提交的数据,并清空下载的数据
				var initn = window.LS.length();
				window.LS.each(function(key, value) {
					//把用户离线签到数据删除到服务器
					if (key.indexOf("reais3_goSign_" + USER_ID) != -1) {
						var data = JSON.parse(value);
						dn = dn + 1;
						$http.jsonp(WEB_HOST + "/Public/goSign.aspx?UserId=" + USER_ID + "&ProjectId=" + PROJECT_ID + "&TaskId=" + data.TaskId + "&SiteId=" + data.SiteId + "&SignLng=" + data.SignLng + "&SignLat=" + data.SignLat + "&Altitude=" + data.Altitude + "&SignDate=" + data.SignDate + "&jsoncallback=JSON_CALLBACK").
						success(function(data) {
							window.LS.remove(key);
						});
					}
					//若包含用户离线表单数据,则移除
					if (key.indexOf("reais3_TaskFormDataUpload_" + USER_ID) != -1) {
						var data = JSON.parse(value);
						dn = dn + 1
						$http.jsonp(HTTP_HOST + "/TaskFormDataUpload?UserId=" + USER_ID + "&ProjectId=" + PROJECT_ID + "&TaskId=" + data.TaskId + "&SiteId=" + data.SiteId + "&PropertyID=" + data.PropertyID + "&PropertylName=" + data.PropertylName + "&PropertyInstance_Value=" + data.PropertyInstance_Value + "&jsoncallback=JSON_CALLBACK").
						success(function(data) {
							window.LS.remove(key);
						}).
						error(function(data) {
							//
						});

					}
					//若保护用户离线图片数据,则删除,移除
					if (key.indexOf("reais3_uploadfile_" + USER_ID) != -1) {
						var data = JSON.parse(value);
						console.log(key);
						console.log(data);
						fuOptions = new FileUploadOptions();
						fuOptions.fileKey = "file";
						fuOptions.fileName = data.imageURI.substr(data.imageURI.lastIndexOf('/') + 1);
						fuOptions.mimeType = "multipart/form-data";
						fuOptions.params = data.params;
						var ft = new FileTransfer();
						dn = dn + 1
						ft.upload(data.imageURI, encodeURI(WEB_HOST + '/Public/uploadfile.aspx'), function(r) {
							window.LS.remove(key);
							try {
								deletePictureFromCache(data.imageURI);
							} catch (e) {
								console.log(e.message);
							}
						}, null, fuOptions);
					}
				});
				//监测下载进度
				var sh;
				var n = window.LS.length();
				var checkLSLength = function() {
					var m = window.LS.length();
					var k = initn - dn;
					console.log(n + "," + m + "," + k);
					if (n == m && m <= k) {
						clearInterval(sh);
						window.LS.each(function(key, value) {
							//若包含用户离线数据,则移除
							if (key != "reais3_account") {
								window.LS.remove(key);
							}
						});
						success({
							result: "ok"
						});
					} else {
						n = m;
					}
				}
				sh = window.setInterval(checkLSLength, 1000);
			}
		}
	}
}]);