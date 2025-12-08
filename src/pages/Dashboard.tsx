import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Download, User, Loader, Package, Key, Shield, Settings } from 'lucide-react';
import AnimatedBackground from '../components/AnimatedBackground';

interface License {
  status: 'active' | 'inactive';
}

export default function Dashboard() {
  const { user, isOwner } = useAuth();
  const navigate = useNavigate();
  const [license, setLicense] = useState<License | null>(null);
  const [redeemKey, setRedeemKey] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error'>('success');

  useEffect(() => {
    loadLicense();
  }, [user]);

  const loadLicense = async () => {
    if (!user) return;

    try {
      const { data } = await supabase
        .from('licenses')
        .select('status')
        .eq('user_id', user.id)
        .maybeSingle();

      setLicense(data);
    } catch (error) {
      console.error('Error loading license:', error);
    }
  };

  const redeemAccessKey = async () => {
    if (!redeemKey.trim()) {
      setMessage('Please enter a valid key');
      setMessageType('error');
      return;
    }

    setLoading(true);
    try {
      const { data: keyData } = await supabase
        .from('access_keys')
        .select('*')
        .eq('key', redeemKey)
        .maybeSingle();

      if (!keyData) {
        setMessage('Invalid key');
        setMessageType('error');
        setLoading(false);
        return;
      }

      if (keyData.is_used) {
        setMessage('This key has already been used');
        setMessageType('error');
        setLoading(false);
        return;
      }

      if (keyData.redeemed_by && keyData.redeemed_by !== user?.id) {
        setMessage('This key has been redeemed by another user');
        setMessageType('error');
        setLoading(false);
        return;
      }

      // Create or update license
      const { error: licenseError } = await supabase
        .from('licenses')
        .upsert(
          {
            user_id: user?.id,
            status: 'active',
          },
          { onConflict: 'user_id' }
        );

      if (licenseError) throw licenseError;

      // Update the key as used
      const { error: keyError } = await supabase
        .from('access_keys')
        .update({
          is_used: true,
          redeemed_by: user?.id,
          redeemed_at: new Date().toISOString(),
        })
        .eq('id', keyData.id);

      if (keyError) throw keyError;

      setMessage('Key redeemed successfully! License activated!');
      setMessageType('success');
      setRedeemKey('');
      await loadLicense();
    } catch (error) {
      console.error('Error redeeming key:', error);
      setMessage('Error redeeming key. Please try again.');
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadLoader = () => {
    if (license?.status === 'active') {
      window.open('https://gofile.io/d/aIfTzy', '_blank');
    }
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
              Welcome to your 1337 dashboard
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 border border-cyan-500/30 sticky top-32 space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="bg-gradient-to-br from-cyan-500 to-blue-600 w-16 h-16 rounded-2xl flex items-center justify-center">
                    <User size={32} />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Logged in as</p>
                    <p className="text-white font-bold text-sm break-words">{user?.email}</p>
                  </div>
                </div>

                <div className="border-t border-gray-700 pt-4">
                  <p className="text-gray-400 text-sm mb-2">License Status</p>
                  {license?.status === 'active' ? (
                    <span className="inline-block px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-semibold">
                      ACTIVE
                    </span>
                  ) : (
                    <span className="inline-block px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-xs font-semibold">
                      INACTIVE
                    </span>
                  )}
                </div>

                {isOwner && (
                  <div className="border-t border-gray-700 pt-4">
                    <button
                      onClick={() => navigate('/admin')}
                      className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg hover:from-purple-600 hover:to-pink-700 transition-all duration-300"
                    >
                      <Shield size={18} />
                      <span className="font-bold text-sm">ADMIN PANEL</span>
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="space-y-8">
                {license?.status !== 'active' && (
                  <div className="bg-gradient-to-br from-yellow-900 to-yellow-800 rounded-3xl p-8 border border-yellow-500/30">
                    <div className="flex items-start space-x-4 mb-6">
                      <Key className="text-yellow-400 flex-shrink-0 mt-1" size={28} />
                      <div>
                        <h2 className="text-2xl font-bold mb-2">Redeem Access Key</h2>
                        <p className="text-gray-300 text-sm">
                          You need an access key to download the loader. Enter your key below to activate your license.
                        </p>
                      </div>
                    </div>

                    {message && (
                      <div
                        className={`mb-4 p-4 rounded-lg text-sm ${
                          messageType === 'success'
                            ? 'bg-green-500/20 text-green-300 border border-green-500/30'
                            : 'bg-red-500/20 text-red-300 border border-red-500/30'
                        }`}
                      >
                        {message}
                      </div>
                    )}

                    <div className="space-y-4">
                      <input
                        type="text"
                        placeholder="Enter your access key (e.g., 1337-SPOOF-xxxxx)"
                        value={redeemKey}
                        onChange={(e) => setRedeemKey(e.target.value)}
                        className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-all duration-300 outline-none text-white"
                      />
                      <button
                        onClick={redeemAccessKey}
                        disabled={loading}
                        className="w-full px-6 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-lg font-bold hover:from-yellow-600 hover:to-yellow-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {loading ? 'Redeeming...' : 'Redeem Key'}
                      </button>
                    </div>
                  </div>
                )}

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

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-2xl p-6 border border-cyan-500/20">
                      <div className="flex items-start space-x-4">
                        <Package className="text-cyan-400 flex-shrink-0 mt-1" size={24} />
                        <div className="flex-grow">
                          <h3 className="font-bold text-lg mb-2">1337 Loader v1.0</h3>
                          <p className="text-gray-400 text-sm mb-4">
                            Latest version with full compatibility for all supported games
                          </p>
                          <button
                            onClick={handleDownloadLoader}
                            disabled={license?.status !== 'active'}
                            className={`w-full flex items-center justify-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 font-bold ${
                              license?.status === 'active'
                                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white'
                                : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                            }`}
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
                            <span className="text-gray-400">License:</span>
                            <span className={`font-bold ${license?.status === 'active' ? 'text-green-400' : 'text-yellow-400'}`}>
                              {license?.status === 'active' ? 'Active' : 'Inactive'}
                            </span>
                          </p>
                          <p className="flex justify-between">
                            <span className="text-gray-400">Support:</span>
                            <span className="text-cyan-400 font-bold">24/7</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-4">
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
                        <p className="font-bold mb-1">Redeem Your Key</p>
                        <p className="text-gray-400 text-sm">
                          Enter your access key above to activate your license
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <div className="bg-cyan-500 text-black font-bold w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
                        2
                      </div>
                      <div>
                        <p className="font-bold mb-1">Download Loader</p>
                        <p className="text-gray-400 text-sm">
                          Click the download button to get the latest 1337 Loader
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <div className="bg-cyan-500 text-black font-bold w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
                        3
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
                        4
                      </div>
                      <div>
                        <p className="font-bold mb-1">Enjoy</p>
                        <p className="text-gray-400 text-sm">
                          Launch the spoofer, spoof and enjoy the game without bans!
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
