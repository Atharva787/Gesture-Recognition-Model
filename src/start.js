// Import dependencies
import {Finger, FingerCurl, FingerDirection, GestureDescription} from 'fingerpose'; 

// Define Gesture Description
export const Start = new GestureDescription('Start'); 

Start.addCurl(Finger.Thumb,FingerCurl.FullCurl,1);
Start.addCurl(Finger.Thumb,FingerCurl.HalfCurl,1);
Start.addDirection(Finger.Thumb,FingerDirection.VerticalUp,1);
Start.addDirection(Finger.Thumb,FingerDirection.DiagonalUpLeft,0.75);
Start.addDirection(Finger.Thumb,FingerDirection.DiagonalUpRight,0.75);

for(let finger of [Finger.Index, Finger.Middle, Finger.Ring, Finger.Pinky]) {

    Start.addCurl(finger, FingerCurl.FullCurl, 1.0);
    Start.addCurl(finger, FingerCurl.HalfCurl, 1.0);
    Start.addDirection(finger, FingerDirection.VerticalUp, 0.75);
    // Start.addDirection(finger, FingerDirection.DiagonalUpLeft, 1.0);
    // Start.addDirection(finger, FingerDirection.HorizontalLeft, 0.2);
    // Start.addDirection(finger, FingerDirection.DiagonalUpRight, 1.0);
    // Start.addDirection(finger, FingerDirection.HorizontalRight, 0.2);
  }