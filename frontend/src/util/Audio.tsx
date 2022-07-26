import React, { useEffect, useRef } from "react";

const constraints: MediaStreamConstraints = { audio: true };

/* 
    aspectRatio?: ConstrainDouble;
    autoGainControl?: ConstrainBoolean;
    channelCount?: ConstrainULong;
    deviceId?: ConstrainDOMString;
    echoCancellation?: ConstrainBoolean;
    facingMode?: ConstrainDOMString;
    frameRate?: ConstrainDouble;
    groupId?: ConstrainDOMString;
    height?: ConstrainULong;
    latency?: ConstrainDouble;
    noiseSuppression?: ConstrainBoolean;
    sampleRate?: ConstrainULong;
    sampleSize?: ConstrainULong;
    suppressLocalAudioPlayback?: ConstrainBoolean;
    width?: ConstrainULong;
*/

const auidoCtx: AudioContext = new window.AudioContext();

export function useAudio() {
  const audioRef = useRef<MediaStreamTrack[]>();
  const streamRef = useRef<MediaStream>();

  useEffect(() => {
    // console.log(audioRef);
    return () => {};
  }, [audioRef.current]);

  const logRefs = () => {
    streamRef.current && console.log(streamRef.current.getTracks());
    console.log("audioRef", audioRef.current);
    console.log("streamRef", streamRef.current);
  };

  const getUserMedia = () =>
    navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
      streamRef.current = stream;
      auidoCtx.resume().then(() => {
        console.log(auidoCtx.createMediaStreamSource(stream));
      });
    });

  const getAudioTrack = () => {
    streamRef.current &&
      (audioRef.current = streamRef.current!.getAudioTracks());
  };

  return { audioRef, streamRef, getUserMedia, getAudioTrack, logRefs };
}
