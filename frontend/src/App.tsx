import React from "react";
import "./App.css";
import { useAudio } from "./util/Audio";

function App() {
  const { audioRef, getUserMedia, getAudioTrack, logRefs } = useAudio();

  return (
    <div className="App">
      <button
        onClick={() => {
          getUserMedia();
        }}
      >
        getUserMedia
      </button>
      <button
        onClick={() => {
          getAudioTrack();
        }}
      >
        getAudioTrack
      </button>
      <button
        onClick={() => {
          logRefs();
        }}
      >
        logRefs
      </button>
    </div>
  );
}

export default App;
