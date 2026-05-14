import React, { useState, useEffect, useRef, useCallback } from 'react';
import { AboutWindow, WorkWindow, ResumeWindow, NowWindow, ReadmeWindow } from './components/Windows';
import { TweaksPanel, TweakSection, TweakSelect, TweakButton, useTweaks } from './components/TweaksPanel';
import './App.css';

const TWEAK_DEFAULTS = {
  wallpaper: "memphis",
  showTweaksHint: true
};

// Window registry
const WINDOWS: Record<string, { title: string; icon: string; body: () => React.JSX.Element; w: number; h: number; x: number; y: number }> = {
  about:   { title: "About Me",         icon: "👤", body: () => <AboutWindow />,   w: 520, h: 460, x: 120, y: 60 },
  work:    { title: "Work — Portfolio", icon: "📁", body: () => <WorkWindow />,    w: 580, h: 480, x: 240, y: 100 },
  resume:  { title: "Resume.doc",       icon: "📄", body: () => <ResumeWindow />,  w: 520, h: 520, x: 360, y: 80 },
  now:     { title: "Now.txt",          icon: "📌", body: () => <NowWindow />,     w: 420, h: 440, x: 480, y: 120 },
  readme:  { title: "Readme.txt",       icon: "❓", body: () => <ReadmeWindow />,  w: 380, h: 280, x: 60,  y: 380 },
};

interface WindowState {
  open: boolean;
  x: number;
  y: number;
  w: number;
  h: number;
  z: number;
  min: boolean;
}

interface WindowFrameProps {
  id: string;
  win: any;
  z: number;
  active: boolean;
  onFocus: (id: string) => void;
  onClose: (id: string) => void;
  onMove: (id: string, x: number, y: number) => void;
  onMinimize: (id: string) => void;
  onResize: (id: string, w: number, h: number) => void;
}

// Draggable window
function WindowFrame({ id, win, z, active, onFocus, onClose, onMove, onMinimize, onResize }: WindowFrameProps) {
  const ref = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{ dx: number; dy: number } | null>(null);

  const onMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest(".title-btn")) return;
    const rect = ref.current!.getBoundingClientRect();
    dragRef.current = { dx: e.clientX - rect.left, dy: e.clientY - rect.top };
    onFocus(id);
    const move = (ev: MouseEvent) => {
      const x = ev.clientX - dragRef.current!.dx;
      const y = ev.clientY - dragRef.current!.dy;
      onMove(id, Math.max(0, x), Math.max(0, Math.min(window.innerHeight - 80, y)));
    };
    const up = () => { 
      window.removeEventListener("mousemove", move); 
      window.removeEventListener("mouseup", up); 
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
  };

  const onResizeMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    onFocus(id);
    
    const startX = e.clientX;
    const startY = e.clientY;
    const startW = win.w;
    const startH = win.h;
    
    const resize = (ev: MouseEvent) => {
      const newW = Math.max(200, startW + (ev.clientX - startX));
      const newH = Math.max(100, startH + (ev.clientY - startY));
      onResize(id, newW, newH);
    };
    
    const stopResize = () => {
      window.removeEventListener("mousemove", resize);
      window.removeEventListener("mouseup", stopResize);
    };
    
    window.addEventListener("mousemove", resize);
    window.addEventListener("mouseup", stopResize);
  };

  return (
    <div
      ref={ref}
      className={"window" + (active ? "" : " inactive")}
      style={{ left: win.x, top: win.y, width: win.w, height: win.h, zIndex: z }}
      onMouseDown={() => onFocus(id)}
    >
      <div className="titlebar" onMouseDown={onMouseDown}>
        <div className="title-text">
          <span className="title-icon">{win.icon}</span>
          <span>{win.title}</span>
        </div>
        <div className="title-btns">
          <button className="title-btn" title="Minimize" onClick={(e) => { e.stopPropagation(); onMinimize(id); }}>_</button>
          <button className="title-btn" title="Maximize">▢</button>
          <button className="title-btn" title="Close" onClick={(e) => { e.stopPropagation(); onClose(id); }}>×</button>
        </div>
      </div>
      <div className="window-body">{win.body()}</div>
      <div 
        className="resize-handle" 
        onMouseDown={onResizeMouseDown}
        title="Resize window"
      />
    </div>
  );
}

interface DesktopIconProps {
  id: string;
  label: string;
  glyph: string;
  onOpen: (id: string) => void;
}

// Desktop icon
function DesktopIcon({ id, label, glyph, onOpen }: DesktopIconProps) {
  const [active, setActive] = useState(false);
  return (
    <div
      className={"icon" + (active ? " active" : "")}
      tabIndex={0}
      onClick={(e) => { e.stopPropagation(); setActive(true); }}
      onDoubleClick={() => onOpen(id)}
      onBlur={() => setActive(false)}
    >
      <div className="icon-glyph">{glyph}</div>
      <div className="icon-label">{label}</div>
    </div>
  );
}

// Clock
function Clock() {
  const [t, setT] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setT(new Date()), 1000 * 30);
    return () => clearInterval(id);
  }, []);
  const fmt = t.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
  return <>🔊 🖧 {fmt}</>;
}

interface StartMenuProps {
  open: boolean;
  onClose: () => void;
  onOpenWindow: (id: string) => void;
}

// Start menu
function StartMenu({ open, onClose, onOpenWindow }: StartMenuProps) {
  if (!open) return null;
  
  const Item = ({ icon, label, onClick }: { icon: string; label: string; onClick: () => void }) => (
    <div onClick={onClick}
      style={{ display: "flex", alignItems: "center", gap: 10, padding: "5px 10px", cursor: "default" }}
      onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.background = "var(--c-tb1, #0a246a)"}
      onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.background = "transparent"}
      onMouseDown={(e) => e.preventDefault()}
    >
      <span style={{ fontSize: 18, width: 24, textAlign: "center" }}>{icon}</span>
      <span>{label}</span>
    </div>
  );
  
  return (
    <>
      <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 1500 }} />
      <div className="start-menu raised" style={{
        position: "fixed", left: 2, bottom: 30, width: 240, zIndex: 1501,
        padding: 2, display: "flex"
      }}>
        <div style={{
          width: 26, alignSelf: "stretch",
          background: "linear-gradient(180deg, #1084d0 0%, #0a246a 100%)",
          color: "#fff", writingMode: "vertical-rl", textOrientation: "mixed",
          fontWeight: 900, fontSize: 18, padding: "10px 4px",
          letterSpacing: "1px",
          textTransform: "uppercase",
          display: "grid", placeItems: "end center",
        }}>
          heckman<span style={{ fontWeight: 400 }}>98</span>
        </div>
        <div style={{ flex: 1, color: "#000", background: "var(--c-face, #fff)" }}
             className="start-menu-list">
          <style>{`.start-menu-list span:hover { color: #fff; }`}</style>
          <Item icon="👤" label="About Me"      onClick={() => { onOpenWindow("about"); onClose(); }} />
          <Item icon="📁" label="Work"          onClick={() => { onOpenWindow("work"); onClose(); }} />
          <Item icon="📄" label="Resume"        onClick={() => { onOpenWindow("resume"); onClose(); }} />
          <Item icon="📌" label="Now"           onClick={() => { onOpenWindow("now"); onClose(); }} />
          <hr style={{ margin: "4px 8px", border: 0, borderTop: "1px solid #808080", borderBottom: "1px solid #fff" }} />
          <Item icon="✉️" label="Email me"      onClick={() => window.open("mailto:brian@heckman.io")} />
          <Item icon="❓" label="Readme"        onClick={() => { onOpenWindow("readme"); onClose(); }} />
        </div>
      </div>
    </>
  );
}

// App
function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  // window state: { open: bool, x, y, w, h, z, min: bool } per id
  const initState = (): Record<string, WindowState> => {
    const s: Record<string, WindowState> = {};
    let z = 10;
    Object.entries(WINDOWS).forEach(([id, w]) => {
      s[id] = { open: false, x: w.x, y: w.y, w: w.w, h: w.h, z: z++, min: false };
    });
    return s;
  };
  const [winState, setWinState] = useState(initState);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [startOpen, setStartOpen] = useState(false);
  const zRef = useRef(50);

  // open the welcome readme on first load
  useEffect(() => {
    openWindow("readme");
    setTimeout(() => openWindow("about"), 150);
  }, []);

  const openWindow = useCallback((id: string) => {
    setWinState(s => {
      const next = { ...s, [id]: { ...s[id], open: true, min: false, z: ++zRef.current } };
      return next;
    });
    setActiveId(id);
  }, []);

  const closeWindow = (id: string) => setWinState(s => ({ ...s, [id]: { ...s[id], open: false } }));
  const minimizeWindow = (id: string) => setWinState(s => ({ ...s, [id]: { ...s[id], min: true } }));
  const focusWindow = (id: string) => {
    setWinState(s => ({ ...s, [id]: { ...s[id], z: ++zRef.current, min: false } }));
    setActiveId(id);
  };
  const moveWindow = (id: string, x: number, y: number) => setWinState(s => ({ ...s, [id]: { ...s[id], x, y } }));
  const resizeWindow = (id: string, w: number, h: number) => setWinState(s => ({ ...s, [id]: { ...s[id], w, h } }));

  // keyboard shortcuts
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement).tagName === "INPUT" || (e.target as HTMLElement).tagName === "TEXTAREA") return;
      const map: Record<string, string> = { "1": "about", "2": "work", "3": "resume", "4": "now" };
      if (map[e.key]) { e.preventDefault(); openWindow(map[e.key]); }
      if (e.key === "Escape" && activeId) closeWindow(activeId);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeId, openWindow]);

  const startLabel = "Start";
  const startLogo = "🪟";

  const openWindows = Object.entries(winState).filter(([, w]) => w.open);

  return (
    <div className="desktop" data-wallpaper={t.wallpaper || "memphis"} onClick={() => setStartOpen(false)}>
      <div className="wallpaper" />

      {/* desktop icons */}
      <div className="icons">
        <DesktopIcon id="about"  label="About Me"      glyph="👤" onOpen={openWindow} />
        <DesktopIcon id="work"   label="Work"          glyph="📁" onOpen={openWindow} />
        <DesktopIcon id="resume" label="Resume.doc"    glyph="📄" onOpen={openWindow} />
        <DesktopIcon id="now"    label="Now.txt"       glyph="📌" onOpen={openWindow} />
        <DesktopIcon id="readme" label="Readme.txt"    glyph="❓" onOpen={openWindow} />
      </div>

      {/* windows */}
      {openWindows.map(([id, w]) => (
        w.min ? null :
        <WindowFrame key={id} id={id} win={{ ...WINDOWS[id], ...w }}
          z={w.z} active={activeId === id}
          onFocus={focusWindow} onClose={closeWindow}
          onMove={moveWindow} onMinimize={minimizeWindow}
          onResize={resizeWindow}
        />
      ))}

      {/* taskbar */}
      <div className="taskbar" onClick={(e) => e.stopPropagation()}>
        <div className="start-btn" onClick={(e) => { e.stopPropagation(); setStartOpen(v => !v); }}>
          <span className="start-logo" style={{ display: "grid", placeItems: "center", fontSize: 14 }}>{startLogo}</span>
          <span>{startLabel}</span>
        </div>
        <div className="task-divider" />
        <div className="task-list">
          {openWindows.map(([id, w]) => (
            <div key={id}
              className={"task-btn" + (activeId === id && !w.min ? " active" : "")}
              onClick={() => {
                if (activeId === id && !w.min) minimizeWindow(id);
                else focusWindow(id);
              }}
            >
              <span style={{ fontSize: 12 }}>{WINDOWS[id].icon}</span>
              <span>{WINDOWS[id].title}</span>
            </div>
          ))}
        </div>
        <div className="task-divider" />
        <div className="tray"><Clock /></div>
      </div>

      <StartMenu
        open={startOpen}
        onClose={() => setStartOpen(false)}
        onOpenWindow={openWindow}
      />

      <TweaksPanel>
        <TweakSection label="Aesthetic" />
        <TweakSelect
          label="Wallpaper"
          value={t.wallpaper || "memphis"}
          options={[
            { value: "memphis",  label: "Memphis (jazz cup)" },
            { value: "teal",     label: "Classic teal" },
          ]}
          onChange={(v) => setTweak("wallpaper", v)}
        />
        <TweakSection label="Quick open" />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
          <TweakButton onClick={() => openWindow("about")}>About</TweakButton>
          <TweakButton onClick={() => openWindow("work")}>Work</TweakButton>
          <TweakButton onClick={() => openWindow("resume")}>Resume</TweakButton>
          <TweakButton onClick={() => openWindow("now")}>Now</TweakButton>
        </div>
        <TweakSection label="Tips" />
        <div style={{ fontSize: 11, opacity: .65, lineHeight: 1.4 }}>
          Drag titlebars to move. Press <b>1–4</b> to open sections. Click the Start
          button for the menu.
        </div>
      </TweaksPanel>
    </div>
  );
}

export default App;