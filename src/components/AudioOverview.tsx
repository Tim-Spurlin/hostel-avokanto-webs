import { useState, useRef, useEffect } from "react";

const TRACKS = {
  es: {
    label: "Español",
    flag: "🇺🇾",
    url: "https://www.dropbox.com/scl/fi/bx4u0vwd43ozxfmx08005/Avokanto_el_refugio_humano_de_Montevideo.m4a?rlkey=qa5dd44fa776cqu0wicr4mus8&st=t7sjkbdf&raw=1",
    title: "El refugio humano de Montevideo",
    subtitle: "Descubrí la historia y el alma de Avokanto",
    cta: "Escuchá nuestra historia",
  },
  en: {
    label: "English",
    flag: "🇬🇧",
    url: "https://www.dropbox.com/scl/fi/1o56qu05xaljq7rsuq8le/Why_travelers_love_and_hate_Hostel_Avokanto.m4a?rlkey=hche05v19ta5i82ecm0kajp9x&st=dcdm9sqe&raw=1",
    title: "Why travelers love Avokanto",
    subtitle: "The honest story behind the hostel",
    cta: "Listen to our story",
  },
};

type Lang = keyof typeof TRACKS;

export default function AudioOverview() {
  const [lang, setLang] = useState<Lang>("es");
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const track = TRACKS[lang];

  useEffect(() => {
    setPlaying(false);
    setProgress(0);
    setCurrentTime(0);
    setDuration(0);
    setLoaded(false);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.load();
    }
  }, [lang]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play();
      setPlaying(true);
    }
  };

  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    if (!audio) return;
    setCurrentTime(audio.currentTime);
    setProgress((audio.currentTime / audio.duration) * 100 || 0);
  };

  const handleLoaded = () => {
    setDuration(audioRef.current?.duration ?? 0);
    setLoaded(true);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    if (!audio || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    audio.currentTime = ratio * duration;
  };

  const handleEnded = () => {
    setPlaying(false);
    setProgress(0);
    setCurrentTime(0);
    if (audioRef.current) audioRef.current.currentTime = 0;
  };

  const fmt = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  const switchLang = (l: Lang) => {
    setLang(l);
    setShowDropdown(false);
  };

  return (
    <section className="relative overflow-hidden">
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(135deg, #1a0e0a 0%, #2d1810 40%, #1e2d1a 100%)",
        }}
      />
      <div
        className="absolute inset-0 -z-10 opacity-20"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundSize: "200px",
        }}
      />

      <div className="max-w-2xl mx-auto px-6 py-14 flex flex-col items-center gap-6">

        <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm">
          <span className="text-[10px] uppercase tracking-widest text-white/60 font-semibold">
            Audio Overview
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#e07b5a] animate-pulse" />
        </div>

        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold text-white leading-tight">
            {track.title}
          </h2>
          <p className="text-white/50 text-sm">{track.subtitle}</p>
        </div>

        <div className="flex items-end gap-[3px] h-10 opacity-40">
          {Array.from({ length: 32 }).map((_, i) => {
            const heights = [
              6,10,18,28,22,14,30,20,8,16,26,34,24,12,20,30,
              18,10,24,32,20,14,28,16,8,22,30,18,12,26,20,10,
            ];
            const activeBar =
              progress > 0 ? Math.floor((progress / 100) * 32) : -1;
            return (
              <div
                key={i}
                className="w-1 rounded-full transition-colors duration-300"
                style={{
                  height: `${heights[i]}px`,
                  backgroundColor:
                    i <= activeBar
                      ? "#e07b5a"
                      : playing && Math.abs(i - activeBar) < 3
                      ? "#f0a080"
                      : "rgba(255,255,255,0.3)",
                }}
              />
            );
          })}
        </div>

        <div className="w-full rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 p-5 space-y-4">

          <div className="flex items-center gap-4">
            <button
              onClick={togglePlay}
              disabled={!loaded}
              className={`
                w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0
                transition-all duration-200 shadow-lg
                ${loaded
                  ? "bg-[#e07b5a] hover:bg-[#c8614a] hover:scale-105 active:scale-95"
                  : "bg-white/10 cursor-not-allowed"
                }
              `}
              aria-label={playing ? "Pause" : "Play"}
            >
              {!loaded ? (
                <svg className="w-5 h-5 animate-spin text-white" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                </svg>
              ) : playing ? (
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="6" y="4" width="4" height="16" rx="1"/>
                  <rect x="14" y="4" width="4" height="16" rx="1"/>
                </svg>
              ) : (
                <svg className="w-5 h-5 text-white ml-0.5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5.14v14l11-7-11-7z"/>
                </svg>
              )}
            </button>

            <div className="flex-1 min-w-0">
              <p className="text-white font-semibold text-sm truncate">
                {track.cta}
              </p>
              <p className="text-white/40 text-xs mt-0.5">
                {loaded
                  ? `${fmt(currentTime)} / ${fmt(duration)}`
                  : "Loading audio…"}
              </p>
            </div>

            <div className="relative">
              <button
                onClick={() => setShowDropdown((v) => !v)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white text-xs font-medium transition-colors"
              >
                <span>{track.flag}</span>
                <span>{track.label}</span>
                <svg
                  className={`w-3 h-3 transition-transform ${showDropdown ? "rotate-180" : ""}`}
                  viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                >
                  <path d="M6 9l6 6 6-6"/>
                </svg>
              </button>

              {showDropdown && (
                <div className="absolute right-0 top-full mt-2 w-36 rounded-xl bg-[#1a0e0a] border border-white/15 shadow-2xl overflow-hidden z-50">
                  {(Object.keys(TRACKS) as Lang[]).map((l) => (
                    <button
                      key={l}
                      onClick={() => switchLang(l)}
                      className={`
                        w-full flex items-center gap-2 px-4 py-2.5 text-sm transition-colors
                        ${lang === l
                          ? "bg-[#e07b5a]/20 text-[#e07b5a] font-semibold"
                          : "text-white/70 hover:bg-white/10 hover:text-white"
                        }
                      `}
                    >
                      <span>{TRACKS[l].flag}</span>
                      <span>{TRACKS[l].label}</span>
                      {lang === l && (
                        <svg className="w-3 h-3 ml-auto" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                        </svg>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div
            className="relative h-1.5 rounded-full bg-white/10 cursor-pointer group"
            onClick={handleSeek}
          >
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#e07b5a] to-[#f0a060] transition-all duration-100"
              style={{ width: `${progress}%` }}
            />
            <div
              className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ left: `calc(${progress}% - 6px)` }}
            />
          </div>
        </div>

        <p className="text-white/30 text-xs text-center max-w-xs leading-relaxed">
          🎙️ A personal audio guide to Avokanto — its history, philosophy, and why it exists in Parque Rodó.
        </p>
      </div>

      <audio
        ref={audioRef}
        src={track.url}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoaded}
        onEnded={handleEnded}
        preload="metadata"
      />
    </section>
  );
}
