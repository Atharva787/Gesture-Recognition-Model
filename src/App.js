///////// NEW STUFF ADDED USE STATE
import React, { useRef } from "react";
///////// NEW STUFF ADDED USE STATE

// import logo from './logo.svg';
import * as tf from "@tensorflow/tfjs";
import * as handpose from "@tensorflow-models/handpose";
import Webcam from "react-webcam";
import "./App.css";
import { drawHand } from "./utilities";

///////// NEW STUFF IMPORTS
import * as fp from "fingerpose";
// import victory from "./victory.png";
// import thumbs_up from "./thumbs_up.png";

import { Stop } from "./stop";
import { Start } from "./start";
import { Left } from "./left";
import { Right } from "./right";
import { Movedown } from "./movedown";
import { Moveup } from "./moveup";
///////// NEW STUFF IMPORTS

function App() {
    const webcamRef = useRef(null);
    const canvasRef = useRef(null);

    ///////// NEW STUFF ADDED STATE HOOK

    // const [emoji, setEmoji] = useState(null);
    // const images = { thumbs_up: thumbs_up, victory: victory };

    ///////// NEW STUFF ADDED STATE HOOK

    const runHandpose = async() => {
        const net = await handpose.load();
        console.log("Handpose model loaded.");
        //  Loop and detect hands
        setInterval(() => {
            detect(net);
        }, 10);
    };

    const detect = async(net) => {
        // Check data is available
        if (
            typeof webcamRef.current !== "undefined" &&
            webcamRef.current !== null &&
            webcamRef.current.video.readyState === 4
        ) {
            // Get Video Properties
            const video = webcamRef.current.video;
            const videoWidth = webcamRef.current.video.videoWidth;
            const videoHeight = webcamRef.current.video.videoHeight;

            // Set video width
            webcamRef.current.video.width = videoWidth;
            webcamRef.current.video.height = videoHeight;

            // Set canvas height and width
            canvasRef.current.width = videoWidth;
            canvasRef.current.height = videoHeight;

            // Make Detections
            const hand = await net.estimateHands(video);
            console.log(hand);

            ///////// NEW STUFF ADDED GESTURE HANDLING

            if (hand.length > 0) {
                const GE = new fp.GestureEstimator([
                    Stop,
                    Start,
                    Left,
                    Right,
                    Movedown,
                    Moveup,
                ]);

                const gesture = await GE.estimate(hand[0].landmarks, 7);

                if (gesture.gestures !== undefined && gesture.gestures.length > 0) {
                    console.log(gesture.gestures);

                    const confidence = gesture.gestures.map(
                        (prediction) => prediction.confidence
                    );
                    const maxConfidence = confidence.indexOf(
                        Math.max.apply(null, confidence)
                    );
                    console.log(gesture.gestures[maxConfidence].name);


                    var s = gesture.gestures[maxConfidence].name

                    if (s == "Right") {
                        if (document.dispatchEvent(new KeyboardEvent("keyDown", { key: "D" }))) console.log("Right is shown")
                    } else if (s == "Left") {
                        console.log("Left is shown")
                        document.dispatchEvent(new KeyboardEvent("keypress", { key: "A" }));
                    } else if (s == "Moveup") {
                        console.log("Moveup is shown")
                        document.dispatchEvent(new KeyboardEvent("keypress", { key: "W" }));
                    } else if (s == "Stop") {
                        console.log("Stop is shown")
                        document.dispatchEvent(new KeyboardEvent("keypress", { key: "S" }));
                    }
                }
            }

            ///////// NEW STUFF ADDED GESTURE HANDLING

            // Draw mesh
            const ctx = canvasRef.current.getContext("2d");
            drawHand(hand, ctx);
        }
    };

    runHandpose();

    return ( <
        div className = "App" >
        <
        header className = "App-header" >
        <
        Webcam ref = { webcamRef }
        style = {
            {
                position: "absolute",
                marginLeft: "auto",
                marginRight: "auto",
                left: 0,
                right: 0,
                textAlign: "center",
                zindex: 9,
                width: 640,
                height: 480,
                transform: 'scaleX(-1)',
            }
        }
        />

        <
        canvas ref = { canvasRef }
        style = {
            {
                position: "absolute",
                marginLeft: "auto",
                marginRight: "auto",
                left: 0,
                right: 0,
                textAlign: "center",
                zindex: 9,
                width: 640,
                height: 480,
                transform: 'scaleX(-1)',
            }
        }
        />

        <
        /header>  < /
        div >
    );
}

export default App;