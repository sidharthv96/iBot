#include <Arduino.h>

#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <ArduinoJson.h>

String host;
String code;

const char *ssid = "Shield";
const char *password = "12347777";

const int trigPin = 9;
const int echoPin = 10;
// defines variables
long duration;
int distance;

void setup()
{

  Serial.begin(115200);
  Serial.println();
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);

  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED)
  {
    delay(500);
    Serial.print(".");
  }

  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
  code = String(WiFi.macAddress());
  code.replace(":", "");

  HTTPClient http;
  Serial.print("[HTTP] begin...\n");
  IPAddress ipa = WiFi.localIP();
  int x = 13;
  String ip = String(ipa[0]) + "." + String(ipa[1]) + "." + String(ipa[2]) + ".";
  while (1)
  {
    host = ip + String(x++);
    http.begin("http://" + host + ":8000/test/"); //HTTP
    Serial.print("[HTTP] GET..." + host + "\n");
    int httpCode = http.GET();
    if (httpCode > 0)
    {
      Serial.printf("[HTTP] GET... code: %d\n", httpCode);
      if (httpCode == HTTP_CODE_OK)
      {
        String payload = http.getString();
        Serial.println(payload);
        host = "http://" + host + ":8000";
        http.end();
        break;
      }
    }
    http.end();
  }

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
  distance= duration*0.034/2;  
  http.begin(host + "/signal/?code=" + code + "&value=" + str(distance));
  int httpCode = http.GET();  
  http.end();
  delay(200);
}
