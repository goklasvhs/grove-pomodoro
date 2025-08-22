import React, { useState, useRef } from "react";
import { Button } from "@mui/material";

function PlayMusic() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const handleMusicToggle = () => {
    if (isPlaying) {
      // Stop music
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      setIsPlaying(false);
    } else {
      // Play music
      if (audioRef.current) {
        audioRef.current.play().catch(error => {
          console.error("Error playing audio:", error);
        });
        setIsPlaying(true);
      }
    }
  };

  return (
    <>
      <audio 
        ref={audioRef} 
        onEnded={() => setIsPlaying(false)}
        preload="metadata"
      >
        <source src="components/audio.mp3" />
      </audio>
      
      <Button 
        variant="contained" 
        color={isPlaying ? "inherit" : "secondary"}
        onClick={handleMusicToggle}
        size="large"
        sx={{ width:'540px', maxWidth:'540px'}}
      >
        {isPlaying ? "Stop Music" : "Play Music"}
      </Button>
    </>
  );
}

export default PlayMusic;