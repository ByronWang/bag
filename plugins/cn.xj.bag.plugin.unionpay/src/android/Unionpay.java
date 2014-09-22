package cn.xj.bag.plugin.unionpay;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaInterface;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CordovaWebView;
import org.json.JSONArray;
import org.json.JSONException;

import android.content.Intent;
import android.util.Log;

import com.unionpay.UPPayAssistEx;
import com.unionpay.uppay.PayActivity;

public class Unionpay extends CordovaPlugin {

    public CallbackContext callbackContext;

    @Override
    public void initialize(CordovaInterface cordova, CordovaWebView webView) {
        super.initialize(cordova, webView);
    }

    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
        this.callbackContext = callbackContext;
        cordova.setActivityResultCallback(this);

        if ("pay".equals(action)) {
            try {
                final String tn = args.getString(0);
                final String mode = args.getString(1) == null ? "01" : args.getString(1);
                Log.i("Unionpay", "tn: " + args.getString(0));
                UPPayAssistEx.startPayByJAR(cordova.getActivity(), PayActivity.class, null, null, tn, mode);
            } catch (Exception e) {
                callbackContext.error(e.getMessage());
            }
            return true;
        }

        return false; // Returning false results in a "MethodNotFound" error.
    }

    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent intent) {
        if (intent == null) {
            callbackContext.error("Intent is null");
            return;
        }

        /*
         * 支付控件返回字符串:success、fail、cancel 分别代表支付成功，支付失败，支付取消
         */
        String msg = intent.getExtras().getString("pay_result");
        if (msg == null) {
            callbackContext.error("Result 'pay_result' is null");
            return;
        }
        Log.i("Unionpay", "return message: " + msg);
        callbackContext.success(msg); // Thread-safe.
    }

}
