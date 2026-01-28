import React, { useState, useEffect } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Sample data for charts
  const performanceData = [
    { month: 'Jan', value: 45 },
    { month: 'Feb', value: 52 },
    { month: 'Mar', value: 48 },
    { month: 'Apr', value: 61 },
    { month: 'May', value: 55 },
    { month: 'Jun', value: 67 },
    { month: 'Jul', value: 72 },
    { month: 'Aug', value: 65 },
    { month: 'Sep', value: 78 },
    { month: 'Oct', value: 82 },
    { month: 'Nov', value: 75 },
    { month: 'Dec', value: 88 }
  ];

  const activityData = [
    { day: 'Mon', value: 12 },
    { day: 'Tue', value: 19 },
    { day: 'Wed', value: 15 },
    { day: 'Thu', value: 25 },
    { day: 'Fri', value: 22 },
    { day: 'Sat', value: 18 },
    { day: 'Sun', value: 14 }
  ];

  return (
    <div style={styles.container}>
      {/* Animated Background */}
      <div style={styles.bgAnimation}></div>
      
      {/* Sidebar */}
      <div style={styles.sidebar}>
        <div style={styles.logo}>
          <div style={styles.logoIcon}>◈</div>
          <span style={styles.logoText}>NEXUS</span>
        </div>
        
        <nav style={styles.nav}>
          <div style={{...styles.navItem, ...styles.navItemActive}}>
            <span style={styles.navIcon}>◆</span>
            <span>Dashboard</span>
          </div>
          <div style={styles.navItem}>
            <span style={styles.navIcon}>▲</span>
            <span>Analytics</span>
          </div>
          <div style={styles.navItem}>
            <span style={styles.navIcon}>●</span>
            <span>Projects</span>
          </div>
          <div style={styles.navItem}>
            <span style={styles.navIcon}>■</span>
            <span>Reports</span>
          </div>
          <div style={styles.navItem}>
            <span style={styles.navIcon}>⬟</span>
            <span>Settings</span>
          </div>
        </nav>
        
        <div style={styles.sidebarFooter}>
          <div style={styles.userCard}>
            <div style={styles.userAvatar}>JD</div>
            <div>
              <div style={styles.userName}>John Doe</div>
              <div style={styles.userRole}>Administrator</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={styles.main}>
        {/* Header */}
        <header style={styles.header}>
          <div>
            <h1 style={styles.title}>Command Center</h1>
            <p style={styles.subtitle}>Real-time system overview</p>
          </div>
          <div style={styles.headerRight}>
            <div style={styles.timeDisplay}>
              {currentTime.toLocaleTimeString()}
            </div>
            <button style={styles.headerButton}>
              <span style={styles.notificationDot}></span>
              ⚡
            </button>
          </div>
        </header>

        {/* Stats Grid */}
        <div style={styles.grid}>
          {/* Featured Card - Large */}
          <div style={{...styles.card, ...styles.cardLarge, ...styles.cardGradient}}>
            <div style={styles.cardHeader}>
              <h3 style={styles.cardTitle}>Network Status</h3>
              <span style={styles.badge}>ACTIVE</span>
            </div>
            <div style={styles.featureContent}>
              <div style={styles.jellyfish}>
                <div style={styles.jellyfishBody}></div>
                <div style={styles.jellyfishTentacles}>
                  {[...Array(8)].map((_, i) => (
                    <div key={i} style={{...styles.tentacle, animationDelay: `${i * 0.1}s`}}></div>
                  ))}
                </div>
              </div>
              <div style={styles.featureStats}>
                <div style={styles.featureStat}>
                  <span style={styles.featureLabel}>Uptime</span>
                  <span style={styles.featureValue}>99.8%</span>
                </div>
                <div style={styles.featureStat}>
                  <span style={styles.featureLabel}>Latency</span>
                  <span style={styles.featureValue}>12ms</span>
                </div>
              </div>
            </div>
          </div>

          {/* Metric Cards */}
          <div style={{...styles.card, ...styles.cardMetric}}>
            <div style={styles.metricIcon}>⚡</div>
            <div style={styles.metricContent}>
              <p style={styles.metricLabel}>Active Users</p>
              <h2 style={styles.metricValue}>2,847</h2>
              <div style={styles.metricChange}>
                <span style={styles.metricArrow}>↗</span>
                <span style={styles.metricPercent}>+12.5%</span>
              </div>
            </div>
          </div>

          <div style={{...styles.card, ...styles.cardMetric}}>
            <div style={{...styles.metricIcon, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}}>◉</div>
            <div style={styles.metricContent}>
              <p style={styles.metricLabel}>Completion Rate</p>
              <h2 style={styles.metricValue}>94%</h2>
              <div style={styles.progressBar}>
                <div style={{...styles.progressFill, width: '94%'}}></div>
              </div>
            </div>
          </div>

          <div style={{...styles.card, ...styles.cardMetric}}>
            <div style={{...styles.metricIcon, background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'}}>★</div>
            <div style={styles.metricContent}>
              <p style={styles.metricLabel}>Performance</p>
              <div style={styles.scoreCircle}>
                <span style={styles.scoreValue}>9.3</span>
              </div>
            </div>
          </div>

          {/* Chart Card */}
          <div style={{...styles.card, ...styles.cardWide}}>
            <div style={styles.cardHeader}>
              <h3 style={styles.cardTitle}>System Performance</h3>
              <div style={styles.chartLegend}>
                <span style={styles.legendItem}>
                  <span style={{...styles.legendDot, background: '#00d4ff'}}></span>
                  Metrics
                </span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={performanceData}>
                <defs>
                  <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#00d4ff" stopOpacity={0.8}/>
                    <stop offset="100%" stopColor="#00d4ff" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1a3a52" />
                <XAxis dataKey="month" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip 
                  contentStyle={{
                    background: '#0f1d2e',
                    border: '1px solid #1e3a52',
                    borderRadius: '8px',
                    color: '#fff'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#00d4ff" 
                  strokeWidth={3}
                  fill="url(#lineGradient)"
                  dot={{ fill: '#00d4ff', r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Activity Chart */}
          <div style={styles.card}>
            <div style={styles.cardHeader}>
              <h3 style={styles.cardTitle}>Weekly Activity</h3>
            </div>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={activityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1a3a52" />
                <XAxis dataKey="day" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip 
                  contentStyle={{
                    background: '#0f1d2e',
                    border: '1px solid #1e3a52',
                    borderRadius: '8px',
                    color: '#fff'
                  }}
                />
                <Bar dataKey="value" fill="#00d4ff" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Status List */}
          <div style={styles.card}>
            <div style={styles.cardHeader}>
              <h3 style={styles.cardTitle}>System Status</h3>
            </div>
            <div style={styles.statusList}>
              <div style={styles.statusItem}>
                <div style={styles.statusInfo}>
                  <span style={styles.statusName}>API Gateway</span>
                  <span style={styles.statusDetail}>All systems operational</span>
                </div>
                <span style={{...styles.statusBadge, background: '#10b981'}}>●</span>
              </div>
              <div style={styles.statusItem}>
                <div style={styles.statusInfo}>
                  <span style={styles.statusName}>Database</span>
                  <span style={styles.statusDetail}>Connected - 45ms</span>
                </div>
                <span style={{...styles.statusBadge, background: '#10b981'}}>●</span>
              </div>
              <div style={styles.statusItem}>
                <div style={styles.statusInfo}>
                  <span style={styles.statusName}>Cache Server</span>
                  <span style={styles.statusDetail}>High load - 89%</span>
                </div>
                <span style={{...styles.statusBadge, background: '#f59e0b'}}>●</span>
              </div>
              <div style={styles.statusItem}>
                <div style={styles.statusInfo}>
                  <span style={styles.statusName}>CDN Network</span>
                  <span style={styles.statusDetail}>Optimized</span>
                </div>
                <span style={{...styles.statusBadge, background: '#10b981'}}>●</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;700;900&family=Rajdhani:wght@300;400;500;600;700&display=swap');
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
        
        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes wave {
          0%, 100% { transform: translateY(0) scaleY(1); }
          50% { transform: translateY(-10px) scaleY(1.1); }
        }
        
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        * {
          animation: slideIn 0.6s ease-out backwards;
        }
        
        *:nth-child(1) { animation-delay: 0s; }
        *:nth-child(2) { animation-delay: 0.1s; }
        *:nth-child(3) { animation-delay: 0.2s; }
        *:nth-child(4) { animation-delay: 0.3s; }
        *:nth-child(5) { animation-delay: 0.4s; }
      `}</style>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    minHeight: '100vh',
    background: '#0a0e1a',
    fontFamily: "'Rajdhani', sans-serif",
    color: '#fff',
    position: 'relative',
    overflow: 'hidden',
  },
  bgAnimation: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'radial-gradient(circle at 20% 50%, rgba(0, 212, 255, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(102, 126, 234, 0.1) 0%, transparent 50%)',
    pointerEvents: 'none',
    zIndex: 0,
  },
  sidebar: {
    width: '280px',
    background: 'linear-gradient(180deg, #0f1624 0%, #0a0e1a 100%)',
    borderRight: '1px solid rgba(0, 212, 255, 0.1)',
    padding: '2rem 0',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    zIndex: 1,
    boxShadow: '4px 0 20px rgba(0, 0, 0, 0.5)',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    padding: '0 2rem',
    marginBottom: '3rem',
  },
  logoIcon: {
    fontSize: '2rem',
    background: 'linear-gradient(135deg, #00d4ff 0%, #667eea 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    fontFamily: "'Orbitron', sans-serif",
    fontWeight: '900',
  },
  logoText: {
    fontSize: '1.5rem',
    fontWeight: '700',
    fontFamily: "'Orbitron', sans-serif",
    letterSpacing: '2px',
    background: 'linear-gradient(135deg, #00d4ff 0%, #fff 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  nav: {
    flex: 1,
    padding: '0 1rem',
  },
  navItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    padding: '1rem 1.5rem',
    margin: '0.5rem 0',
    cursor: 'pointer',
    borderRadius: '12px',
    transition: 'all 0.3s ease',
    fontSize: '1rem',
    fontWeight: '500',
    color: '#94a3b8',
  },
  navItemActive: {
    background: 'linear-gradient(90deg, rgba(0, 212, 255, 0.15) 0%, transparent 100%)',
    borderLeft: '3px solid #00d4ff',
    color: '#00d4ff',
    transform: 'translateX(3px)',
  },
  navIcon: {
    fontSize: '1.2rem',
  },
  sidebarFooter: {
    padding: '0 2rem',
    marginTop: 'auto',
  },
  userCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    padding: '1rem',
    background: 'rgba(0, 212, 255, 0.05)',
    borderRadius: '12px',
    border: '1px solid rgba(0, 212, 255, 0.1)',
  },
  userAvatar: {
    width: '40px',
    height: '40px',
    borderRadius: '10px',
    background: 'linear-gradient(135deg, #00d4ff 0%, #667eea 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '700',
    fontSize: '0.9rem',
  },
  userName: {
    fontSize: '0.95rem',
    fontWeight: '600',
  },
  userRole: {
    fontSize: '0.8rem',
    color: '#64748b',
  },
  main: {
    flex: 1,
    padding: '2rem',
    position: 'relative',
    zIndex: 1,
    overflowY: 'auto',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem',
    paddingBottom: '2rem',
    borderBottom: '1px solid rgba(0, 212, 255, 0.1)',
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: '700',
    margin: 0,
    fontFamily: "'Orbitron', sans-serif",
    background: 'linear-gradient(135deg, #00d4ff 0%, #fff 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  subtitle: {
    fontSize: '1rem',
    color: '#64748b',
    margin: '0.5rem 0 0 0',
    fontWeight: '400',
  },
  headerRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  timeDisplay: {
    padding: '0.75rem 1.5rem',
    background: 'rgba(0, 212, 255, 0.05)',
    borderRadius: '12px',
    border: '1px solid rgba(0, 212, 255, 0.2)',
    fontFamily: "'Orbitron', monospace",
    fontSize: '1.1rem',
    fontWeight: '500',
    color: '#00d4ff',
  },
  headerButton: {
    width: '50px',
    height: '50px',
    borderRadius: '12px',
    border: '1px solid rgba(0, 212, 255, 0.2)',
    background: 'rgba(0, 212, 255, 0.05)',
    color: '#00d4ff',
    fontSize: '1.5rem',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    transition: 'all 0.3s ease',
  },
  notificationDot: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    background: '#f59e0b',
    animation: 'pulse 2s infinite',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '1.5rem',
    gridAutoFlow: 'dense',
  },
  card: {
    background: 'linear-gradient(135deg, rgba(15, 29, 46, 0.6) 0%, rgba(10, 14, 26, 0.8) 100%)',
    borderRadius: '20px',
    padding: '1.5rem',
    border: '1px solid rgba(0, 212, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    transition: 'all 0.3s ease',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
  },
  cardLarge: {
    gridColumn: 'span 2',
  },
  cardWide: {
    gridColumn: 'span 2',
  },
  cardGradient: {
    background: 'linear-gradient(135deg, rgba(0, 212, 255, 0.1) 0%, rgba(102, 126, 234, 0.1) 100%)',
    border: '1px solid rgba(0, 212, 255, 0.3)',
  },
  cardMetric: {
    display: 'flex',
    gap: '1rem',
    alignItems: 'flex-start',
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1.5rem',
  },
  cardTitle: {
    fontSize: '1.1rem',
    fontWeight: '600',
    margin: 0,
    color: '#e2e8f0',
  },
  badge: {
    padding: '0.25rem 0.75rem',
    background: 'rgba(16, 185, 129, 0.2)',
    color: '#10b981',
    borderRadius: '20px',
    fontSize: '0.75rem',
    fontWeight: '600',
    border: '1px solid rgba(16, 185, 129, 0.3)',
  },
  metricIcon: {
    width: '60px',
    height: '60px',
    borderRadius: '16px',
    background: 'linear-gradient(135deg, #00d4ff 0%, #667eea 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.8rem',
    flexShrink: 0,
  },
  metricContent: {
    flex: 1,
  },
  metricLabel: {
    fontSize: '0.9rem',
    color: '#94a3b8',
    margin: '0 0 0.5rem 0',
    fontWeight: '500',
  },
  metricValue: {
    fontSize: '2rem',
    fontWeight: '700',
    margin: '0 0 0.5rem 0',
    fontFamily: "'Orbitron', sans-serif",
    color: '#fff',
  },
  metricChange: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '0.9rem',
  },
  metricArrow: {
    color: '#10b981',
    fontSize: '1.2rem',
  },
  metricPercent: {
    color: '#10b981',
    fontWeight: '600',
  },
  progressBar: {
    width: '100%',
    height: '6px',
    background: 'rgba(0, 212, 255, 0.1)',
    borderRadius: '10px',
    overflow: 'hidden',
    marginTop: '0.5rem',
  },
  progressFill: {
    height: '100%',
    background: 'linear-gradient(90deg, #00d4ff 0%, #667eea 100%)',
    borderRadius: '10px',
    transition: 'width 1s ease',
  },
  scoreCircle: {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    border: '4px solid #00d4ff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'rgba(0, 212, 255, 0.1)',
    marginTop: '1rem',
  },
  scoreValue: {
    fontSize: '2rem',
    fontWeight: '700',
    fontFamily: "'Orbitron', sans-serif",
    color: '#00d4ff',
  },
  featureContent: {
    display: 'flex',
    gap: '2rem',
    alignItems: 'center',
  },
  jellyfish: {
    position: 'relative',
    width: '120px',
    height: '150px',
    animation: 'float 3s ease-in-out infinite',
  },
  jellyfishBody: {
    width: '100px',
    height: '100px',
    background: 'radial-gradient(circle at 30% 30%, rgba(0, 212, 255, 0.8), rgba(102, 126, 234, 0.6))',
    borderRadius: '50% 50% 45% 45%',
    position: 'relative',
    boxShadow: '0 0 40px rgba(0, 212, 255, 0.6), inset 0 0 30px rgba(255, 255, 255, 0.3)',
    border: '2px solid rgba(255, 255, 255, 0.3)',
  },
  jellyfishTentacles: {
    position: 'absolute',
    bottom: '40px',
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    gap: '4px',
    width: '80px',
    justifyContent: 'center',
  },
  tentacle: {
    width: '3px',
    height: '50px',
    background: 'linear-gradient(to bottom, rgba(0, 212, 255, 0.6), transparent)',
    animation: 'wave 2s ease-in-out infinite',
    transformOrigin: 'top',
  },
  featureStats: {
    flex: 1,
    display: 'flex',
    gap: '2rem',
  },
  featureStat: {
    flex: 1,
  },
  featureLabel: {
    display: 'block',
    fontSize: '0.9rem',
    color: '#94a3b8',
    marginBottom: '0.5rem',
    fontWeight: '500',
  },
  featureValue: {
    display: 'block',
    fontSize: '2.5rem',
    fontWeight: '700',
    fontFamily: "'Orbitron', sans-serif",
    background: 'linear-gradient(135deg, #00d4ff 0%, #fff 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  chartLegend: {
    display: 'flex',
    gap: '1rem',
  },
  legendItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '0.85rem',
    color: '#94a3b8',
  },
  legendDot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
  },
  statusList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  statusItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem',
    background: 'rgba(0, 212, 255, 0.03)',
    borderRadius: '12px',
    border: '1px solid rgba(0, 212, 255, 0.08)',
  },
  statusInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.25rem',
  },
  statusName: {
    fontSize: '0.95rem',
    fontWeight: '600',
    color: '#e2e8f0',
  },
  statusDetail: {
    fontSize: '0.85rem',
    color: '#64748b',
  },
  statusBadge: {
    fontSize: '1.5rem',
    animation: 'pulse 2s infinite',
  },
};

export default Dashboard;
