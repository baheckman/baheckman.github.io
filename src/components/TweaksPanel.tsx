import { useState, ReactNode } from 'react';

// Custom hook for managing tweaks state
export function useTweaks(defaults: Record<string, any>) {
  const [tweaks, setTweaks] = useState(() => {
    try {
      const stored = localStorage.getItem('portfolio-tweaks');
      return stored ? { ...defaults, ...JSON.parse(stored) } : defaults;
    } catch {
      return defaults;
    }
  });

  const setTweak = (key: string, value: any) => {
    const newTweaks = { ...tweaks, [key]: value };
    setTweaks(newTweaks);
    try {
      localStorage.setItem('portfolio-tweaks', JSON.stringify(newTweaks));
    } catch {
      // localStorage failed, continue silently
    }
  };

  return [tweaks, setTweak] as const;
}

interface TweaksPanelProps {
  children: ReactNode;
}

export function TweaksPanel({ children }: TweaksPanelProps) {
  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);

  return (
    <>
      {/* Toggle button */}
      <div 
        className="tweaks-toggle"
        onClick={() => setOpen(true)}
        style={{
          position: 'fixed',
          top: 8,
          right: 8,
          width: 32,
          height: 32,
          background: 'var(--c-face, #c0c0c0)',
          border: '2px outset var(--c-face, #c0c0c0)',
          display: 'grid',
          placeItems: 'center',
          cursor: 'pointer',
          fontSize: 16,
          zIndex: 2000,
          opacity: open ? 0 : 0.7,
          transition: 'opacity 0.2s'
        }}
        title="Open tweaks panel"
      >
        ⚙️
      </div>

      {/* Panel window */}
      {open && (
        <div 
          className="tweaks-panel window"
          style={{
            position: 'fixed',
            top: 40,
            right: 8,
            width: 280,
            maxHeight: minimized ? 32 : 'calc(100vh - 80px)',
            zIndex: 2001,
            overflow: 'hidden'
          }}
        >
          <div className="titlebar">
            <div className="title-text">
              <span className="title-icon">⚙️</span>
              <span>Desktop Tweaks</span>
            </div>
            <div className="title-btns">
              <button 
                className="title-btn" 
                title="Minimize" 
                onClick={() => setMinimized(!minimized)}
              >
                _
              </button>
              <button 
                className="title-btn" 
                title="Close" 
                onClick={() => setOpen(false)}
              >
                ×
              </button>
            </div>
          </div>
          {!minimized && (
            <div className="window-body" style={{ padding: 12, fontSize: 11 }}>
              {children}
            </div>
          )}
        </div>
      )}
    </>
  );
}

interface TweakSectionProps {
  label: string;
}

export function TweakSection({ label }: TweakSectionProps) {
  return (
    <div style={{ 
      fontWeight: 'bold', 
      marginTop: 16, 
      marginBottom: 8, 
      fontSize: 12,
      borderBottom: '1px solid var(--c-shadow, #808080)',
      paddingBottom: 2
    }}>
      {label}
    </div>
  );
}

interface TweakRadioProps {
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
}

export function TweakRadio({ label, value, options, onChange }: TweakRadioProps) {
  return (
    <div style={{ marginBottom: 12 }}>
      <div style={{ marginBottom: 4, fontWeight: 'bold' }}>{label}</div>
      {options.map((option) => (
        <label key={option.value} style={{ display: 'block', marginBottom: 2, cursor: 'pointer' }}>
          <input
            type="radio"
            name={label}
            value={option.value}
            checked={value === option.value}
            onChange={(e) => onChange(e.target.value)}
            style={{ marginRight: 6 }}
          />
          {option.label}
        </label>
      ))}
    </div>
  );
}

interface TweakSelectProps {
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
}

export function TweakSelect({ label, value, options, onChange }: TweakSelectProps) {
  return (
    <div style={{ marginBottom: 12 }}>
      <div style={{ marginBottom: 4, fontWeight: 'bold' }}>{label}</div>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width: '100%',
          padding: '2px 4px',
          border: '1px inset var(--c-face, #c0c0c0)',
          background: 'var(--c-face, #c0c0c0)',
          fontSize: 11
        }}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

interface TweakButtonProps {
  onClick: () => void;
  children: ReactNode;
}

export function TweakButton({ onClick, children }: TweakButtonProps) {
  return (
    <button
      onClick={onClick}
      className="btn"
      style={{
        width: '100%',
        fontSize: 11,
        padding: '4px 8px',
        height: 'auto',
        minHeight: 24
      }}
    >
      {children}
    </button>
  );
}