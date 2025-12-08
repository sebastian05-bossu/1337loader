import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Shield, Zap, Lock, ArrowRight } from 'lucide-react';
import AnimatedBackground from '../components/AnimatedBackground';

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (featuresRef.current) {
      const elements = featuresRef.current.querySelectorAll('.feature-card');
      elements.forEach((el) => observer.observe(el));
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      <AnimatedBackground />

      <div className="relative z-10 pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <div className="inline-block mb-6 animate-float">
              <img
                src="/logo1337.png"
                alt="1337 Logo"
                className="h-32 w-32 mx-auto drop-shadow-[0_0_30px_rgba(6,182,212,0.7)] rounded-full"
              />
            </div>
            <h1 className="text-7xl font-bold mb-6 tracking-tighter bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent animate-pulse-slow">
              1337LOADER
            </h1>
            <p className="text-2xl text-gray-400 mb-8 animate-fade-in-delay">
              The Ultimate Gaming Solution
            </p>
            <div className="flex items-center justify-center space-x-6">
              <Link
                to="/buy"
                className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg overflow-hidden transform hover:scale-105 transition-all duration-300 shadow-lg shadow-cyan-500/50"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative flex items-center space-x-2">
                  <span className="text-lg font-bold">GET STARTED</span>
                  <ArrowRight className="group-hover:translate-x-2 transition-transform duration-300" />
                </div>
              </Link>
              <Link
                to="/features"
                className="px-8 py-4 border-2 border-cyan-500 rounded-lg hover:bg-cyan-500/10 transition-all duration-300 transform hover:scale-105"
              >
                <span className="text-lg font-bold">VIEW FEATURES</span>
              </Link>
            </div>
          </div>

          <div ref={featuresRef} className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-32">
            <div className="feature-card opacity-0 translate-x-[-50px] transition-all duration-700">
              <div className="group relative bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-2xl border border-cyan-500/30 hover:border-cyan-500 transition-all duration-300 transform hover:scale-105 hover:-translate-y-2 h-full">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
                <div className="relative flex flex-col h-full">
                  <div className="bg-gradient-to-br from-cyan-500 to-blue-600 w-16 h-16 rounded-xl flex items-center justify-center mb-6 transform group-hover:rotate-12 transition-transform duration-300">
                    <Shield size={32} />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">1337 Cheat</h3>
                  <p className="text-gray-400 mb-4 flex-grow">
                    Advanced gaming features designed for maximum performance
                  </p>
                  <span className="inline-block px-4 py-2 bg-yellow-500/20 text-yellow-400 rounded-full text-sm font-semibold w-fit">
                    COMING SOON
                  </span>
                </div>
              </div>
            </div>

            <div className="feature-card opacity-0 translate-y-[50px] transition-all duration-700 delay-150">
              <div className="group relative bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-2xl border border-cyan-500/30 hover:border-cyan-500 transition-all duration-300 transform hover:scale-105 hover:-translate-y-2 h-full">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
                <div className="relative flex flex-col h-full">
                  <div className="bg-gradient-to-br from-purple-500 to-pink-600 w-16 h-16 rounded-xl flex items-center justify-center mb-6 transform group-hover:rotate-12 transition-transform duration-300">
                    <Zap size={32} />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">1337 Spoofer</h3>
                  <p className="text-gray-400 mb-4 flex-grow">
                    Hardware ID spoofing solution that bypasses all anticheats
                  </p>
                  <span className="inline-block px-4 py-2 bg-green-500/20 text-green-400 rounded-full text-sm font-semibold w-fit">
                    AVAILABLE NOW
                  </span>
                </div>
              </div>
            </div>

            <div className="feature-card opacity-0 translate-x-[50px] transition-all duration-700 delay-300">
              <div className="group relative bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-2xl border border-cyan-500/30 hover:border-cyan-500 transition-all duration-300 transform hover:scale-105 hover:-translate-y-2 h-full">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
                <div className="relative flex flex-col h-full">
                  <div className="bg-gradient-to-br from-green-500 to-emerald-600 w-16 h-16 rounded-xl flex items-center justify-center mb-6 transform group-hover:rotate-12 transition-transform duration-300">
                    <Lock size={32} />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Secure & Safe</h3>
                  <p className="text-gray-400 flex-grow">
                    100% undetected with regular updates and premium support
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-32 text-center">
            <p className="text-gray-500 text-sm">
              Since 2024 - Trusted by thousands of gamers worldwide
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-pulse-slow {
          animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        .animate-fade-in {
          opacity: 1 !important;
          transform: translate(0, 0) !important;
        }

        .animate-fade-in-delay {
          animation: fadeIn 1s ease-in-out 0.5s forwards;
          opacity: 0;
        }

        @keyframes fadeIn {
          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
