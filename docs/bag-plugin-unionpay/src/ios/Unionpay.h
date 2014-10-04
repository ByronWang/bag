//
//  Unionpay.h
//  Bag
//
//  Created by apple on 14-9-23.
//
//

#import <Cordova/CDVPlugin.h>
#import "UPPayPlugin.h"

@interface Unionpay : CDVPlugin <UPPayPluginDelegate>
{
    NSString* _callbackId;
}

- (void)pay:(CDVInvokedUrlCommand*)command;

- (void)UPPayPluginResult:(NSString *)result;

@end
