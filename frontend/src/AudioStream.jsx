import React, { useRef, useState } from "react";
import { ReactMic } from "react-mic";
import Spectrogram from "./Spectrogram";
import TimeSeriesData from "./TimeSeriesData";

export default function AudioStream() {
    const [record, setRecord] = useState(false);
    const blobRef = useRef(null);
    const [phaser, setPhaser] = useState(0);

    const startRecording = () => {
        setRecord(true);
    };

    let audioCtxOptions = {
        channelCount: 1,
        bitRate: 128000,
        sampleRate:16000,
        timeSlice: 1024,  // The interval at which captured audio is returned to onData callback (available in React-Mic-Gold).
    };

    const stopRecording = () => {
        setRecord(false);
    };

    function onData(recordedBlob) {
        // console.log("chunk of real-time data is: ", recordedBlob);
        blobRef.current = recordedBlob;
        setPhaser(prev => prev + 1)
        console.log(blobRef)
        // stopRecording()
    }

    function onStop(recordedBlob) {
        // console.log("recordedBlob is: ", recordedBlob);
    }


    return (
        <div>
            <ReactMic
                record={record}
                className="sound-wave"
                visualSetting="sinewave" 
                onStop={onStop}
                onData={onData}
                strokeColor="#000000"
                backgroundColor="#888888"
                channelCount={audioCtxOptions['channelCount']}    
                bitRate={audioCtxOptions['bitRate']}       
                sampleRate={audioCtxOptions['sampleRate']}     
                timeSlice={audioCtxOptions['timeSlice']}       
            />
            <ReactMic
                record={record}
                className="sound-wave"
                visualSetting="" 
                onStop={onStop}
                onData={onData}
                strokeColor="#000000"
                backgroundColor="#888888"
                channelCount={audioCtxOptions['channelCount']}     // defaults -> 2 (stereo).  Specify 1 for mono.
                bitRate={audioCtxOptions['bitRate']}          // defaults -> 128000 (128kbps).  React-Mic-Gold only.
                sampleRate={audioCtxOptions['sampleRate']}        // defaults -> 44100 (44.1 kHz).  It accepts values only in range: 22050 to 96000 (available in React-Mic-Gold)
                timeSlice={audioCtxOptions['timeSlice']}          // defaults -> 4000 milliseconds.  The interval at which captured audio is returned to onData callback (available in React-Mic-Gold).
            />
            <div>
                <button onClick={startRecording} type="button">
                    Start
                </button>
                <button onClick={stopRecording} type="button">
                    Stop
                </button>
            </div>
        </div>
    );
}
