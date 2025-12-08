import { useEffect, useRef } from 'react';
import { Check, Shield, Cpu, HardDrive, Wifi, Play } from 'lucide-react';
import AnimatedBackground from '../components/AnimatedBackground';

export default function Features() {
  const featuresRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('slide-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (featuresRef.current) {
      const elements = featuresRef.current.querySelectorAll('.feature-item');
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
            <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              FEATURES
            </h1>
            <p className="text-xl text-gray-400">
              Powerful tools designed for ultimate performance
            </p>
          </div>

          <div ref={featuresRef} className="space-y-16">
            <div className="feature-item opacity-0 translate-x-[-100px] transition-all duration-700">
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-12 border border-yellow-500/30 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500/10 rounded-full blur-3xl" />
                <div className="relative">
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <h2 className="text-4xl font-bold mb-2">1337 Cheat</h2>
                      <span className="inline-block px-4 py-2 bg-yellow-500/20 text-yellow-400 rounded-full text-sm font-semibold">
                        COMING SOON
                      </span>
                    </div>
                    <div className="bg-gradient-to-br from-yellow-500 to-orange-600 w-20 h-20 rounded-2xl flex items-center justify-center transform hover:rotate-12 transition-transform duration-300">
                      <Shield size={40} />
                    </div>
                  </div>
                  <p className="text-gray-400 text-lg mb-6">
                    Advanced gaming enhancements with cutting-edge features designed for competitive advantage.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-start space-x-3">
                      <Check className="text-yellow-400 flex-shrink-0 mt-1" size={20} />
                      <span className="text-gray-300">Undetectable technology</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Check className="text-yellow-400 flex-shrink-0 mt-1" size={20} />
                      <span className="text-gray-300">Regular updates</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Check className="text-yellow-400 flex-shrink-0 mt-1" size={20} />
                      <span className="text-gray-300">24/7 support</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Check className="text-yellow-400 flex-shrink-0 mt-1" size={20} />
                      <span className="text-gray-300">Easy to use interface</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="feature-item opacity-0 translate-x-[100px] transition-all duration-700">
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-12 border border-cyan-500/30 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl" />
                <div className="relative">
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <h2 className="text-4xl font-bold mb-2">1337 Spoofer</h2>
                      <span className="inline-block px-4 py-2 bg-green-500/20 text-green-400 rounded-full text-sm font-semibold">
                        AVAILABLE NOW
                      </span>
                    </div>
                    <div className="bg-gradient-to-br from-cyan-500 to-blue-600 w-20 h-20 rounded-2xl flex items-center justify-center transform hover:rotate-12 transition-transform duration-300">
                      <HardDrive size={40} />
                    </div>
                  </div>
                  <p className="text-gray-400 text-lg mb-8">
                    The most advanced HWID spoofer on the market. Completely undetectable and compatible with all major anticheats.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3 group">
                        <div className="bg-cyan-500/20 p-2 rounded-lg group-hover:bg-cyan-500/30 transition-colors duration-300">
                          <Cpu className="text-cyan-400" size={24} />
                        </div>
                        <div>
                          <h3 className="font-bold text-lg mb-1">Unban CFX</h3>
                          <p className="text-gray-400 text-sm">
                            Bypass FiveM/RedM bans instantly
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3 group">
                        <div className="bg-cyan-500/20 p-2 rounded-lg group-hover:bg-cyan-500/30 transition-colors duration-300">
                          <Shield className="text-cyan-400" size={24} />
                        </div>
                        <div>
                          <h3 className="font-bold text-lg mb-1">Bypass All AC's</h3>
                          <p className="text-gray-400 text-sm">
                            Works with EAC, BattlEye, Vanguard, and more
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3 group">
                        <div className="bg-cyan-500/20 p-2 rounded-lg group-hover:bg-cyan-500/30 transition-colors duration-300">
                          <Wifi className="text-cyan-400" size={24} />
                        </div>
                        <div>
                          <h3 className="font-bold text-lg mb-1">Unban TX</h3>
                          <p className="text-gray-400 text-sm">
                            Remove TxAdmin restrictions permanently
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-start space-x-3 group">
                        <div className="bg-cyan-500/20 p-2 rounded-lg group-hover:bg-cyan-500/30 transition-colors duration-300">
                          <HardDrive className="text-cyan-400" size={24} />
                        </div>
                        <div>
                          <h3 className="font-bold text-lg mb-1">Electron Support</h3>
                          <p className="text-gray-400 text-sm">
                            Full Electron AC bypass capabilities
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3 group">
                        <div className="bg-cyan-500/20 p-2 rounded-lg group-hover:bg-cyan-500/30 transition-colors duration-300">
                          <Check className="text-cyan-400" size={24} />
                        </div>
                        <div>
                          <h3 className="font-bold text-lg mb-1">Bypass Everything</h3>
                          <p className="text-gray-400 text-sm">
                            Complete HWID modification across all hardware
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3 group">
                        <div className="bg-cyan-500/20 p-2 rounded-lg group-hover:bg-cyan-500/30 transition-colors duration-300">
                          <Shield className="text-cyan-400" size={24} />
                        </div>
                        <div>
                          <h3 className="font-bold text-lg mb-1">100% Safe</h3>
                          <p className="text-gray-400 text-sm">
                            No risk of additional bans or detection
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-2xl p-6 border border-cyan-500/20 mb-8">
                    <h3 className="text-2xl font-bold mb-6">Game Support</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-3">
                        <h4 className="font-bold text-lg text-cyan-400">Fortnite</h4>
                        <ul className="space-y-2 text-gray-300 text-sm">
                          <li className="flex items-start space-x-2">
                            <span className="text-cyan-400">✓</span>
                            <span>Unban from Easy Anti-Cheat permanently</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <span className="text-cyan-400">✓</span>
                            <span>HWID change for hardware identification</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <span className="text-cyan-400">✓</span>
                            <span>All anticheats bypassed</span>
                          </li>
                        </ul>
                      </div>

                      <div className="space-y-3">
                        <h4 className="font-bold text-lg text-cyan-400">Valorant</h4>
                        <ul className="space-y-2 text-gray-300 text-sm">
                          <li className="flex items-start space-x-2">
                            <span className="text-cyan-400">✓</span>
                            <span>Hardware ID spoofer for Vanguard bypass</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <span className="text-cyan-400">✓</span>
                            <span>Permanent ban removal capability</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <span className="text-cyan-400">✓</span>
                            <span>Silent and undetectable operation</span>
                          </li>
                        </ul>
                      </div>

                      <div className="space-y-3">
                        <h4 className="font-bold text-lg text-cyan-400">Other Titles</h4>
                        <ul className="space-y-2 text-gray-300 text-sm">
                          <li className="flex items-start space-x-2">
                            <span className="text-cyan-400">✓</span>
                            <span>CS:GO / CS2 support</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <span className="text-cyan-400">✓</span>
                            <span>Apex Legends compatible</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <span className="text-cyan-400">✓</span>
                            <span>All Riot Games titles</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl p-6 border border-purple-500/20">
                    <div className="flex items-center space-x-4 mb-4">
                      <Play className="text-purple-400" size={28} />
                      <h3 className="text-2xl font-bold">Video Demo</h3>
                    </div>
                    <p className="text-gray-400 mb-4">
                      Watch our complete spoofer showcase and see how it works in action:
                    </p>
                    <a
                      href="https://www.youtube.com/watch?v=2-pAX_6olNc"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg font-bold hover:from-purple-600 hover:to-pink-700 transition-all duration-300 transform hover:scale-105"
                    >
                      Watch Showcase
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-20 text-center">
            <p className="text-gray-500 text-lg">
              Since 2024 - Continuously updated and improved
            </p>
          </div>
        </div>
      </div>

      <style>{`
        .slide-in {
          opacity: 1 !important;
          transform: translateX(0) !important;
        }
      `}</style>
    </div>
  );
}
