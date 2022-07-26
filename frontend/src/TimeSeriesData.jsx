import React from "react";
import { fft, util } from "fft-js";
import { useState, useEffect } from "react";
import "./TimeSeriesData.css";

function TimeSeriesData({ blob, phase }) {
    const [result, setResult] = useState([]);
    const [maximum, setMaximum] = useState(0);

    useEffect(() => {
        blob.current?.arrayBuffer().then((v) => {
            const arr = new Uint8Array(v);
            for (let i = arr.length; i < 1024; i++) {
                arr.push && arr.push(0);
            }

            const _phase = fft(arr.slice(0, 512));
            const freqResult = util.fftFreq(_phase, 48000);
            const magResult = util.fftMag(_phase, 48000);

            setMaximum(Math.max(maximum, Math.max(...magResult)))

            const combined = magResult.map((mag, idx) => {
                if (idx === 0) return undefined;
                return { mag: mag, freq: freqResult[idx] };
            });

            setResult([...result, { phase: phase, combined: combined }])

        });
        return () => { };
    }, [blob.current]);

    return (
        <>
            <span>{phase}</span>

            <div className="time-series-container">
                {result?.map((obj, idx) => {
                    return (
                        <div
                            className="time-series-column"
                            key={idx}
                            style={{
                                backgroundColor: "#f9f9f9f9",
                            }}
                        >
                            {obj.combined.map((combined, boxIdx) => {
                                return combined && <div key={boxIdx} className="time-series-block" style={{
                                    width: '10px',
                                    height: '10px',
                                    backgroundColor: "#000000",
                                    opacity: combined.mag / maximum
                                }}>
                                </div>

                            })}

                        </div>
                    );
                })}
            </div>
        </>
    );
}

export default TimeSeriesData;
