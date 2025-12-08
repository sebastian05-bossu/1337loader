import { useState } from 'react';
import { ShoppingCart, MessageCircle, Check } from 'lucide-react';
import AnimatedBackground from '../components/AnimatedBackground';

export default function Buy() {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateXValue = ((y - centerY) / centerY) * -10;
    const rotateYValue = ((x - centerX) / centerX) * 10;

    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  const handleBuyClick = () => {
    window.open('https://discord.gg/WkFyKF9sjk', '_blank');
  };

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      <AnimatedBackground />

      <div className="relative z-10 pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              GET 1337 SPOOFER
            </h1>
            <p className="text-xl text-gray-400">
              Join thousands of satisfied customers
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div
              className="perspective-container h-fit sticky top-32"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <div
                className="product-image-container"
                style={{
                  transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
                  transition: 'transform 0.1s ease-out',
                }}
              >
                <img
                  src="/spoofer.png"
                  alt="1337 Spoofer"
                  className="w-full h-auto rounded-2xl shadow-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 to-blue-500/20 rounded-2xl pointer-events-none" />
              </div>
            </div>

            <div className="space-y-8">
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 border border-cyan-500/30">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-3xl font-bold">1337 Spoofer</h2>
                  <span className="inline-block px-4 py-2 bg-green-500/20 text-green-400 rounded-full text-sm font-semibold">
                    IN STOCK
                  </span>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex items-start space-x-3">
                    <Check className="text-cyan-400 flex-shrink-0 mt-1" size={20} />
                    <span className="text-gray-300">Unban CFX instantly</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Check className="text-cyan-400 flex-shrink-0 mt-1" size={20} />
                    <span className="text-gray-300">Bypass all anticheats (EAC, BattlEye, Vanguard)</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Check className="text-cyan-400 flex-shrink-0 mt-1" size={20} />
                    <span className="text-gray-300">Unban TxAdmin permanently</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Check className="text-cyan-400 flex-shrink-0 mt-1" size={20} />
                    <span className="text-gray-300">Electron anticheat support</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Check className="text-cyan-400 flex-shrink-0 mt-1" size={20} />
                    <span className="text-gray-300">Complete hardware ID modification</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Check className="text-cyan-400 flex-shrink-0 mt-1" size={20} />
                    <span className="text-gray-300">Lifetime updates included</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Check className="text-cyan-400 flex-shrink-0 mt-1" size={20} />
                    <span className="text-gray-300">24/7 Premium support</span>
                  </div>
                </div>

                <button
                  onClick={handleBuyClick}
                  className="group w-full relative px-8 py-6 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl overflow-hidden transform hover:scale-105 transition-all duration-300 shadow-lg shadow-cyan-500/50"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative flex items-center justify-center space-x-3">
                    <ShoppingCart size={24} />
                    <span className="text-xl font-bold">BUY NOW</span>
                  </div>
                </button>

                <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl">
                  <div className="flex items-start space-x-3">
                    <MessageCircle className="text-blue-400 flex-shrink-0 mt-1" size={20} />
                    <p className="text-sm text-gray-300">
                      Click "BUY NOW" to join our Discord server and create a ticket for purchase. Our team will assist you with the payment process.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 border border-gray-700">
                <h3 className="text-xl font-bold mb-4">Why Choose 1337 Spoofer?</h3>
                <div className="space-y-3 text-gray-300">
                  <p className="flex items-start space-x-2">
                    <span className="text-cyan-400">•</span>
                    <span>100% Undetected - Tested on all major games</span>
                  </p>
                  <p className="flex items-start space-x-2">
                    <span className="text-cyan-400">•</span>
                    <span>Easy to Use - Simple one-click operation</span>
                  </p>
                  <p className="flex items-start space-x-2">
                    <span className="text-cyan-400">•</span>
                    <span>Regular Updates - Always stay ahead of anticheats</span>
                  </p>
                  <p className="flex items-start space-x-2">
                    <span className="text-cyan-400">•</span>
                    <span>Trusted Since 2024 - Thousands of satisfied users</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-20 text-center">
            <p className="text-gray-500 text-sm">
              All purchases are final. Make sure to read our terms before purchasing.
            </p>
          </div>
        </div>
      </div>

      <style>{`
        .perspective-container {
          perspective: 1000px;
        }

        .product-image-container {
          position: relative;
          transform-style: preserve-3d;
          will-change: transform;
        }

        .product-image-container::before {
          content: '';
          position: absolute;
          inset: -10px;
          background: linear-gradient(45deg, #06b6d4, #3b82f6, #06b6d4);
          border-radius: 1rem;
          opacity: 0.5;
          filter: blur(20px);
          z-index: -1;
          animation: glow 3s ease-in-out infinite;
        }

        @keyframes glow {
          0%, 100% {
            opacity: 0.5;
          }
          50% {
            opacity: 0.8;
          }
        }
      `}</style>
    </div>
  );
}
