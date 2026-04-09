import { useState, useRef, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

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
  const { language } = useLanguage();
  const [lang, setLang] = useState<Lang>(language === "es" ? "es" : "en");
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const track = TRACKS[lang];

  useEffect(() => {
    setLang(language === "es" ? "es" : "en");
  }, [language]);

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
    <section className="relative overflow-hidden py-20 md:py-24">
      <div
        className="absolute inset-0 -z-10"
        style={{
          background: "linear-gradient(135deg, oklch(0.98 0.015 55) 0%, oklch(0.96 0.025 50) 50%, oklch(0.94 0.035 45) 100%)",
        }}
      />
      
      <div
        className="absolute inset-0 -z-10 opacity-30"
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              45deg,
              transparent,
              transparent 35px,
              oklch(0.70 0.18 25 / 0.08) 35px,
              oklch(0.70 0.18 25 / 0.08) 70px
            ),
            repeating-linear-gradient(
              -45deg,
              transparent,
              transparent 35px,
              oklch(0.60 0.14 150 / 0.06) 35px,
              oklch(0.60 0.14 150 / 0.06) 70px
            ),
            radial-gradient(
              circle at 20% 30%,
              oklch(0.70 0.18 25 / 0.15) 0%,
              transparent 50%
            ),
            radial-gradient(
              circle at 80% 70%,
              oklch(0.55 0.12 200 / 0.12) 0%,
              transparent 50%
            )
          `,
          backgroundSize: "100% 100%, 100% 100%, 100% 100%, 100% 100%",
        }}
      />

      <div
        className="absolute inset-0 -z-10 opacity-25"
        style={{
          backgroundImage: `
            repeating-radial-gradient(
              circle at 50% 50%,
              transparent 0px,
              oklch(0.65 0.15 35 / 0.08) 2px,
              transparent 4px,
              transparent 40px
            )
          `,
        }}
      />

      <div className="max-w-3xl mx-auto px-6 flex flex-col items-center gap-8">
        <div className="flex items-center gap-2 px-5 py-2 rounded-full border-2 border-accent/30 bg-card shadow-md">
          <span className="text-[11px] uppercase tracking-widest text-muted-foreground font-semibold">
            Audio Overview
          </span>
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
        </div>

        <div className="text-center space-y-3">
          <h2 className="text-4xl md:text-5xl font-semibold text-foreground leading-tight">
            {track.title}
          </h2>
          <p className="text-muted-foreground text-base md:text-lg">{track.subtitle}</p>
        </div>

        <div className="flex items-end gap-1 h-14 opacity-60">
          {Array.from({ length: 40 }).map((_, i) => {
            const heights = [
              8,12,20,32,28,18,36,24,10,20,30,40,28,16,24,36,
              22,14,28,38,24,18,32,20,12,26,36,22,16,30,24,14,
              10,18,26,34,20,12,28,16,
            ];
            const activeBar =
              progress > 0 ? Math.floor((progress / 100) * 40) : -1;
            return (
              <div
                key={i}
                className="w-1.5 rounded-full transition-all duration-300"
                style={{
                  height: `${heights[i]}px`,
                  backgroundColor:
                    i <= activeBar
                      ? "oklch(0.70 0.18 25)"
                      : playing && Math.abs(i - activeBar) < 4
                      ? "oklch(0.65 0.15 35)"
                      : "oklch(0.60 0.14 150 / 0.4)",
                }}
              />
            );
          })}
        </div>

        <div className="w-full rounded-3xl bg-card border-2 border-border shadow-xl p-6 md:p-8 space-y-5 card-hover-effect">
          <div className="flex items-center gap-4 flex-wrap md:flex-nowrap">
            <button
              onClick={togglePlay}
              disabled={!loaded}
              className={`
                w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center flex-shrink-0
                transition-all duration-300 shadow-lg
                ${loaded
                  ? "bg-primary hover:bg-accent hover:scale-105 active:scale-95"
                  : "bg-muted cursor-not-allowed"
                }
              `}
              aria-label={playing ? "Pause" : "Play"}
            >
              {!loaded ? (
                <svg className="w-6 h-6 md:w-7 md:h-7 animate-spin text-primary-foreground" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                </svg>
              ) : playing ? (
                <svg className="w-6 h-6 md:w-7 md:h-7 text-primary-foreground" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="6" y="4" width="4" height="16" rx="1"/>
                  <rect x="14" y="4" width="4" height="16" rx="1"/>
                </svg>
              ) : (
                <svg className="w-6 h-6 md:w-7 md:h-7 text-primary-foreground ml-1" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5.14v14l11-7-11-7z"/>
                </svg>
              )}
            </button>

            <div className="flex-1 min-w-0">
              <p className="text-foreground font-semibold text-base md:text-lg truncate">
                {track.cta}
              </p>
              <p className="text-muted-foreground text-sm md:text-base mt-1">
                {loaded
                  ? `${fmt(currentTime)} / ${fmt(duration)}`
                  : "Loading audio…"}
              </p>
            </div>

            <div className="relative">
              <button
                onClick={() => setShowDropdown((v) => !v)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-secondary hover:bg-accent/10 border-2 border-border text-foreground text-sm font-medium transition-all hover:scale-105 active:scale-95 shadow-sm"
              >
                <span className="text-lg">{track.flag}</span>
                <span>{track.label}</span>
                <svg
                  className={`w-4 h-4 transition-transform ${showDropdown ? "rotate-180" : ""}`}
                  viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                >
                  <path d="M6 9l6 6 6-6"/>
                </svg>
              </button>

              {showDropdown && (
                <div className="absolute right-0 top-full mt-2 w-44 rounded-2xl bg-card border-2 border-border shadow-2xl overflow-hidden z-50">
                  {(Object.keys(TRACKS) as Lang[]).map((l) => (
                    <button
                      key={l}
                      onClick={() => switchLang(l)}
                      className={`
                        w-full flex items-center gap-3 px-5 py-3 text-sm transition-colors
                        ${lang === l
                          ? "bg-accent/20 text-accent font-semibold"
                          : "text-foreground hover:bg-muted"
                        }
                      `}
                    >
                      <span className="text-lg">{TRACKS[l].flag}</span>
                      <span>{TRACKS[l].label}</span>
                      {lang === l && (
                        <svg className="w-4 h-4 ml-auto" viewBox="0 0 24 24" fill="currentColor">
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
            className="relative h-2.5 rounded-full bg-muted cursor-pointer group overflow-hidden"
            onClick={handleSeek}
          >
            <div
              className="h-full rounded-full bg-gradient-to-r from-primary via-accent to-primary transition-all duration-100 shadow-sm"
              style={{ width: `${progress}%` }}
            />
            <div
              className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-accent border-2 border-card shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ left: `calc(${progress}% - 8px)` }}
            />
          </div>
        </div>

        <p className="text-muted-foreground text-sm md:text-base text-center max-w-lg leading-relaxed">
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
