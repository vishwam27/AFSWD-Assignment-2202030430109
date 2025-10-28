import React, { useState, useRef, useEffect } from 'react';
import { 
  PlayIcon, 
  PauseIcon, 
  SpeakerWaveIcon, 
  SpeakerXMarkIcon,
  ArrowsPointingOutIcon,
  ArrowsPointingInIcon,
  ForwardIcon,
  BackwardIcon
} from '@heroicons/react/24/outline';

const MediaGallery = () => {
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [playbackRate, setPlaybackRate] = useState(1);
  
  const videoRef = useRef(null);
  const audioRef = useRef(null);
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  // Sample media data - in real app this would come from API
  const mediaItems = [
    {
      id: 1,
      title: 'Introduction to React Hooks',
      type: 'video',
      thumbnail: 'https://via.placeholder.com/400x225/3B82F6/FFFFFF?text=React+Hooks',
      src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      duration: '15:30',
      category: 'Programming'
    },
    {
      id: 2,
      title: 'Advanced JavaScript Concepts',
      type: 'audio',
      thumbnail: 'https://via.placeholder.com/400x225/10B981/FFFFFF?text=JavaScript',
      src: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
      duration: '25:45',
      category: 'Programming'
    },
    {
      id: 3,
      title: 'UI/UX Design Principles',
      type: 'video',
      thumbnail: 'https://via.placeholder.com/400x225/8B5CF6/FFFFFF?text=UI%2FUX+Design',
      src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
      duration: '12:20',
      category: 'Design'
    },
    {
      id: 4,
      title: 'Data Structures Explained',
      type: 'audio',
      thumbnail: 'https://via.placeholder.com/400x225/F59E0B/FFFFFF?text=Data+Structures',
      src: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
      duration: '18:15',
      category: 'Computer Science'
    },
    {
      id: 5,
      title: 'Modern CSS Techniques',
      type: 'video',
      thumbnail: 'https://via.placeholder.com/400x225/EF4444/FFFFFF?text=CSS+Techniques',
      src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      duration: '20:10',
      category: 'Web Development'
    },
    {
      id: 6,
      title: 'Machine Learning Basics',
      type: 'audio',
      thumbnail: 'https://via.placeholder.com/400x225/06B6D4/FFFFFF?text=ML+Basics',
      src: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
      duration: '30:25',
      category: 'AI/ML'
    }
  ];

  const categories = ['All', ...new Set(mediaItems.map(item => item.category))];
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredMedia = selectedCategory === 'All' 
    ? mediaItems 
    : mediaItems.filter(item => item.category === selectedCategory);

  // Media event handlers
  const handlePlay = () => {
    const media = selectedMedia.type === 'video' ? videoRef.current : audioRef.current;
    if (media) {
      media.play();
      setIsPlaying(true);
    }
  };

  const handlePause = () => {
    const media = selectedMedia.type === 'video' ? videoRef.current : audioRef.current;
    if (media) {
      media.pause();
      setIsPlaying(false);
    }
  };

  const handleTimeUpdate = () => {
    const media = selectedMedia.type === 'video' ? videoRef.current : audioRef.current;
    if (media) {
      setCurrentTime(media.currentTime);
      setDuration(media.duration);
    }
  };

  const handleSeek = (e) => {
    const media = selectedMedia.type === 'video' ? videoRef.current : audioRef.current;
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    if (media && duration) {
      media.currentTime = pos * duration;
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    const media = selectedMedia.type === 'video' ? videoRef.current : audioRef.current;
    if (media) {
      media.volume = newVolume;
    }
  };

  const toggleMute = () => {
    const media = selectedMedia.type === 'video' ? videoRef.current : audioRef.current;
    if (media) {
      media.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
    setIsFullscreen(!isFullscreen);
  };

  const skipTime = (seconds) => {
    const media = selectedMedia.type === 'video' ? videoRef.current : audioRef.current;
    if (media) {
      media.currentTime = Math.max(0, Math.min(media.currentTime + seconds, duration));
    }
  };

  const changePlaybackRate = (rate) => {
    setPlaybackRate(rate);
    const media = selectedMedia.type === 'video' ? videoRef.current : audioRef.current;
    if (media) {
      media.playbackRate = rate;
    }
  };

  // Canvas visualization for audio
  useEffect(() => {
    if (selectedMedia?.type === 'audio' && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      
      const drawVisualization = () => {
        if (!isPlaying) return;
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Simple waveform visualization
        const barCount = 50;
        const barWidth = canvas.width / barCount;
        
        for (let i = 0; i < barCount; i++) {
          const barHeight = Math.random() * canvas.height * 0.8;
          const x = i * barWidth;
          const y = (canvas.height - barHeight) / 2;
          
          ctx.fillStyle = `hsl(${200 + i * 3}, 70%, 50%)`;
          ctx.fillRect(x, y, barWidth - 2, barHeight);
        }
        
        requestAnimationFrame(drawVisualization);
      };
      
      if (isPlaying) {
        drawVisualization();
      }
    }
  }, [isPlaying, selectedMedia]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Media Gallery
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Explore our collection of interactive video lectures and audio content
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-primary-600 text-white'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Media Grid */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredMedia.map(item => (
                <div
                  key={item.id}
                  className="card cursor-pointer hover:shadow-xl transition-shadow duration-300"
                  onClick={() => setSelectedMedia(item)}
                >
                  <div className="relative aspect-video mb-4 overflow-hidden rounded-lg">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                      <PlayIcon className="h-12 w-12 text-white" />
                    </div>
                    <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                      {item.duration}
                    </div>
                    <div className="absolute top-2 left-2 bg-primary-600 text-white text-xs px-2 py-1 rounded">
                      {item.type.toUpperCase()}
                    </div>
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {item.category}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Media Player */}
          <div className="lg:col-span-1">
            <div className="card sticky top-8">
              {selectedMedia ? (
                <div ref={containerRef} className="media-player">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                    {selectedMedia.title}
                  </h3>
                  
                  {selectedMedia.type === 'video' ? (
                    <div className="relative">
                      <video
                        ref={videoRef}
                        src={selectedMedia.src}
                        className="w-full rounded-lg"
                        onTimeUpdate={handleTimeUpdate}
                        onLoadedMetadata={handleTimeUpdate}
                        onPlay={() => setIsPlaying(true)}
                        onPause={() => setIsPlaying(false)}
                      />
                    </div>
                  ) : (
                    <div className="relative bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg p-8 text-center">
                      <canvas
                        ref={canvasRef}
                        width={300}
                        height={150}
                        className="w-full h-32 mb-4"
                      />
                      <audio
                        ref={audioRef}
                        src={selectedMedia.src}
                        onTimeUpdate={handleTimeUpdate}
                        onLoadedMetadata={handleTimeUpdate}
                        onPlay={() => setIsPlaying(true)}
                        onPause={() => setIsPlaying(false)}
                      />
                    </div>
                  )}

                  {/* Media Controls */}
                  <div className="mt-4 space-y-4">
                    {/* Progress Bar */}
                    <div
                      className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 cursor-pointer"
                      onClick={handleSeek}
                    >
                      <div
                        className="bg-primary-600 h-2 rounded-full transition-all duration-100"
                        style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
                      />
                    </div>

                    {/* Time Display */}
                    <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                      <span>{formatTime(currentTime)}</span>
                      <span>{formatTime(duration)}</span>
                    </div>

                    {/* Control Buttons */}
                    <div className="flex items-center justify-center space-x-4">
                      <button
                        onClick={() => skipTime(-10)}
                        className="p-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400"
                      >
                        <BackwardIcon className="h-6 w-6" />
                      </button>
                      
                      <button
                        onClick={isPlaying ? handlePause : handlePlay}
                        className="p-3 bg-primary-600 text-white rounded-full hover:bg-primary-700 transition-colors"
                      >
                        {isPlaying ? (
                          <PauseIcon className="h-6 w-6" />
                        ) : (
                          <PlayIcon className="h-6 w-6" />
                        )}
                      </button>
                      
                      <button
                        onClick={() => skipTime(10)}
                        className="p-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400"
                      >
                        <ForwardIcon className="h-6 w-6" />
                      </button>
                    </div>

                    {/* Volume Control */}
                    <div className="flex items-center space-x-2">
                      <button onClick={toggleMute} className="text-gray-600 dark:text-gray-400">
                        {isMuted ? (
                          <SpeakerXMarkIcon className="h-5 w-5" />
                        ) : (
                          <SpeakerWaveIcon className="h-5 w-5" />
                        )}
                      </button>
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.1"
                        value={volume}
                        onChange={handleVolumeChange}
                        className="flex-1"
                      />
                    </div>

                    {/* Playback Speed */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Speed:</span>
                      <div className="flex space-x-1">
                        {[0.5, 0.75, 1, 1.25, 1.5, 2].map(rate => (
                          <button
                            key={rate}
                            onClick={() => changePlaybackRate(rate)}
                            className={`px-2 py-1 text-xs rounded ${
                              playbackRate === rate
                                ? 'bg-primary-600 text-white'
                                : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                            }`}
                          >
                            {rate}x
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Fullscreen for Video */}
                    {selectedMedia.type === 'video' && (
                      <button
                        onClick={toggleFullscreen}
                        className="w-full flex items-center justify-center space-x-2 py-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400"
                      >
                        {isFullscreen ? (
                          <ArrowsPointingInIcon className="h-5 w-5" />
                        ) : (
                          <ArrowsPointingOutIcon className="h-5 w-5" />
                        )}
                        <span className="text-sm">
                          {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
                        </span>
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <PlayIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 dark:text-gray-400">
                    Select a media item to start playing
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaGallery;
