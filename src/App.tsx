import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Features from './pages/Features';
import Buy from './pages/Buy';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AdminPanel from './pages/AdminPanel';
import Banned from './pages/Banned';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading, isBanned } = useAuth();

  if (loading) {
    return <div className="min-h-screen bg-black flex items-center justify-center"><p className="text-white">Loading...</p></div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (isBanned) {
    return <Navigate to="/banned" replace />;
  }

  return <>{children}</>;
}

function AdminRoute({ children }: { children: React.ReactNode }) {
  const { user, loading, isAdmin } = useAuth();

  if (loading) {
    return <div className="min-h-screen bg-black flex items-center justify-center"><p className="text-white">Loading...</p></div>;
  }

  if (!user || !isAdmin) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-black">
          <Navigation />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/features" element={<Features />} />
            <Route path="/buy" element={<Buy />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/banned" element={<Banned />} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/admin" element={<AdminRoute><AdminPanel /></AdminRoute>} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
