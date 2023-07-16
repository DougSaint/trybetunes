import React, { useState, useEffect, useRef, useCallback } from "react";
import WaveSurfer from "https://unpkg.com/wavesurfer.js@7/dist/wavesurfer.esm.js";
import Timeline from "https://unpkg.com/wavesurfer.js@7/dist/plugins/timeline.esm.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause } from "@fortawesome/free-solid-svg-icons";
// WaveSurfer hook
const useWavesurfer = (containerRef, options) => {
  const [wavesurfer, setWavesurfer] = useState(null);

  // Initialize wavesurfer when the container mounts
  // or any of the props change
  useEffect(() => {
    if (!containerRef.current) return;

    const ws = WaveSurfer.create({
      ...options,
      container: containerRef.current,
      height: 60,
    });

    setWavesurfer(ws);

    return () => {
      ws.destroy();
    };
  }, [options, containerRef]);

  return wavesurfer;
};

// Create a React component that will render wavesurfer.
// Props are wavesurfer options.
const WaveSurferPlayer = (props) => {
  const containerRef = useRef();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const wavesurfer = useWavesurfer(containerRef, props);

  // On play button click
  const onPlayClick = useCallback(() => {
    wavesurfer.isPlaying() ? wavesurfer.pause() : wavesurfer.play();
  }, [wavesurfer]);

  // Initialize wavesurfer when the container mounts
  // or any of the props change

  // When the wavesurfer is ready, play the audio.

  useEffect(() => {
    if (!wavesurfer) return;
    console.log(wavesurfer);
    setTimeout(() => {
      wavesurfer.play();
    }, 1800);
  }, [wavesurfer]);

  useEffect(() => {
    if (!wavesurfer) return;

    setCurrentTime(0);
    setIsPlaying(false);

    const subscriptions = [
      wavesurfer.on("play", () => setIsPlaying(true)),
      wavesurfer.on("pause", () => setIsPlaying(false)),
      wavesurfer.on("timeupdate", (currentTime) => setCurrentTime(currentTime)),
    ];

    return () => {
      subscriptions.forEach((unsub) => unsub());
    };
  }, [wavesurfer]);

  return (
    <section className="relative">
      <div ref={containerRef} style={{ minHeight: "120px" }} />

      <button
        className="text-slate-50 absolute top-[50%] left-[50%] z-10"
        onClick={onPlayClick}
        style={{ marginTop: "1em" }}
      >
        <FontAwesomeIcon color="white" icon={isPlaying ? faPause : faPlay} />
      </button>
    </section>
  );
};

const MusicBar = ({ song }) => {
  const audioUrl = song.previewUrl;

  return (
    <div className="fixed bottom-0 w-[80vw] mx-auto">
      <WaveSurferPlayer
        height={100}
        waveColor="rgb(200, 0, 200)"
        progressColor="rgb(100, 0, 100)"
        url={audioUrl}
        plugins={[Timeline.create()]}
      />
    </div>
  );
};

export default MusicBar;
