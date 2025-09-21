"use client"

import { useState, useEffect } from "react"
import "./index.css"

const App = () => {
  const [monitors, setMonitors] = useState([])
  const [stats, setStats] = useState({
    total: 258,
    down: 27,
    critical: 2,
    trouble: 32,
    up: 63,
    confirmedAnomalies: 0,
    maintenance: 0,
    configurationErrors: 12,
    discoveryInProgress: 0,
    suspendedMonitors: 122,
  })
  const [selectedView, setSelectedView] = useState("dashboard")
  const [lastUpdate, setLastUpdate] = useState(new Date())
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")

  useEffect(() => {
    const generateMockMonitors = () => {
      const mockMonitors = [
        {
          id: 1,
          name: "172.21.173.175",
          type: "VMware vCenter",
          status: "up",
          performance: "297 ms",
          lastPolled: new Date(Date.now() - 5 * 60 * 1000),
          tags: ["iacsfraud-mediafire", "demo-stage1", "demo-stage2"],
          location: "US East",
          uptime: "99.9%",
        },
        {
          id: 2,
          name: "br",
          type: "Brand Reputation",
          status: "up",
          performance: "-",
          lastPolled: new Date(Date.now() - 5 * 60 * 60 * 1000),
          tags: [],
          location: "Global",
          uptime: "100%",
        },
        {
          id: 3,
          name: "Brand Reputation - https://cnn.com",
          type: "Brand Reputation",
          status: "up",
          performance: "-",
          lastPolled: new Date(Date.now() - 5 * 60 * 60 * 1000),
          tags: [],
          location: "Global",
          uptime: "99.8%",
        },
        {
          id: 4,
          name: "Brand Reputation - https://commercial.cnn.com",
          type: "Brand Reputation",
          status: "up",
          performance: "-",
          lastPolled: new Date(Date.now() - 5 * 60 * 60 * 1000),
          tags: [],
          location: "Global",
          uptime: "99.7%",
        },
        {
          id: 5,
          name: "Brand Reputation - https://edition.cnn.com",
          type: "Brand Reputation",
          status: "up",
          performance: "-",
          lastPolled: new Date(Date.now() - 5 * 60 * 60 * 1000),
          tags: [],
          location: "Global",
          uptime: "99.9%",
        },
        {
          id: 6,
          name: "Brand Reputation - https://money.cnn.com",
          type: "Brand Reputation",
          status: "up",
          performance: "-",
          lastPolled: new Date(Date.now() - 5 * 60 * 60 * 1000),
          tags: [],
          location: "Global",
          uptime: "99.6%",
        },
        {
          id: 7,
          name: "Child Host Resource Pool",
          type: "VMware Resource Pool",
          status: "up",
          performance: "-",
          lastPolled: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
          tags: ["ESX:172.21.1..."],
          location: "US East",
          uptime: "99.9%",
        },
        {
          id: 8,
          name: "cnn",
          type: "Website",
          status: "up",
          performance: "297 ms",
          lastPolled: new Date(Date.now() - 4 * 60 * 60 * 1000),
          tags: [],
          location: "Global",
          uptime: "99.8%",
        },
        {
          id: 9,
          name: "Defacement - https://cnn.com",
          type: "Website Defacement",
          status: "up",
          performance: "-",
          lastPolled: new Date(Date.now() - 5 * 60 * 60 * 1000),
          tags: [],
          location: "Global",
          uptime: "100%",
        },
        {
          id: 10,
          name: "DFS_down",
          type: "Server Monitor",
          status: "down",
          performance: "Timeout",
          lastPolled: new Date(Date.now() - 2 * 60 * 60 * 1000),
          tags: [],
          location: "US West",
          uptime: "85.2%",
        },
        {
          id: 11,
          name: "API Gateway Health",
          type: "API Monitor",
          status: "critical",
          performance: "5.2s",
          lastPolled: new Date(Date.now() - 10 * 60 * 1000),
          tags: ["production", "critical"],
          location: "EU West",
          uptime: "92.1%",
        },
        {
          id: 12,
          name: "Database Connection Pool",
          type: "Database Monitor",
          status: "trouble",
          performance: "High Load",
          lastPolled: new Date(Date.now() - 15 * 60 * 1000),
          tags: ["database", "performance"],
          location: "US Central",
          uptime: "96.8%",
        },
      ]

      setMonitors(mockMonitors)
      setLastUpdate(new Date())
    }

    generateMockMonitors()
    const interval = setInterval(generateMockMonitors, 30000) // Update every 30 seconds

    return () => clearInterval(interval)
  }, [])

  const getStatusClass = (status) => {
    switch (status) {
      case "up":
        return "status-up"
      case "down":
        return "status-down"
      case "critical":
        return "status-critical"
      case "trouble":
        return "status-trouble"
      default:
        return "status-unknown"
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "up":
        return "✓"
      case "down":
        return "✗"
      case "critical":
        return "!"
      case "trouble":
        return "⚠"
      default:
        return "?"
    }
  }

  const formatTime = (date) => {
    const now = new Date()
    const diff = Math.floor((now - date) / 1000)

    if (diff < 60) return `${diff}s ago`
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
    return `${Math.floor(diff / 86400)}d ago`
  }

  const filteredMonitors = monitors.filter((monitor) => {
    const matchesSearch =
      monitor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      monitor.type.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === "all" || monitor.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const sidebarItems = [
    { id: "dashboard", icon: "🏠", label: "Dashboard", active: true },
    { id: "monitors", icon: "📊", label: "Monitors" },
    { id: "monitor-groups", icon: "📁", label: "Monitor Groups" },
    { id: "dashboards", icon: "📈", label: "Dashboards" },
    { id: "outages", icon: "⚠️", label: "Outages" },
    { id: "anomaly-dashboard", icon: "🔍", label: "Zia Anomaly Dashboard", highlight: true },
    { id: "schedule-maintenance", icon: "🔧", label: "Schedule Maintenance" },
    { id: "schedule-automation", icon: "⚙️", label: "Schedule IT Automation" },
    { id: "log-report", icon: "📋", label: "Log Report" },
    { id: "alert-logs", icon: "🚨", label: "Alert Logs" },
    { id: "it-automation-logs", icon: "🤖", label: "IT Automation Logs" },
    { id: "status-page", icon: "📄", label: "Status Page" },
    { id: "operations-dashboard", icon: "🎛️", label: "Operations Dashboard" },
  ]

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="logo">
            <span className="logo-icon">📊</span>
            <span className="logo-text">Sentinel AI</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          {sidebarItems.map((item) => (
            <div
              key={item.id}
              className={`nav-item ${item.active ? "active" : ""} ${item.highlight ? "highlight" : ""}`}
              onClick={() => setSelectedView(item.id)}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </div>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="user-info">
            <div className="user-avatar">A</div>
            <div className="user-details">
              <div className="user-name">Admin</div>
              <div className="user-role">Administrator</div>
            </div>
          </div>
        </div>
      </aside>

      <main className="main-content">
        <header className="main-header">
          <div className="header-left">
            <h1 className="page-title">Monitor Status</h1>
            <p className="last-update">Last updated {formatTime(lastUpdate)}</p>
          </div>

          <div className="header-center">
            <div className="search-container">
              <input
                type="text"
                placeholder="Search monitors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              <span className="search-icon">🔍</span>
            </div>
          </div>

          <div className="header-right">
            <div className="header-actions">
              <button className="btn-filter">🔽</button>
              <button className="btn-grid">⊞</button>
              <button className="btn-add">+ Add Monitor</button>
            </div>
            <div className="plan-info">
              <div className="plan-badge">Premier Plan</div>
              <div className="plan-details">
                <div>Basic Monitors: 139/275</div>
                <div>Advanced Monitors: 15/25</div>
                <div>Alert Credits: 497 remaining</div>
              </div>
            </div>
          </div>
        </header>

        <section className="stats-overview">
          <div className="stats-circles">
            <div className="stat-circle down">
              <div className="circle-content">
                <div className="stat-number">{stats.down}</div>
                <div className="stat-label">Down</div>
              </div>
            </div>
            <div className="stat-circle critical">
              <div className="circle-content">
                <div className="stat-number">{stats.critical}</div>
                <div className="stat-label">Critical</div>
              </div>
            </div>
            <div className="stat-circle trouble">
              <div className="circle-content">
                <div className="stat-number">{stats.trouble}</div>
                <div className="stat-label">Trouble</div>
              </div>
            </div>
            <div className="stat-circle up">
              <div className="circle-content">
                <div className="stat-number">{stats.up}</div>
                <div className="stat-label">Up</div>
              </div>
            </div>
            <div className="stat-circle confirmed">
              <div className="circle-content">
                <div className="stat-number">{stats.confirmedAnomalies}</div>
                <div className="stat-label">Confirmed Anomalies</div>
              </div>
            </div>
          </div>

          <div className="stats-summary">
            <div className="summary-item">
              <div className="summary-number">{stats.total}</div>
              <div className="summary-label">Total Monitors</div>
            </div>
            <div className="summary-item">
              <div className="summary-number">{stats.maintenance}</div>
              <div className="summary-label">Maintenance</div>
            </div>
            <div className="summary-item">
              <div className="summary-number">{stats.configurationErrors}</div>
              <div className="summary-label">Configuration Error(s)</div>
            </div>
            <div className="summary-item">
              <div className="summary-number">{stats.discoveryInProgress}</div>
              <div className="summary-label">Discovery in Progress</div>
            </div>
            <div className="summary-item">
              <div className="summary-number">{stats.suspendedMonitors}</div>
              <div className="summary-label">Suspended Monitors</div>
            </div>
          </div>
        </section>

        <section className="monitors-section">
          <div className="section-header">
            <div className="section-title">
              <h2>Monitor Details</h2>
              <div className="filter-tabs">
                <button
                  className={`filter-tab ${filterStatus === "all" ? "active" : ""}`}
                  onClick={() => setFilterStatus("all")}
                >
                  All
                </button>
                <button
                  className={`filter-tab ${filterStatus === "up" ? "active" : ""}`}
                  onClick={() => setFilterStatus("up")}
                >
                  Up
                </button>
                <button
                  className={`filter-tab ${filterStatus === "down" ? "active" : ""}`}
                  onClick={() => setFilterStatus("down")}
                >
                  Down
                </button>
                <button
                  className={`filter-tab ${filterStatus === "critical" ? "active" : ""}`}
                  onClick={() => setFilterStatus("critical")}
                >
                  Critical
                </button>
              </div>
            </div>
            <button className="btn-view-all">View All</button>
          </div>

          <div className="monitors-table">
            <div className="table-header">
              <div className="col-status">Status</div>
              <div className="col-name">Monitor Name ↕</div>
              <div className="col-type">Type</div>
              <div className="col-performance">Performance</div>
              <div className="col-uptime">Uptime</div>
              <div className="col-location">Location</div>
              <div className="col-last-polled">Last Polled ↕</div>
              <div className="col-actions">Actions</div>
            </div>

            <div className="table-body">
              {filteredMonitors.map((monitor) => (
                <div key={monitor.id} className="table-row">
                  <div className="col-status">
                    <div className={`status-indicator ${getStatusClass(monitor.status)}`}>
                      {getStatusIcon(monitor.status)}
                    </div>
                  </div>
                  <div className="col-name">
                    <div className="monitor-name">{monitor.name}</div>
                    <div className="monitor-tags">
                      {monitor.tags.map((tag, index) => (
                        <span key={index} className="tag">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="col-type">
                    <span className="monitor-type">{monitor.type}</span>
                  </div>
                  <div className="col-performance">
                    <span className={`performance ${monitor.status === "down" ? "error" : ""}`}>
                      {monitor.performance}
                    </span>
                  </div>
                  <div className="col-uptime">
                    <span className="uptime">{monitor.uptime}</span>
                  </div>
                  <div className="col-location">
                    <span className="location">{monitor.location}</span>
                  </div>
                  <div className="col-last-polled">
                    <span className="time">{formatTime(monitor.lastPolled)}</span>
                  </div>
                  <div className="col-actions">
                    <button className="action-btn">⋯</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
