"use client";

import React from "react";

interface VideoPlayerProps {
  url: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ url }) => {
  const getYouTubeEmbedUrl = (url: string) => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    if (match && match[2].length === 11) {
      // Enhanced YouTube embed URL with additional parameters for learning optimization
      return `https://www.youtube.com/embed/${match[2]}?rel=0&modestbranding=1&fs=1&cc_load_policy=1&iv_load_policy=3&showinfo=0&controls=1&disablekb=0&enablejsapi=1&origin=${window.location.origin}`;
    }
    return url;
  };

  return (
    <div className="w-full h-full relative bg-black rounded-lg overflow-hidden shadow-2xl">
      <iframe
        src={getYouTubeEmbedUrl(url)}
        title="Learnod Video Player - Distraction-Free Learning"
        className="w-full h-full absolute top-0 left-0 rounded-lg"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        loading="lazy"
      />

      {/* Learning optimization overlay */}
    </div>
  );
};

export default VideoPlayer;
