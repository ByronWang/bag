package cn.xj.bag.plugin.unionpay;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaInterface;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CordovaWebView;
import org.json.JSONArray;
import org.json.JSONException;

import android.util.Log;

import com.unionpay.UPPayAssistEx;
import com.unionpay.uppay.PayActivity;

public class Unionpay extends CordovaPlugin {

    @Override
    public void initialize(CordovaInterface cordova, CordovaWebView webView) {
        super.initialize(cordova, webView);
    }

    @Override
    public boolean execute(String action, JSONArray args, final CallbackContext callbackContext) throws JSONException {
        if ("pay".equals(action)) {
            String tn = args.getString(0);
            Log.i("Unionpay", "tn: " + args.getString(0));
            UPPayAssistEx.startPayByJAR(cordova.getActivity(), PayActivity.class, null, null, tn, "01");
            callbackContext.success(); // Thread-safe.
            return true;
        }
        return false; // Returning false results in a "MethodNotFound" error.
    }

}
