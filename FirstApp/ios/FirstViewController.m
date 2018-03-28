//
//  FirstViewController.m
//  FirstApp
//
//  Created by ljl on 2018/3/22.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import "FirstViewController.h"
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import "TwoViewController.h"
#import "AppDelegate.h"
@interface FirstViewController ()

@end

@implementation FirstViewController

- (void)viewDidLoad {
    [super viewDidLoad];
  NSURL *jsCodeLocation;
  self.title = @"首页";
  jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
  
  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                      moduleName:@"FirstApp"
                                               initialProperties:nil
                                                   launchOptions:nil];
  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];
  
  self.view=rootView;
  
    // Do any additional setup after loading the view.
}
////到出模块,不添加参数即默认为这改类名
RCT_EXPORT_MODULE();


/**
 接受rn端传值
 
 @param NSString rn端传过来的数据
 callback:为rn端回掉函数
 如果ios端只想接受rn端数据那么可以把后面callback去掉
 
 @return
 */

RCT_EXPORT_METHOD(doSomething:(NSString *)testStr callback:(RCTResponseSenderBlock)callback){
  NSLog(@"rn传过来的参数为%@",testStr);
  if (testStr.length>0) {
   //NSString *OsStr = @"1";
   // callback(@[[NSNull null],OsStr]);
    dispatch_async(dispatch_get_main_queue(), ^{
      //点击rn按钮显示ios控件
    //  [self NativeAlertRNmesg:testStr];
      
     //rn端触发跳转到原生界面
      [self PushTwoVc];
      //点击rn按钮创建一个ios view
     // [self ConFigNativeView];
    });
   

   
//
  }
}

/**
 rn触发ios原生控件

 @param mesg rn传来的值
 */
-(void)NativeAlertRNmesg:(NSString*)mesg
{
  NSLog(@"我是原生提示控件被rn触发了");
      UIAlertView * alertView=[[UIAlertView alloc] initWithTitle:@"react-native" message:mesg delegate:nil cancelButtonTitle:@"关闭" otherButtonTitles:nil, nil];
      [alertView show];
  
  
}

/**
 rn触发跳转到原生界面
 */
-(void)PushTwoVc{
  
  NSLog(@"我被rn触发来现在我要跳转到原生界面中去喽");
        //ios中的rn界面点击rn按钮跳转到原生界面
        AppDelegate *app = (AppDelegate *)[[UIApplication sharedApplication] delegate];
          TwoViewController *twoVC = [[TwoViewController alloc]init];
          [app.nav pushViewController:twoVC animated:YES];
}

/**
 通过rn端创建一个iosview并且显示到屏幕上
 */
-(void)ConFigNativeView{
       AppDelegate *app = (AppDelegate *)[[UIApplication sharedApplication] delegate];
          UIView *v = [[UIView alloc]initWithFrame:CGRectMake(100, 100,100,100)];
          v.backgroundColor = [UIColor redColor];
          [app.nav.view addSubview:v];
}



- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

/*
#pragma mark - Navigation

// In a storyboard-based application, you will often want to do a little preparation before navigation
- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender {
    // Get the new view controller using [segue destinationViewController].
    // Pass the selected object to the new view controller.
}
*/

@end
