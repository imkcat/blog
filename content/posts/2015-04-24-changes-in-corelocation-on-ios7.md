---
title: "CoreLocation 在 iOS7 以后的改变"
date: "2015-04-24T02:40:00.000Z"
slug: "changes-in-corelocation-on-ios7"
coverImage: "/images/2017/08/FgESoXxQRKv8ksRiIj885Zh4VmfsuscE.jpg"
tags: ["CoreLocation", "iOS", "随笔小记"]
author: "Kcat"
excerpt: ""
---
在 **iOS7** 的时候，在使用 `CoreLocation` 的时候是没有强制让用户去选择是否授权给iOS设备获取用户的位置的，**iOS8** 以后，Apple就更改 `CoreLocation` 的用法，必须让用户去授权，才能够获取用户的位置数据那么 **iOS8** 需要什么样的做法才能够让 `CoreLocation` 正常使用呢？

那么代码中 **必须** 有这两句的任何一句存在：

``` swift
let locationManager = CLLocationManager()

// 授权为在任何情况下都可以使用CoreLoction
locationManager.requestAlwaysAuthorization()

// 授权为仅在使用App的时候情况下可以使用CoreLoction
locationManager.requestWhenInUseAuthorization()  
```

那么做完这些还不够，还需要在项目中的 `info.Plist` 中添加两个Key，`NSLocationAlwaysUsageDescription` 和 `NSLocationWhenInUseUsageDescription`，这两个Key分别和上面两行代码是对应的关系，在对应的 Key 的 Value 中需要填写在授权提示框中，你想要给用户呈现的文字