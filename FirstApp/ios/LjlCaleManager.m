//
//  LjlCaleManager.m
//  FirstApp
//
//  Created by ljl on 2018/3/23.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import "LjlCaleManager.h"
#import <React/RCTEventDispatcher.h>
#import <React/RCTLog.h>
NSString *const kEventEmitterManagerEvent  = @"EventEmitterManagerEvent";
@implementation LjlCaleManager

RCT_EXPORT_MODULE();


// 等 RN组件 监听事件通知后 在发送事件通知
RCT_EXPORT_METHOD(postNotificationEvent:(NSString *)name)
{
  RCTLogInfo(@"postNotificationEvent->:%@",name);
  [self sendEventWithName:kEventEmitterManagerEvent body:name];
}

- (NSDictionary<NSString *, NSString *> *)constantsToExport {
  return @{ @"EventEmitterManagerEvent": kEventEmitterManagerEvent,
            };
}

- (NSArray<NSString *> *)supportedEvents {
  return @[kEventEmitterManagerEvent,];
}

@end
