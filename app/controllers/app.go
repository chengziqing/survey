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
