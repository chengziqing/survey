package controllers

import "github.com/revel/revel"
import (
	"fmt"
)

type App struct {
	*revel.Controller
}

func (c App) Index() revel.Result {
	return c.Render()
}

//1、 获取用户信息
func (c App) GetUserInfo(jsoncallback string) revel.Result {
	jsonp := "%s(%s)"
	json := `{
        "root": [{
            "UserId": "1F231B12-BB73-441E-8220-0AA1542767A1",
            "Code": "00135",
            "Account": "chenwei",
            "Password": "E0C5CA63AF1E89E56623E24274CD6B44",
            "Secretkey": "AF67EAD8716422C2",
            "UserName": "陈伟",
            "Gender": "",
            "DepartmentCode": "001002012",
            "DepartmentId": "B762C299-DC71-4CA0-85C5-79E860DCA15B",
            "DepartmentName": "第四设计研究所",
            "RoleId": "d0a61fac-f54c-42dd-9193-f858717feb34",
            "RoleKind": "9",
            "RoleKinds": "9",
            "RoleIds": "d0a61fac-f54c-42dd-9193-f858717feb34",
            "UpDepartmentId": "31b05701-60ef-405c-87ba-af47049e3f48",
            "UpDepartmentName": "安徽分院",
            "DepartmentKind": "1",
            "ServerOrganRange": "'32','3201','3202'",
            "ServerFullRange": "'32','3201','3202'"
        }]
    }`
	c.Response.ContentType = "application/json;charset=utf-8"
	return c.RenderText(fmt.Sprintf(jsonp, jsoncallback, json))
}

//2、 获取当前用户的任务列表
func (c App) GetItemList(jsoncallback string) revel.Result {
	jsonp := "%s(%s)"
	json := `{
	    "totalCount": 0,
	    "root": [{
	        "ProjectId": "4bf8f687-0a89-4922-9e3f-c6631e4382b9",
	        "TaskId": "10618694-4b9c-4a52-b210-f9cc0a1926be",
	        "TaskNo": "testTAsk01",
	        "TaskName": "测试任务1",
	        "Num": "4"
	    }, {
	        "ProjectId": "b5c6fe96-4b91-4733-a5f3-f6d03a3648f0",
	        "TaskId": "5730171f-1310-4257-9c9b-f47083427d3c",
	        "TaskNo": "testTask20150119",
	        "TaskName": "测试任务20150119",
	        "Num": "4"
	    }, {
	        "ProjectId": "b5c6fe96-4b91-4733-a5f3-f6d03a3648f0",
	        "TaskId": "ecd7af13-8008-46d1-ae8c-ef5d93a6a41b",
	        "TaskNo": "testTask20150105",
	        "TaskName": "测试任务",
	        "Num": "4"
	    }]
	}`
	c.Response.ContentType = "application/json;charset=utf-8"
	return c.RenderText(fmt.Sprintf(jsonp, jsoncallback, json))
}

//3、获取任务下的站点列表
func (c App) GetItemSiteList(jsoncallback string) revel.Result {
	jsonp := "%s(%s)"
	json := `{
        "totalCount": 1,
        "root": [{
            "ProjectId": "b5c6fe96-4b91-4733-a5f3-f6d03a3648f0",
            "TaskId": "5730171f-1310-4257-9c9b-f47083427d3c",
            "ObjectType": "01",
            "ObjectId": "129885a7-2135-4523-8d8e-926d52f750ff",
            "ObjectName": "中科大先研院南门",
            "BusinessId": "",
            "FlowStatus": "--",
            "Status":"00",
            "OperFlag": "",
            "Num": "0",
            "Num11": "0",
            "Num12": "0",
            "LNG_LAT": "117.124660,31.827250"
        }, {
            "ProjectId": "b5c6fe96-4b91-4733-a5f3-f6d03a3648f0",
            "TaskId": "5730171f-1310-4257-9c9b-f47083427d3c",
            "ObjectType": "01",
            "ObjectId": "1ba7f44a-4342-4a74-a567-71289bc3e0e6",
            "ObjectName": "省检察院",
            "BusinessId": "",
            "FlowStatus": "--",
            "Status":"01",
            "OperFlag": "",
            "Num": "0",
            "Num11": "0",
            "Num12": "0",
            "LNG_LAT": "117.231410,31.812190"
        }]
    }`
	c.Response.ContentType = "application/json;charset=utf-8"
	return c.RenderText(fmt.Sprintf(jsonp, jsoncallback, json))
}

//4、勘察站点的现场签到、信息采集、图片采集状态获取
func (c App) GetSiteAllStatus(jsoncallback string) revel.Result {
	jsonp := "%s(%s)"
	json := `{
        "root": [{
            "TaskId": "10618694-4b9c-4a52-b210-f9cc0a1926be",
            "SiteId": "1ba7f44a-4342-4a74-a567-71289bc3e0e6",
            "SignStatus": "1",
            "CollectStatus": "1",
            "PicTotalNum": 4,
            "PicDoingNum": 2
        }]
    }`
	c.Response.ContentType = "application/json;charset=utf-8"
	return c.RenderText(fmt.Sprintf(jsonp, jsoncallback, json))
}

//5、勘察站点的现场签到信息
func (c App) GetSiteSign(jsoncallback string) revel.Result {
	jsonp := "%s(%s)"
	json := `{
        "root": [{
            "TaskId": "1",
            "SiteId": "",
            "SignLng": 121.1212,
            "SignLat": 31.1212
        }]
    }`
	c.Response.ContentType = "application/json;charset=utf-8"
	return c.RenderText(fmt.Sprintf(jsonp, jsoncallback, json))
}

//5、任务下模板的业务类别获取
func (c App) GetTaskInfoTypes(jsoncallback string) revel.Result {
	jsonp := "%s(%s)"
	json := `{
        "root": [{
            "TaskId": "1",
            "TypeID": "0",
            "TypeName": "基本信息"
        },{
            "TaskId": "1",
            "TypeID": "1",
            "TypeName": "安全设置"
        },{
            "TaskId": "1",
            "TypeID": "2",
            "TypeName": "权限设置"
        }]
    }`
	c.Response.ContentType = "application/json;charset=utf-8"
	return c.RenderText(fmt.Sprintf(jsonp, jsoncallback, json))
}

//6、任务/业务类别下信息属性名称获取
func (c App) GetTaskPropertys(jsoncallback string) revel.Result {
	jsonp := "%s(%s)"
	json := `{
        "root": [{
            "TaskId": "1",
            "TypeID": "0",
            "PropertyID": "1",
            "PropertylName": "单行文本框",
            "IsPropertyGroup": "0"
        }, {
            "TaskId": "1",
            "TypeID": "1",
            "PropertyID": "2",
            "PropertylName": "日期框",
            "IsPropertyGroup": "0"
        }, {
            "TaskId": "1",
            "TypeID": "2",
            "PropertyID": "3",
            "PropertylName": "多行文本框",
            "IsPropertyGroup": "0"
        }, {
            "TaskId": "1",
            "TypeID": "3",
            "PropertyID": "4",
            "PropertylName": "下拉框",
            "IsPropertyGroup": "0"
        }, {
            "TaskId": "1",
            "TypeID": "4",
            "PropertyID": "5",
            "PropertylName": "单选框",
            "IsPropertyGroup": "0"
        }, {
            "TaskId": "1",
            "TypeID": "5",
            "PropertyID": "6",
            "PropertylName": "多选框",
            "IsPropertyGroup": "0"
        }, {
            "TaskId": "1",
            "TypeID": "6",
            "PropertyID": "7",
            "PropertylName": "组类型",
            "IsPropertyGroup": "1"
        }]
    }`
	c.Response.ContentType = "application/json;charset=utf-8"
	return c.RenderText(fmt.Sprintf(jsonp, jsoncallback, json))
}

//7 任务/业务类别下信息属性样式获取
func (c App) GetTaskPropertyControl(jsoncallback string, showType string) revel.Result {
	jsonp := "%s(%s)"
	json0 := `{
        "root": [{
            "TaskId": "1",
            "TypeID": "",
            "PropertyID": "1",
            "PropertylName": "基站名称",
            "ShowType": "0",
            "ShowStyle": "0",
            "PropertyValue": "",
            "Defaults": "",
            "Validator": "",
            "MaxLength": ""
        }]
    }`
	json1 := `{
        "root": [{
            "TaskId": "1",
            "TypeID": "",
            "PropertyID": "1",
            "PropertylName": "基站名称",
            "ShowType": "1",
            "ShowStyle": "0",
            "PropertyValue": "",
            "Defaults": "",
            "Validator": "",
            "MaxLength": ""
        }]
    }`
	json2 := `{
        "root": [{
            "TaskId": "1",
            "TypeID": "",
            "PropertyID": "1",
            "PropertylName": "基站名称",
            "ShowType": "2",
            "ShowStyle": "0",
            "PropertyValue": "",
            "Defaults": "",
            "Validator": "",
            "MaxLength": ""
        }]
    }`
	json3 := `{
        "root": [{
            "TaskId": "1",
            "TypeID": "",
            "PropertyID": "1",
            "PropertylName": "基站名称",
            "ShowType": "3",
            "ShowStyle": "0",
            "PropertyValue": "",
            "Defaults": "",
            "Validator": "",
            "MaxLength": ""
        }]
    }`
	json4 := `{
        "root": [{
            "TaskId": "1",
            "TypeID": "",
            "PropertyID": "1",
            "PropertylName": "基站名称",
            "ShowType": "4",
            "ShowStyle": "0",
            "PropertyValue": "",
            "Defaults": "",
            "Validator": "",
            "MaxLength": ""
        }]
    }`
	json5 := `{
        "root": [{
            "TaskId": "1",
            "TypeID": "",
            "PropertyID": "1",
            "PropertylName": "基站名称",
            "ShowType": "5",
            "ShowStyle": "0",
            "PropertyValue": "",
            "Defaults": "",
            "Validator": "",
            "MaxLength": ""
        }]
    }`
	c.Response.ContentType = "application/json;charset=utf-8"
	json := json0
	switch showType {
	case "0":
		json = json0
	case "1":
		json = json1
	case "2":
		json = json2
	case "3":
		json = json3
	case "4":
		json = json4
	case "5":
		json = json5
	}
	return c.RenderText(fmt.Sprintf(jsonp, jsoncallback, json))
}

//8 任务站点下往期任务列表获取(按时间倒序)
func (c App) GetHistoryTask(jsoncallback string) revel.Result {
	jsonp := "%s(%s)"
	json := `{
    "totalCount": 1,
        "root": [{
            "SiteId": "",
            "TaskId": "1",
            "TaskName": "1"
        }, {
            "SiteId": "",
            "TaskId": "1",
            "TaskName": "1"
        }]
    }`
	c.Response.ContentType = "application/json;charset=utf-8"
	return c.RenderText(fmt.Sprintf(jsonp, jsoncallback, json))
}

//9 任务下往期信息属性值获取(要求本地存储)
func (c App) GetHistoryPropertyValue(jsoncallback string) revel.Result {
	jsonp := "%s(%s)"
	json := `{
        "root": [{
            "PropertyID": "1",
            "PropertyInstance_Value": "站点1"
        }, {
            "PropertyID": "2",
            "PropertyInstance_Value": "AHST_001"
        }]
    }`
	c.Response.ContentType = "application/json;charset=utf-8"
	return c.RenderText(fmt.Sprintf(jsonp, jsoncallback, json))
}

//10、任务下参与人员获取(姓名、手机号)  用于信息勾通
func (c App) GetTaskMemberList(jsoncallback string) revel.Result {
	jsonp := "%s(%s)"
	json := `{
        "root": [{
            "UserName": "1",
            "Phone": ""
        }, {
            "UserName": "1",
            "Phone": ""
        }]
    }`
	c.Response.ContentType = "application/json;charset=utf-8"
	return c.RenderText(fmt.Sprintf(jsonp, jsoncallback, json))
}

//11、获取站点目录信息
func (c App) GetSiteDirectory(jsoncallback string) revel.Result {
	jsonp := "%s(%s)"
	json := `{
        "root": [{
            "TaskId": "1",
            "SiteId": "",
            "DirectoryID": "1",
            "DirectoryName": ""
        }, {
            "TaskId": "1",
            "SiteId": "",
            "DirectoryID": "1",
            "DirectoryName": ""
        }]
    }`
	c.Response.ContentType = "application/json;charset=utf-8"
	return c.RenderText(fmt.Sprintf(jsonp, jsoncallback, json))
}

//12、获取站点目录下的图片名称信息
func (c App) GetSitePicName(jsoncallback string) revel.Result {
	jsonp := "%s(%s)"
	json := ` {
     "totalCount": 1,
         "root": [{
             "TaskId": "1",
             "SiteId": "",
             "DirectoryID": "1",
             "DirectoryName": "",
             "PicId": "",
             "PicName": "",
             "PicStatus": "",
             "SmallPicPath": "",
             "PicPath": ""
         }, {
             "TaskId": "1",
             "SiteId": "",
             "DirectoryID": "1",
             "DirectoryName": "",
             "PicId": "",
             "PicName": "",
             "PicStatus": "",
             "SmallPicPath": "",
             "PicPath": ""
         }]
    }`
	c.Response.ContentType = "application/json;charset=utf-8"
	return c.RenderText(fmt.Sprintf(jsonp, jsoncallback, json))
}

//13、表单属性值上传
func (c App) TaskFormDataUpload(jsoncallback string) revel.Result {
	jsonp := "%s(%s)"
	json := `{
        "result": "OK",
        "msg": ""
    }`
	c.Response.ContentType = "application/json;charset=utf-8"
	return c.RenderText(fmt.Sprintf(jsonp, jsoncallback, json))
}
