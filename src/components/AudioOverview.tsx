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

const BAR_COUNT = 40;

export default function AudioOverview() {
  const { language } = useLanguage();
  const [lang, setLang] = useState<Lang>(language === "es" ? "es" : "en");
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [frequencyData, setFrequencyData] = useState<number[]>(new Array(BAR_COUNT).fill(0));
  
  const audioRef = useRef<HTMLAudioElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  
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

  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  const initializeAudioContext = () => {
    if (!audioRef.current || audioContextRef.current) return;

    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    audioContextRef.current = new AudioContext();
    analyserRef.current = audioContextRef.current.createAnalyser();
    analyserRef.current.fftSize = 128;
    
    sourceRef.current = audioContextRef.current.createMediaElementSource(audioRef.current);
    sourceRef.current.connect(analyserRef.current);
    analyserRef.current.connect(audioContextRef.current.destination);
  };

  const analyzeAudio = () => {
    if (!analyserRef.current || !playing) return;

    const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
    analyserRef.current.getByteFrequencyData(dataArray);

    const step = Math.floor(dataArray.length / BAR_COUNT);
    const newFrequencyData: number[] = [];
    
    for (let i = 0; i < BAR_COUNT; i++) {
      const start = i * step;
      let sum = 0;
      for (let j = 0; j < step; j++) {
        sum += dataArray[start + j];
      }
      const average = sum / step;
      newFrequencyData.push(average / 255);
    }

    setFrequencyData(newFrequencyData);
    animationFrameRef.current = requestAnimationFrame(analyzeAudio);
  };

  useEffect(() => {
    if (playing) {
      if (!audioContextRef.current) {
        initializeAudioContext();
      }
      if (audioContextRef.current?.state === 'suspended') {
        audioContextRef.current.resume();
      }
      analyzeAudio();
    } else {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      setFrequencyData(new Array(BAR_COUNT).fill(0));
    }
  }, [playing]);

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
        className="absolute inset-0 -z-10 opacity-30 transition-all duration-700 ease-out"
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
          backgroundPosition: isHovering ? '10px -10px, -10px 10px, 0 0, 0 0' : '0 0, 0 0, 0 0, 0 0',
        }}
      />

      <div
        className="absolute inset-0 -z-10 opacity-25 transition-all duration-500 ease-out"
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
          transform: isHovering ? 'scale(1.02)' : 'scale(1)',
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

        <div className="flex items-end justify-center gap-1 h-16 opacity-70">
          {frequencyData.map((intensity, i) => {
            const baseHeight = 8;
            const maxHeight = 56;
            const pulseHeight = playing 
              ? baseHeight + (intensity * (maxHeight - baseHeight))
              : baseHeight + (Math.sin(i * 0.5) * 8);
            
            const activeBar = progress > 0 ? Math.floor((progress / 100) * BAR_COUNT) : -1;
            const isActive = i <= activeBar;
            const isNearActive = playing && Math.abs(i - activeBar) < 5;
            
            return (
              <div
                key={i}
                className="w-1.5 rounded-full transition-all duration-75 ease-out"
                style={{
                  height: `${pulseHeight}px`,
                  backgroundColor: isActive
                    ? "oklch(0.70 0.18 25)"
                    : isNearActive
                    ? "oklch(0.65 0.15 35)"
                    : "oklch(0.60 0.14 150 / 0.4)",
                  transform: playing && intensity > 0.6 ? 'scaleY(1.1)' : 'scaleY(1)',
                  boxShadow: playing && intensity > 0.7 
                    ? '0 0 8px oklch(0.70 0.18 25 / 0.4)' 
                    : 'none',
                }}
              />
            );
          })}
        </div>

        <div 
          className="w-full rounded-3xl bg-card border-2 border-border shadow-xl p-6 md:p-8 space-y-5 card-hover-effect"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <div className="flex items-center gap-4 flex-wrap md:flex-nowrap">
            <div className="relative flex-shrink-0">
              <div
                className="absolute inset-0 w-28 h-28 md:w-36 md:h-36 -translate-x-6 -translate-y-6 md:-translate-x-8 md:-translate-y-8"
                style={{
                  transform: playing ? `translate(-1.5rem, -1.5rem) rotate(${(currentTime * 30) % 360}deg)` : 'translate(-1.5rem, -1.5rem) rotate(0deg)',
                  transition: playing ? 'none' : 'transform 0.5s ease-out',
                }}
              >
                <svg
                  className="w-full h-full"
                  viewBox="0 0 200 200"
                >
                <defs>
                  <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="oklch(0.70 0.18 25)" stopOpacity="0.8" />
                    <stop offset="50%" stopColor="oklch(0.65 0.15 35)" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="oklch(0.60 0.14 150)" stopOpacity="0.4" />
                  </linearGradient>
                </defs>
                {Array.from({ length: 48 }).map((_, i) => {
                  const totalBars = 48;
                  const angle = (i / totalBars) * 360;
                  const baseRadius = 70;
                  const maxExtension = 25;
                  
                  const dataIndex = Math.floor((i / totalBars) * BAR_COUNT);
                  const intensity = frequencyData[dataIndex] || 0;
                  
                  const extension = playing 
                    ? intensity * maxExtension
                    : (Math.sin(i * 0.3 + Date.now() / 1000) * 3 + 3);
                  
                  const innerRadius = baseRadius;
                  const outerRadius = baseRadius + extension;
                  
                  const x1 = 100 + innerRadius * Math.cos((angle - 90) * Math.PI / 180);
                  const y1 = 100 + innerRadius * Math.sin((angle - 90) * Math.PI / 180);
                  const x2 = 100 + outerRadius * Math.cos((angle - 90) * Math.PI / 180);
                  const y2 = 100 + outerRadius * Math.sin((angle - 90) * Math.PI / 180);
                  
                  const activeAngle = (progress / 100) * 360;
                  const isActive = angle <= activeAngle;
                  
                  return (
                    <line
                      key={i}
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      stroke={isActive ? "url(#waveGradient)" : "oklch(0.88 0.01 60)"}
                      strokeWidth={playing ? "3" : "2"}
                      strokeLinecap="round"
                      className="transition-all duration-75"
                      style={{
                        opacity: playing && intensity > 0.5 ? 1 : 0.6,
                        filter: playing && intensity > 0.7 ? 'drop-shadow(0 0 4px oklch(0.70 0.18 25 / 0.6))' : 'none',
                      }}
                    />
                  );
                })}
              </svg>
              </div>
              
              <button
                onClick={togglePlay}
                disabled={!loaded}
                className={`
                  relative w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center
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
            </div>

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
