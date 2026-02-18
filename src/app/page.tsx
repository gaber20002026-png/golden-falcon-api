export default function Home() {
  return (
    <main style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
      color: 'white',
      fontFamily: 'system-ui, sans-serif'
    }}>
      <div style={{
        textAlign: 'center',
        padding: '40px',
        borderRadius: '20px',
        background: 'rgba(255,255,255,0.05)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255,255,255,0.1)'
      }}>
        <h1 style={{ fontSize: '48px', marginBottom: '20px' }}>
          🧠 Golden Falcon AI
        </h1>
        <p style={{ fontSize: '24px', opacity: 0.8, marginBottom: '30px' }}>
          v5.0 Ultimate - API Online
        </p>
        
        <div style={{
          display: 'grid',
          gap: '15px',
          textAlign: 'left',
          maxWidth: '400px',
          margin: '0 auto'
        }}>
          <div style={{ padding: '15px', background: 'rgba(0,255,0,0.1)', borderRadius: '10px' }}>
            ✅ API يعمل بنجاح
          </div>
          <div style={{ padding: '15px', background: 'rgba(0,100,255,0.1)', borderRadius: '10px' }}>
            📊 20+ مؤشر فني
          </div>
          <div style={{ padding: '15px', background: 'rgba(255,200,0,0.1)', borderRadius: '10px' }}>
            ⏰ جميع الفريمات (M1-W1)
          </div>
          <div style={{ padding: '15px', background: 'rgba(255,100,0,0.1)', borderRadius: '10px' }}>
            🌍 جميع الجلسات (24/7)
          </div>
        </div>

        <p style={{ marginTop: '30px', opacity: 0.6, fontSize: '14px' }}>
          🔒 محمي بـ API_KEY
        </p>
      </div>
    </main>
  );
}
