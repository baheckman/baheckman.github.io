import React from 'react';
import { PERSONAL_INFO, EXPERIENCE, EDUCATION, PROJECTS, NOW_ACTIVITIES, OPEN_SOURCE_AND_VOLUNTEERING } from '../data/personal';

interface MenuBarProps {
  items?: string[];
}

function MenuBar({ items = ["File", "Edit", "View", "Help"] }: MenuBarProps) {
  return (
    <div className="menubar">
      {items.map((it, i) => (
        <span key={i}><u>{it[0]}</u>{it.slice(1)}</span>
      ))}
    </div>
  );
}

interface StatusBarProps {
  cells: string[];
}

function StatusBar({ cells }: StatusBarProps) {
  return (
    <div className="statusbar">
      {cells.map((c, i) => <span key={i} className="cell">{c}</span>)}
    </div>
  );
}

export function AboutWindow() {
  return (
    <>
      <MenuBar />
      <div style={{ display: "grid", gridTemplateColumns: "120px 1fr", gap: 14, alignItems: "start" }}>
        <div className="sunken" style={{ aspectRatio: "1 / 1", display: "grid", placeItems: "center", padding: 0, overflow: "hidden" }}>
          <img
            src="/src/assets/8bit_nyc_headshot.png"
            alt="headshot"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
        <div>
          <div className="section-h" style={{ marginTop: 0 }}>Hello, world. ☻</div>
          <p style={{ margin: "0 0 8px" }}>
            {PERSONAL_INFO.bio[0]}
          </p>
          <p style={{ margin: "0 0 8px" }}>
            {PERSONAL_INFO.bio[1]}
          </p>
          <p style={{ margin: "0 0 8px" }}>
            {PERSONAL_INFO.bio[2]}
          </p>
        </div>
      </div>

      <hr className="divider" />

      <div className="section-h">Vital statistics</div>
      <dl style={{ margin: 0 }}>
        <div className="field-row"><dt>Located</dt><dd>{PERSONAL_INFO.location} · {PERSONAL_INFO.timezone}</dd></div>
        <div className="field-row"><dt>Working on</dt><dd>{PERSONAL_INFO.title} @ {PERSONAL_INFO.company}</dd></div>
        <div className="field-row"><dt>Speaks</dt><dd>{PERSONAL_INFO.languages}</dd></div>
        <div className="field-row"><dt>Tools</dt><dd>
          {PERSONAL_INFO.skills.map((skill, i) => (
            <div key={i}>{skill}</div>
          ))}
        </dd></div>
        <div className="field-row"><dt>Email</dt><dd><a href={`mailto:${PERSONAL_INFO.email}`}>{PERSONAL_INFO.email}</a></dd></div>
        <div className="field-row"><dt>Elsewhere</dt><dd>
          <a href={PERSONAL_INFO.social.github}>github</a> · <a href={PERSONAL_INFO.social.linkedin}>linkedin</a> · <a href={PERSONAL_INFO.social.goodreads}>goodreads</a>
        </dd></div>
      </dl>

      <div className="under-construction">
        <span style={{ fontSize: 22 }}>🚧</span>
        <span>This page is under construction! Last updated 5/13/26</span>
        <span style={{ fontSize: 22 }}>🚧</span>
      </div>

      <StatusBar cells={["Ready", "Last updated: 5/13/2026", "👤 1 visitor"]} />
    </>
  );
}


export function WorkWindow() {
  return (
    <>
      <MenuBar items={["File", "Edit", "View", "Sort", "Help"]} />
      <div className="h-row" style={{ marginBottom: 10, justifyContent: "space-between" }}>
        <div className="h-row" style={{ gap: 6 }}>
          <span className="btn" style={{ minWidth: 0, padding: "0 8px", height: 22 }}>◀ Back</span>
          <span className="btn" style={{ minWidth: 0, padding: "0 8px", height: 22 }}>▶ Forward</span>
          <span className="btn" style={{ minWidth: 0, padding: "0 8px", height: 22 }}>↑ Up</span>
        </div>
        <div className="muted" style={{ fontSize: 11 }}>
          C:\PORTFOLIO\WORK\ ▾
        </div>
      </div>

      <div className="projects-grid">
        {PROJECTS.map((p) => (
          <div key={p.id} className="project-item">
            <div className="project-thumb sunken">
              <div className="placeholder-thumb">[project]</div>
            </div>
            <div className="project-info">
              <div className="project-title">{p.title}</div>
              <div className="project-sub muted">{p.subtitle}</div>
            </div>
          </div>
        ))}
      </div>

      <StatusBar cells={[`${PROJECTS.length} items`, "List view", "Modified 5/13/2026"]} />
    </>
  );
}

interface SectionProps {
  title: string;
  children: React.ReactNode;
}

function Section({ title, children }: SectionProps) {
  return (
    <div style={{ marginBottom: 16 }}>
      <div className="section-h">{title}</div>
      {children}
    </div>
  );
}

interface JobProps {
  company: string;
  role: string;
  time: string;
  bullets: string[];
}

function Job({ company, role, time, bullets }: JobProps) {
  return (
    <div style={{ marginBottom: 12 }}>
      <div className="job-header">
        <div><b>{company}</b> — {role}</div>
        <div className="muted">{time}</div>
      </div>
      {bullets && bullets.length > 0 && (
        <ul className="bullets" style={{ margin: "4px 0 0 16px" }}>
          {bullets.map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function ResumeWindow() {
  return (
    <>
      <MenuBar items={["File", "Edit", "View", "Insert", "Format", "Help"]} />

      <div style={{ textAlign: "center", marginBottom: 16 }}>
        <div style={{ fontSize: 18, fontWeight: "bold", marginBottom: 4 }}>{PERSONAL_INFO.name}</div>
        <div className="muted">{PERSONAL_INFO.title}</div>
        <div className="muted" style={{ fontSize: 11 }}>{PERSONAL_INFO.email} · {PERSONAL_INFO.location} · github.com/baheckman</div>
      </div>

      <Section title="Experience">
        {EXPERIENCE.map((job, i) => (
          <Job
            key={i}
            company={job.company}
            role={job.role}
            time={job.timeframe}
            bullets={job.achievements}
          />
        ))}
      </Section>

      <Section title="Education">
        {EDUCATION.map((edu, i) => (
          <Job
            key={i}
            company={edu.institution}
            role={edu.degree}
            time={edu.timeframe}
            bullets={edu.details}
          />
        ))}
      </Section>

      <Section title="Open Source and Volunteering">
        {OPEN_SOURCE_AND_VOLUNTEERING.map((item, i) => (
          <div key={i} style={{ marginBottom: 12 }}>
            <div style={{ fontWeight: 'bold' }}>{item.organization}</div>
            <div style={{ fontSize: 11, color: 'var(--c-shadow)' }}>{item.role}</div>
            <div style={{ fontSize: 11, marginTop: 2 }}>{item.description}</div>
          </div>
        ))}
      </Section>

      <div className="h-row" style={{ gap: 6, marginTop: 4 }}>
        <span className="btn">Print…</span>
        <span className="btn">Save As…</span>
        <span className="btn">Email</span>
      </div>

      <StatusBar cells={["Page 1 of 1", "12 pt · Single space", "Insert"]} />
    </>
  );
}


export function NowWindow() {
  const today = "May 13, 2026";
  return (
    <>
      <MenuBar items={["File", "View", "Help"]} />

      <div className="raised" style={{ padding: "8px 10px", marginBottom: 10, display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
        <div><b>What I'm up to</b></div>
        <div className="muted" style={{ fontSize: 11 }}>Updated {today}</div>
      </div>

      <div className="now-list">
        {NOW_ACTIVITIES.map((item, i) => (
          <div className="now-item" key={i}>
            <div className="now-glyph" aria-hidden>{item.emoji}</div>
            <div>{item.activity}</div>
            <div className="tag">{item.category}</div>
          </div>
        ))}
      </div>

      <StatusBar cells={[`${NOW_ACTIVITIES.length} entries`, "Auto-saved"]} />
    </>
  );
}

export function ReadmeWindow() {
  return (
    <>
      <div className="section-h" style={{ marginTop: 0 }}>README.TXT</div>
      <p style={{ marginTop: 0 }}>
        Welcome to my desktop. Double-click an icon (or a taskbar button) to open a window.
        Drag titlebars to rearrange. The whole place can shapeshift —
      </p>

      <ul style={{ margin: "8px 0 8px 20px" }}>
        <li><b>Windows 98</b> — Classic beige computing nostalgia</li>
        <li><b>Frutiger Aqua</b> — Early OS X candy-coated minimalism</li>
        <li><b>GeoCities</b> — Maximum web 1.0 energy</li>
      </ul>

      <p>
        Try the theme switcher in the Start menu, or open the tweaks panel (look for the ⚙️ in the corner).
      </p>

      <hr className="divider" />
      <p className="muted" style={{ fontSize: 11, margin: 0 }}>
        Built with React + TypeScript. Source available on GitHub.
        This is a portfolio site masquerading as a retro desktop OS.
        <br />
        Press <b>1–4</b> for keyboard shortcuts. <b>ESC</b> closes the active window.
      </p>
    </>
  );
}