import { useState, useEffect } from "react";

const HeroSection = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [paused, setPaused] = useState(false);
    const [progressPct, setProgressPct] = useState(0);
    const SLIDE_DURATION_MS = 5000;

    const slides = [
        { title: "REDEFINE YOUR STYLE", subtitle: "Where comfort meets confidence", cta: "SHOP NOW" },
        { title: "NEW COLLECTION", subtitle: "Elevated essentials for every moment", cta: "EXPLORE" },
        { title: "BE AUTHENTIC", subtitle: "Wear what defines you", cta: "DISCOVER" },
    ];

    const slideImages = [
        // fashion & apparel oriented, safe placeholders with graceful fallbacks elsewhere
        "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=1600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=1600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1516826957135-700dedea698c?q=80&w=1600&auto=format&fit=crop",
    ];

    useEffect(() => {
        if (paused) return;
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, SLIDE_DURATION_MS);
        return () => clearInterval(timer);
    }, [slides.length, paused, SLIDE_DURATION_MS]);

    useEffect(() => {
        if (paused) return;
        let rafId = 0;
        let start = performance.now();
        const animate = (now: number) => {
            const elapsed = (now - start) % SLIDE_DURATION_MS;
            setProgressPct(Math.min(100, (elapsed / SLIDE_DURATION_MS) * 100));
            rafId = requestAnimationFrame(animate);
        };
        rafId = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(rafId);
    }, [paused, currentSlide, SLIDE_DURATION_MS]);

    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === "ArrowRight") setCurrentSlide((p) => (p + 1) % slides.length);
            if (e.key === "ArrowLeft") setCurrentSlide((p) => (p - 1 + slides.length) % slides.length);
        };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [slides.length]);

    return (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-100">
            {/* animated blobs */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/4 -left-48 w-96 h-96 bg-red-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
                <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-gray-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: "2s" }}></div>
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20"
                onMouseEnter={() => setPaused(true)}
                onMouseLeave={() => setPaused(false)}>
                <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-5rem)]">
                    {/* Left Text */}
                    <div className="space-y-8 text-center lg:text-left">
                        <div className="space-y-4">
                            <p className="text-red-600 font-medium tracking-[0.3em] text-xs sm:text-sm uppercase animate-fade-in">
                                Gen Z Fashion
                            </p>
                            <div className="text-gray-600 text-sm leading-none tracking-wide">
                                <span className="bg-red-600 text-green px-1">Welcome</span>
                                <span> </span>
                                <span className="bg-red-600 text-black px-1">To</span>
                                <span> </span>
                                <span className="bg-red-600 text-black px-1"> Mens</span>
                                <span> </span>
                                <span className="bg-red-600 text-black px-1">Fashion</span>
                            </div>
                            <div/>
                            <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-extrabold leading-tight text-gray-900 drop-shadow-sm transition-all duration-700">
                                {slides[currentSlide].title}
                                <span className="block mt-3 h-1 w-24 bg-gradient-to-r from-red-600 to-gray-900 rounded-full" />
                            </h1>

                            <p className="text-xl sm:text-2xl text-gray-600 font-light max-w-xl mx-auto lg:mx-0 animate-fade-in" style={{ animationDelay: "0.3s" }}>
                                {slides[currentSlide].subtitle}
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in" style={{ animationDelay: "0.1s" }}>
                            <button
                                type="button"
                                onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
                                className="group relative px-10 py-4 bg-red-600 text-white font-semibold tracking-wider overflow-hidden transition-all duration-300 hover:bg-red-700 hover:scale-105 rounded-md"
                            >
                                <span className="relative z-10">{slides[currentSlide].cta}</span>
                                <div className="pointer-events-none absolute -inset-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <div className="absolute inset-0 bg-white/20 blur-lg"></div>
                                </div>
                                <span
                                    className="absolute left-0 bottom-0 h-[3px] bg-white/80"
                                    style={{ width: `${progressPct}%` }}
                                />
                            </button>
                            <button className="group relative px-10 py-4 border-2 border-gray-900 text-gray-900 font-semibold tracking-wider hover:bg-gray-900 hover:text-white transition-all duration-300 hover:scale-105 rounded-md">
                                <span className="relative z-10">LEARN MORE</span>
                                <span className="absolute left-1/2 -bottom-1 h-[2px] w-0 bg-current group-hover:w-3/4 transition-all -translate-x-1/2"></span>
                            </button>
                        </div>

                        <div className="flex gap-3 justify-center lg:justify-start pt-4">
                            {slides.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setCurrentSlide(idx)}
                                    className={`h-1 rounded-full transition-all duration-300 ${idx === currentSlide ? "w-12 bg-red-600" : "w-8 bg-gray-300 hover:bg-gray-400"
                                        }`}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Right Visual */}
                    <div className="relative hidden lg:block">
                        <div className="relative w-full h-[600px] animate-fade-in" style={{ animationDelay: "0.7s" }}>
                            <div className="absolute inset-0 border-4 border-gray-900 transform translate-x-6 translate-y-6"></div>
                            <div className="relative w-full h-full overflow-hidden shadow-2xl rounded-sm">
                                <img
                                    src={slideImages[currentSlide]}
                                    alt={slides[currentSlide].title}
                                    className="absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-700"
                                    loading="lazy"
                                    decoding="async"
                                    referrerPolicy="no-referrer"
                                    onError={(e) => {
                                        const t = e.currentTarget as HTMLImageElement;
                                        t.onerror = null;
                                        t.src = `https://picsum.photos/seed/hero-${currentSlide}/1200/900`;
                                    }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent"></div>
                                <div className="absolute bottom-6 left-6 right-6 backdrop-blur-md bg-white/40 border border-white/50 rounded-lg p-4 flex items-center justify-between">
                                    <div>
                                        <p className="text-xs tracking-widest text-gray-700">FEATURED</p>
                                        <p className="text-gray-900 font-semibold">{slides[currentSlide].subtitle}</p>
                                    </div>
                                    <div className="bg-red-600 text-white px-4 py-2 font-bold tracking-wider shadow-lg animate-float rounded-md">
                                        NEW
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
                <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
                    <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-scroll"></div>
                </div>
            </div>

            {/* Keyframe styles */}
            <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes scroll {
          0% { opacity: 0; transform: translateY(0); }
          50% { opacity: 1; }
          100% { opacity: 0; transform: translateY(16px); }
        }
        .animate-fade-in { animation: fade-in 0.8s ease-out forwards; }
        .animate-slide-up { animation: slide-up 0.6s ease-out forwards; }
        .animate-float { animation: float 3s ease-in-out infinite; }
        .animate-scroll { animation: scroll 2s ease-in-out infinite; }
      `}</style>
        </div>
    );
};

export default HeroSection;
