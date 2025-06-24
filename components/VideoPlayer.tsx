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
      const origin =
        typeof window !== "undefined"
          ? window.location.origin
          : "https://localhost:3001";
      return `https://www.youtube.com/embed/${match[2]}?rel=0&modestbranding=1&fs=1&cc_load_policy=1&iv_load_policy=3&showinfo=0&controls=1&disablekb=0&enablejsapi=1&origin=${origin}`;
    }
    return url;
  };

  // Check if URL is empty or invalid
  const isValidYouTubeUrl = url && url.trim() && url.includes("youtube");

  return (
    <div className="w-full h-full relative bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden shadow-2xl">
      {isValidYouTubeUrl ? (
        <iframe
          src={getYouTubeEmbedUrl(url)}
          title="Learnod Video Player - Distraction-Free Learning"
          className="w-full h-full absolute top-0 left-0 rounded-lg"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      ) : (
        // YouTube logo placeholder when no URL is entered
        <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-red-500 to-red-600 text-white">
          {/* YouTube Logo */}
          <div className="mb-4">
            <svg className="w-20 h-14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
          </div>

          {/* Text */}
          <h3 className="text-xl font-semibold mb-2">YouTube Video Player</h3>
          <p className="text-red-100 text-center text-sm px-4">
            Enter a YouTube URL above to start learning with
            <br />
            distraction-free video playback
          </p>

          {/* Decorative element */}
          <div className="mt-6 w-16 h-1 bg-white/30 rounded-full"></div>
        </div>
      )}

      {/* Learning optimization overlay */}
    </div>
  );
};

export default VideoPlayer;
