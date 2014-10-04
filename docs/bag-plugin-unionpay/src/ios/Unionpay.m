//
//  Unionpay.metal
//  Bag
//
//  Created by apple on 14-9-23.
//
//

#import "Unionpay.h"
#import <Cordova/CDV.h>
#import "UPPayPlugin.h"

@implementation Unionpay

/* log a message */
- (void)pay:(CDVInvokedUrlCommand*)command
{
    _callbackId = command.callbackId;
    
    @try {
        NSString* tn = [command.arguments objectAtIndex:0];
        NSString* mode = ([command.arguments objectAtIndex:0]) ? @"01" : [command.arguments objectAtIndex:0];
        [UPPayPlugin startPay:tn mode:mode viewController:self.viewController delegate:self];
    }
    @catch (NSException *exception) {
        CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:[exception reason]];
        [self.commandDelegate sendPluginResult:pluginResult callbackId:_callbackId];
    }
    @finally {
        
    }
}

- (void)UPPayPluginResult:(NSString *)result
{
    CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:result];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:_callbackId];
}

@end
