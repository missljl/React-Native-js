/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

#import "AppDelegate.h"

#import "FirstViewController.h"

//rn给原生传值第一步导入#import <React/RCTBridgeModule.h> 遵守改协议


@implementation AppDelegate



- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
//  NSURL *jsCodeLocation;
//
//  jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
//
//  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
//                                                      moduleName:@"FirstApp"
//                                               initialProperties:nil
//                                                   launchOptions:launchOptions];
//  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  FirstViewController *rootViewController = [FirstViewController new];
  
  _nav = [[UINavigationController alloc]initWithRootViewController:rootViewController];
  self.window.rootViewController = _nav;
  
  [self.window makeKeyAndVisible];
  return YES;
}

////RN传参数调用原生OC,并且返回数据给RN  通过Promise
//RCT_EXPORT_METHOD(RNInvokeOCPromise:(NSDictionary *)dictionary resolver:(RCTPromiseResolveBlock)resolve
//                  rejecter:(RCTPromiseRejectBlock)reject){
//  NSLog(@"接收到RN传过来的数据为:%@",dictionary);
//  NSString *value=[dictionary objectForKey:@"name"];
//  if([value isEqualToString:@"jiangqq"]){
//    resolve(@"回调成功啦,Promise...");
//  }else{
//    NSError *error=[NSError errorWithDomain:@"传入的name不符合要求,回调失败啦,Promise..." code:100 userInfo:nil];
//    reject(@"100",@"传入的name不符合要求,回调失败啦,Promise...",error);
//  }
//}
/**
 <#Description#>
 
sendAppEventWithName方法包含二个参数:
 参数1 EventReminder自定义一个事件名称
 参数2 具体传入JavaScrtipt的数据信息
 */

//RCT_EXPORT_METHOD(VCOpenRN:(NSDictionary *)dictionary){
//  NSLog(@"%@",dictionary);
//  NSString *value=[dictionary objectForKey:@"name"];
//  if([value isEqualToString:@"jiangqq"]){
//    [self.bridge.eventDispatcher sendAppEventWithName:@"EventReminder" body:@{@"name":[NSString stringWithFormat:@"%@",value],@"errorCode":@"0",@"msg":@"成功"}];
//  }else{
//    [self.bridge.eventDispatcher sendAppEventWithName:@"EventReminder" body:@{@"name":[NSString stringWithFormat:@"%@",value],@"errorCode":@"0",@"msg":@"输入的name不是jiangqq"}];
//  }
// }



@end
