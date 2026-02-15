// Comprehensive Demo Data for All 16 Products
// This file provides realistic simulated data for each product trial

export const productDemoData = {
  // 1. AutoFlow - Workflow Automation
  autoflow: {
    workflows: [
      {
        id: 'wf_001',
        name: 'Invoice Processing',
        status: 'active',
        createdDate: '2024-01-15',
        lastRun: '2024-02-15 14:32',
        successRate: 98.5,
        totalRuns: 1247,
        steps: 5,
        nextSchedule: 'Every day at 9:00 AM',
      },
      {
        id: 'wf_002',
        name: 'Email Campaign Trigger',
        status: 'active',
        createdDate: '2024-01-20',
        lastRun: '2024-02-15 11:15',
        successRate: 99.2,
        totalRuns: 856,
        steps: 3,
        nextSchedule: 'Every 6 hours',
      },
      {
        id: 'wf_003',
        name: 'Data Sync to CRM',
        status: 'paused',
        createdDate: '2024-02-05',
        lastRun: '2024-02-10 16:45',
        successRate: 95.8,
        totalRuns: 234,
        steps: 7,
        nextSchedule: 'Paused',
      },
    ],
    stats: {
      totalWorkflows: 12,
      activeWorkflows: 9,
      totalExecutions: 45231,
      successRate: 97.8,
      monthlyExecutions: 8234,
    },
    recentLogs: [
      { timestamp: '2024-02-15 14:32:01', workflow: 'Invoice Processing', status: 'Success', duration: '2.34s' },
      { timestamp: '2024-02-15 11:15:23', workflow: 'Email Campaign', status: 'Success', duration: '1.12s' },
      { timestamp: '2024-02-14 09:00:45', workflow: 'Invoice Processing', status: 'Success', duration: '2.18s' },
    ],
  },

  // 2. AppointmentPro - Scheduling
  appointmentpro: {
    calendar: {
      upcomingAppointments: [
        {
          id: 'apt_001',
          clientName: 'Sarah Johnson',
          service: 'Initial Consultation',
          date: '2024-02-16',
          time: '10:00 AM',
          duration: '60 min',
          status: 'confirmed',
          notes: 'First time client, insurance verification needed',
        },
        {
          id: 'apt_002',
          clientName: 'Michael Chen',
          service: 'Follow-up Visit',
          date: '2024-02-16',
          time: '2:00 PM',
          duration: '30 min',
          status: 'confirmed',
          notes: 'Routine checkup',
        },
        {
          id: 'apt_003',
          clientName: 'Emma Wilson',
          service: 'Procedure',
          date: '2024-02-17',
          time: '11:30 AM',
          duration: '90 min',
          status: 'pending',
          notes: 'Pre-procedure consultation completed',
        },
      ],
      todayStats: {
        appointments: 8,
        completed: 6,
        noShows: 1,
        pending: 1,
      },
    },
    clients: [
      { id: 'cl_001', name: 'Sarah Johnson', email: 'sarah@example.com', phone: '(555) 123-4567', totalVisits: 5 },
      { id: 'cl_002', name: 'Michael Chen', email: 'mchen@example.com', phone: '(555) 234-5678', totalVisits: 12 },
      { id: 'cl_003', name: 'Emma Wilson', email: 'ewilson@example.com', phone: '(555) 345-6789', totalVisits: 3 },
    ],
    stats: {
      totalClients: 247,
      monthlyAppointments: 856,
      noShowRate: 3.2,
      avgRating: 4.7,
      revenue: '$34,560',
    },
  },

  // 3. TradeBotElite - Advanced Trading
  tradebotelite: {
    portfolio: {
      totalValue: '$125,400.50',
      dayChange: '+$2,340.25 (+1.87%)',
      yearChange: '+$28,900.50 (+29.95%)',
      allocations: [
        { symbol: 'AAPL', shares: 50, value: '$8,450', allocation: '6.7%', change: '+2.3%' },
        { symbol: 'MSFT', shares: 35, value: '$12,880', allocation: '10.3%', change: '+1.8%' },
        { symbol: 'TSLA', shares: 20, value: '$6,200', allocation: '4.9%', change: '-0.5%' },
        { symbol: 'GOOGLE', shares: 15, value: '$18,900', allocation: '15.1%', change: '+3.2%' },
        { symbol: 'BRK.B', shares: 40, value: '$23,600', allocation: '18.8%', change: '+0.9%' },
      ],
    },
    activeStrategies: [
      {
        name: 'Momentum Strategy',
        status: 'active',
        winRate: 62.3,
        totalTrades: 156,
        netProfit: '$4,230.50',
        lastTrade: '2024-02-15 14:32',
      },
      {
        name: 'Mean Reversion',
        status: 'active',
        winRate: 55.8,
        totalTrades: 98,
        netProfit: '$2,145.75',
        lastTrade: '2024-02-15 13:15',
      },
    ],
    stats: {
      monthlyReturn: '8.5%',
      sharpeRatio: 1.89,
      maxDrawdown: '-12.3%',
      totalTrades: 254,
    },
  },

  // 4. CryptoBot Pro - Crypto Trading
  cryptobotpro: {
    portfolio: {
      totalValue: '$45,230.75',
      dayChange: '+$1,230.50 (+2.78%)',
      holdings: [
        { symbol: 'BTC', amount: 0.75, value: '$32,100', allocation: '70.9%', change: '+3.2%' },
        { symbol: 'ETH', amount: 5.2, value: '$9,880', allocation: '21.8%', change: '+2.1%' },
        { symbol: 'SOL', amount: 50, value: '$2,450', allocation: '5.4%', change: '+1.5%' },
        { symbol: 'ADA', amount: 1200, value: '$800.40', allocation: '1.8%', change: '-0.8%' },
      ],
    },
    activeExchanges: [
      { name: 'Binance', status: 'connected', balance: '$25,000', lastSync: '2024-02-15 14:35' },
      { name: 'Coinbase', status: 'connected', balance: '$15,000', lastSync: '2024-02-15 14:30' },
      { name: 'Kraken', status: 'connected', balance: '$5,230.75', lastSync: '2024-02-15 14:33' },
    ],
    signals: [
      { timestamp: '2024-02-15 14:45', symbol: 'BTC', signal: 'Buy', strength: 'Strong', price: '$42,850' },
      { timestamp: '2024-02-15 13:20', symbol: 'ETH', signal: 'Hold', strength: 'Medium', price: '$1,898.50' },
    ],
    stats: {
      monthlyReturn: '12.4%',
      winRate: 58.9,
      totalTrades: 312,
    },
  },

  // 5. DataVault - Secure Data Management
  datavault: {
    vaults: [
      {
        id: 'vault_001',
        name: 'Production DB',
        status: 'encrypted',
        size: '2.3 GB',
        itemCount: 15234,
        lastBackup: '2024-02-15 04:30',
        encryption: 'AES-256',
        accessLevel: 'High',
      },
      {
        id: 'vault_002',
        name: 'API Keys & Credentials',
        status: 'encrypted',
        size: '125 MB',
        itemCount: 342,
        lastBackup: '2024-02-15 02:15',
        encryption: 'AES-256',
        accessLevel: 'Critical',
      },
      {
        id: 'vault_003',
        name: 'Client Contracts',
        status: 'encrypted',
        size: '890 MB',
        itemCount: 567,
        lastBackup: '2024-02-15 01:00',
        encryption: 'AES-256',
        accessLevel: 'High',
      },
    ],
    stats: {
      totalSize: '3.3 GB',
      totalItems: 16143,
      encryptionStatus: '100%',
      backupStatus: 'Current',
      complianceStatus: 'GDPR+HIPAA Compliant',
    },
    auditLog: [
      { timestamp: '2024-02-15 14:32', action: 'Access', user: 'admin', resource: 'Production DB', status: 'Success' },
      { timestamp: '2024-02-15 12:15', action: 'Backup', user: 'system', resource: 'All Vaults', status: 'Success' },
    ],
  },

  // 6. InsightHub - BI Dashboard
  insighthub: {
    dashboards: [
      {
        id: 'dash_001',
        name: 'Sales Performance',
        status: 'active',
        lastUpdated: '2024-02-15 14:35',
        viewers: 23,
        charts: 8,
      },
      {
        id: 'dash_002',
        name: 'Customer Analytics',
        status: 'active',
        lastUpdated: '2024-02-15 14:30',
        viewers: 45,
        charts: 12,
      },
    ],
    keyMetrics: {
      monthlyRevenue: '$145,230.50',
      revenueGrowth: '+23.4%',
      activeCustomers: 1247,
      customerRetention: '87.3%',
      avgOrderValue: '$342.50',
      conversionRate: '3.7%',
    },
    charts: {
      revenueByMonth: [
        { month: 'Jan', value: 120000 },
        { month: 'Feb', value: 145000 },
      ],
      customersBySource: {
        organic: 45.3,
        paid: 32.1,
        referral: 15.2,
        direct: 7.4,
      },
    },
    stats: {
      totalUsers: 2400,
      activeToday: 567,
    },
  },

  // 7. AIAssist - AI Assistant
  aiassist: {
    conversations: [
      {
        id: 'conv_001',
        topic: 'Customer onboarding process optimization',
        messages: 12,
        sentiment: 'positive',
        resolved: true,
        createdDate: '2024-02-15',
      },
      {
        id: 'conv_002',
        topic: 'Marketing campaign analysis',
        messages: 8,
        sentiment: 'neutral',
        resolved: false,
        createdDate: '2024-02-14',
      },
    ],
    capabilities: [
      { name: 'Document Analysis', status: 'active', accuracy: '94.2%' },
      { name: 'Sentiment Analysis', status: 'active', accuracy: '91.5%' },
      { name: 'Content Generation', status: 'active', accuracy: '88.7%' },
      { name: 'Data Extraction', status: 'active', accuracy: '96.1%' },
    ],
    stats: {
      totalConversations: 342,
      avgResolutionTime: '2.4 min',
      userSatisfaction: 4.6,
      activeUsers: 87,
    },
  },

  // 8. ChatGPT Enterprise - Enterprise AI
  chatgptenterprise: {
    deployments: [
      {
        id: 'deploy_001',
        name: 'Support Chat',
        status: 'active',
        users: 523,
        messagesPerDay: 8234,
        avgLatency: '234ms',
        costPerMonth: '$1500',
      },
      {
        id: 'deploy_002',
        name: 'Content Generation',
        status: 'active',
        users: 156,
        messagesPerDay: 2341,
        avgLatency: '567ms',
        costPerMonth: '$800',
      },
    ],
    stats: {
      totalMessages: 125000,
      avgSatisfaction: 4.7,
      uptime: '99.97%',
      monthlyUsers: 1200,
    },
  },

  // 9. CodeDeploy - CI/CD
  codedeploy: {
    pipelines: [
      {
        id: 'pipe_001',
        name: 'Frontend Deploy',
        status: 'active',
        lastDeployment: '2024-02-15 14:20',
        deploymentCount: 234,
        successRate: 98.3,
        avgDeployTime: '3.2 min',
      },
      {
        id: 'pipe_002',
        name: 'Backend API Deploy',
        status: 'active',
        lastDeployment: '2024-02-15 13:45',
        deploymentCount: 189,
        successRate: 97.8,
        avgDeployTime: '5.1 min',
      },
    ],
    environments: [
      { name: 'Staging', status: 'healthy', lastUpdate: '2024-02-15 14:15' },
      { name: 'Production', status: 'healthy', lastUpdate: '2024-02-15 14:20' },
    ],
    stats: {
      totalDeployments: 423,
      totalFailures: 8,
      avgDeployTime: '4.1 min',
    },
  },

  // 10. CloudMonitor - Monitoring
  cloudmonitor: {
    services: [
      {
        id: 'svc_001',
        name: 'Web Server',
        status: 'healthy',
        uptime: '99.95%',
        avgLatency: '234ms',
        requests: '234K',
        errorRate: '0.02%',
      },
      {
        id: 'svc_002',
        name: 'Database',
        status: 'healthy',
        uptime: '99.99%',
        avgLatency: '45ms',
        queries: '856K',
        errorRate: '0.001%',
      },
      {
        id: 'svc_003',
        name: 'Cache Layer',
        status: 'healthy',
        uptime: '99.88%',
        avgLatency: '2ms',
        hitRate: '94.3%',
        errorRate: '0.05%',
      },
    ],
    alerts: [
      { severity: 'warning', message: 'High memory usage on Server 3', timestamp: '2024-02-15 14:10' },
      { severity: 'info', message: 'Maintenance window scheduled', timestamp: '2024-02-14 10:00' },
    ],
    stats: {
      totalServices: 12,
      healthyServices: 12,
      monthlyUptime: 99.94,
      monthlyAlerts: 34,
    },
  },

  // 11. MarketingMax - Marketing Automation
  marketingmax: {
    campaigns: [
      {
        id: 'camp_001',
        name: 'Winter Sale - Email',
        status: 'active',
        sent: '45,234',
        opened: '12,342',
        clicked: '3,456',
        converted: '234',
        roi: '342%',
      },
      {
        id: 'camp_002',
        name: 'Social Media Promo',
        status: 'active',
        posts: 24,
        impressions: '234K',
        engagement: '8,234',
        clicks: '2,145',
        conversions: '156',
      },
    ],
    lists: [
      { name: 'Active Customers', count: 8234, lastUpdated: '2024-02-15' },
      { name: 'Trial Users', count: 3234, lastUpdated: '2024-02-15' },
      { name: 'Leads', count: 12450, lastUpdated: '2024-02-15' },
    ],
    stats: {
      totalContacts: 45000,
      emailsSent: 234567,
      avgOpenRate: '28.3%',
      avgClickRate: '4.5%',
    },
  },

  // 12. SEO Optimizer - SEO
  seooptimizer: {
    sites: [
      {
        id: 'site_001',
        domain: 'yoursite.com',
        rank: '#12 (Target KW)',
        traffic: '45K/month',
        estimatedValue: '$125K',
        health: '94/100',
        indexedPages: '2,342',
      },
    ],
    keywords: [
      { keyword: 'Product Management Software', rank: 5, volume: 8900, difficulty: 'Hard', trend: 'Up' },
      { keyword: 'Team Collaboration Tools', rank: 12, volume: 5600, difficulty: 'Medium', trend: 'Up' },
      { keyword: 'Automation Platform', rank: 8, volume: 12000, difficulty: 'Hard', trend: 'Stable' },
    ],
    backlinks: {
      total: 1234,
      referencingDomains: 567,
      qualityScore: 7.8,
      toxicLinks: 3,
    },
    stats: {
      monthlyTraffic: 45000,
      estimatedRevenue: '$2350',
      healthScore: 94,
    },
  },

  // 13. FinanceFlow - Accounting
  financeflow: {
    invoices: [
      {
        id: 'inv_001',
        number: 'INV-2024-001',
        client: 'ABC Corp',
        amount: '$5,234.50',
        status: 'paid',
        dueDate: '2024-02-28',
        sentDate: '2024-01-28',
      },
      {
        id: 'inv_002',
        number: 'INV-2024-002',
        client: 'XYZ Ltd',
        amount: '$8,900.00',
        status: 'pending',
        dueDate: '2024-02-20',
        sentDate: '2024-01-20',
      },
    ],
    expenses: [
      { id: 'exp_001', description: 'Office Supplies', amount: '$234.50', date: '2024-02-15', category: 'Supplies' },
      { id: 'exp_002', description: 'Cloud Services', amount: '$500.00', date: '2024-02-14', category: 'IT' },
    ],
    stats: {
      monthlyRevenue: '$45,234',
      monthlyExpenses: '$12,340',
      netIncome: '$32,894',
      outstandingInvoices: '$28,345',
    },
  },

  // 14. InvestmentAnalyzer - Investment Portfolio
  investmentanalyzer: {
    portfolio: {
      totalValue: '$450,320.50',
      ytdReturn: '+15.3%',
      riskLevel: 'Moderate',
      diversification: 'Good',
      allocations: [
        { assetClass: 'Stocks', allocation: 60, value: '$270,192' },
        { assetClass: 'Bonds', allocation: 25, value: '$112,580' },
        { assetClass: 'Real Estate', allocation: 10, value: '$45,032' },
        { assetClass: 'Crypto', allocation: 5, value: '$22,516' },
      ],
    },
    recommendations: [
      { action: 'Rebalance', reason: 'Stocks at 62% of portfolio', impact: 'Reduce risk by 2-3%' },
      { action: 'Diversify', reason: 'Tech stocks at 45% of holdings', impact: 'Improve resilience' },
    ],
    stats: {
      annualReturn: 9.2,
      sharpeRatio: 1.34,
      maxDrawdown: -8.5,
      yearsOfData: 10,
    },
  },

  // 15. CRMSync - Customer Relationship Management
  crmsync: {
    contacts: [
      {
        id: 'cont_001',
        name: 'John Smith',
        company: 'Tech Industries',
        email: 'john@tech.com',
        phone: '(555) 123-4567',
        status: 'Active',
        lastInteraction: '2024-02-15',
        value: '$45,000',
      },
      {
        id: 'cont_002',
        name: 'Sarah Johnson',
        company: 'Global Solutions',
        email: 'sarah@global.com',
        phone: '(555) 234-5678',
        status: 'Active',
        lastInteraction: '2024-02-14',
        value: '$78,500',
      },
    ],
    deals: [
      {
        id: 'deal_001',
        name: 'Enterprise Software License',
        value: '$125,000',
        stage: 'Negotiation',
        probability: '75%',
        closeDate: '2024-02-28',
      },
    ],
    stats: {
      totalContacts: 2345,
      activeDeals: 23,
      pipelineValue: '$2.3M',
      conversionRate: 34.2,
    },
  },

  // 16. SupportHub - Customer Support
  supporthub: {
    tickets: [
      {
        id: 'tk_001',
        title: 'Integration Help Needed',
        priority: 'High',
        status: 'open',
        customer: 'ABC Corp',
        created: '2024-02-15 10:30',
        updated: '2024-02-15 14:15',
        assignee: 'Support Team - Maria',
      },
      {
        id: 'tk_002',
        title: 'Feature Request: Dark Mode',
        priority: 'Low',
        status: 'open',
        customer: 'XYZ Ltd',
        created: '2024-02-14 09:15',
        updated: '2024-02-15 11:00',
        assignee: 'Product Team',
      },
      {
        id: 'tk_003',
        title: 'Login Issues Resolved',
        priority: 'Medium',
        status: 'closed',
        customer: 'Global Inc',
        created: '2024-02-13',
        updated: '2024-02-14 16:30',
        assignee: 'Support Team - John',
      },
    ],
    stats: {
      openTickets: 45,
      avgResolutionTime: '2.4 hours',
      satisfactionRating: 4.6,
      teamMembers: 8,
      ticketsThisMonth: 234,
    },
  },
};

export default productDemoData;
