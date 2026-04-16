import React, { useState, useEffect } from "react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const ApexDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Data for visualizations
  const revenueData = [
    { month: "Jan", revenue: 45000, expenses: 32000 },
    { month: "Feb", revenue: 52000, expenses: 35000 },
    { month: "Mar", revenue: 48000, expenses: 33000 },
    { month: "Apr", revenue: 61000, expenses: 38000 },
    { month: "May", revenue: 55000, expenses: 36000 },
    { month: "Jun", revenue: 67000, expenses: 40000 },
  ];

  const categoryData = [
    { name: "Design", value: 35, color: "#FF6B35" },
    { name: "Development", value: 45, color: "#F7931E" },
    { name: "Marketing", value: 20, color: "#FDC830" },
  ];

  const projectData = [
    { name: "Website Redesign", progress: 85, status: "active" },
    { name: "Mobile App", progress: 60, status: "active" },
    { name: "Brand Identity", progress: 100, status: "complete" },
    { name: "API Integration", progress: 40, status: "active" },
  ];

  const activityData = [
    { time: "09:00", tasks: 5 },
    { time: "12:00", tasks: 12 },
    { time: "15:00", tasks: 8 },
    { time: "18:00", tasks: 15 },
    { time: "21:00", tasks: 6 },
  ];

  return (
    <div style={styles.container}>
      {/* Brutalist Header */}
      <header style={styles.header}>
        <div style={styles.headerTop}>
          <div style={styles.logoSection}>
            <h1 style={styles.logo}>APEX</h1>
            <div style={styles.tagline}>ANALYTICS PLATFORM</div>
          </div>
          <div style={styles.headerRight}>
            <div style={styles.dateBox}>
              <div style={styles.date}>
                {time.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}
              </div>
              <div style={styles.time}>
                {time.toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            </div>
            <div style={styles.statusIndicator}>
              <div style={styles.statusDot}></div>
              <span>LIVE</span>
            </div>
          </div>
        </div>

        <nav style={styles.nav}>
          {["OVERVIEW", "ANALYTICS", "PROJECTS", "REPORTS"].map((tab) => (
            <button
              key={tab}
              style={{
                ...styles.navButton,
                ...(activeTab === tab.toLowerCase()
                  ? styles.navButtonActive
                  : {}),
              }}
              onClick={() => setActiveTab(tab.toLowerCase())}>
              {tab}
            </button>
          ))}
        </nav>
      </header>

      {/* Main Content Area */}
      <main style={styles.main}>
        {/* Hero Stats Section */}
        <section style={styles.heroSection}>
          <div style={styles.heroCard}>
            <div style={styles.heroLabel}>TOTAL REVENUE</div>
            <div style={styles.heroValue}>$328,000</div>
            <div style={styles.heroChange}>
              <span style={styles.changeArrow}>▲</span>
              <span style={styles.changePercent}>23.4%</span>
              <span style={styles.changeText}>vs last month</span>
            </div>
          </div>

          <div style={styles.heroCard}>
            <div style={styles.heroLabel}>ACTIVE PROJECTS</div>
            <div style={styles.heroValue}>42</div>
            <div style={styles.heroMeta}>
              <span style={styles.metaItem}>28 ongoing</span>
              <span style={styles.metaSeparator}>•</span>
              <span style={styles.metaItem}>14 completed</span>
            </div>
          </div>

          <div style={styles.heroCard}>
            <div style={styles.heroLabel}>COMPLETION RATE</div>
            <div style={styles.heroValue}>89%</div>
            <div style={styles.rateBar}>
              <div style={{ ...styles.rateBarFill, width: "89%" }}></div>
            </div>
          </div>
        </section>

        {/* Main Grid */}
        <div style={styles.gridContainer}>
          {/* Revenue Chart - Large */}
          <div style={{ ...styles.card, ...styles.cardLarge }}>
            <div style={styles.cardHeader}>
              <div>
                <h3 style={styles.cardTitle}>REVENUE OVERVIEW</h3>
                <p style={styles.cardSubtitle}>Last 6 months performance</p>
              </div>
              <div style={styles.cardActions}>
                <button style={styles.actionButton}>EXPORT</button>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient
                    id="revenueGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1">
                    <stop offset="0%" stopColor="#FF6B35" stopOpacity={0.8} />
                    <stop offset="100%" stopColor="#FF6B35" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient
                    id="expenseGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1">
                    <stop offset="0%" stopColor="#000" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#000" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis
                  dataKey="month"
                  stroke="#666"
                  style={{ fontSize: "12px", fontWeight: "700" }}
                />
                <YAxis
                  stroke="#666"
                  style={{ fontSize: "12px", fontWeight: "700" }}
                />
                <Tooltip
                  contentStyle={{
                    background: "#fff",
                    border: "3px solid #000",
                    borderRadius: "0",
                    fontWeight: "700",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#FF6B35"
                  strokeWidth={3}
                  fill="url(#revenueGradient)"
                />
                <Area
                  type="monotone"
                  dataKey="expenses"
                  stroke="#000"
                  strokeWidth={3}
                  fill="url(#expenseGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
            <div style={styles.chartLegend}>
              <div style={styles.legendItem}>
                <div
                  style={{ ...styles.legendBox, background: "#FF6B35" }}></div>
                <span>REVENUE</span>
              </div>
              <div style={styles.legendItem}>
                <div style={{ ...styles.legendBox, background: "#000" }}></div>
                <span>EXPENSES</span>
              </div>
            </div>
          </div>

          {/* Category Distribution */}
          <div style={styles.card}>
            <div style={styles.cardHeader}>
              <h3 style={styles.cardTitle}>DISTRIBUTION</h3>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  stroke="#000"
                  strokeWidth={3}>
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div style={styles.pieLabels}>
              {categoryData.map((item) => (
                <div key={item.name} style={styles.pieLabel}>
                  <div
                    style={{ ...styles.pieDot, background: item.color }}></div>
                  <span style={styles.pieName}>{item.name}</span>
                  <span style={styles.pieValue}>{item.value}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Project Status */}
          <div style={styles.card}>
            <div style={styles.cardHeader}>
              <h3 style={styles.cardTitle}>PROJECT STATUS</h3>
            </div>
            <div style={styles.projectList}>
              {projectData.map((project, idx) => (
                <div key={idx} style={styles.projectItem}>
                  <div style={styles.projectInfo}>
                    <div style={styles.projectName}>{project.name}</div>
                    <div style={styles.projectPercent}>{project.progress}%</div>
                  </div>
                  <div style={styles.projectBar}>
                    <div
                      style={{
                        ...styles.projectBarFill,
                        width: `${project.progress}%`,
                        background:
                          project.status === "complete" ? "#4CAF50" : "#FF6B35",
                      }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Activity Heatmap */}
          <div style={styles.card}>
            <div style={styles.cardHeader}>
              <h3 style={styles.cardTitle}>TODAY'S ACTIVITY</h3>
            </div>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={activityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis
                  dataKey="time"
                  stroke="#666"
                  style={{ fontSize: "12px", fontWeight: "700" }}
                />
                <YAxis
                  stroke="#666"
                  style={{ fontSize: "12px", fontWeight: "700" }}
                />
                <Bar dataKey="tasks" fill="#000" radius={[0, 0, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Team Performance */}
          <div style={styles.card}>
            <div style={styles.cardHeader}>
              <h3 style={styles.cardTitle}>TEAM METRICS</h3>
            </div>
            <div style={styles.teamGrid}>
              <div style={styles.teamCard}>
                <div style={styles.teamNumber}>156</div>
                <div style={styles.teamLabel}>TASKS COMPLETED</div>
              </div>
              <div style={styles.teamCard}>
                <div style={styles.teamNumber}>23</div>
                <div style={styles.teamLabel}>IN PROGRESS</div>
              </div>
              <div style={styles.teamCard}>
                <div style={styles.teamNumber}>8</div>
                <div style={styles.teamLabel}>TEAM MEMBERS</div>
              </div>
              <div style={styles.teamCard}>
                <div style={styles.teamNumber}>92%</div>
                <div style={styles.teamLabel}>EFFICIENCY</div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div style={styles.card}>
            <div style={styles.cardHeader}>
              <h3 style={styles.cardTitle}>QUICK ACTIONS</h3>
            </div>
            <div style={styles.actionGrid}>
              <button style={styles.actionCard}>
                <div style={styles.actionIcon}>+</div>
                <div style={styles.actionText}>NEW PROJECT</div>
              </button>
              <button style={styles.actionCard}>
                <div style={styles.actionIcon}>↑</div>
                <div style={styles.actionText}>EXPORT DATA</div>
              </button>
              <button style={styles.actionCard}>
                <div style={styles.actionIcon}>⚡</div>
                <div style={styles.actionText}>GENERATE REPORT</div>
              </button>
              <button style={styles.actionCard}>
                <div style={styles.actionIcon}>⚙</div>
                <div style={styles.actionText}>SETTINGS</div>
              </button>
            </div>
          </div>
        </div>
      </main>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;600;700&family=Space+Mono:wght@400;700&family=Bebas+Neue&display=swap');
        
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }
        
        * {
          box-sizing: border-box;
        }
        
        button {
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        button:hover {
          transform: translateY(-2px);
        }
        
        button:active {
          transform: translateY(0);
        }
      `}</style>
    </div>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
    background: "#f5f5f5",
    fontFamily: "'IBM Plex Mono', monospace",
  },
  header: {
    background: "#fff",
    borderBottom: "6px solid #000",
    padding: "2rem 3rem",
  },
  headerTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "2rem",
  },
  logoSection: {
    animation: "slideInLeft 0.6s ease-out",
  },
  logo: {
    fontSize: "4rem",
    fontWeight: "700",
    margin: 0,
    fontFamily: "'Bebas Neue', sans-serif",
    letterSpacing: "4px",
    lineHeight: "1",
  },
  tagline: {
    fontSize: "0.75rem",
    fontWeight: "700",
    letterSpacing: "3px",
    marginTop: "0.25rem",
  },
  headerRight: {
    display: "flex",
    gap: "1.5rem",
    alignItems: "center",
  },
  dateBox: {
    padding: "0.75rem 1.5rem",
    background: "#000",
    color: "#fff",
    fontWeight: "700",
    textAlign: "center",
  },
  date: {
    fontSize: "0.85rem",
    letterSpacing: "1px",
  },
  time: {
    fontSize: "1.5rem",
    fontFamily: "'Space Mono', monospace",
    marginTop: "0.25rem",
  },
  statusIndicator: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    padding: "0.75rem 1.5rem",
    border: "3px solid #4CAF50",
    fontWeight: "700",
    fontSize: "0.85rem",
  },
  statusDot: {
    width: "12px",
    height: "12px",
    borderRadius: "50%",
    background: "#4CAF50",
    animation: "pulse 2s infinite",
  },
  nav: {
    display: "flex",
    gap: "0",
    borderTop: "3px solid #000",
    paddingTop: "1.5rem",
  },
  navButton: {
    padding: "1rem 2rem",
    background: "transparent",
    border: "3px solid transparent",
    borderBottom: "none",
    fontWeight: "700",
    fontSize: "0.9rem",
    letterSpacing: "1px",
    fontFamily: "'IBM Plex Mono', monospace",
  },
  navButtonActive: {
    background: "#FDC830",
    border: "3px solid #000",
    borderBottom: "none",
    marginBottom: "-3px",
  },
  main: {
    padding: "3rem",
    maxWidth: "1600px",
    margin: "0 auto",
  },
  heroSection: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "2rem",
    marginBottom: "3rem",
    animation: "slideInUp 0.6s ease-out",
  },
  heroCard: {
    background: "#fff",
    padding: "2.5rem",
    border: "4px solid #000",
    boxShadow: "8px 8px 0 #000",
  },
  heroLabel: {
    fontSize: "0.75rem",
    fontWeight: "700",
    letterSpacing: "2px",
    marginBottom: "1rem",
  },
  heroValue: {
    fontSize: "3.5rem",
    fontWeight: "700",
    fontFamily: "'Bebas Neue', sans-serif",
    lineHeight: "1",
    marginBottom: "1rem",
  },
  heroChange: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    fontSize: "0.9rem",
  },
  changeArrow: {
    color: "#4CAF50",
    fontSize: "1.2rem",
  },
  changePercent: {
    fontWeight: "700",
    color: "#4CAF50",
  },
  changeText: {
    color: "#666",
  },
  heroMeta: {
    display: "flex",
    gap: "1rem",
    fontSize: "0.9rem",
    color: "#666",
  },
  metaItem: {
    fontWeight: "600",
  },
  metaSeparator: {
    color: "#ccc",
  },
  rateBar: {
    height: "12px",
    background: "#e0e0e0",
    border: "2px solid #000",
    marginTop: "1rem",
  },
  rateBarFill: {
    height: "100%",
    background: "#000",
    transition: "width 1s ease",
  },
  gridContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
    gap: "2rem",
    animation: "slideInUp 0.8s ease-out",
  },
  card: {
    background: "#fff",
    border: "4px solid #000",
    padding: "2rem",
  },
  cardLarge: {
    gridColumn: "span 2",
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "1.5rem",
  },
  cardTitle: {
    fontSize: "1.1rem",
    fontWeight: "700",
    letterSpacing: "1px",
    margin: 0,
  },
  cardSubtitle: {
    fontSize: "0.85rem",
    color: "#666",
    margin: "0.5rem 0 0 0",
  },
  cardActions: {
    display: "flex",
    gap: "0.5rem",
  },
  actionButton: {
    padding: "0.5rem 1rem",
    background: "#000",
    color: "#fff",
    border: "none",
    fontWeight: "700",
    fontSize: "0.75rem",
    letterSpacing: "1px",
    fontFamily: "'IBM Plex Mono', monospace",
  },
  chartLegend: {
    display: "flex",
    gap: "2rem",
    marginTop: "1.5rem",
    paddingTop: "1.5rem",
    borderTop: "2px solid #e0e0e0",
  },
  legendItem: {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    fontSize: "0.85rem",
    fontWeight: "700",
  },
  legendBox: {
    width: "24px",
    height: "24px",
    border: "2px solid #000",
  },
  pieLabels: {
    marginTop: "1.5rem",
    display: "flex",
    flexDirection: "column",
    gap: "0.75rem",
  },
  pieLabel: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
    padding: "0.75rem",
    background: "#f5f5f5",
    border: "2px solid #e0e0e0",
  },
  pieDot: {
    width: "16px",
    height: "16px",
    border: "2px solid #000",
  },
  pieName: {
    flex: 1,
    fontWeight: "700",
    fontSize: "0.85rem",
  },
  pieValue: {
    fontWeight: "700",
    fontSize: "1.1rem",
    fontFamily: "'Space Mono', monospace",
  },
  projectList: {
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem",
  },
  projectItem: {
    display: "flex",
    flexDirection: "column",
    gap: "0.75rem",
  },
  projectInfo: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  projectName: {
    fontWeight: "700",
    fontSize: "0.9rem",
  },
  projectPercent: {
    fontWeight: "700",
    fontSize: "1rem",
    fontFamily: "'Space Mono', monospace",
  },
  projectBar: {
    height: "8px",
    background: "#e0e0e0",
    border: "2px solid #000",
  },
  projectBarFill: {
    height: "100%",
    transition: "width 0.8s ease",
  },
  teamGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "1rem",
  },
  teamCard: {
    padding: "1.5rem",
    background: "#f5f5f5",
    border: "3px solid #000",
    textAlign: "center",
  },
  teamNumber: {
    fontSize: "2.5rem",
    fontWeight: "700",
    fontFamily: "'Bebas Neue', sans-serif",
    marginBottom: "0.5rem",
  },
  teamLabel: {
    fontSize: "0.7rem",
    fontWeight: "700",
    letterSpacing: "1px",
  },
  actionGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "1rem",
  },
  actionCard: {
    padding: "2rem 1rem",
    background: "#fff",
    border: "3px solid #000",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "1rem",
  },
  actionIcon: {
    fontSize: "2.5rem",
    fontWeight: "700",
  },
  actionText: {
    fontSize: "0.7rem",
    fontWeight: "700",
    letterSpacing: "1px",
  },
};

export default ApexDashboard;
