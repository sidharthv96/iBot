/*
 * Copyright 2016 Anton Tananaev (anton@cod3r.org)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package cool.robo.ibot;

import android.app.Activity;
import android.os.Bundle;
import android.preference.PreferenceManager;
import android.provider.Settings;
import android.util.Log;
import android.widget.Toast;

import java.util.HashMap;
import java.util.Map;

public class MainActivity extends Activity {

    public static final String PREFERENCE_URL = "url";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
//        FirebaseUser user = FirebaseAuth.getInstance().getCurrentUser();
//        if(user!=null) {

//            sendRegistrationToServer(FirebaseInstanceId.getInstance().getToken());

//        }
        if (savedInstanceState == null) {
            initContent();
        }
    }

    private void initContent() {
        PreferenceManager.getDefaultSharedPreferences(this)
                .edit().putString(MainActivity.PREFERENCE_URL, "http://matrix.qpha.org/").apply();
        getFragmentManager().beginTransaction().add(android.R.id.content, new MainFragment()).commit();
//        if (PreferenceManager.getDefaultSharedPreferences(this).contains(PREFERENCE_URL)) {
//            getFragmentManager().beginTransaction().add(android.R.id.content, new MainFragment()).commit();
//        } else {
//            getFragmentManager().beginTransaction().add(android.R.id.content, new StartFragment()).commit();
//        }
    }

//    private void sendRegistrationToServer(final String token) {
//        String URL = "http://cod3r.space/register/device/";
//        final String android_id = Settings.Secure.getString(getApplicationContext().getContentResolver(),
//                Settings.Secure.ANDROID_ID);
//
////        Log.d(TAG,token);
//        StringRequest strReq = new StringRequest(Request.Method.POST,
//                URL, new Response.Listener<String>() {
//
//            @Override
//            public void onResponse(String response) {
//                Log.e("HAI",response.toString());
//                try {
////                    String url = Uri.parse("http://sid.qpha.org/register/login/")
////                            .buildUpon()
////                            .appendQueryParameter("email", user.getEmail())
////                            .appendQueryParameter("uid", user.getUid())
////                            .build().toString();
////                    Toast.makeText(getApplicationContext(),
////                            response, Toast.LENGTH_LONG).show();
//                }
//                catch (Exception e) {
//                    Toast.makeText(getApplicationContext(), "Network Error! Try Again!", Toast.LENGTH_LONG).show();
//                }
//            }
//        }, new Response.ErrorListener() {
//            @Override
//            public void onErrorResponse(VolleyError error) {
//                Toast.makeText(getApplicationContext(), "Network Error! Try Again!", Toast.LENGTH_LONG).show();
//            }
//        }) {
//            @Override
//            protected Map<String, String> getParams() {
//                Map<String, String> params = new HashMap<>();
//                params.put("token", token);
//                params.put("aid",android_id);
//                params.put("uid","sid");
//                return params;
//            }
//        };
//        AppController.getInstance().addToRequestQueue(strReq, "req");
//    }

}
