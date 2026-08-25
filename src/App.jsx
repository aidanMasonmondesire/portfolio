import React, { useState } from "react";
import { Github, Linkedin, Mail, ExternalLink, Terminal, ArrowUpRight, FileText, Send } from "lucide-react";

/* ============================================================
   EDIT THIS SECTION — all your personal content lives here.
   Nothing below "PAGE LAYOUT" needs to change for basic edits.
   ============================================================ */

const profile = {
  name: "Aidan Mason-Mondesire",
  role: "Software Developer",
  location: "Clarington, ON",
  tagline:
    "Software Developer with hands-on experience following the software development lifecycle, designing and integrating APIs, building full-stack applications, and collaborating in teams using agile methodology.",
  about: [
    "Hello! I'm Aidan and I enjoy building things. I see software development like a work of art, I enjoy seeing the culmination" +
    " of effort turn into a working product. I enjoy any part of development whether it's frontend" + 
    " design, working with APIs, backend work, and even things that aren't necessarily development like data analysis"
  ],
  email: "aidan.mmondesire@outlook.com",
  github: "https://github.com/aidanMasonmondesire",
  linkedin: "https://linkedin.com/in/aidan-mason-mondesire",
  resumeUrl: "https://docs.google.com/document/d/1WCBTWDyWaxI_sJk_WFQUC2DY4zSCDKfQZm6izx6JsLc/export?format=pdf",
};

const skills = [
  { category: "Languages", items: ["Python", "Java", "C", "C++", "Dart", "SQL"] },
  { category: "Frontend", items: ["React", "HTML", "CSS"] },
  { category: "Backend", items: ["PostgreSQL", "REST", "Flask"] },
  { category: "Tools", items: ["Docker", "Git", "CI/CD", "Postman", "VS Code", "Claude", "ChatGPT"] },
];

const projects = [
  {
    hash: "c1ed5a0",
    title: "Pokémend - Music Recommendation Website",
    description: "A web application that uses Pokéapi to retrieve the information about a pokémon of the users choice, we then recommend a song that they might like based on the type that they chose.",
    stack: ["HTML", "CSS", "Python", "Flask", "Docker"],
    metric: "96% Performance Score",
    github: "https://github.com/aidanMasonmondesire/final-project-CSCI4230U",
    live: null,
  },
  {
    hash: "bb5933c",
    title: "Big Green Tree Care - Company Website",
    description: "An informational splashpage for a client's arborist business.",
    stack: ["HTML", "CSS", "Github Pages"],
    metric: "",
    github: "https://github.com/aidanMasonmondesire/big-green-tree",
    live: null,
  },
  {
    hash: "3a7727f",
    title: "PUMPD - Mobile Workout Application",
    description: "A mobile app where you can log workouts, track calories, and keep track of your food and water intake.",
    stack: ["Flutter", "Dart", "HTTP", "Firebase"],
    metric: "",
    github: "https://github.com/CSCI4100U/mobile-group-project-2023-kagmj",
    live: null,
  },
  {
    hash: "37e3022",
    title: "Legend of Night: Crawl Back from Hell - Game",
    description: "A souls-like 2d action-platformer game where you work your way through enemies to try and save your princess.",
    stack: ["Godot 4.3", "GDScript"],
    metric: "",
    github: "https://github.com/rorychisholm/4160-Project",
    live: null,
  },
];

/* ============================================================
   PAGE LAYOUT — structure below, styles in the <style> block.
   ============================================================ */

const NAV_ITEMS = [
  { id: "about", label: "about.md" },
  { id: "skills", label: "skills.diff" },
  { id: "projects", label: "projects/" },
  { id: "contact", label: "contact.sh" },
];

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState("about");
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle, sending, success, error
  const [toast, setToast] = useState(null);
 
  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  const scrollTo = (id) => {
    setActiveTab(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const updateField = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Request failed");

      setStatus("success");
      showToast("Message sent — thanks for reaching out!");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      setStatus("error");
      showToast("Sorry, something went wrong sending that. Try again?");
    } finally {
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <div className="pf-root">
      <style>{CSS}</style>

      {/* ---------- NAV ---------- */}
      <header className="pf-nav">
        <div className="pf-nav-brand">
          <Terminal size={16} strokeWidth={2.2} />
          <span>{profile.name.toLowerCase().replace(" ", "-")}</span>
        </div>
        <nav className="pf-nav-tabs">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              className={`pf-tab ${activeTab === item.id ? "pf-tab-active" : ""}`}
              onClick={() => scrollTo(item.id)}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </header>

      <main>
        {/* ---------- HERO ---------- */}
        <section className="pf-hero">
          <div className="pf-terminal">
            <div className="pf-terminal-bar">
              <span className="pf-dot pf-dot-red" />
              <span className="pf-dot pf-dot-yellow" />
              <span className="pf-dot pf-dot-green" />
              <span className="pf-terminal-title">zsh — 80x24</span>
            </div>
            <div className="pf-terminal-body">
              <p className="pf-line">
                <span className="pf-prompt">$</span> whoami
              </p>
              <p className="pf-out pf-type-1">{profile.name}</p>
              <p className="pf-line">
                <span className="pf-prompt">$</span> cat role.txt
              </p>
              <p className="pf-out pf-type-2">{profile.role} · {profile.location}</p>
              <p className="pf-line">
                <span className="pf-prompt">$</span> cat tagline.txt
              </p>
              <p className="pf-out pf-type-3">{profile.tagline}</p>
              <p className="pf-line pf-cursor-line">
                <span className="pf-prompt">$</span>
                <span className="pf-cursor" />
              </p>
            </div>
          </div>
          <div className="pf-hero-actions">
            <a className="pf-btn pf-btn-primary" href={`mailto:${profile.email}`}>
              <Mail size={15} /> Get in touch
            </a>
            <a className="pf-btn" href={profile.resumeUrl} target="_blank" rel="noreferrer">
              <FileText size={15} /> Resume
            </a>
            <a className="pf-btn" href={profile.github} target="_blank" rel="noreferrer">
              <Github size={15} /> GitHub
            </a>
          </div>
        </section>

        {/* ---------- ABOUT ---------- */}
        <section id="about" className="pf-section">
          <SectionHeading eyebrow="01" label="about.md" />
          <div className="pf-card pf-readme">
            {profile.about.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </section>

        {/* ---------- SKILLS ---------- */}
        <section id="skills" className="pf-section">
          <SectionHeading eyebrow="02" label="skills.diff" />
          <div className="pf-card pf-diff">
            {skills.map((group) => (
              <div className="pf-diff-group" key={group.category}>
                <p className="pf-diff-category"># {group.category}</p>
                {group.items.map((skill) => (
                  <p className="pf-diff-line" key={skill}>
                    <span className="pf-diff-plus">+</span> {skill}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </section>

        {/* ---------- PROJECTS ---------- */}
        <section id="projects" className="pf-section">
          <SectionHeading eyebrow="03" label="projects/" />
          <div className="pf-projects-grid">
            {projects.map((project) => (
              <article className="pf-project-card" key={project.hash}>
                <div className="pf-project-head">
                  <span className="pf-project-hash">{project.hash}</span>
                  <h3>{project.title}</h3>
                </div>
                <p className="pf-project-desc">{project.description}</p>
                <div className="pf-project-stack">
                  {project.stack.map((tech) => (
                    <span className="pf-tag" key={tech}>
                      {tech}
                    </span>
                  ))}
                </div>
                {project.metric && <p className="pf-project-metric">↑ {project.metric}</p>}
                <div className="pf-project-links">
                  {project.github ? (
                    <a href={project.github} target="_blank" rel="noreferrer">
                      <Github size={14} /> Code
                    </a>
                  ) : (
                    <button
                      type="button"
                      className="pf-project-link-disabled"
                      onClick={() => showToast("Sorry, this is not available right now")}
                    >
                      <Github size={14} /> Code
                    </button>
                  )}
                  {project.live ? (
                    <a href={project.live} target="_blank" rel="noreferrer">
                      <ExternalLink size={14} /> Live
                    </a>
                  ) : (
                    <button
                      type="button"
                      className="pf-project-link-disabled"
                      onClick={() => showToast("Sorry, this is not available right now")}
                    >
                      <ExternalLink size={14} /> Live
                    </button>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ---------- CONTACT ---------- */}
        <section id="contact" className="pf-section pf-contact">
          <SectionHeading eyebrow="04" label="contact.sh" />
          <div className="pf-card pf-contact-card">
            <p className="pf-line">
              <span className="pf-prompt">$</span> ./reach_out.sh --to="{profile.name}"
            </p>
            <p className="pf-contact-copy">
              Open to any computer science related roles (i.e. development, data, IT, etc.).
            </p>

            <form className="pf-form" onSubmit={handleSubmit}>
              <div className="pf-form-row">
                <label className="pf-form-field">
                  <span># name</span>
                  <input
                    type="text"
                    value={form.name}
                    onChange={updateField("name")}
                    placeholder="John Google"
                    required
                  />
                </label>
                <label className="pf-form-field">
                  <span># email</span>
                  <input
                    type="email"
                    value={form.email}
                    onChange={updateField("email")}
                    placeholder="john@google.com"
                    required
                  />
                </label>
              </div>
              <label className="pf-form-field">
                <span># message</span>
                <textarea
                  rows={4}
                  value={form.message}
                  onChange={updateField("message")}
                  placeholder="Write your message here..."
                  required
                />
              </label>
              <button type="submit" className="pf-btn pf-btn-primary pf-form-submit" disabled={status==="sending"}>
                <Send size={15} /> 
                {status === "sending" ? "Sending..." : "Send message"}
              </button>
              <p className="pf-form-hint">
                This sends an email directly to {profile.name}'s inbox.
              </p>
            </form>

            <div className="pf-contact-links">
              <a className="pf-btn" href={`mailto:${profile.email}`}>
                <Mail size={15} /> {profile.email}
              </a>
              <a className="pf-btn" href={profile.linkedin} target="_blank" rel="noreferrer">
                <Linkedin size={15} /> LinkedIn <ArrowUpRight size={13} />
              </a>
              <a className="pf-btn" href={profile.github} target="_blank" rel="noreferrer">
                <Github size={15} /> GitHub <ArrowUpRight size={13} />
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="pf-footer">
        <span>© {new Date().getFullYear()} {profile.name}</span>
        <span className="pf-footer-dim">built with react</span>
      </footer>
      {toast && <div className="pf-toast">{toast}</div>}
    </div>
  );
}

function SectionHeading({ eyebrow, label }) {
  return (
    <div className="pf-section-heading">
      <span className="pf-eyebrow">{eyebrow}</span>
      <h2>{label}</h2>
      <span className="pf-rule" />
    </div>
  );
}

/* ============================================================
   STYLES
   ============================================================ */

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Inter:wght@400;500;600;700&display=swap');

.pf-root {
  --bg: #0b0d10;
  --surface: #14171c;
  --surface-2: #1b1f26;
  --border: #262b33;
  --text: #e9e7dd;
  --text-muted: #8d93a0;
  --accent: #a8ff60;
  --accent-dim: rgba(168,255,96,0.12);
  --diff-remove: #f97171;

  background: var(--bg);
  color: var(--text);
  font-family: 'Inter', system-ui, sans-serif;
  min-height: 100vh;
  line-height: 1.5;
}

.pf-root * { box-sizing: border-box; }

.pf-mono { font-family: 'JetBrains Mono', ui-monospace, monospace; }

/* NAV */
.pf-nav {
  position: sticky;
  top: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 28px;
  background: rgba(11,13,16,0.85);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid var(--border);
  flex-wrap: wrap;
  gap: 10px;
}
.pf-nav-brand {
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 13px;
  color: var(--accent);
}
.pf-nav-tabs { display: flex; gap: 4px; flex-wrap: wrap; }
.pf-tab {
  font-family: 'JetBrains Mono', monospace;
  font-size: 12.5px;
  color: var(--text-muted);
  background: transparent;
  border: 1px solid transparent;
  padding: 6px 12px;
  border-radius: 6px 6px 0 0;
  cursor: pointer;
  transition: color 0.15s ease, background 0.15s ease;
}
.pf-tab:hover { color: var(--text); background: var(--surface); }
.pf-tab-active {
  color: var(--accent);
  background: var(--surface);
  border-color: var(--border);
  border-bottom-color: var(--surface);
}

/* HERO */
.pf-hero {
  padding: 64px 28px 40px;
  max-width: 760px;
  margin: 0 auto;
}
.pf-terminal {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0,0,0,0.35);
}
.pf-terminal-bar {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  background: var(--surface-2);
  border-bottom: 1px solid var(--border);
}
.pf-dot { width: 10px; height: 10px; border-radius: 50%; display: inline-block; }
.pf-dot-red { background: #ff5f57; }
.pf-dot-yellow { background: #febc2e; }
.pf-dot-green { background: #28c840; }
.pf-terminal-title {
  margin-left: 8px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
  color: var(--text-muted);
}
.pf-terminal-body {
  padding: 22px 20px 26px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 14px;
}
.pf-line { color: var(--text-muted); margin: 0 0 4px; }
.pf-prompt { color: var(--accent); margin-right: 8px; }
.pf-out {
  color: var(--text);
  margin: 0 0 16px 20px;
  overflow: hidden;
  white-space: normal;
}
.pf-cursor-line { margin-bottom: 0; }
.pf-cursor {
  display: inline-block;
  width: 8px;
  height: 15px;
  background: var(--accent);
  vertical-align: middle;
  margin-left: 2px;
}
@media (prefers-reduced-motion: no-preference) {
  .pf-cursor { animation: blink 1s step-end infinite; }
}
@keyframes blink { 50% { opacity: 0; } }

.pf-hero-actions {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-top: 20px;
}
.pf-btn {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 13px;
  color: var(--text);
  background: var(--surface);
  border: 1px solid var(--border);
  padding: 9px 14px;
  border-radius: 7px;
  text-decoration: none;
  transition: border-color 0.15s ease, transform 0.15s ease;
}
.pf-btn:hover { border-color: var(--accent); transform: translateY(-1px); }
.pf-btn-primary {
  background: var(--accent-dim);
  border-color: var(--accent);
  color: var(--accent);
}

/* SECTIONS */
.pf-section {
  max-width: 760px;
  margin: 0 auto;
  padding: 48px 28px;
}
.pf-section-heading {
  display: flex;
  align-items: baseline;
  gap: 12px;
  margin-bottom: 20px;
}
.pf-eyebrow {
  font-family: 'JetBrains Mono', monospace;
  color: var(--accent);
  font-size: 13px;
}
.pf-section-heading h2 {
  font-family: 'JetBrains Mono', monospace;
  font-size: 18px;
  font-weight: 700;
  margin: 0;
  color: var(--text);
}
.pf-rule { flex: 1; height: 1px; background: var(--border); }

.pf-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 24px 26px;
}
.pf-readme p { margin: 0 0 14px; color: var(--text); }
.pf-readme p:last-child { margin-bottom: 0; }

/* SKILLS / DIFF */
.pf-diff { font-family: 'JetBrains Mono', monospace; font-size: 13.5px; }
.pf-diff-group { margin-bottom: 16px; }
.pf-diff-group:last-child { margin-bottom: 0; }
.pf-diff-category { color: var(--text-muted); margin: 0 0 6px; }
.pf-diff-line { margin: 0 0 3px; color: var(--text); }
.pf-diff-plus { color: var(--accent); }

/* PROJECTS */
.pf-projects-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}
.pf-project-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 20px 20px 18px;
  display: flex;
  flex-direction: column;
  transition: border-color 0.15s ease, transform 0.15s ease;
}
.pf-project-card:hover { border-color: var(--accent); transform: translateY(-2px); }
.pf-project-head { display: flex; align-items: baseline; gap: 10px; margin-bottom: 8px; }
.pf-project-hash {
  font-family: 'JetBrains Mono', monospace;
  color: var(--accent);
  font-size: 12px;
}
.pf-project-head h3 { margin: 0; font-size: 16px; }
.pf-project-desc { color: var(--text-muted); font-size: 13.5px; margin: 0 0 14px; }
.pf-project-stack { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 12px; }
.pf-tag {
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  color: var(--text-muted);
  background: var(--surface-2);
  border: 1px solid var(--border);
  padding: 3px 8px;
  border-radius: 5px;
}
.pf-project-metric {
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
  color: var(--accent);
  margin: 0 0 14px;
}
.pf-project-links { display: flex; gap: 14px; margin-top: auto; }
.pf-project-links a {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 12.5px;
  color: var(--text);
  text-decoration: none;
  border-bottom: 1px solid var(--border);
}
.pf-project-links a:hover { color: var(--accent); border-color: var(--accent); }

.pf-project-link-disabled {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 12.5px;
  color: var(--text-muted);
  background: none;
  border: none;
  border-bottom: 1px solid var(--border);
  padding: 0;
  cursor: pointer;
  opacity: 0.55;
}
.pf-project-link-disabled:hover { opacity: 0.85; }
 
/* TOAST */
.pf-toast {
  position: fixed;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--surface-2);
  border: 1px solid var(--border);
  color: var(--text);
  font-family: 'JetBrains Mono', monospace;
  font-size: 13px;
  padding: 12px 18px;
  border-radius: 8px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.4);
  z-index: 50;
  display: flex;
  align-items: center;
  gap: 8px;
}
.pf-toast::before {
  content: "";
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--diff-remove);
  flex-shrink: 0;
}
@media (prefers-reduced-motion: no-preference) {
  .pf-toast { animation: toast-in 0.25s ease-out; }
}
@keyframes toast-in {
  from { opacity: 0; transform: translate(-50%, 10px); }
  to { opacity: 1; transform: translate(-50%, 0); }
}

/* CONTACT */
.pf-contact-card .pf-line { margin-bottom: 14px; }
.pf-contact-copy { color: var(--text-muted); font-size: 14px; margin: 0 0 20px; max-width: 52ch; }
.pf-contact-links {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px solid var(--border);
}

/* CONTACT FORM */
.pf-form { display: flex; flex-direction: column; gap: 14px; }
.pf-form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
.pf-form-field { display: flex; flex-direction: column; gap: 6px; }
.pf-form-field span {
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
  color: var(--accent);
}
.pf-form-field input,
.pf-form-field textarea {
  font-family: 'Inter', system-ui, sans-serif;
  font-size: 13.5px;
  color: var(--text);
  background: var(--surface-2);
  border: 1px solid var(--border);
  border-radius: 7px;
  padding: 10px 12px;
  resize: vertical;
  outline: none;
  transition: border-color 0.15s ease;
}
.pf-form-field input::placeholder,
.pf-form-field textarea::placeholder { color: #565c66; }
.pf-form-field input:focus,
.pf-form-field textarea:focus { border-color: var(--accent); }
.pf-form-submit { align-self: flex-start; cursor: pointer; }
.pf-form-submit:disabled { opacity: 0.6; cursor: not-allowed; }
.pf-form-hint {
  font-family: 'JetBrains Mono', monospace;
  font-size: 11.5px;
  color: var(--text-muted);
  margin: -4px 0 0;
}

@media (max-width: 560px) {
  .pf-form-row { grid-template-columns: 1fr; }
}

/* FOOTER */
.pf-footer {
  max-width: 760px;
  margin: 0 auto;
  padding: 24px 28px 48px;
  display: flex;
  justify-content: space-between;
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
  color: var(--text-muted);
}

/* RESPONSIVE */
@media (max-width: 640px) {
  .pf-projects-grid { grid-template-columns: 1fr; }
  .pf-nav { padding: 12px 16px; }
  .pf-hero { padding: 40px 16px 32px; }
  .pf-section { padding: 36px 16px; }
}
`;
