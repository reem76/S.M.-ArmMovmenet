// include the Servo library
#include <Servo.h>

// create servo objects
Servo gripper;
Servo wrist;
Servo elbow;
Servo shoulder;
Servo base;

double baseAngle=90;
double shoulderAngle=90;
double elbowAngle=90;
double wristAngle=90;

void setup() {
  // put your setup code here, to run once:

  // open a serial connection to your computer
Serial.begin(9600);

// attaches the servo on pins 8,9,10,11,and 12 to the servo objects
  base.attach(8);
  shoulder.attach(9);
  elbow.attach(10);
  wrist.attach(11);
  gripper.attach(12);

  // set the servo position
  base.write(baseAngle);
  shoulder.write(shoulderAngle);
  elbow.write(elbowAngle);
  wrist.write(wristAngle);

}

void loop() {
  // put your main code here, to run repeatedly:

   String serialText  = Serial.readString();
  Serial.println(serialText);

  if (serialText=="right"|| serialText=="يمين") {
      base.write(baseAngle=180);
    }
  if (serialText=="left"|| serialText=="يسار") {
     base.write(baseAngle=0);
    }

  // wait for the servo to get there

  delay(1500);

}
