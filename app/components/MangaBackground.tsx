export function MangaBackground() {
  return (
    <div className="manga-bg">
      {/* Primary Screentone Pattern - Fine dots */}
      <div className="screentone screentone-fine" />
      
      {/* Secondary Screentone - Angled pattern for depth */}
      <div className="screentone screentone-angled" />
      
      {/* Focus Lines - Radiating from center */}
      <div className="focus-lines">
        {[...Array(36)].map((_, i) => (
          <div
            key={`focus-${i}`}
            className="focus-line"
            style={{
              transform: `rotate(${i * 10}deg)`,
            }}
          />
        ))}
      </div>
      
      {/* Speed Lines - Dynamic movement feel */}
      <div className="speed-lines">
        {[...Array(24)].map((_, i) => (
          <div
            key={`speed-${i}`}
            className="speed-line"
            style={{
              left: `${i * 4.2}%`,
              height: `${60 + (i % 5) * 10}vh`,
              opacity: 0.02 + (i % 3) * 0.015,
              animationDelay: `${i * 0.1}s`,
            }}
          />
        ))}
      </div>
      
      {/* Edge accents */}
      <div className="manga-edge manga-edge-top" />
      <div className="manga-edge manga-edge-bottom" />
    </div>
  );
}

// Alias for backward compatibility
export const MeshGradient = MangaBackground;

