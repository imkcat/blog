export function MeshGradient() {
  return (
    <div className="manga-bg">
      {/* Halftone/Screentone Pattern */}
      <div className="halftone-pattern" />
      
      {/* Speed Lines - Radiating from center-top */}
      <div className="speed-lines">
        {/* Vertical speed lines */}
        {[...Array(20)].map((_, i) => (
          <div
            key={`v-${i}`}
            className="speed-line"
            style={{
              width: '1px',
              height: '100vh',
              left: `${5 + i * 5}%`,
              top: 0,
              opacity: 0.03 + (i % 3) * 0.02,
            }}
          />
        ))}
        {/* Diagonal speed lines from corners */}
        {[...Array(12)].map((_, i) => (
          <div
            key={`d-${i}`}
            className="speed-line"
            style={{
              width: '2px',
              height: '200vh',
              left: '-10%',
              top: '-50%',
              transform: `rotate(${15 + i * 5}deg)`,
              transformOrigin: 'top left',
              opacity: 0.02 + (i % 4) * 0.01,
            }}
          />
        ))}
      </div>
      
      {/* Corner decorations */}
      <div className="manga-corner manga-corner-tl" style={{ top: '20px', left: '20px' }} />
      <div className="manga-corner manga-corner-tr" style={{ top: '20px', right: '20px' }} />
      <div className="manga-corner manga-corner-bl" style={{ bottom: '20px', left: '20px' }} />
      <div className="manga-corner manga-corner-br" style={{ bottom: '20px', right: '20px' }} />
    </div>
  );
}

