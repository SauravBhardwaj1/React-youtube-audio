import React, { useState, useEffect } from 'react';
import { Button, Slider, SliderTrack, SliderFilledTrack, SliderThumb, Flex, Text, Spinner } from '@chakra-ui/react';

const AudioPlayer = ({ audioUrl, audioInstance }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
  if (audioInstance) {
    audioInstance.addEventListener('play', () => setIsPlaying(true));
    audioInstance.addEventListener('pause', () => setIsPlaying(false));
    audioInstance.addEventListener('timeupdate', () => {
      setCurrentTime(audioInstance.currentTime);
      setDuration(audioInstance.duration);
    });

    audioInstance.addEventListener('loadstart', () => {
      setIsLoading(true);
    });

    audioInstance.addEventListener('canplaythrough', () => {
      setIsLoading(false);
    });

    return () => {
      audioInstance.removeEventListener('play', () => setIsPlaying(true));
      audioInstance.removeEventListener('pause', () => setIsPlaying(false));
      audioInstance.removeEventListener('timeupdate', () => {
        setCurrentTime(audioInstance.currentTime);
        setDuration(audioInstance.duration);
      });
      audioInstance.removeEventListener('loadstart', () => setIsLoading(true));
      audioInstance.removeEventListener('canplaythrough', () => setIsLoading(false));
    };
  }
}, [audioInstance]);

  

  const togglePlayPause = () => {
    if (audioInstance) {
      if (isPlaying) {
        audioInstance.pause();
      } else {
        audioInstance.play();
      }
    }
  };


  const handleRewind = () => {
    if (audioInstance) {
      audioInstance.currentTime -= 10; // Rewind by 10 seconds
    }
  };

  const handleFastForward = () => {
    if (audioInstance) {
      audioInstance.currentTime += 10; // Fast forward by 10 seconds
    }
  };

  const handleSliderChange = (value) => {
    if (audioInstance) {
      audioInstance.currentTime = value;
    }
  };

  return (
    <Flex direction="column" alignItems="center">
      <Flex justify="space-between" width="100%" marginBottom="1rem">
        <Button onClick={handleRewind} colorScheme="green" marginRight="0.5rem">
          Rewind
        </Button>
        <Button onClick={togglePlayPause} colorScheme={isPlaying ? 'red' : 'green'}>
        {isLoading ? <Spinner size="sm" color="white" /> : (isPlaying ? 'Pause' : 'Play')}
        </Button>
        <Button onClick={handleFastForward} colorScheme="green" marginLeft="0.5rem">
          Fast Forward
        </Button>
      </Flex>
      <Slider
        aria-label="slider-ex-1"
        defaultValue={0}
        min={0}
        max={duration}
        step={0.1}
        value={currentTime}
        onChange={(value) => handleSliderChange(value)}
        width="80%"
      >
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb />
      </Slider>
      <Flex justify="space-between" width="80%" marginTop="0.5rem">
        <Text>{formatTime(currentTime)}</Text>
        <Text>{formatTime(duration)}</Text>
      </Flex>
    </Flex>
  );
};

const formatTime = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

export default AudioPlayer;
