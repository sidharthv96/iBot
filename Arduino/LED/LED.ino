#include <Arduino.h>

#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <ArduinoJson.h>
#include <ESP8266mDNS.h>

#include <ESP8266WiFiMulti.h> // Include the Wi-Fi-Multi library
ESP8266WiFiMulti wifiMulti;

String host="";
String code;

byte ledState = LOW;
byte blinkState = LOW;
#define LED_PIN D0
char hostString[16] = {0};

void setup()
{

    Serial.begin(115200);
    connectWifi();

    HTTPClient http;
    Serial.print("[HTTP] begin...\n");
//    IPAddress ipa = WiFi.localIP();
//    int x = 102;
//    String ip = String(ipa[0]) + "." + String(ipa[1]) + "." + String(ipa[2]) + ".";
//    while (1)
//    {
//        host = "http://" + ip + String(x++) + ":80";
//        http.begin(host + "/test/"); //HTTP
//        Serial.print("[HTTP] GET..." + host + "\n");
//        int httpCode = http.GET();
//        if (httpCode > 0)
//        {
//            Serial.printf("[HTTP] GET... code: %d\n", httpCode);
//            if (httpCode == HTTP_CODE_OK)
//            {
//                String payload = http.getString();
//                Serial.println(payload);                
//                http.end();
//                break;
//            }
//        }
//        http.end();
//    }

    
 if (!MDNS.begin(hostString)) {
    Serial.println("Error setting up MDNS responder!");
  }
  Serial.println("mDNS responder started");
  do{
    int n = MDNS.queryService("esp", "tcp"); // Send out query for esp tcp services
  
  Serial.println("mDNS query done");
  if (n == 0) {
    Serial.println("no services found");
  }
  else {
    Serial.print(n);
    Serial.println(" service(s) found");
    for (int i = 0; i < n; ++i) {
      // Print details for each service found
      Serial.print(i + 1);
      Serial.print(": ");
      Serial.print(MDNS.hostname(i));
//      String ip = String(MDNS.IP(i)[0]) + "." + String(MDNS.IP(i)[1]) + "." + String(MDNS.IP(i)[2]) + "." + MDNS.IP(i)[3];
      if(MDNS.hostname(i)=="ibot"){
        host="http://"+MDNS.IP(i).toString()+":80";
      }
      Serial.print(" (");
      Serial.print(MDNS.IP(i));
      Serial.print(":");
      Serial.print(MDNS.port(i));
      Serial.println(")");
    }
  }
  }while(host=="");
  Serial.println(host);
  
  
//    host = "http://ibot.local";

    String PostData = "{\"mode\":\"actuator\",\"version\":\"2\",\"code\":\"" + code + "\",\"type\":\"led\",\"actions\":{\"on\":\"actuator.data=1\",\"off\":\"actuator.data=0\",\"toggle\":\"actuator.data=toggle(actuator.data)\",\"blink\":\"actuator.data='blink'\"}}";
    http.begin(host + "/device/register/");
    http.addHeader("Content-Type", "application/json");
    int httpCode = http.POST(PostData);
    Serial.println(httpCode);
    String payload = http.getString();
    Serial.println(payload);
    pinMode(LED_PIN, OUTPUT);
    digitalWrite(LED_PIN, HIGH);

}

void loop()
{
    HTTPClient http;
    http.begin(host + "/refresh/?code=" + code);
    int httpCode = http.GET();
    if (httpCode > 0)
    {
        if (httpCode == HTTP_CODE_OK)
        {
            String payload = http.getString();
            Serial.println("." + payload + ".");
            if (payload == "1")
            {
                digitalWrite(LED_PIN, LOW);
            }
            else if (payload == "0")
            {
                digitalWrite(LED_PIN, HIGH);
            }
            blinkState = (payload == "blink");
        }
    }
    else
    {
        Serial.println(httpCode);
    }
    http.end();
    if (blinkState)
    {
        ledState = !ledState;
        digitalWrite(LED_PIN, ledState);
    }
    delay(400);
}


void connectWifi()
{
    boolean state = true;
    wifiMulti.addAP("Redmi 3S", "kannan123"); // add Wi-Fi networks you want to connect to
    wifiMulti.addAP("Shield", "12347777");
    wifiMulti.addAP("Hacker", "virusalert");
    wifiMulti.addAP("Tenda_479FF0", "vadanasurada");
    wifiMulti.addAP("iBot", "iRobot969");

    Serial.print("Connecting.");

    while (wifiMulti.run() != WL_CONNECTED)
    { // Wait for the Wi-Fi to connect: scan for Wi-Fi networks, and connect to the strongest of the networks above
        delay(500);
        Serial.print('.');
    }

    Serial.print("Connected to ");
    Serial.println(WiFi.SSID());
    Serial.print("IP address: ");
    Serial.println(WiFi.localIP());     
    code = String(WiFi.macAddress());
    code.replace(":", "");
}
