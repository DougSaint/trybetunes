/* eslint-disable */
import React, { useState, useEffect, useRef, useCallback } from 'react';

import Timeline from 'wavesurfer.js/dist/plugins/timeline.js';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faPlay, 
  faPause, 
  faVolumeHigh, 
  faVolumeLow,
  faVolumeXmark,
  faHeadphones
} from '@fortawesome/free-solid-svg-icons';
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
      waveColor: 'rgba(203, 213, 225, 0.4)', // var(--color-light-muted) com opacidade
      progressColor: 'var(--color-primary-light)',
      cursorColor: 'var(--color-secondary)',
      barWidth: 2,
      barRadius: 2,
      cursorWidth: 2,
      height: 60,
      responsive: true,
      barGap: 2,
      barMinHeight: 1,
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
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8); // Volume inicial
  const wavesurfer = useWavesurfer(containerRef, props);

  // Format time in mm:ss
  const formatTime = useCallback((time) => {
    if (isNaN(time)) return '0:00';
    
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }, []);

  // On play button click
  const onPlayClick = useCallback(() => {
    wavesurfer.isPlaying() ? wavesurfer.pause() : wavesurfer.play();
  }, [wavesurfer]);

  // Volume control
  const handleVolumeChange = useCallback((e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    wavesurfer?.setVolume(newVolume);
  }, [wavesurfer]);

  // Volume icon based on level
  const getVolumeIcon = useCallback(() => {
    if (volume === 0) return faVolumeXmark;
    if (volume < 0.5) return faVolumeLow;
    return faVolumeHigh;
  }, [volume]);

  // Toggle mute
  const toggleMute = useCallback(() => {
    if (volume === 0) {
      setVolume(0.8);
      wavesurfer?.setVolume(0.8);
    } else {
      setVolume(0);
      wavesurfer?.setVolume(0);
    }
  }, [volume, wavesurfer]);

  useEffect(() => {
    if (!wavesurfer) return;

    setCurrentTime(0);
    setIsPlaying(false);

    const subscriptions = [
      wavesurfer.on('ready', () => {
        setDuration(wavesurfer.getDuration());
        wavesurfer.play();
      }),
      wavesurfer.on('play', () => setIsPlaying(true)),
      wavesurfer.on('pause', () => setIsPlaying(false)),
      wavesurfer.on('timeupdate', (currentTime) => setCurrentTime(currentTime)),
      wavesurfer.on('finish', () => {
        setIsPlaying(false);
        setCurrentTime(0);
      }),
    ];

    // Set initial volume
    wavesurfer.setVolume(volume);

    return () => {
      subscriptions.forEach((unsub) => unsub());
    };
  }, [wavesurfer, volume]);

  return (
    <div className="bg-gradient-to-r from-[var(--color-dark)] to-[var(--color-dark-light)] backdrop-blur-lg border-t border-[var(--color-primary-light)]/10 shadow-lg p-4 rounded-t-xl">
      <div className="flex items-center gap-4 mb-3">
        {/* Play/Pause button */}
        <button
          className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-light)] rounded-full w-12 h-12 flex items-center justify-center shadow-lg hover:shadow-purple-500/30 hover:scale-105 transition-all duration-300"
          onClick={onPlayClick}
        >
          <FontAwesomeIcon 
            icon={isPlaying ? faPause : faPlay} 
            className="text-white" 
          />
        </button>
        
        {/* Song info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <FontAwesomeIcon icon={faHeadphones} className="text-[var(--color-primary-light)]" />
            <div className="truncate">
              <p className="text-[var(--color-light)] font-medium truncate">{props.song?.trackName}</p>
              <p className="text-[var(--color-light-muted)] text-sm truncate">{props.song?.artistName}</p>
            </div>
          </div>
        </div>
        
        {/* Time display */}
        <div className="hidden sm:flex items-center text-[var(--color-light-muted)] text-sm">
          <span>{formatTime(currentTime)}</span>
          <span className="mx-1">/</span>
          <span>{formatTime(duration)}</span>
        </div>
        
        {/* Volume control */}
        <div className="hidden md:flex items-center gap-2">
          <button onClick={toggleMute} className="text-[var(--color-light-muted)] hover:text-[var(--color-light)] transition-colors">
            <FontAwesomeIcon icon={getVolumeIcon()} />
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            className="w-20 accent-[var(--color-primary-light)]"
          />
        </div>
      </div>

      {/* Waveform */}
      <div 
        ref={containerRef} 
        className="rounded-lg overflow-hidden relative" 
      />
    </div>
  );
}

function MusicBar({ song }) {
  const audioUrl = song.previewUrl;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-20">
      <div className="max-w-5xl mx-auto">
        <WaveSurferPlayer
          song={song}
          url={audioUrl}
          plugins={[Timeline.create({
            primaryColor: 'var(--color-primary-light)',
            secondaryColor: 'var(--color-light-muted)',
            primaryFontColor: 'var(--color-light)',
            timeInterval: 1,
          })]}
        />
      </div>
    </div>
  );
}

export default MusicBar;
