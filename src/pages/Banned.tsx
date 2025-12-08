import { Lock } from 'lucide-react';
import AnimatedBackground from '../components/AnimatedBackground';

export default function Banned() {
  return (
    <div className="relative min-h-screen bg-black text-white flex items-center justify-center overflow-hidden">
      <AnimatedBackground />

      <div className="relative z-10 text-center px-6">
        <Lock className="w-24 h-24 mx-auto mb-6 text-red-500" />
        <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
          ACCOUNT BANNED
        </h1>
        <p className="text-2xl text-gray-400 mb-8">
          Your account has been banned
        </p>
        <p className="text-gray-500 max-w-md mx-auto mb-8">
          If you believe this is a mistake, please contact our support team on Discord.
        </p>
        <a
          href="https://discord.gg/WkFyKF9sjk"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-8 py-4 bg-gradient-to-r from-red-500 to-red-600 rounded-lg font-bold hover:from-red-600 hover:to-red-700 transition-all duration-300 transform hover:scale-105"
        >
          Contact Support
        </a>
      </div>
    </div>
  );
}
