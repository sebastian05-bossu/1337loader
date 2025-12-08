import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { LogIn, Mail, Lock, AlertCircle } from 'lucide-react';
import AnimatedBackground from '../components/AnimatedBackground';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [resetMode, setResetMode] = useState(false);
  const [resetMessage, setResetMessage] = useState('');
  const { signIn, resetPassword } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { error } = await signIn(email, password);
      if (error) {
        setError(error.message);
      } else {
        navigate('/');
      }
    } catch (err) {
      setError('An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setResetMessage('');
    setLoading(true);

    try {
      const { error } = await resetPassword(email);
      if (error) {
        setError(error.message);
      } else {
        setResetMessage('Password reset email sent! Check your inbox.');
      }
    } catch (err) {
      setError('An error occurred while sending reset email');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden flex items-center justify-center py-20">
      <AnimatedBackground />

      <div className="relative z-10 w-full max-w-md px-6">
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 border border-cyan-500/30 shadow-2xl animate-slide-up">
          <div className="text-center mb-8">
            <div className="inline-block p-4 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl mb-4 transform hover:rotate-12 transition-transform duration-300">
              <LogIn size={32} />
            </div>
            <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              {resetMode ? 'Reset Password' : 'Welcome Back'}
            </h1>
            <p className="text-gray-400 text-sm">
              {resetMode ? 'Enter your email to reset password' : 'Login to access 1337 Services'}
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl flex items-start space-x-3 animate-shake">
              <AlertCircle className="text-red-400 flex-shrink-0" size={20} />
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          {resetMessage && (
            <div className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-xl flex items-start space-x-3">
              <AlertCircle className="text-green-400 flex-shrink-0" size={20} />
              <p className="text-green-400 text-sm">{resetMessage}</p>
            </div>
          )}

          <form onSubmit={resetMode ? handleResetPassword : handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="text-gray-500" size={20} />
                </div>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-12 pr-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300 outline-none text-white text-sm"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            {!resetMode && (
              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="text-gray-500" size={20} />
                  </div>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full pl-12 pr-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300 outline-none text-white text-sm"
                    placeholder="••••••••"
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-bold text-lg hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-cyan-500/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? 'Processing...' : resetMode ? 'Send Reset Email' : 'Login'}
            </button>
          </form>

          <div className="mt-6 space-y-4 text-center">
            <button
              onClick={() => {
                setResetMode(!resetMode);
                setError('');
                setResetMessage('');
              }}
              className="text-cyan-400 hover:text-cyan-300 text-sm transition-colors duration-300 block w-full"
            >
              {resetMode ? 'Back to Login' : 'Forgot Password?'}
            </button>

            {!resetMode && (
              <>
                <div className="text-gray-500 text-sm">or</div>
                <Link
                  to="/register"
                  className="text-cyan-400 hover:text-cyan-300 transition-colors duration-300 block text-sm"
                >
                  Don't have an account? <span className="font-bold">Register</span>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slide-up {
          animation: slide-up 0.6s ease-out;
        }

        @keyframes shake {
          0%, 100% {
            transform: translateX(0);
          }
          25% {
            transform: translateX(-10px);
          }
          75% {
            transform: translateX(10px);
          }
        }

        .animate-shake {
          animation: shake 0.4s ease-in-out;
        }
      `}</style>
    </div>
  );
}
