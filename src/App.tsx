import { useState, useEffect, useRef, useCallback } from 'react';
import MatrixRain from './components/MatrixRain';
import LinkInput from './components/LinkInput';
import MediaResult from './components/MediaResult';
import './styles.css';

export interface MediaItem {
  id: string;
  url: string;
  type: 'image' | 'video';
  thumbnail: string;
  platform: string;
  originalUrl: string;
}

function App() {
  const [mode, setMode] = useState<'single' | 'multiple'>('single');
  const [links, setLinks] = useState<string[]>(['']);
  const [results, setResults] = useState<MediaItem[]>([]);
  const [isExtracting, setIsExtracting] = useState(false);
  const [glitchTitle, setGlitchTitle] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitchTitle(true);
      setTimeout(() => setGlitchTitle(false), 200);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const detectPlatform = (url: string): string => {
    if (url.includes('instagram.com') || url.includes('instagr.am')) return 'Instagram';
    if (url.includes('twitter.com') || url.includes('x.com')) return 'X/Twitter';
    if (url.includes('tiktok.com')) return 'TikTok';
    if (url.includes('youtube.com') || url.includes('youtu.be')) return 'YouTube';
    if (url.includes('facebook.com') || url.includes('fb.com')) return 'Facebook';
    if (url.includes('pinterest.com')) return 'Pinterest';
    if (url.includes('reddit.com')) return 'Reddit';
    return 'Unknown';
  };

  const simulateExtraction = useCallback(async (urls: string[]) => {
    setIsExtracting(true);
    setResults([]);

    // Simulate extraction delay with typing effect
    await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000));

    const mockResults: MediaItem[] = urls
      .filter(url => url.trim())
      .map((url, index) => {
        const platform = detectPlatform(url);
        const isVideo = Math.random() > 0.5;
        return {
          id: `media-${Date.now()}-${index}`,
          url: url,
          type: isVideo ? 'video' : 'image',
          thumbnail: `https://picsum.photos/seed/${Date.now() + index}/400/300`,
          platform,
          originalUrl: url,
        };
      });

    setResults(mockResults);
    setIsExtracting(false);
  }, []);

  const handleExtract = () => {
    const validLinks = links.filter(l => l.trim());
    if (validLinks.length > 0) {
      simulateExtraction(validLinks);
    }
  };

  const addLink = () => {
    setLinks([...links, '']);
  };

  const updateLink = (index: number, value: string) => {
    const newLinks = [...links];
    newLinks[index] = value;
    setLinks(newLinks);
  };

  const removeLink = (index: number) => {
    if (links.length > 1) {
      setLinks(links.filter((_, i) => i !== index));
    }
  };

  const clearAll = () => {
    setLinks(['']);
    setResults([]);
  };

  return (
    <div className="app-container">
      <MatrixRain />

      <div className="scanlines" />
      <div className="vignette" />

      <main className="main-content">
        <header className="header">
          <div className="logo-container">
            <div className={`title ${glitchTitle ? 'glitch' : ''}`} data-text="MEDIA_EXTRACT.exe">
              MEDIA_EXTRACT.exe
            </div>
            <div className="subtitle">&gt; Social Media Content Extraction Protocol v2.0_</div>
          </div>

          <div className="mode-selector">
            <button
              className={`mode-btn ${mode === 'single' ? 'active' : ''}`}
              onClick={() => { setMode('single'); setLinks(['']); setResults([]); }}
            >
              [SINGLE_LINK]
            </button>
            <button
              className={`mode-btn ${mode === 'multiple' ? 'active' : ''}`}
              onClick={() => { setMode('multiple'); setLinks(['']); setResults([]); }}
            >
              [MULTI_LINK]
            </button>
          </div>
        </header>

        <section className="input-section">
          <div className="terminal-window">
            <div className="terminal-header">
              <span className="terminal-dot red" />
              <span className="terminal-dot yellow" />
              <span className="terminal-dot green" />
              <span className="terminal-title">extraction_console.sh</span>
            </div>

            <div className="terminal-body">
              <div className="terminal-prompt">
                <span className="prompt-symbol">&gt;</span>
                <span className="prompt-text">INITIALIZING EXTRACTION MODULE...</span>
              </div>
              <div className="terminal-prompt">
                <span className="prompt-symbol">&gt;</span>
                <span className="prompt-text">MODE: {mode.toUpperCase()}_EXTRACTION</span>
              </div>
              <div className="terminal-prompt">
                <span className="prompt-symbol">&gt;</span>
                <span className="prompt-text">PASTE TARGET URL{mode === 'multiple' ? 'S' : ''} BELOW:</span>
              </div>

              <div className="links-container">
                {links.map((link, index) => (
                  <LinkInput
                    key={index}
                    value={link}
                    index={index}
                    onChange={(value) => updateLink(index, value)}
                    onRemove={() => removeLink(index)}
                    canRemove={links.length > 1}
                    platform={link ? detectPlatform(link) : null}
                  />
                ))}
              </div>

              {mode === 'multiple' && (
                <button className="add-link-btn" onClick={addLink}>
                  <span className="btn-bracket">[</span>
                  + ADD_ANOTHER_TARGET
                  <span className="btn-bracket">]</span>
                </button>
              )}

              <div className="action-buttons">
                <button
                  className={`extract-btn ${isExtracting ? 'extracting' : ''}`}
                  onClick={handleExtract}
                  disabled={isExtracting || !links.some(l => l.trim())}
                >
                  {isExtracting ? (
                    <>
                      <span className="loading-brackets">&lt;</span>
                      EXTRACTING...
                      <span className="loading-brackets">&gt;</span>
                    </>
                  ) : (
                    <>
                      <span className="btn-bracket">[</span>
                      EXECUTE_EXTRACTION
                      <span className="btn-bracket">]</span>
                    </>
                  )}
                </button>

                <button className="clear-btn" onClick={clearAll}>
                  <span className="btn-bracket">[</span>
                  CLEAR_ALL
                  <span className="btn-bracket">]</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {results.length > 0 && (
          <section className="results-section">
            <div className="results-header">
              <span className="results-title">&gt; EXTRACTION_COMPLETE: {results.length} MEDIA FILE{results.length > 1 ? 'S' : ''} FOUND</span>
            </div>
            <div className="results-grid">
              {results.map((item, index) => (
                <MediaResult key={item.id} item={item} index={index} />
              ))}
            </div>
          </section>
        )}

        <footer className="footer">
          <span className="footer-text">Requested by @_knone_ · Built by @clonkbot</span>
        </footer>
      </main>
    </div>
  );
}

export default App;
