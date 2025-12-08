import { useAuth } from '../contexts/AuthContext';
import { Download, User, Loader, Package } from 'lucide-react';
import AnimatedBackground from '../components/AnimatedBackground';

export default function Dashboard() {
  const { user } = useAuth();

  const handleDownloadLoader = () => {
    window.open('https://gofile.io/d/aIfTzy', '_blank');
  };

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      <AnimatedBackground />

      <div className="relative z-10 pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12">
            <h1 className="text-6xl font-bold mb-2 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              DASHBOARD
            </h1>
            <p className="text-gray-400">
              Welcome to your 1337 control center
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 border border-cyan-500/30 sticky top-32">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="bg-gradient-to-br from-cyan-500 to-blue-600 w-16 h-16 rounded-2xl flex items-center justify-center">
                    <User size={32} />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Logged in as</p>
                    <p className="text-white font-bold text-sm break-words">{user?.email}</p>
                  </div>
                </div>
                <div className="border-t border-gray-700 pt-4">
                  <p className="text-gray-400 text-sm mb-2">Account Status</p>
                  <span className="inline-block px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-semibold">
                    ACTIVE
                  </span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="space-y-8">
                <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 border border-cyan-500/30">
                  <div className="flex items-center space-x-4 mb-8">
                    <div className="bg-gradient-to-br from-purple-500 to-pink-600 w-16 h-16 rounded-2xl flex items-center justify-center">
                      <Loader size={32} />
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold">Loader</h2>
                      <p className="text-gray-400">Download and manage your loader</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-2xl p-6 border border-cyan-500/20">
                      <div className="flex items-start space-x-4 mb-4">
                        <Package className="text-cyan-400 flex-shrink-0 mt-1" size={24} />
                        <div>
                          <h3 className="font-bold text-lg mb-2">1337 Loader v1.0</h3>
                          <p className="text-gray-400 text-sm mb-4">
                            Latest version with full compatibility for all supported games
                          </p>
                          <button
                            onClick={handleDownloadLoader}
                            className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 w-full justify-center font-bold"
                          >
                            <Download size={18} />
                            <span>Download</span>
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl p-6 border border-purple-500/20">
                      <div className="space-y-3">
                        <h3 className="font-bold text-lg">Quick Stats</h3>
                        <div className="space-y-2 text-gray-300 text-sm">
                          <p className="flex justify-between">
                            <span className="text-gray-400">Downloads:</span>
                            <span className="text-cyan-400 font-bold">Unlimited</span>
                          </p>
                          <p className="flex justify-between">
                            <span className="text-gray-400">Version:</span>
                            <span className="text-cyan-400 font-bold">1.0</span>
                          </p>
                          <p className="flex justify-between">
                            <span className="text-gray-400">Status:</span>
                            <span className="text-green-400 font-bold">Ready</span>
                          </p>
                          <p className="flex justify-between">
                            <span className="text-gray-400">Support:</span>
                            <span className="text-cyan-400 font-bold">24/7</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 bg-blue-500/10 border border-blue-500/20 rounded-2xl p-4">
                    <p className="text-sm text-gray-300">
                      Your loader access is unlimited. You can download and reinstall as many times as needed. For support, reach out to our Discord community.
                    </p>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 border border-gray-700">
                  <h3 className="text-2xl font-bold mb-6">Getting Started</h3>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-4">
                      <div className="bg-cyan-500 text-black font-bold w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
                        1
                      </div>
                      <div>
                        <p className="font-bold mb-1">Download Loader</p>
                        <p className="text-gray-400 text-sm">
                          Click the download button above to get the latest 1337 Loader
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <div className="bg-cyan-500 text-black font-bold w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
                        2
                      </div>
                      <div>
                        <p className="font-bold mb-1">Extract Files</p>
                        <p className="text-gray-400 text-sm">
                          Extract the downloaded archive to your desired location
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <div className="bg-cyan-500 text-black font-bold w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
                        3
                      </div>
                      <div>
                        <p className="font-bold mb-1">Run Loader</p>
                        <p className="text-gray-400 text-sm">
                          Execute the loader and follow the on-screen instructions
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <div className="bg-cyan-500 text-black font-bold w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
                        4
                      </div>
                      <div>
                        <p className="font-bold mb-1">Enjoy</p>
                        <p className="text-gray-400 text-sm">
                          Launch your games and enjoy the full 1337 experience
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
