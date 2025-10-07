import { useState } from 'react';

function App() {
  const [emailContent, setEmailContent] = useState('');
  const [tone, setTone] = useState('');
  const [generatedReply, setGeneratedReply] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [copied, setCopied] = useState(false);

  // Simple icon components using SVG
  const MailIcon = () => (
    <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );

  const SendIcon = () => (
    <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
    </svg>
  );

  const CopyIcon = () => (
    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
  );

  const MoonIcon = () => (
    <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
    </svg>
  );

  const SunIcon = () => (
    <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  );

  const ZapIcon = () => (
    <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  );

  const SettingsIcon = () => (
    <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    try {
      // You'll need to import axios at the top: import axios from 'axios';
      const response = await fetch("http://localhost:8080/api/email/generate", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          emailContent,
          tone 
        })
      });
      
      if (!response.ok) {
        throw new Error('Failed to generate email reply');
      }
      
      const data = await response.text();
      setGeneratedReply(data);
    } catch (error) {
      console.error("Backend error:", error.message);
      setError('Failed to generate email reply. Please try again');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generatedReply);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const styles = {
    container: {
      minHeight: '100vh',
      backgroundColor: darkMode ? '#111827' : '#f9fafb',
      transition: 'background-color 0.3s',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
    },
    header: {
      backgroundColor: darkMode ? '#1f2937' : '#ffffff',
      borderBottom: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
      transition: 'background-color 0.3s'
    },
    headerContent: {
      maxWidth: '1280px',
      margin: '0 auto',
      padding: '0 16px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: '64px'
    },
    logoSection: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px'
    },
    logoIcon: {
      padding: '8px',
      borderRadius: '8px',
      backgroundColor: darkMode ? '#2563eb' : '#3b82f6',
      color: 'white'
    },
    logoText: {
      fontSize: '20px',
      fontWeight: 'bold',
      color: darkMode ? '#ffffff' : '#111827',
      margin: 0
    },
    logoSubtext: {
      fontSize: '14px',
      color: darkMode ? '#9ca3af' : '#6b7280',
      margin: 0
    },
    themeButton: {
      padding: '8px',
      borderRadius: '8px',
      backgroundColor: darkMode ? '#374151' : '#f3f4f6',
      color: darkMode ? '#d1d5db' : '#6b7280',
      border: 'none',
      cursor: 'pointer',
      transition: 'background-color 0.2s'
    },
    main: {
      maxWidth: '1280px',
      margin: '0 auto',
      padding: '32px 16px',
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
      gap: '32px'
    },
    card: {
      padding: '24px',
      borderRadius: '12px',
      backgroundColor: darkMode ? '#1f2937' : '#ffffff',
      border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
      transition: 'background-color 0.3s'
    },
    cardHeader: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      marginBottom: '24px'
    },
    cardTitle: {
      fontSize: '18px',
      fontWeight: '600',
      color: darkMode ? '#ffffff' : '#111827',
      margin: 0
    },
    formGroup: {
      marginBottom: '16px'
    },
    label: {
      display: 'block',
      fontSize: '14px',
      fontWeight: '500',
      color: darkMode ? '#d1d5db' : '#374151',
      marginBottom: '8px'
    },
    textarea: {
      width: '100%',
      padding: '12px',
      borderRadius: '8px',
      border: `1px solid ${darkMode ? '#4b5563' : '#d1d5db'}`,
      backgroundColor: darkMode ? '#374151' : '#f9fafb',
      color: darkMode ? '#ffffff' : '#111827',
      fontSize: '14px',
      resize: 'vertical',
      minHeight: '120px',
      outline: 'none',
      boxSizing: 'border-box',
      transition: 'border-color 0.2s'
    },
    select: {
      width: '100%',
      padding: '12px',
      borderRadius: '8px',
      border: `1px solid ${darkMode ? '#4b5563' : '#d1d5db'}`,
      backgroundColor: darkMode ? '#374151' : '#f9fafb',
      color: darkMode ? '#ffffff' : '#111827',
      fontSize: '14px',
      outline: 'none',
      boxSizing: 'border-box'
    },
    button: {
      width: '100%',
      padding: '12px 16px',
      borderRadius: '8px',
      border: 'none',
      fontSize: '14px',
      fontWeight: '500',
      cursor: emailContent && !loading ? 'pointer' : 'not-allowed',
      backgroundColor: emailContent && !loading ? 
        (darkMode ? '#2563eb' : '#3b82f6') : 
        (darkMode ? '#4b5563' : '#e5e7eb'),
      color: emailContent && !loading ? '#ffffff' : (darkMode ? '#9ca3af' : '#6b7280'),
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      transition: 'all 0.2s'
    },
    copyButton: {
      padding: '8px 16px',
      borderRadius: '8px',
      border: 'none',
      fontSize: '14px',
      fontWeight: '500',
      cursor: 'pointer',
      backgroundColor: copied ? 
        (darkMode ? '#059669' : '#10b981') : 
        (darkMode ? '#374151' : '#f3f4f6'),
      color: copied ? '#ffffff' : (darkMode ? '#d1d5db' : '#6b7280'),
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      transition: 'all 0.2s'
    },
    outputCard: {
      minHeight: '400px'
    },
    emptyState: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '300px',
      textAlign: 'center',
      color: darkMode ? '#9ca3af' : '#6b7280'
    },
    generatedReply: {
      padding: '16px',
      borderRadius: '8px',
      border: `2px dashed ${darkMode ? '#4b5563' : '#d1d5db'}`,
      backgroundColor: darkMode ? 'rgba(55, 65, 81, 0.5)' : '#f9fafb',
      color: darkMode ? '#f3f4f6' : '#111827',
      minHeight: '300px',
      fontSize: '14px',
      lineHeight: '1.6',
      whiteSpace: 'pre-wrap',
      fontFamily: 'inherit'
    },
    spinner: {
      width: '20px',
      height: '20px',
      border: '2px solid #ffffff',
      borderTop: '2px solid transparent',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite'
    },
    error: {
      padding: '16px',
      borderRadius: '8px',
      backgroundColor: '#fef2f2',
      border: '1px solid #fecaca',
      color: '#dc2626',
      fontSize: '14px',
      marginBottom: '16px'
    }
  };

  return (
    <div style={styles.container}>
      {/* Add spinner animation */}
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          button:hover {
            transform: translateY(-1px);
          }
        `}
      </style>

      {/* Header */}
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <div style={styles.logoSection}>
            <div style={styles.logoIcon}>
              <MailIcon />
            </div>
            <div>
              <h1 style={styles.logoText}>Email Reply Generator</h1>
              <p style={styles.logoSubtext}>AI-powered email assistance</p>
            </div>
          </div>
          
          <button onClick={toggleTheme} style={styles.themeButton}>
            {darkMode ? <SunIcon /> : <MoonIcon />}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main style={styles.main}>
        
        {/* Input Section */}
        <div>
          <div style={styles.card}>
            <div style={styles.cardHeader}>
              <SettingsIcon />
              <h2 style={styles.cardTitle}>Compose Your Reply</h2>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Original Email Content</label>
              <textarea
                value={emailContent || ''}
                onChange={(e) => setEmailContent(e.target.value)}
                placeholder="Paste the email you want to reply to..."
                style={styles.textarea}
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Tone (Optional)</label>
              <select
                value={tone || ''}
                onChange={(e) => setTone(e.target.value)}
                style={styles.select}
              >
                <option value="">None</option>
                <option value="professional">Professional</option>
                <option value="casual">Casual</option>
                <option value="friendly">Friendly</option>
              </select>
            </div>

            <button onClick={handleSubmit} style={styles.button} disabled={!emailContent || loading}>
              {loading ? (
                <>
                  <div style={styles.spinner} />
                  <span>Generating...</span>
                </>
              ) : (
                <>
                  <ZapIcon />
                  <span>Generate Reply</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Output Section */}
        <div>
          {error && (
            <div style={styles.error}>
              {error}
            </div>
          )}

          <div style={{...styles.card, ...styles.outputCard}}>
            <div style={{...styles.cardHeader, justifyContent: 'space-between'}}>
              <div style={styles.cardHeader}>
                <SendIcon />
                <h2 style={styles.cardTitle}>Generated Reply</h2>
              </div>
              
              {generatedReply && (
                <button onClick={handleCopy} style={styles.copyButton}>
                  <CopyIcon />
                  <span>{copied ? 'Copied!' : 'Copy'}</span>
                </button>
              )}
            </div>

            {generatedReply ? (
              <div style={styles.generatedReply}>
                {generatedReply}
              </div>
            ) : (
              <div style={styles.emptyState}>
                <MailIcon />
                <p style={{fontSize: '18px', margin: '16px 0 8px'}}>No reply generated yet</p>
                <p style={{fontSize: '14px', margin: 0}}>Enter an email above and click "Generate Reply" to get started</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;