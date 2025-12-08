import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { Shield, Key, Ban, Lock, Copy, Check } from 'lucide-react';
import AnimatedBackground from '../components/AnimatedBackground';

interface User {
  id: string;
  email: string;
  created_at: string;
}

interface AccessKey {
  id: string;
  key: string;
  is_used: boolean;
  redeemed_by: string | null;
  created_at: string;
}

interface BannedUser {
  id: string;
  user_id: string;
  reason: string;
  email: string;
}

export default function AdminPanel() {
  const { isOwner } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [bannedUsers, setBannedUsers] = useState<BannedUser[]>([]);
  const [keys, setKeys] = useState<AccessKey[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'users' | 'keys' | 'bans'>('users');
  const [newKeyPrefix, setNewKeyPrefix] = useState('');
  const [banEmail, setBanEmail] = useState('');
  const [banReason, setBanReason] = useState('');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const { data: usersData } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      setUsers(usersData || []);

      const { data: bannedData } = await supabase
        .from('user_bans')
        .select(`
          id,
          user_id,
          reason,
          profiles!inner(email)
        `)
        .eq('is_active', true);

      setBannedUsers(
        bannedData?.map((ban: any) => ({
          id: ban.id,
          user_id: ban.user_id,
          reason: ban.reason,
          email: ban.profiles.email,
        })) || []
      );

      const { data: keysData } = await supabase
        .from('access_keys')
        .select('*')
        .order('created_at', { ascending: false });

      setKeys(keysData || []);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateKey = async () => {
    if (!newKeyPrefix.trim()) {
      alert('Please enter a prefix for the key');
      return;
    }

    const randomPart = Math.random().toString(36).substring(2, 15);
    const key = `${newKeyPrefix}-${randomPart}`;

    try {
      const { error } = await supabase
        .from('access_keys')
        .insert([
          {
            key,
            created_by: (await supabase.auth.getUser()).data.user?.id,
          },
        ]);

      if (error) throw error;

      setNewKeyPrefix('');
      await loadData();
      alert(`Key generated: ${key}`);
    } catch (error) {
      console.error('Error generating key:', error);
      alert('Error generating key');
    }
  };

  const banUser = async () => {
    if (!banEmail.trim() || !banReason.trim()) {
      alert('Please fill in all fields');
      return;
    }

    try {
      const { data: userData } = await supabase
        .from('profiles')
        .select('id')
        .eq('email', banEmail)
        .maybeSingle();

      if (!userData) {
        alert('User not found');
        return;
      }

      const { error } = await supabase
        .from('user_bans')
        .insert([
          {
            user_id: userData.id,
            banned_by: (await supabase.auth.getUser()).data.user?.id,
            reason: banReason,
          },
        ]);

      if (error) throw error;

      setBanEmail('');
      setBanReason('');
      await loadData();
      alert('User banned successfully');
    } catch (error) {
      console.error('Error banning user:', error);
      alert('Error banning user');
    }
  };

  const unbanUser = async (userId: string) => {
    try {
      const { error } = await supabase
        .from('user_bans')
        .update({ is_active: false })
        .eq('user_id', userId);

      if (error) throw error;

      await loadData();
      alert('User unbanned successfully');
    } catch (error) {
      console.error('Error unbanning user:', error);
      alert('Error unbanning user');
    }
  };

  const copyToClipboard = (text: string, keyId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(keyId);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  if (!isOwner) {
    return (
      <div className="relative min-h-screen bg-black text-white flex items-center justify-center">
        <AnimatedBackground />
        <div className="relative z-10 text-center">
          <Shield size={64} className="mx-auto mb-4 text-red-400" />
          <h1 className="text-3xl font-bold mb-2">Access Denied</h1>
          <p className="text-gray-400">Only the owner can access this panel</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      <AnimatedBackground />

      <div className="relative z-10 pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12">
            <h1 className="text-6xl font-bold mb-2 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              ADMIN PANEL
            </h1>
            <p className="text-gray-400">
              Manage users, keys, and bans
            </p>
          </div>

          <div className="flex space-x-4 mb-8">
            <button
              onClick={() => setActiveTab('users')}
              className={`px-6 py-3 rounded-lg font-bold transition-all duration-300 ${
                activeTab === 'users'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              Users
            </button>
            <button
              onClick={() => setActiveTab('keys')}
              className={`px-6 py-3 rounded-lg font-bold transition-all duration-300 ${
                activeTab === 'keys'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              Keys
            </button>
            <button
              onClick={() => setActiveTab('bans')}
              className={`px-6 py-3 rounded-lg font-bold transition-all duration-300 ${
                activeTab === 'bans'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              Bans
            </button>
          </div>

          {activeTab === 'users' && (
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 border border-cyan-500/30">
              <h2 className="text-2xl font-bold mb-6">Logged in Users</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left py-3 px-4">Email</th>
                      <th className="text-left py-3 px-4">Created</th>
                      <th className="text-left py-3 px-4">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id} className="border-b border-gray-700 hover:bg-gray-700/50">
                        <td className="py-3 px-4">{user.email}</td>
                        <td className="py-3 px-4 text-gray-400">
                          {new Date(user.created_at).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-4">
                          <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-semibold">
                            ACTIVE
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-gray-400 mt-4">Total Users: {users.length}</p>
            </div>
          )}

          {activeTab === 'keys' && (
            <div className="space-y-8">
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 border border-cyan-500/30">
                <h2 className="text-2xl font-bold mb-6 flex items-center space-x-2">
                  <Key size={28} />
                  <span>Generate New Key</span>
                </h2>
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Enter key prefix (e.g., 1337-SPOOF)"
                    value={newKeyPrefix}
                    onChange={(e) => setNewKeyPrefix(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300 outline-none text-white"
                  />
                  <button
                    onClick={generateKey}
                    className="w-full px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg font-bold hover:from-cyan-600 hover:to-blue-700 transition-all duration-300"
                  >
                    Generate Key
                  </button>
                </div>
              </div>

              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 border border-cyan-500/30">
                <h2 className="text-2xl font-bold mb-6">All Keys</h2>
                <div className="space-y-4">
                  {keys.map((key) => (
                    <div key={key.id} className="bg-gray-800 p-4 rounded-lg flex items-center justify-between">
                      <div>
                        <p className="font-mono font-bold text-cyan-400">{key.key}</p>
                        <p className="text-sm text-gray-400">
                          {key.is_used ? 'Used' : 'Unused'} • {new Date(key.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <button
                        onClick={() => copyToClipboard(key.key, key.id)}
                        className="p-2 hover:bg-gray-700 rounded-lg transition-colors duration-300"
                      >
                        {copiedKey === key.id ? (
                          <Check size={20} className="text-green-400" />
                        ) : (
                          <Copy size={20} className="text-gray-400" />
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'bans' && (
            <div className="space-y-8">
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 border border-cyan-500/30">
                <h2 className="text-2xl font-bold mb-6 flex items-center space-x-2">
                  <Ban size={28} />
                  <span>Ban User</span>
                </h2>
                <div className="space-y-4">
                  <input
                    type="email"
                    placeholder="User email"
                    value={banEmail}
                    onChange={(e) => setBanEmail(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300 outline-none text-white"
                  />
                  <textarea
                    placeholder="Ban reason"
                    value={banReason}
                    onChange={(e) => setBanReason(e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300 outline-none text-white resize-none"
                  />
                  <button
                    onClick={banUser}
                    className="w-full px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 rounded-lg font-bold hover:from-red-600 hover:to-red-700 transition-all duration-300"
                  >
                    Ban User
                  </button>
                </div>
              </div>

              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 border border-cyan-500/30">
                <h2 className="text-2xl font-bold mb-6">Banned Users</h2>
                {bannedUsers.length === 0 ? (
                  <p className="text-gray-400">No banned users</p>
                ) : (
                  <div className="space-y-4">
                    {bannedUsers.map((ban) => (
                      <div key={ban.id} className="bg-gray-800 p-4 rounded-lg flex items-center justify-between">
                        <div>
                          <p className="font-bold">{ban.email}</p>
                          <p className="text-sm text-gray-400">{ban.reason}</p>
                        </div>
                        <button
                          onClick={() => unbanUser(ban.user_id)}
                          className="px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 rounded-lg font-bold hover:from-green-600 hover:to-green-700 transition-all duration-300"
                        >
                          Unban
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
