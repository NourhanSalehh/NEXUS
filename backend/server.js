// server.js - Node.js Backend for Dashboard
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Simulated data store
let systemMetrics = {
  activeUsers: 2847,
  completionRate: 94,
  performance: 9.3,
  uptime: 99.8,
  latency: 12,
  networkStatus: 'ACTIVE'
};

let performanceHistory = [
  { month: 'Jan', value: 45, timestamp: '2024-01-01' },
  { month: 'Feb', value: 52, timestamp: '2024-02-01' },
  { month: 'Mar', value: 48, timestamp: '2024-03-01' },
  { month: 'Apr', value: 61, timestamp: '2024-04-01' },
  { month: 'May', value: 55, timestamp: '2024-05-01' },
  { month: 'Jun', value: 67, timestamp: '2024-06-01' },
  { month: 'Jul', value: 72, timestamp: '2024-07-01' },
  { month: 'Aug', value: 65, timestamp: '2024-08-01' },
  { month: 'Sep', value: 78, timestamp: '2024-09-01' },
  { month: 'Oct', value: 82, timestamp: '2024-10-01' },
  { month: 'Nov', value: 75, timestamp: '2024-11-01' },
  { month: 'Dec', value: 88, timestamp: '2024-12-01' }
];

let systemStatus = [
  { 
    id: 1,
    name: 'API Gateway',
    detail: 'All systems operational',
    status: 'operational',
    responseTime: 23
  },
  { 
    id: 2,
    name: 'Database',
    detail: 'Connected - 45ms',
    status: 'operational',
    responseTime: 45
  },
  { 
    id: 3,
    name: 'Cache Server',
    detail: 'High load - 89%',
    status: 'warning',
    load: 89
  },
  { 
    id: 4,
    name: 'CDN Network',
    detail: 'Optimized',
    status: 'operational',
    responseTime: 18
  }
];

// API Routes

// Get dashboard overview
app.get('/api/dashboard', (req, res) => {
  res.json({
    success: true,
    data: {
      metrics: systemMetrics,
      timestamp: new Date().toISOString()
    }
  });
});

// Get system metrics
app.get('/api/metrics', (req, res) => {
  // Simulate real-time fluctuation
  const metrics = {
    ...systemMetrics,
    activeUsers: systemMetrics.activeUsers + Math.floor(Math.random() * 20 - 10),
    latency: systemMetrics.latency + Math.floor(Math.random() * 10 - 5),
    timestamp: new Date().toISOString()
  };
  
  res.json({
    success: true,
    data: metrics
  });
});

// Update system metrics
app.put('/api/metrics', (req, res) => {
  const { activeUsers, completionRate, performance } = req.body;
  
  if (activeUsers !== undefined) systemMetrics.activeUsers = activeUsers;
  if (completionRate !== undefined) systemMetrics.completionRate = completionRate;
  if (performance !== undefined) systemMetrics.performance = performance;
  
  res.json({
    success: true,
    message: 'Metrics updated successfully',
    data: systemMetrics
  });
});

// Get performance history
app.get('/api/performance', (req, res) => {
  const { period = 'all' } = req.query;
  
  let filteredData = performanceHistory;
  
  if (period === 'recent') {
    filteredData = performanceHistory.slice(-3);
  }
  
  res.json({
    success: true,
    data: filteredData,
    count: filteredData.length
  });
});

// Add new performance data point
app.post('/api/performance', (req, res) => {
  const { month, value } = req.body;
  
  if (!month || !value) {
    return res.status(400).json({
      success: false,
      error: 'Month and value are required'
    });
  }
  
  const newDataPoint = {
    month,
    value,
    timestamp: new Date().toISOString()
  };
  
  performanceHistory.push(newDataPoint);
  
  res.status(201).json({
    success: true,
    message: 'Performance data added',
    data: newDataPoint
  });
});

// Get system status
app.get('/api/status', (req, res) => {
  // Simulate dynamic status updates
  const updatedStatus = systemStatus.map(service => {
    if (service.responseTime) {
      return {
        ...service,
        responseTime: service.responseTime + Math.floor(Math.random() * 10 - 5)
      };
    }
    return service;
  });
  
  res.json({
    success: true,
    data: updatedStatus,
    lastUpdated: new Date().toISOString()
  });
});

// Update specific service status
app.put('/api/status/:id', (req, res) => {
  const { id } = req.params;
  const { status, detail } = req.body;
  
  const serviceIndex = systemStatus.findIndex(s => s.id === parseInt(id));
  
  if (serviceIndex === -1) {
    return res.status(404).json({
      success: false,
      error: 'Service not found'
    });
  }
  
  if (status) systemStatus[serviceIndex].status = status;
  if (detail) systemStatus[serviceIndex].detail = detail;
  
  res.json({
    success: true,
    message: 'Service status updated',
    data: systemStatus[serviceIndex]
  });
});

// Get weekly activity data
app.get('/api/activity', (req, res) => {
  const activityData = [
    { day: 'Mon', value: Math.floor(Math.random() * 15) + 10 },
    { day: 'Tue', value: Math.floor(Math.random() * 15) + 10 },
    { day: 'Wed', value: Math.floor(Math.random() * 15) + 10 },
    { day: 'Thu', value: Math.floor(Math.random() * 15) + 15 },
    { day: 'Fri', value: Math.floor(Math.random() * 15) + 15 },
    { day: 'Sat', value: Math.floor(Math.random() * 15) + 10 },
    { day: 'Sun', value: Math.floor(Math.random() * 15) + 8 }
  ];
  
  res.json({
    success: true,
    data: activityData,
    week: new Date().toISOString().split('T')[0]
  });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    status: 'healthy',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// WebSocket simulation endpoint for real-time updates
app.get('/api/realtime', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  
  const interval = setInterval(() => {
    const data = {
      activeUsers: systemMetrics.activeUsers + Math.floor(Math.random() * 20 - 10),
      latency: systemMetrics.latency + Math.floor(Math.random() * 10 - 5),
      timestamp: new Date().toISOString()
    };
    
    res.write(`data: ${JSON.stringify(data)}\n\n`);
  }, 3000);
  
  req.on('close', () => {
    clearInterval(interval);
    res.end();
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: 'Something went wrong!',
    message: err.message
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`
╔═══════════════════════════════════════╗
║   NEXUS Dashboard Server Running      ║
║   Port: ${PORT}                          ║
║   Environment: ${process.env.NODE_ENV || 'development'}            ║
║   Time: ${new Date().toLocaleTimeString()}              ║
╚═══════════════════════════════════════╝
  `);
  console.log('\nAvailable Endpoints:');
  console.log('  GET  /api/dashboard     - Dashboard overview');
  console.log('  GET  /api/metrics       - System metrics');
  console.log('  PUT  /api/metrics       - Update metrics');
  console.log('  GET  /api/performance   - Performance history');
  console.log('  POST /api/performance   - Add performance data');
  console.log('  GET  /api/status        - System status');
  console.log('  PUT  /api/status/:id    - Update service status');
  console.log('  GET  /api/activity      - Weekly activity');
  console.log('  GET  /api/health        - Health check');
  console.log('  GET  /api/realtime      - Real-time updates (SSE)');
});

module.exports = app;
