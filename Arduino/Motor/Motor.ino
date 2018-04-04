#include <Arduino.h>

#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <ESP8266mDNS.h>
#include <ArduinoJson.h>

#include <ESP8266WiFiMulti.h> // Include the Wi-Fi-Multi library
ESP8266WiFiMulti wifiMulti;
char hostString[16] = {0};

String host;
String code;

const char *ssid = "Shield";
const char *password = "12347777";

const int pwm = A0 ;
const int X1 = D1 ;
const int X2 = D2 ;
const int Y1 = D3 ;
const int Y2 = D4 ;

void setup()
{

  Serial.begin(115200);
  Serial.println();
  Serial.println();
  connectWifi();
  
  HTTPClient http;
  Serial.print("[HTTP] begin...\n");
//  IPAddress ipa = WiFi.localIP();
//  int x = 13;
//  String ip = String(ipa[0]) + "." + String(ipa[1]) + "." + String(ipa[2]) + ".";
//  while (1)
//  {
//    host = ip + String(x++);
//    http.begin("http://" + host + ":8000/test/"); //HTTP
//    Serial.print("[HTTP] GET..." + host + "\n");
//    int httpCode = http.GET();
//    if (httpCode > 0)
//    {
//      Serial.printf("[HTTP] GET... code: %d\n", httpCode);
//      if (httpCode == HTTP_CODE_OK)
//      {
//        String payload = http.getString();
//        Serial.println(payload);
//        host = "http://" + host + ":8000";
//        http.end();
//        break;
//      }
//    }
//    http.end();
//  }
if (!MDNS.begin(hostString))
    {
        Serial.println("Error setting up MDNS responder!");
    }
    Serial.println("mDNS responder started");
    do
    {
        int n = MDNS.queryService("esp", "tcp"); // Send out query for esp tcp services
        Serial.println("mDNS query done");
        if (n != 0 )
        {
            Serial.print(n);
            Serial.println(" service(s) found");
            for (int i = 0; i < n; ++i)
            {
                // Print details for each service found
                Serial.print(i + 1);
                Serial.print(": ");
                Serial.print(MDNS.hostname(i));
                //      String ip = String(MDNS.IP(i)[0]) + "." + String(MDNS.IP(i)[1]) + "." + String(MDNS.IP(i)[2]) + "." + MDNS.IP(i)[3];
                if (MDNS.hostname(i) == "ibot")
                {
                    host = "http://" + MDNS.IP(i).toString() + ":80";
                }
                Serial.print(" (");
                Serial.print(MDNS.IP(i));
                Serial.print(":");
                Serial.print(MDNS.port(i));
                Serial.println(")");
            }
        }
    } while (host == "");
    Serial.println(host);
  String PostData = "{\"mode\":\"actuator\",\"version\":\"1\",\"code\":\"" + code + "\",\"type\":\"Motor\",\"actions\":{\"forward\":\"actuator.data='forward'\",\"backward\":\"actuator.data='backward'\",\"left\":\"actuator.data='left'\",\"right\":\"actuator.data='right'\",\"stop\":\"actuator.data='stop'\"}}";
  http.begin(host + "/device/register/");
  http.addHeader("Content-Type", "application/json");
  int httpCode = http.POST(PostData);
  String payload = http.getString();
  Serial.println(payload);
  pinMode(X1, OUTPUT);
  pinMode(X2, OUTPUT);
  pinMode(Y1, OUTPUT);
  pinMode(Y2, OUTPUT);
  digitalWrite(X1, HIGH);
  digitalWrite(X2, HIGH);
  digitalWrite(Y1, HIGH);
  digitalWrite(Y2, HIGH);
}

void loop()
{
  analogWrite(pwm, 255);
  HTTPClient http;
  http.begin(host + "/refresh/?code=" + code);
  int httpCode = http.GET();
  if (httpCode > 0)
  {

    digitalWrite(D0, LOW);
    if (httpCode == HTTP_CODE_OK)
    {
      String payload = http.getString();
      Serial.println("." + payload + ".");
      if (payload == "forward")
      {
        digitalWrite(X1, HIGH);
        digitalWrite(X2, LOW);
        digitalWrite(Y1, LOW);
        digitalWrite(Y2, HIGH);
      }
      else if (payload == "backward")
      {
        digitalWrite(X1, LOW);
        digitalWrite(X2, HIGH);
        digitalWrite(Y1, HIGH);
        digitalWrite(Y2, LOW);
      }
      else if (payload == "left")
      {
        digitalWrite(X1, LOW);
        digitalWrite(X2, HIGH);
        digitalWrite(Y1, LOW);
        digitalWrite(Y2, HIGH);
      }
      else if (payload == "right")
      {
        digitalWrite(X1, HIGH);
        digitalWrite(X2, LOW);
        digitalWrite(Y1, HIGH);
        digitalWrite(Y2, LOW);
      }
      else if (payload == "stop")
      {
        digitalWrite(X1, HIGH);
        digitalWrite(X2, HIGH);
        digitalWrite(Y1, HIGH);
        digitalWrite(Y2, HIGH);
        digitalWrite(D0, HIGH);
      }
    }
  }
  else
  {
    Serial.println(httpCode);
  }
  http.end();
  delay(100);
}



void connectWifi()
{
    boolean state = true;
    wifiMulti.addAP("Redmi 3S", "kannan123"); // add Wi-Fi networks you want to connect to
    wifiMulti.addAP("Shield", "12347777");
    wifiMulti.addAP("Hacker", "virusalert");
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
