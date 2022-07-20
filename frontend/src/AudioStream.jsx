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

    const stopRecording = () => {
        setRecord(false);
    };

    function onData(recordedBlob) {
        // console.log("chunk of real-time data is: ", recordedBlob);
        blobRef.current = recordedBlob;
        setPhaser(prev => prev + 1)
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
                onStop={onStop}
                onData={onData}
                strokeColor="#000000"
                backgroundColor="#888888"
            />
            <div>
                <button onClick={startRecording} type="button">
                    Start
                </button>
                <button onClick={stopRecording} type="button">
                    Stop
                </button>
            </div>
            <Spectrogram blob={blobRef} phase={phaser} />
            <div>---------------------------------------------</div>
            <TimeSeriesData blob={blobRef} phase={phaser} />
        </div>
    );
}
