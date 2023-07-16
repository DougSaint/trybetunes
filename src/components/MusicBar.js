/* eslint-disable */
import React, { useState, useEffect, useRef, useCallback } from 'react';

import Timeline from 'wavesurfer.js/dist/plugins/timeline.js';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons';
import WaveSurfer from 'wavesurfer.js';
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
      waveColor: '#D9DCFF',
      progressColor: '#39FF14',
      barWidth: 3,
      barRadius: 3,
      cursorWidth: 1,
      cursorWidth: 1,
      height: 50,
      responsive: true,
      barGap: 3,
      plugins: [],
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
function WaveSurferPlayer(props) {
  const containerRef = useRef();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const wavesurfer = useWavesurfer(containerRef, props);

  // On play button click
  const onPlayClick = useCallback(() => {
    wavesurfer.isPlaying() ? wavesurfer.pause() : wavesurfer.play();
  }, [wavesurfer]);

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
      wavesurfer.on('play', () => setIsPlaying(true)),
      wavesurfer.on('pause', () => setIsPlaying(false)),
      wavesurfer.on('timeupdate', (currentTime) => setCurrentTime(currentTime)),
    ];

    return () => {
      subscriptions.forEach((unsub) => unsub());
    };
  }, [wavesurfer]);

  return (
    <section className="relative">
      <button
        className="text-slate-50 absolute top-[50%] left-[50%] z-10 border-2 border-slate-50 rounded-full w-12 h-12 flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2"
        onClick={ onPlayClick }
        style={ { marginTop: '1em' } }
      >
        <FontAwesomeIcon color="white" icon={ isPlaying ? faPause : faPlay } />
      </button>
      <div ref={ containerRef } style={ { minHeight: '120px' } } />
    </section>
  );
}

function MusicBar({ song }) {
  const audioUrl = song.previewUrl;

  return (
    <div className="fixed bottom-0 w-[80vw] mx-auto">
      <WaveSurferPlayer
        height={ 100 }
        waveColor="rgb(200, 0, 200)"
        progressColor="rgb(100, 0, 100)"
        url={ audioUrl }
        plugins={ [Timeline.create()] }
      />
    </div>
  );
}

export default MusicBar;
