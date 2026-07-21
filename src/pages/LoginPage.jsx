import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Mock auth — replace with real API call later
    setTimeout(() => {
      if (email === 'admin@foodgenie.com' && password === 'admin123') {
        navigate('/');
      } else {
        setError('Invalid email or password. Try admin@foodgenie.com / admin123');
      }
      setLoading(false);
    }, 800);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #1E1614 0%, #2d1f1a 40%, #3a2820 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: "'Inter', sans-serif",
        padding: '1.5rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background decorative circles */}
      <div
        style={{
          position: 'absolute',
          top: '-120px',
          right: '-120px',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(230,96,0,0.15) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '-150px',
          left: '-100px',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(230,96,0,0.10) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Card */}
      <div
        style={{
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.10)',
          backdropFilter: 'blur(20px)',
          borderRadius: '20px',
          padding: '2.5rem',
          width: '100%',
          maxWidth: '420px',
          boxShadow: '0 25px 60px rgba(0,0,0,0.5)',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '60px',
              height: '60px',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, #E66000, #ff8c38)',
              marginBottom: '1rem',
              boxShadow: '0 8px 24px rgba(230,96,0,0.4)',
            }}
          >
            <span className="material-symbols-outlined" style={{ color: '#fff', fontSize: '32px' }}>
              restaurant
            </span>
          </div>
          <h1
            style={{
              fontSize: '1.75rem',
              fontWeight: '800',
              color: '#fff',
              marginBottom: '0.25rem',
              letterSpacing: '-0.5px',
            }}
          >
            Food Genie
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.875rem' }}>
            Admin Portal — Sign in to continue
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              style={{ display: 'block', color: 'rgba(255,255,255,0.7)', fontSize: '0.813rem', marginBottom: '0.5rem', fontWeight: '500' }}
            >
              Email Address
            </label>
            <div style={{ position: 'relative' }}>
              <span
                className="material-symbols-outlined"
                style={{
                  position: 'absolute',
                  left: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'rgba(255,255,255,0.4)',
                  fontSize: '20px',
                }}
              >
                mail
              </span>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@foodgenie.com"
                required
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem 0.75rem 2.75rem',
                  background: 'rgba(255,255,255,0.07)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  borderRadius: '10px',
                  color: '#fff',
                  fontSize: '0.875rem',
                  outline: 'none',
                  boxSizing: 'border-box',
                  transition: 'border-color 0.2s',
                }}
                onFocus={(e) => (e.target.style.borderColor = 'rgba(230,96,0,0.6)')}
                onBlur={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.12)')}
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              style={{ display: 'block', color: 'rgba(255,255,255,0.7)', fontSize: '0.813rem', marginBottom: '0.5rem', fontWeight: '500' }}
            >
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <span
                className="material-symbols-outlined"
                style={{
                  position: 'absolute',
                  left: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'rgba(255,255,255,0.4)',
                  fontSize: '20px',
                }}
              >
                lock
              </span>
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                style={{
                  width: '100%',
                  padding: '0.75rem 3rem 0.75rem 2.75rem',
                  background: 'rgba(255,255,255,0.07)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  borderRadius: '10px',
                  color: '#fff',
                  fontSize: '0.875rem',
                  outline: 'none',
                  boxSizing: 'border-box',
                  transition: 'border-color 0.2s',
                }}
                onFocus={(e) => (e.target.style.borderColor = 'rgba(230,96,0,0.6)')}
                onBlur={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.12)')}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'rgba(255,255,255,0.4)',
                  padding: '0',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>
                  {showPassword ? 'visibility_off' : 'visibility'}
                </span>
              </button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div
              style={{
                background: 'rgba(220,53,69,0.15)',
                border: '1px solid rgba(220,53,69,0.3)',
                borderRadius: '8px',
                padding: '0.75rem 1rem',
                color: '#ff6b6b',
                fontSize: '0.813rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
                error
              </span>
              {error}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '0.875rem',
              background: loading ? 'rgba(230,96,0,0.5)' : 'linear-gradient(135deg, #E66000, #ff8c38)',
              border: 'none',
              borderRadius: '10px',
              color: '#fff',
              fontSize: '0.938rem',
              fontWeight: '700',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s',
              boxShadow: '0 4px 16px rgba(230,96,0,0.35)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              letterSpacing: '0.3px',
            }}
            onMouseEnter={(e) => {
              if (!loading) e.currentTarget.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            {loading ? (
              <>
                <span
                  style={{
                    width: '18px',
                    height: '18px',
                    border: '2px solid rgba(255,255,255,0.4)',
                    borderTopColor: '#fff',
                    borderRadius: '50%',
                    animation: 'spin 0.7s linear infinite',
                    display: 'inline-block',
                  }}
                />
                Signing in...
              </>
            ) : (
              <>
                <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>
                  login
                </span>
                Sign In
              </>
            )}
          </button>
        </form>

        {/* Hint */}
        <p
          style={{
            textAlign: 'center',
            color: 'rgba(255,255,255,0.3)',
            fontSize: '0.75rem',
            marginTop: '1.5rem',
          }}
        >
          Demo: admin@foodgenie.com / admin123
        </p>
      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        input::placeholder { color: rgba(255,255,255,0.25); }
      `}</style>
    </div>
  );
}
