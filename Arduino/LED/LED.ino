#include <Arduino.h>

#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <ArduinoJson.h>

String host;
String code;

const char *ssid = "Hacker";
const char *password = "virusalert";

byte ledState = LOW;
byte blinkState = LOW;
#define LED_PIN D0

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
    int x = 0;
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

    String PostData = "{\"mode\":\"actuator\",\"version\":\"2\",\"code\":\"" + code + "\",\"type\":\"led\",\"actions\":{\"on\":\"actuator.data=1\",\"off\":\"actuator.data=0\",\"toggle\":\"actuator.data=toggle(actuator.data)\",\"blink\":\"actuator.data='blink'\"}}";
    http.begin(host + "/device/register/");
    http.addHeader("Content-Type", "application/json");
    int httpCode = http.POST(PostData);
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
