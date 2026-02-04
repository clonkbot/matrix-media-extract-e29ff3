import { useState } from 'react';
import type { MediaItem } from '../App';

interface MediaResultProps {
  item: MediaItem;
  index: number;
}

const MediaResult = ({ item, index }: MediaResultProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = () => {
    setIsDownloading(true);
    // Simulate download
    setTimeout(() => {
      setIsDownloading(false);
      // In a real app, this would trigger an actual download
      alert(`Download simulated for ${item.type} from ${item.platform}`);
    }, 1500);
  };

  return (
    <div
      className={`media-card ${isHovered ? 'hovered' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="media-preview">
        <img src={item.thumbnail} alt="Media preview" className="media-thumbnail" />
        {item.type === 'video' && (
          <div className="video-indicator">
            <span className="play-icon">▶</span>
            <span className="video-label">VIDEO</span>
          </div>
        )}
        <div className="media-overlay">
          <div className="overlay-scanlines" />
        </div>
      </div>

      <div className="media-info">
        <div className="media-meta">
          <span className="media-platform">[{item.platform.toUpperCase()}]</span>
          <span className="media-type">{item.type.toUpperCase()}</span>
        </div>
        <div className="media-url" title={item.originalUrl}>
          {item.originalUrl.length > 35
            ? item.originalUrl.substring(0, 35) + '...'
            : item.originalUrl}
        </div>
      </div>

      <div className="media-actions">
        <button
          className={`download-btn ${isDownloading ? 'downloading' : ''}`}
          onClick={handleDownload}
          disabled={isDownloading}
        >
          {isDownloading ? (
            <>
              <span className="download-progress" />
              DOWNLOADING...
            </>
          ) : (
            <>
              <span className="download-icon">↓</span>
              DOWNLOAD_{item.type.toUpperCase()}
            </>
          )}
        </button>
      </div>

      <div className="card-corner top-left" />
      <div className="card-corner top-right" />
      <div className="card-corner bottom-left" />
      <div className="card-corner bottom-right" />
    </div>
  );
};

export default MediaResult;
