#include <Arduino.h>

#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <ArduinoJson.h>
#include <ESP8266mDNS.h>
#include <ESP8266WiFiMulti.h> // Include the Wi-Fi-Multi library
ESP8266WiFiMulti wifiMulti;
char hostString[16] = {0};

String host;
String code;


const int trigPin = D1;
const int echoPin = D2;
// defines variables
long duration;
int distance;

void setup()
{

  Serial.begin(115200);
  connectWifi();
  HTTPClient http;
//  IPAddress ipa = WiFi.localIP();
//  int x = 13;
//  String ip = String(ipa[0]) + "." + String(ipa[1]) + "." + String(ipa[2]) + ".";
//  while (1)
//  {
//    host = ip + String(x++);
//    http.begin("http://" + host + ":80/test/"); //HTTP
//    Serial.print("[HTTP] GET..." + host + "\n");
//    int httpCode = http.GET();
//    if (httpCode > 0)
//    {
//      Serial.printf("[HTTP] GET... code: %d\n", httpCode);
//      if (httpCode == HTTP_CODE_OK)
//      {
//        String payload = http.getString();
//        Serial.println(payload);
//        host = "http://" + host + ":80";
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
  String PostData = "{\"mode\":\"sensor\",\"version\":\"1\",\"code\":\""+code+"\",\"type\":\"ultrasonic\",\"events\":{\"obstacle\":\"sensor.value<50\",\"free\":\"sensor.value>=50\"}}";
  http.begin(host + "/device/register/");
  http.addHeader("Content-Type", "application/json");
  int httpCode = http.POST(PostData);
  String payload = http.getString();
  Serial.println(payload);  
  pinMode(trigPin, OUTPUT); // Sets the trigPin as an Output
  pinMode(echoPin, INPUT); 
}

HTTPClient http;

void loop()
{
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  // Sets the trigPin on HIGH state for 10 micro seconds
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);
  // Reads the echoPin, returns the sound wave travel time in microseconds
  duration = pulseIn(echoPin, HIGH);
  // Calculating the distance
  distance= duration*0.017;  
  http.begin(host + "/signal/?code=" + code + "&value=" + String(distance));
  int httpCode = http.GET();  
  http.end();
  delay(200);
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
