import { useState } from 'react';

interface LinkInputProps {
  value: string;
  index: number;
  onChange: (value: string) => void;
  onRemove: () => void;
  canRemove: boolean;
  platform: string | null;
}

const platformIcons: Record<string, string> = {
  'Instagram': '📸',
  'X/Twitter': '🐦',
  'TikTok': '🎵',
  'YouTube': '📺',
  'Facebook': '👤',
  'Pinterest': '📌',
  'Reddit': '🤖',
  'Unknown': '🔗',
};

const LinkInput = ({ value, index, onChange, onRemove, canRemove, platform }: LinkInputProps) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className={`link-input-wrapper ${isFocused ? 'focused' : ''}`}>
      <span className="input-prefix">
        <span className="line-number">{String(index + 1).padStart(2, '0')}</span>
        <span className="input-arrow">&gt;</span>
      </span>
      <input
        type="url"
        className="link-input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder="https://instagram.com/p/... or any social media URL"
        spellCheck={false}
      />
      {platform && (
        <span className="platform-badge">
          <span className="platform-icon">{platformIcons[platform] || '🔗'}</span>
          <span className="platform-name">{platform}</span>
        </span>
      )}
      {canRemove && (
        <button className="remove-btn" onClick={onRemove} title="Remove link">
          [×]
        </button>
      )}
      <span className={`cursor-blink ${isFocused ? 'visible' : ''}`}>_</span>
    </div>
  );
};

export default LinkInput;
