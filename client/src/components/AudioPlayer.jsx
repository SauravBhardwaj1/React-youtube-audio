import React, { useState, useRef } from 'react';
import { Button } from '@chakra-ui/react';

const AudioPlayer = ({ audioUrl }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (audio) {
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play().catch(error => console.error('Playback error:', error));
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div>
      <audio ref={audioRef} src={audioUrl}></audio>
      <Button onClick={togglePlayPause} colorScheme={isPlaying ? 'red' : 'green'}>
        {isPlaying ? 'Pause' : 'Play'}
      </Button>
    </div>
  );
};

export default AudioPlayer;
