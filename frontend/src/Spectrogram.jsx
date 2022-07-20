import React from "react";
import { fft, util } from "fft-js";
import { useState, useEffect } from "react";
import "./Spectrogram.css"

function Spectrogram({ blob, phase }) {
    const [result, setResult] = useState([]);
    const [Freq, setFreq] = useState([]);

    useEffect(() => {
        blob.current?.arrayBuffer().then((v) => {
            const arr = new Uint8Array(v);
            for (let i = arr.length; i < 1024; i++) {
                arr.push && arr.push(0)
            }

            const phase = fft(arr.slice(0, 512));
            const freqResult = util.fftFreq(phase, 48000);
            const magResult = util.fftMag(phase, 48000);

            setResult([...magResult]);
            setFreq([...freqResult]);
        });
        return () => { };
    }, [phase]);

    return (
        <>
            <span>{phase}</span>
            <div className="spectrogram-container" >
                {Freq?.map((v, idx) => {
                    if (idx === 0) return <></>;
                    return (
                        <div
                            key={idx}
                            style={{
                                height: result[idx] / 10,
                                width: "5px",
                                backgroundColor: "#88ab23",
                            }}
                        ></div>
                    );
                })}
            </div>
        </>
    );
}

export default Spectrogram;
