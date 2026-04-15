import { useEffect, useState, type CSSProperties } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip } from 'recharts';
import { BookOpen, Bot, CheckCircle2, ChevronRight, CirclePlay, Flame, GraduationCap, LayoutDashboard, Medal, Menu, School2, ShieldCheck, Sparkles, Trophy, X } from 'lucide-react';
import { Link, NavLink, Navigate, Route, Routes, useNavigate, useParams } from 'react-router-dom';
import { BADGES, ALL_CHAPTERS, LEADERBOARD, LESSONS, QUIZZES, UNITS, findChapter, findUnit, getNextChapter, getTotalChapters, getUnitCompletion } from './data/learning';
import { useLearningStore } from './store/useLearningStore';

const navItems = [
  { to: '/', label: 'Home', icon: GraduationCap },
  { to: '/course', label: 'Units', icon: BookOpen },
  { to: '/dashboard', label: 'Progress', icon: LayoutDashboard },
  { to: '/chat', label: 'Ask', icon: Bot },
  { to: '/certificate', label: 'Badge', icon: Medal },
];

const pageStyle: CSSProperties = {
  minHeight: '100vh',
  background:
    'radial-gradient(circle at 12% 8%, rgba(255, 192, 92, 0.34), transparent 22%), radial-gradient(circle at 88% 2%, rgba(65, 147, 255, 0.2), transparent 26%), radial-gradient(circle at 82% 86%, rgba(34, 197, 94, 0.14), transparent 18%), linear-gradient(180deg, #fffdf8 0%, #f4f8ff 100%)',
  color: '#0f172a',
};

const shellStyle: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: '312px minmax(0, 1fr)',
  minHeight: '100vh',
  position: 'relative',
  isolation: 'isolate',
};

const glassStyle: CSSProperties = {
  background: 'rgba(255, 255, 255, 0.72)',
  border: '1px solid rgba(148, 163, 184, 0.16)',
  boxShadow: '0 24px 80px rgba(15, 23, 42, 0.10)',
  backdropFilter: 'blur(20px)',
};

const panelStyle: CSSProperties = {
  ...glassStyle,
  borderRadius: '34px 18px 34px 18px',
  padding: 24,
};

const cardStyle: CSSProperties = {
  ...glassStyle,
  borderRadius: '22px 34px 22px 34px',
  padding: 20,
};

const buttonStyle: CSSProperties = {
  border: 'none',
  borderRadius: 18,
  padding: '12px 18px',
  color: '#fff',
  fontWeight: 700,
  cursor: 'pointer',
  transition: 'transform 160ms ease, box-shadow 160ms ease, opacity 160ms ease',
};

const navButtonBase: CSSProperties = {
  textDecoration: 'none',
  borderRadius: 999,
  padding: '14px 16px',
  display: 'flex',
  alignItems: 'center',
  gap: 12,
  border: '1px solid rgba(148,163,184,0.14)',
  color: '#0f172a',
  background: 'rgba(255,255,255,0.7)',
};

const mutedText = '#475569';
const softText = '#64748b';
const accentOrange = '#ff7a18';
const accentBlue = '#2563eb';
const accentTeal = '#14b8a6';
const accentGreen = '#22c55e';
const accentViolet = '#8b5cf6';
const accentRose = '#f43f5e';
const cardBorder = '1px solid rgba(148,163,184,0.16)';
const subtleShadow = '0 18px 50px rgba(15,23,42,0.08)';
const heroGlow = 'linear-gradient(135deg, rgba(255, 122, 24, 0.22), rgba(37, 99, 235, 0.16))';
const floatingBlob: CSSProperties = {
  position: 'absolute',
  inset: 'auto',
  pointerEvents: 'none',
  borderRadius: '42% 58% 39% 61% / 58% 44% 56% 42%',
  filter: 'blur(0px)',
  opacity: 0.95,
};
const sectionTitleStyle: CSSProperties = {
  margin: 0,
  color: '#0f172a',
  letterSpacing: '-0.03em',
};

function appCompletion(completed: string[]) {
  return Math.round((completed.length / getTotalChapters()) * 100);
}

function nextChapterForProgress(completed: string[]) {
  return getNextChapter(completed);
}

function ProgressRing({ value, size = 128, stroke = 12, label }: { value: number; size?: number; stroke?: number; label: string }) {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const dash = circumference - (value / 100) * circumference;

  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={size / 2} cy={size / 2} r={radius} stroke="rgba(148, 163, 184, 0.18)" strokeWidth={stroke} fill="none" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="url(#progress-gradient)"
          strokeWidth={stroke}
          strokeLinecap="round"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={dash}
        />
        <defs>
          <linearGradient id="progress-gradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={accentOrange} />
            <stop offset="100%" stopColor={accentBlue} />
          </linearGradient>
        </defs>
      </svg>
      <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', textAlign: 'center' }}>
        <div>
          <div style={{ fontSize: 28, fontWeight: 900, color: '#0f172a' }}>{value}%</div>
          <div style={{ fontSize: 12, color: softText }}>{label}</div>
        </div>
      </div>
    </div>
  );
}

function Shell() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const completed = useLearningStore((state) => state.completedChapterIds);
  const points = useLearningStore((state) => state.points);
  const streak = useLearningStore((state) => state.streak);
  const studentName = useLearningStore((state) => state.studentName);
  const completion = appCompletion(completed);

  return (
    <div style={pageStyle}>
      <div
        aria-hidden
        style={{
          position: 'fixed',
          inset: -120,
          pointerEvents: 'none',
          background:
            'radial-gradient(circle at 15% 20%, rgba(255, 195, 102, 0.26), transparent 18%), radial-gradient(circle at 75% 14%, rgba(72, 145, 255, 0.12), transparent 20%), radial-gradient(circle at 70% 78%, rgba(34, 197, 94, 0.08), transparent 18%)',
          filter: 'blur(12px)',
          zIndex: 0,
        }}
      />
      <div aria-hidden style={{ position: 'fixed', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
        <div style={{ ...floatingBlob, width: 420, height: 420, top: -120, right: -80, background: 'radial-gradient(circle at 30% 30%, rgba(255, 196, 92, 0.34), rgba(255, 255, 255, 0))' }} />
        <div style={{ ...floatingBlob, width: 320, height: 320, left: '-80px', top: '28%', background: 'radial-gradient(circle at 30% 30%, rgba(72, 145, 255, 0.18), rgba(255, 255, 255, 0))' }} />
        <div style={{ ...floatingBlob, width: 260, height: 260, right: '8%', bottom: '6%', background: 'radial-gradient(circle at 30% 30%, rgba(34, 197, 94, 0.12), rgba(255, 255, 255, 0))' }} />
      </div>
      <div style={shellStyle}>
        <aside
          style={{
            ...glassStyle,
            borderRight: '1px solid rgba(148,163,184,0.16)',
            padding: 24,
            position: 'sticky',
            top: 0,
            alignSelf: 'start',
            minHeight: '100vh',
            zIndex: 1,
            clipPath: 'polygon(0 0, 100% 0, 94% 100%, 0 100%)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
            <div>
              <div style={{ fontSize: 30, fontWeight: 900, letterSpacing: '-0.04em', color: '#0f172a' }}>Study Hub</div>
              <div style={{ color: softText, fontSize: 13 }}>Java made simple</div>
            </div>
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: 18,
                display: 'grid',
                placeItems: 'center',
                background: heroGlow,
                boxShadow: subtleShadow,
                fontSize: 26,
              }}
            >
              ☕
            </div>
          </div>

          <div style={{ ...cardStyle, marginBottom: 18, background: 'linear-gradient(135deg, rgba(255,255,255,0.9), rgba(255,240,225,0.88))', border: cardBorder, boxShadow: subtleShadow, clipPath: 'polygon(0 0, 100% 6%, 94% 100%, 0 94%)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ color: '#0f172a', fontWeight: 800 }}>{studentName}</div>
                <div style={{ fontSize: 12, color: softText }}>{streak}-day streak</div>
              </div>
              <Flame size={22} color={accentOrange} />
            </div>
            <div style={{ marginTop: 16, display: 'flex', gap: 12, alignItems: 'center' }}>
              <ProgressRing value={completion} size={84} stroke={8} label="progress" />
              <div>
                <div style={{ fontSize: 26, fontWeight: 900, color: '#0f172a' }}>{points}</div>
                <div style={{ color: softText, fontSize: 13 }}>Points earned</div>
              </div>
            </div>
          </div>

          <nav style={{ display: 'grid', gap: 10 }}>
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setMobileOpen(false)}
                  style={({ isActive }) => ({
                    ...navButtonBase,
                    background: isActive ? 'linear-gradient(135deg, rgba(255, 122, 24, 0.16), rgba(37, 99, 235, 0.10))' : 'rgba(255,255,255,0.72)',
                    boxShadow: isActive ? subtleShadow : 'none',
                    transform: isActive ? 'translateY(-1px)' : 'none',
                    clipPath: isActive ? 'polygon(0 0, 96% 0, 100% 50%, 96% 100%, 0 100%, 4% 50%)' : 'none',
                  })}
                >
                  <Icon size={18} />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </nav>

          <button
            onClick={() => {
              if (window.confirm('Reset all progress?')) {
                useLearningStore.getState().resetProgress();
              }
            }}
            style={{ ...buttonStyle, width: '100%', marginTop: 20, background: `linear-gradient(135deg, ${accentRose}, #fb7185)`, boxShadow: '0 14px 30px rgba(244, 63, 94, 0.22)' }}
          >
            Clear progress
          </button>
        </aside>

        <main style={{ padding: 20, minWidth: 0, position: 'relative', zIndex: 1 }}>
          <header
            style={{
              ...glassStyle,
              ...panelStyle,
              padding: 18,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 16,
              marginBottom: 20,
              background: 'rgba(255,255,255,0.76)',
              clipPath: 'polygon(0 8%, 98% 0, 100% 100%, 2% 100%)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <button onClick={() => setMobileOpen((prev) => !prev)} style={{ ...buttonStyle, padding: '10px 12px', background: 'linear-gradient(135deg, rgba(255,122,24,0.14), rgba(37,99,235,0.12))', color: '#0f172a', border: cardBorder }} aria-label="Toggle navigation">
                {mobileOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
              <div>
                <div style={{ fontSize: 12, color: softText }}>Study Hub</div>
                <div style={{ fontSize: 18, fontWeight: 800, color: '#0f172a' }}>Build Java skills with momentum</div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
              <div style={{ padding: '10px 14px', borderRadius: 999, background: 'rgba(255,122,24,0.12)', border: '1px solid rgba(255,122,24,0.18)', color: '#9a3412' }}>🔥 {streak} day run</div>
              <div style={{ padding: '10px 14px', borderRadius: 999, background: 'rgba(37,99,235,0.12)', border: '1px solid rgba(37,99,235,0.18)', color: '#1d4ed8' }}>⭐ {points} points</div>
            </div>
          </header>

          <AnimatePresence mode="wait">
            {mobileOpen ? (
              <motion.div
                key="mobile-nav"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                style={{ ...panelStyle, marginBottom: 18 }}
              >
                <div style={{ display: 'grid', gap: 10 }}>
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <NavLink key={item.to} to={item.to} onClick={() => setMobileOpen(false)} style={({ isActive }) => ({ ...navButtonBase, background: isActive ? 'linear-gradient(135deg, rgba(255,122,24,0.14), rgba(37,99,235,0.10))' : 'rgba(255,255,255,0.78)', color: '#0f172a' })}>
                        <Icon size={16} />
                        {item.label}
                      </NavLink>
                    );
                  })}
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>

          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/course" element={<CoursePage />} />
            <Route path="/learn/:unitId/:chapterId" element={<LessonPage />} />
            <Route path="/quiz/:chapterId" element={<QuizPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/certificate" element={<CertificatePage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

function PageTitle({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <div style={{ marginBottom: 18 }}>
      <div style={{ color: accentOrange, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', fontSize: 12 }}>{eyebrow}</div>
      <h1 style={{ margin: '10px 0 8px', fontSize: 'clamp(2rem, 4vw, 3.6rem)', lineHeight: 1, letterSpacing: '-0.05em', color: '#0f172a' }}>{title}</h1>
      <p style={{ margin: 0, maxWidth: 820, color: mutedText, fontSize: 16 }}>{description}</p>
    </div>
  );
}

function MetricCard({ label, value, icon: Icon, color }: { label: string; value: string; icon: typeof School2; color: string }) {
  return (
    <div style={{ ...cardStyle, minWidth: 0, border: cardBorder, boxShadow: subtleShadow, background: 'rgba(255,255,255,0.8)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
        <div>
          <div style={{ color: softText, fontSize: 13 }}>{label}</div>
          <div style={{ fontSize: 28, fontWeight: 900, marginTop: 4, color: '#0f172a' }}>{value}</div>
        </div>
        <div style={{ width: 46, height: 46, borderRadius: 16, display: 'grid', placeItems: 'center', background: `${color}18`, color, boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.65)' }}>
          <Icon size={22} />
        </div>
      </div>
    </div>
  );
}

function HomePage() {
  const completed = useLearningStore((state) => state.completedChapterIds);
  const points = useLearningStore((state) => state.points);
  const streak = useLearningStore((state) => state.streak);
  const nextChapter = nextChapterForProgress(completed);
  const completion = appCompletion(completed);
  const navigate = useNavigate();

  const unitCards = UNITS.map((unit) => {
    const progress = getUnitCompletion(completed, unit.id);
    return { ...unit, progress };
  });

  return (
    <div style={{ display: 'grid', gap: 20 }}>
      <motion.section initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} style={{ ...panelStyle, background: 'linear-gradient(135deg, rgba(255,255,255,0.88), rgba(255,244,229,0.92))', border: cardBorder, boxShadow: subtleShadow, clipPath: 'polygon(0 0, 100% 3%, 96% 100%, 0 97%)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.2fr) minmax(300px, 0.8fr)', gap: 20, alignItems: 'center' }}>
          <div>
            <PageTitle
              eyebrow="Byju's-style learning"
              title="Learn Java with quick wins, smart practice, and instant feedback."
              description="Study Hub turns the syllabus into a friendly learning lane with chapter cards, a helpful chat tutor, and a dashboard that shows every bit of progress."
            />
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 18 }}>
              <button onClick={() => navigate(`/learn/${nextChapter.unitId}/${nextChapter.id}`)} style={{ ...buttonStyle, background: `linear-gradient(135deg, ${accentOrange}, #ff9f43)`, boxShadow: '0 18px 35px rgba(255,122,24,0.28)' }}>
                Keep going <ChevronRight size={16} style={{ display: 'inline', verticalAlign: 'middle' }} />
              </button>
              <button onClick={() => navigate('/course')} style={{ ...buttonStyle, background: '#ffffff', border: cardBorder, color: '#0f172a', boxShadow: subtleShadow }}>
                Open units
              </button>
            </div>
          </div>
          <div style={{ display: 'grid', justifyItems: 'center', gap: 14 }}>
            <ProgressRing value={completion} label="path complete" />
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
              <div style={{ padding: '10px 14px', borderRadius: '999px 999px 999px 8px', background: 'rgba(255,122,24,0.12)', color: '#9a3412', border: '1px solid rgba(255,122,24,0.16)' }}>{completed.length}/{getTotalChapters()} finished</div>
              <div style={{ padding: '10px 14px', borderRadius: '999px 8px 999px 999px', background: 'rgba(34,197,94,0.12)', color: '#166534', border: '1px solid rgba(34,197,94,0.16)' }}>{streak} day run</div>
            </div>
          </div>
        </div>
      </motion.section>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 14 }}>
        <MetricCard label="Path" value={`${completion}%`} icon={School2} color={accentOrange} />
        <MetricCard label="Score" value={String(points)} icon={Sparkles} color={accentBlue} />
        <MetricCard label="Run" value={`${streak}d`} icon={Flame} color={accentTeal} />
      </div>

      <section style={{ ...panelStyle }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, marginBottom: 16 }}>
          <div>
            <div style={{ color: accentOrange, fontSize: 12, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Recommended next</div>
            <h2 style={{ ...sectionTitleStyle, marginTop: 6 }}>{nextChapter.title}</h2>
          </div>
            <button onClick={() => navigate(`/learn/${nextChapter.unitId}/${nextChapter.id}`)} style={{ ...buttonStyle, background: `linear-gradient(135deg, ${accentBlue}, #60a5fa)`, boxShadow: '0 16px 30px rgba(37,99,235,0.22)', clipPath: 'polygon(0 0, 100% 8%, 92% 100%, 0 92%)' }}>Start now</button>
        </div>
        <div style={{ color: mutedText, lineHeight: 1.7 }}>{nextChapter.summary}</div>
      </section>

      <section>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
          <h2 style={sectionTitleStyle}>Course units</h2>
          <Link to="/course" style={{ color: accentBlue, textDecoration: 'none', fontWeight: 700 }}>View all chapters</Link>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 14 }}>
          {unitCards.map((unit, index) => (
            <motion.button
              key={unit.id}
              whileHover={{ y: -6 }}
              onClick={() => navigate(`/learn/${unit.id}/${unit.chapters[0].id}`)}
              style={{ ...cardStyle, textAlign: 'left', border: `1px solid ${unit.color}24`, boxShadow: subtleShadow, background: 'rgba(255,255,255,0.86)', clipPath: index % 2 === 0 ? 'polygon(0 0, 100% 0, 96% 100%, 0 96%)' : 'polygon(4% 0, 100% 4%, 100% 100%, 0 96%)' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ fontSize: 26 }}>{unit.icon}</div>
                <div style={{ color: unit.color, fontWeight: 800 }}>Unit {index + 1}</div>
              </div>
              <h3 style={{ margin: '14px 0 8px', color: '#0f172a' }}>{unit.title}</h3>
              <p style={{ margin: 0, color: mutedText }}>{unit.chapters.length} chapters</p>
              <div style={{ marginTop: 14, height: 8, borderRadius: 999, background: 'rgba(148,163,184,0.16)' }}>
                <div style={{ width: `${unit.progress.percent}%`, height: '100%', borderRadius: 999, background: unit.color }} />
              </div>
              <div style={{ marginTop: 10, color: softText, fontSize: 13 }}>{unit.progress.done}/{unit.progress.total} completed</div>
            </motion.button>
          ))}
        </div>
      </section>
    </div>
  );
}

function CoursePage() {
  const completed = useLearningStore((state) => state.completedChapterIds);
  const navigate = useNavigate();

  return (
    <div style={{ display: 'grid', gap: 18 }}>
      <PageTitle eyebrow="Course map" title="A full Java route, split into easy-to-follow blocks." description="Everything is arranged as quick cards so you can hop between lessons, keep an eye on progress, and pick up the next step without friction." />
      <div style={{ display: 'grid', gap: 16 }}>
        {UNITS.map((unit) => {
          const progress = getUnitCompletion(completed, unit.id);
          return (
            <section key={unit.id} style={{ ...panelStyle, border: `1px solid ${unit.color}26`, background: 'rgba(255,255,255,0.82)', boxShadow: subtleShadow, clipPath: 'polygon(0 0, 100% 2%, 98% 100%, 0 98%)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, marginBottom: 14 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <div style={{ width: 56, height: 56, borderRadius: 18, display: 'grid', placeItems: 'center', background: `${unit.color}22`, fontSize: 28 }}>{unit.icon}</div>
                  <div>
                    <h2 style={{ margin: 0, color: '#0f172a' }}>{unit.title}</h2>
                    <div style={{ color: mutedText }}>{unit.chapters.length} lessons</div>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 26, fontWeight: 900, color: unit.color }}>{progress.percent}%</div>
                  <div style={{ color: softText }}>{progress.done}/{progress.total} done</div>
                </div>
              </div>
              <div style={{ height: 8, borderRadius: 999, background: 'rgba(148,163,184,0.16)', marginBottom: 16 }}>
                <div style={{ width: `${progress.percent}%`, height: '100%', borderRadius: 999, background: unit.color }} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 12 }}>
                {unit.chapters.map((chapterItem) => {
                  const done = completed.includes(chapterItem.id);
                  return (
                    <button
                      key={chapterItem.id}
                      onClick={() => navigate(`/learn/${unit.id}/${chapterItem.id}`)}
                      style={{ ...cardStyle, textAlign: 'left', border: done ? `1px solid ${unit.color}55` : cardBorder, background: 'rgba(255,255,255,0.88)', boxShadow: '0 14px 40px rgba(15,23,42,0.06)', clipPath: done ? 'polygon(0 0, 100% 0, 94% 100%, 0 94%)' : 'polygon(4% 0, 100% 4%, 96% 100%, 0 96%)' }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
                        <strong style={{ color: '#0f172a' }}>{chapterItem.title}</strong>
                        {done ? <CheckCircle2 size={18} color={unit.color} /> : <ChevronRight size={18} color="#94a3b8" />}
                      </div>
                      <p style={{ margin: '10px 0 0', color: mutedText }}>{chapterItem.summary}</p>
                    </button>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}

function LessonPage() {
  const { unitId, chapterId } = useParams();
  const navigate = useNavigate();
  const chapter = findChapter(chapterId);
  const unit = findUnit(unitId);
  const completed = useLearningStore((state) => state.completedChapterIds);
  const markChapterComplete = useLearningStore((state) => state.markChapterComplete);
  const unlockBadge = useLearningStore((state) => state.unlockBadge);
  const total = getTotalChapters();

  const isCompleted = completed.includes(chapterId ?? '');
  const next = chapter ? ALL_CHAPTERS[ALL_CHAPTERS.findIndex((item) => item.id === chapter.id) + 1] : null;

  useEffect(() => {
    if (!chapter || !unit) return;
    document.title = `${chapter.title} | Study Hub`;
  }, [chapter, unit]);

  if (!chapter || !unit) {
    return <Navigate to="/course" replace />;
  }

  const lesson = LESSONS[chapter.id];

  return (
    <div style={{ display: 'grid', gap: 18 }}>
      <PageTitle eyebrow={unit.title} title={lesson.title} description={lesson.summary} />

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.35fr) minmax(280px, 0.65fr)', gap: 16, alignItems: 'start' }}>
        <section style={{ ...panelStyle, display: 'grid', gap: 18, background: 'rgba(255,255,255,0.86)', boxShadow: subtleShadow, clipPath: 'polygon(0 0, 100% 1%, 97% 100%, 0 99%)' }}>
          {lesson.sections.map((section) => (
            <div key={section.heading}>
              <h3 style={{ margin: '0 0 8px', color: '#0f172a' }}>{section.heading}</h3>
              <p style={{ margin: 0, lineHeight: 1.75, color: mutedText }}>{section.body}</p>
            </div>
          ))}

          <div style={{ borderRadius: 20, padding: 18, background: 'linear-gradient(135deg, rgba(15,23,42,0.96), rgba(30,41,59,0.92))', border: '1px solid rgba(15,23,42,0.10)', color: '#f8fafc' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, marginBottom: 10 }}>
              <strong>{lesson.codeExample.title}</strong>
              <span style={{ color: '#7dd3fc', fontSize: 13 }}>Code example</span>
            </div>
            <pre style={{ margin: 0, overflowX: 'auto', color: '#cbd5e1', fontFamily: 'Fira Code, monospace', fontSize: 13, lineHeight: 1.7 }}>
              <code>{lesson.codeExample.code}</code>
            </pre>
            <p style={{ marginTop: 12, color: 'rgba(226,232,240,0.82)' }}>{lesson.codeExample.explanation}</p>
          </div>

          <div style={{ borderRadius: 20, overflow: 'hidden', border: cardBorder, background: '#fff' }}>
            <div style={{ padding: 14, background: 'linear-gradient(135deg, rgba(255,122,24,0.12), rgba(37,99,235,0.10))', display: 'flex', alignItems: 'center', gap: 10, color: '#0f172a' }}>
              <CirclePlay size={18} />
              <strong>{lesson.videoTitle}</strong>
            </div>
            <iframe title={lesson.videoTitle} src={lesson.videoUrl} width="100%" height="320" style={{ border: 0, display: 'block', background: '#000' }} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
          </div>
        </section>

        <aside style={{ ...panelStyle, position: 'sticky', top: 20, background: 'rgba(255,255,255,0.88)', boxShadow: subtleShadow, clipPath: 'polygon(0 0, 100% 8%, 92% 100%, 0 96%)' }}>
          <div style={{ color: accentOrange, fontWeight: 800, fontSize: 12, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Progress check</div>
          <h3 style={{ margin: '10px 0 6px', color: '#0f172a' }}>{chapter.title}</h3>
          <div style={{ color: mutedText }}>{chapter.summary}</div>
          <div style={{ margin: '16px 0' }}>
            <ProgressRing value={Math.round((completed.length / total) * 100)} label="overall path" size={118} stroke={10} />
          </div>
          <div style={{ display: 'grid', gap: 10 }}>
            <button
              onClick={() => {
                markChapterComplete(chapter.id);
                const totalAfter = useLearningStore.getState().completedChapterIds.length;
                if (totalAfter === 1) unlockBadge('starter');
                if (Math.round((totalAfter / total) * 100) >= 25) unlockBadge('momentum');
                if (totalAfter === total) unlockBadge('java-master');
              }}
              style={{ ...buttonStyle, background: isCompleted ? `linear-gradient(135deg, ${accentGreen}, #4ade80)` : `linear-gradient(135deg, ${accentOrange}, #ff9f43)`, boxShadow: '0 16px 30px rgba(255,122,24,0.22)' }}
            >
              {isCompleted ? 'Done' : 'Mark done'}
            </button>
            <button onClick={() => navigate(`/quiz/${chapter.id}`)} style={{ ...buttonStyle, background: `linear-gradient(135deg, ${accentBlue}, #60a5fa)`, boxShadow: '0 16px 30px rgba(37,99,235,0.20)' }}>
              Try quiz
            </button>
            {next ? (
              <button onClick={() => navigate(`/learn/${next.unitId}/${next.id}`)} style={{ ...buttonStyle, background: '#ffffff', color: '#0f172a', border: cardBorder, boxShadow: subtleShadow }}>
                Next up
              </button>
            ) : null}
          </div>
        </aside>
      </div>
    </div>
  );
}

function QuizPage() {
  const { chapterId } = useParams();
  const navigate = useNavigate();
  const chapter = findChapter(chapterId);
  const quiz = chapter ? QUIZZES[chapter.id] : [];
  const submitQuizScore = useLearningStore((state) => state.submitQuizScore);
  const unlockBadge = useLearningStore((state) => state.unlockBadge);
  const markChapterComplete = useLearningStore((state) => state.markChapterComplete);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  if (!chapter) {
    return <Navigate to="/course" replace />;
  }

  const maxScore = quiz.reduce((sum, question) => sum + question.points, 0);
  const score = quiz.reduce((sum, question) => {
    const value = answers[question.id] ?? '';
    const normalized = value.trim().toLowerCase();
    const correct = question.correctAnswer.trim().toLowerCase();
    const isCorrect = question.type === 'mcq' ? value === question.correctAnswer : normalized.includes(correct) || normalized.includes('class');
    return sum + (isCorrect ? question.points : 0);
  }, 0);

  const handleSubmit = () => {
    setSubmitted(true);
    submitQuizScore(chapter.id, score);
    if (score >= maxScore * 0.8) {
      unlockBadge('quiz-ace');
    }
    if (!useLearningStore.getState().completedChapterIds.includes(chapter.id)) {
      markChapterComplete(chapter.id);
    }
  };

  return (
    <div style={{ display: 'grid', gap: 18 }}>
      <PageTitle eyebrow="Practice round" title={`Check your grip on ${chapter.title}`} description="Answer a few quick prompts, see the result right away, and pick up a few more points as you go." />
      <section style={{ ...panelStyle, display: 'grid', gap: 14, background: 'rgba(255,255,255,0.86)', boxShadow: subtleShadow, clipPath: 'polygon(0 0, 100% 2%, 98% 100%, 0 98%)' }}>
        {quiz.map((question, index) => (
          <div key={question.id} style={{ padding: 18, borderRadius: 20, background: 'rgba(255,255,255,0.9)', border: cardBorder, boxShadow: '0 10px 24px rgba(15,23,42,0.04)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
              <strong style={{ color: '#0f172a' }}>Prompt {index + 1}</strong>
              <span style={{ color: accentBlue }}>{question.points} pts</span>
            </div>
            <p style={{ color: mutedText, lineHeight: 1.7 }}>{question.prompt}</p>
            {question.type === 'mcq' ? (
              <div style={{ display: 'grid', gap: 10 }}>
                {question.options?.map((option) => {
                  const selected = answers[question.id] === option;
                  const isCorrect = submitted && option === question.correctAnswer;
                  return (
                    <button
                      key={option}
                      onClick={() => setAnswers((prev) => ({ ...prev, [question.id]: option }))}
                      style={{
                        ...buttonStyle,
                        textAlign: 'left',
                        background: selected ? 'linear-gradient(135deg, rgba(255,122,24,0.16), rgba(37,99,235,0.10))' : '#ffffff',
                        color: '#0f172a',
                        border: isCorrect ? `1px solid ${accentGreen}66` : cardBorder,
                        boxShadow: selected ? '0 12px 24px rgba(255,122,24,0.10)' : 'none',
                      }}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
            ) : (
              <textarea
                value={answers[question.id] ?? question.starterCode ?? ''}
                onChange={(event) => setAnswers((prev) => ({ ...prev, [question.id]: event.target.value }))}
                rows={7}
                style={{ width: '100%', borderRadius: 18, border: cardBorder, background: '#fff', color: '#0f172a', padding: 16, fontFamily: 'Fira Code, monospace', boxShadow: '0 10px 24px rgba(15,23,42,0.04)' }}
              />
            )}
            {submitted ? <div style={{ marginTop: 12, color: accentGreen }}>{question.explanation}</div> : null}
          </div>
        ))}

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, flexWrap: 'wrap', paddingTop: 6 }}>
          <div>
            <div style={{ color: softText, fontSize: 13 }}>Quiz score</div>
            <div style={{ fontSize: 30, fontWeight: 900, color: '#0f172a' }}>{score} / {maxScore}</div>
          </div>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <button onClick={() => navigate(`/learn/${chapter.unitId}/${chapter.id}`)} style={{ ...buttonStyle, background: '#ffffff', color: '#0f172a', border: cardBorder, boxShadow: subtleShadow }}>Back to lesson</button>
            <button onClick={handleSubmit} style={{ ...buttonStyle, background: `linear-gradient(135deg, ${accentBlue}, #60a5fa)`, boxShadow: '0 16px 30px rgba(37,99,235,0.20)' }}>Check answers</button>
          </div>
        </div>
      </section>
    </div>
  );
}

function DashboardPage() {
  const completed = useLearningStore((state) => state.completedChapterIds);
  const points = useLearningStore((state) => state.points);
  const streak = useLearningStore((state) => state.streak);
  const badges = useLearningStore((state) => state.badges);
  const completion = appCompletion(completed);

  const chartData = [
    { day: 'Mon', value: 4 },
    { day: 'Tue', value: 7 },
    { day: 'Wed', value: 8 },
    { day: 'Thu', value: 12 },
    { day: 'Fri', value: 10 },
    { day: 'Sat', value: 15 },
    { day: 'Sun', value: completed.length },
  ];

  const unitBars = UNITS.map((unit) => ({
    ...unit,
    progress: getUnitCompletion(completed, unit.id),
  }));

  return (
    <div style={{ display: 'grid', gap: 18 }}>
      <PageTitle eyebrow="Progress board" title="See your streak, score, badges, and course movement at a glance." description="This board keeps the useful stuff in one calm place so you can track the pace without digging around." />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: 14 }}>
        <MetricCard label="Path" value={`${completion}%`} icon={ShieldCheck} color={accentOrange} />
        <MetricCard label="Score" value={String(points)} icon={Sparkles} color={accentBlue} />
        <MetricCard label="Run" value={`${streak}d`} icon={Flame} color={accentTeal} />
        <MetricCard label="Badges" value={String(badges.length)} icon={Trophy} color={accentViolet} />
      </div>

      <section style={{ ...panelStyle, background: 'rgba(255,255,255,0.86)', boxShadow: subtleShadow, clipPath: 'polygon(0 0, 100% 3%, 96% 100%, 0 97%)' }}>
        <h2 style={sectionTitleStyle}>Momentum trend</h2>
        <div style={{ width: '100%', height: 320 }}>
          <ResponsiveContainer>
            <LineChart data={chartData}>
              <CartesianGrid stroke="rgba(148,163,184,0.12)" strokeDasharray="3 3" />
              <XAxis dataKey="day" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip contentStyle={{ background: '#ffffff', border: cardBorder, borderRadius: 16, boxShadow: subtleShadow }} />
              <Line type="monotone" dataKey="value" stroke={accentOrange} strokeWidth={3} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.1fr) minmax(0, 0.9fr)', gap: 16 }}>
        <section style={{ ...panelStyle, background: 'rgba(255,255,255,0.86)', boxShadow: subtleShadow, clipPath: 'polygon(0 0, 100% 1%, 99% 100%, 0 98%)' }}>
          <h2 style={sectionTitleStyle}>Unit status</h2>
          <div style={{ display: 'grid', gap: 12 }}>
            {unitBars.map((unit) => (
              <div key={unit.id} style={{ display: 'grid', gap: 8 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#0f172a' }}>
                  <span>{unit.title}</span>
                  <span>{unit.progress.percent}%</span>
                </div>
                <div style={{ height: 10, borderRadius: 999, background: 'rgba(148,163,184,0.16)' }}>
                  <div style={{ width: `${unit.progress.percent}%`, height: '100%', borderRadius: 999, background: unit.color }} />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section style={{ ...panelStyle, background: 'rgba(255,255,255,0.86)', boxShadow: subtleShadow, clipPath: 'polygon(0 0, 100% 4%, 96% 100%, 0 95%)' }}>
          <h2 style={sectionTitleStyle}>Badges and ranking</h2>
          <div style={{ display: 'grid', gap: 10, marginBottom: 18 }}>
            {BADGES.map((badge) => {
              const earned = badges.includes(badge.id);
              return (
                <div key={badge.id} style={{ padding: 14, borderRadius: 18, background: earned ? 'linear-gradient(135deg, rgba(34,197,94,0.12), rgba(255,255,255,0.92))' : '#ffffff', border: cardBorder, boxShadow: '0 10px 24px rgba(15,23,42,0.04)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ fontSize: 22 }}>{badge.icon}</div>
                    <div>
                      <div style={{ color: '#0f172a', fontWeight: 800 }}>{badge.title}</div>
                      <div style={{ color: mutedText, fontSize: 13 }}>{badge.description}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          {LEADERBOARD.map((entry, index) => (
            <div key={entry.name} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderTop: index === 0 ? 'none' : '1px solid rgba(148,163,184,0.10)' }}>
              <span style={{ color: entry.name === 'You' ? accentOrange : '#0f172a' }}>{index + 1}. {entry.name}</span>
              <span style={{ color: softText }}>{entry.points} pts</span>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}

function ChatPage() {
  const [messages, setMessages] = useState<{ role: 'assistant' | 'user'; text: string }[]>([
    { role: 'assistant', text: 'Ask me anything about Java, and I’ll turn it into a simple, exam-ready explanation.' },
  ]);
  const [text, setText] = useState('');

  const prompts = ['Explain OOP simply', 'What is JVM?', 'Show JDBC quickly', 'How does try-catch work?'];

  const respond = (prompt: string) => {
    const lower = prompt.toLowerCase();
    if (lower.includes('jvm')) return 'The JVM runs Java bytecode, which is why Java can stay portable across systems.';
    if (lower.includes('jdbc')) return 'JDBC is the bridge between Java and a database. Open a connection, run a query, and read the result set.';
    if (lower.includes('try') || lower.includes('catch')) return 'Use try for the risky line, catch for the recovery, and finally for cleanup.';
    if (lower.includes('oop')) return 'OOP treats software as objects. The four pillars are encapsulation, abstraction, inheritance, and polymorphism.';
    return 'Split it into purpose, syntax, and one example. That usually makes the idea click faster.';
  };

  const send = (value: string) => {
    const clean = value.trim();
    if (!clean) return;
    setMessages((current) => [...current, { role: 'user', text: clean }, { role: 'assistant', text: respond(clean) }]);
    setText('');
  };

  return (
    <div style={{ display: 'grid', gap: 18 }}>
      <PageTitle eyebrow="Chat buddy" title="Ask a question and get a clear Java answer fast." description="Use a prompt chip or type your own doubt. The helper keeps the reply short, useful, and easy to scan." />
      <section style={{ ...panelStyle, minHeight: 620, display: 'grid', gridTemplateRows: '1fr auto', gap: 16, background: 'rgba(255,255,255,0.88)', boxShadow: subtleShadow }}>
        <div style={{ display: 'grid', gap: 12, alignContent: 'start' }}>
          {messages.map((message, index) => (
            <div key={index} style={{ justifySelf: message.role === 'user' ? 'end' : 'start', maxWidth: '78%' }}>
              <div style={{ padding: '14px 16px', borderRadius: 18, background: message.role === 'user' ? 'linear-gradient(135deg, rgba(255,122,24,0.16), rgba(37,99,235,0.08))' : '#ffffff', border: cardBorder, color: '#0f172a', lineHeight: 1.7, boxShadow: '0 10px 24px rgba(15,23,42,0.04)' }}>
                {message.text}
              </div>
            </div>
          ))}
        </div>
        <div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 12 }}>
            {prompts.map((prompt) => (
              <button key={prompt} onClick={() => send(prompt)} style={{ ...buttonStyle, background: '#ffffff', color: '#0f172a', border: cardBorder, boxShadow: '0 8px 18px rgba(15,23,42,0.04)' }}>{prompt}</button>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <input value={text} onChange={(event) => setText(event.target.value)} onKeyDown={(event) => { if (event.key === 'Enter') send(text); }} placeholder="Ask a Java question..." style={{ flex: 1, padding: '14px 16px', borderRadius: 18, border: cardBorder, background: '#ffffff', color: '#0f172a', boxShadow: '0 8px 18px rgba(15,23,42,0.04)' }} />
            <button onClick={() => send(text)} style={{ ...buttonStyle, background: `linear-gradient(135deg, ${accentOrange}, #ff9f43)`, boxShadow: '0 16px 30px rgba(255,122,24,0.22)' }}>Send</button>
          </div>
        </div>
      </section>
    </div>
  );
}

function CertificatePage() {
  const studentName = useLearningStore((state) => state.studentName);
  const points = useLearningStore((state) => state.points);
  const completed = useLearningStore((state) => state.completedChapterIds);
  const setStudentName = useLearningStore((state) => state.setStudentName);

  return (
    <div style={{ display: 'grid', gap: 18 }}>
      <PageTitle eyebrow="Completion card" title="Show off the Java path you finished." description="This shareable card reflects your progress, points, and the chapters you’ve already nailed." />
      <section style={{ ...panelStyle, display: 'grid', gap: 16, background: 'rgba(255,255,255,0.88)', boxShadow: subtleShadow, clipPath: 'polygon(0 0, 100% 0, 97% 100%, 0 97%)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
          <div>
            <div style={{ color: softText, fontSize: 13 }}>Learner name</div>
            <input value={studentName} onChange={(event) => setStudentName(event.target.value)} style={{ marginTop: 6, padding: '12px 14px', borderRadius: 14, border: cardBorder, background: '#ffffff', color: '#0f172a', boxShadow: '0 10px 24px rgba(15,23,42,0.04)' }} />
          </div>
          <div style={{ alignSelf: 'end', color: accentOrange, fontWeight: 800 }}>Study Hub finish card</div>
        </div>
        <div style={{ padding: 28, borderRadius: '40px 16px 40px 16px', background: 'linear-gradient(135deg, rgba(255, 248, 240, 1), rgba(232, 243, 255, 0.96))', border: cardBorder, textAlign: 'center', boxShadow: subtleShadow, clipPath: 'polygon(0 0, 100% 6%, 96% 100%, 0 94%)' }}>
          <div style={{ fontSize: 14, letterSpacing: '0.18em', color: softText, textTransform: 'uppercase' }}>Finish card</div>
          <h2 style={{ margin: '16px 0 8px', fontSize: 'clamp(2rem, 6vw, 4rem)', color: '#0f172a' }}>{studentName || 'Study Hub Learner'}</h2>
          <p style={{ margin: '0 auto', maxWidth: 720, color: mutedText, lineHeight: 1.8 }}>
            has wrapped up the Java learning journey on Study Hub, earned {points} points, and finished {completed.length} lessons with steady momentum.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 14, flexWrap: 'wrap', marginTop: 20 }}>
            <div style={{ padding: '12px 16px', borderRadius: 999, background: 'rgba(255,255,255,0.92)', border: cardBorder, color: '#0f172a' }}>Java path</div>
            <div style={{ padding: '12px 16px', borderRadius: 999, background: 'rgba(255,255,255,0.92)', border: cardBorder, color: '#0f172a' }}>{points} points</div>
            <div style={{ padding: '12px 16px', borderRadius: 999, background: 'rgba(255,255,255,0.92)', border: cardBorder, color: '#0f172a' }}>{appCompletion(completed)}% done</div>
          </div>
        </div>
        <button style={{ ...buttonStyle, background: `linear-gradient(135deg, ${accentBlue}, #60a5fa)`, width: 'fit-content', boxShadow: '0 16px 30px rgba(37,99,235,0.20)' }} onClick={() => window.print()}>
          Save / print card
        </button>
      </section>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/*" element={<Shell />} />
    </Routes>
  );
}
