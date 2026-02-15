// Product-Specific Trial Environment Components
// Each component provides a realistic, functional trial environment for its product

'use client';

import React, { useState, useEffect } from 'react';
import { Activity, Bell, Calendar, CheckCircle, ChevronDown, Clock, Cog, Database, Edit2, FileText, Filter, Folder, LayoutGrid, Lock, Mail, Pause, Play, Plus, Search, Server, Settings, ShieldCheck, TrendingUp, Users, Webhook, AlertCircle, BarChart3, Coins } from 'lucide-react';

// ===== 1. AutoFlow Trial Component =====
interface Workflow { id: string; name: string; status: 'active' | 'paused'; steps: number; successRate: number; }

export function AutoFlowTrialEnvironment() {
  const [workflows, setWorkflows] = useState<Workflow[]>([]);
  const [selectedWorkflow, setSelectedWorkflow] = useState<Workflow | null>(null);
  const [showNewWorkflow, setShowNewWorkflow] = useState(false);

  useEffect(() => {
    // Load demo data
    setWorkflows([
      { id: 'wf_001', name: 'Invoice Processing', status: 'active', steps: 5, successRate: 98.5 },
      { id: 'wf_002', name: 'Email Campaign Trigger', status: 'active', steps: 3, successRate: 99.2 },
      { id: 'wf_003', name: 'Data Sync to CRM', status: 'paused', steps: 7, successRate: 95.8 },
    ]);
  }, []);

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg shadow-lg p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Cog size={32} className="text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-900">AutoFlow - Workflow Automation</h2>
        </div>
        <button onClick={() => setShowNewWorkflow(true)} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2">
          <Plus size={18} /> New Workflow
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Total Workflows', value: '12' },
          const workflowRuns = [
            { id: 'run_901', workflow: 'Invoice Processing', status: 'success', duration: '2.34s', startedAt: '14:32', owner: 'Finance Ops' },
            { id: 'run_900', workflow: 'Email Campaign Trigger', status: 'success', duration: '1.12s', startedAt: '11:15', owner: 'Growth' },
            { id: 'run_899', workflow: 'Data Sync to CRM', status: 'warning', duration: '4.58s', startedAt: '09:00', owner: 'RevOps' },
          ];

          const integrations = [
            { name: 'Salesforce', type: 'CRM', status: 'connected', icon: Users },
            { name: 'Stripe', type: 'Payments', status: 'connected', icon: Database },
            { name: 'SendGrid', type: 'Email', status: 'connected', icon: Mail },
            { name: 'S3', type: 'Storage', status: 'connected', icon: Server },
          ];

          return (
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg shadow-lg p-6">
              <div className="grid grid-cols-12 gap-6">
                <aside className="col-span-12 lg:col-span-3 bg-white rounded-lg border border-gray-200 p-4">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="h-10 w-10 rounded-lg bg-blue-600 text-white flex items-center justify-center">
                      <Cog size={20} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Workspace</p>
                      <p className="font-semibold text-gray-900">AutoFlow</p>
                    </div>
                  </div>

                  <nav className="space-y-2">
                    {[
                      { label: 'Overview', icon: LayoutGrid },
                      { label: 'Workflows', icon: Folder },
                      { label: 'Runs', icon: Activity },
                      { label: 'Schedules', icon: Calendar },
                      { label: 'Approvals', icon: CheckCircle },
                      { label: 'Integrations', icon: Webhook },
                      { label: 'Settings', icon: Settings },
                    ].map((item) => (
                      <button
                        key={item.label}
                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-semibold ${
                          item.label === 'Workflows'
                            ? 'bg-blue-50 text-blue-700'
                            : 'text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        <item.icon size={16} />
                        {item.label}
                      </button>
                    ))}
                  </nav>

                  <div className="mt-8 p-4 rounded-lg bg-blue-50 border border-blue-100">
                    <div className="flex items-center gap-2 text-blue-700 font-semibold text-sm">
                      <ShieldCheck size={16} />
                      Compliance
                    </div>
                    <p className="text-xs text-blue-700 mt-2">SOC 2 ready workflows with audit logging enabled.</p>
                  </div>
                </aside>

                <section className="col-span-12 lg:col-span-9 space-y-6">
                  <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-blue-600 text-white flex items-center justify-center">
                        <Cog size={20} />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900">Workflow Operations</h2>
                        <p className="text-sm text-gray-600">Production-grade automation with audit-ready runs.</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="px-3 py-2 rounded-lg border border-gray-300 text-gray-700 text-sm font-semibold hover:bg-gray-50 flex items-center gap-2">
                        <Filter size={16} /> Filter
                      </button>
                      <button className="px-3 py-2 rounded-lg border border-gray-300 text-gray-700 text-sm font-semibold hover:bg-gray-50 flex items-center gap-2">
                        <Bell size={16} /> Alerts
                      </button>
                      <button
                        onClick={() => setShowNewWorkflow(true)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
                      >
                        <Plus size={18} /> New Workflow
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {[
                      { label: 'Active Workflows', value: '9', icon: Folder, trend: '3.2% MoM' },
                      { label: 'Runs Today', value: '842', icon: Activity, trend: '98.6% success' },
                      { label: 'Queue Latency', value: '1.8s', icon: Clock, trend: 'P95 2.6s' },
                      { label: 'System Health', value: 'Stable', icon: ShieldCheck, trend: 'No incidents' },
                    ].map((stat) => (
                      <div key={stat.label} className="bg-white p-4 rounded-lg border border-gray-200">
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-gray-500">{stat.label}</p>
                          <stat.icon size={18} className="text-blue-600" />
                        </div>
                        <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
                        <p className="text-xs text-gray-500 mt-1">{stat.trend}</p>
                      </div>
                    ))}
                  </div>

                  <div className="bg-white rounded-lg border border-gray-200">
                    <div className="flex items-center justify-between p-4 border-b border-gray-200">
                      <div>
                        <h3 className="font-semibold text-gray-900">Workflow Registry</h3>
                        <p className="text-sm text-gray-500">Managed workflows with ownership and SLAs.</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="relative">
                          <Search size={16} className="absolute left-3 top-2.5 text-gray-400" />
                          <input
                            type="text"
                            placeholder="Search workflows"
                            className="pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm"
                          />
                        </div>
                        <button className="px-3 py-2 rounded-lg border border-gray-300 text-sm font-semibold text-gray-700 hover:bg-gray-50">
                          Export
                        </button>
                      </div>
                    </div>
                    <div className="grid grid-cols-6 gap-4 p-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                      <div className="col-span-2">Workflow</div>
                      <div>Status</div>
                      <div>Owner</div>
                      <div>Steps</div>
                      <div>Success</div>
                    </div>
                    {workflows.map((wf) => (
                      <button
                        key={wf.id}
                        onClick={() => setSelectedWorkflow(wf)}
                        className={`grid grid-cols-6 gap-4 p-4 border-t border-gray-100 text-left items-center hover:bg-gray-50 ${
                          selectedWorkflow?.id === wf.id ? 'bg-blue-50' : ''
                        }`}
                      >
                        <div className="col-span-2">
                          <p className="font-semibold text-gray-900">{wf.name}</p>
                          <p className="text-xs text-gray-500">Last updated 2 hours ago</p>
                        </div>
                        <div>
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${wf.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-700'}`}>
                            {wf.status}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">Operations</div>
                        <div className="text-sm text-gray-600">{wf.steps}</div>
                        <div className="text-sm font-semibold text-gray-900">{wf.successRate}%</div>
                      </button>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-white rounded-lg border border-gray-200 p-4">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-gray-900">Execution Feed</h3>
                        <button className="text-sm text-blue-600 font-semibold">View all</button>
                      </div>
                      <div className="space-y-3">
                        {workflowRuns.map((run) => (
                          <div key={run.id} className="p-3 rounded-lg border border-gray-100 bg-gray-50">
                            <div className="flex items-start justify-between">
                              <div>
                                <p className="font-semibold text-gray-900">{run.workflow}</p>
                                <p className="text-xs text-gray-500">{run.startedAt} • Owner: {run.owner}</p>
                              </div>
                              <span className={`text-xs font-semibold px-2 py-1 rounded-full ${run.status === 'success' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                                {run.status}
                              </span>
                            </div>
                            <div className="mt-2 flex items-center gap-2 text-xs text-gray-500">
                              <Clock size={12} /> {run.duration}
                              <span>Queue latency 320ms</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-white rounded-lg border border-gray-200 p-4">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-gray-900">Active Integrations</h3>
                        <button className="text-sm text-blue-600 font-semibold">Manage</button>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        {integrations.map((integration) => (
                          <div key={integration.name} className="border border-gray-200 rounded-lg p-3">
                            <div className="flex items-center justify-between">
                              <integration.icon size={18} className="text-blue-600" />
                              <span className="text-xs font-semibold text-green-700 bg-green-100 px-2 py-1 rounded-full">
                                {integration.status}
                              </span>
                            </div>
                            <p className="font-semibold text-gray-900 mt-3">{integration.name}</p>
                            <p className="text-xs text-gray-500">{integration.type}</p>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 flex items-center justify-between rounded-lg bg-blue-50 px-3 py-2">
                        <div className="flex items-center gap-2 text-sm text-blue-700">
                          <Webhook size={14} />
                          Webhook reliability: 99.98%
                        </div>
                        <button className="text-sm font-semibold text-blue-700">Configure</button>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg border border-gray-200 p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-900">Governance and Audit</h3>
                        <p className="text-sm text-gray-500">Change control and approval history.</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="px-3 py-2 rounded-lg border border-gray-300 text-sm font-semibold text-gray-700 hover:bg-gray-50">
                          Review
                        </button>
                        <button className="px-3 py-2 rounded-lg border border-gray-300 text-sm font-semibold text-gray-700 hover:bg-gray-50">
                          Export logs
                        </button>
                      </div>
                    </div>
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                      {[
                        { label: 'Approval Queue', value: '4 pending', icon: FileText },
                        { label: 'Policy Violations', value: '0 open', icon: ShieldCheck },
                        { label: 'Change Requests', value: '12 this week', icon: TrendingUp },
                      ].map((item) => (
                        <div key={item.label} className="border border-gray-200 rounded-lg p-3">
                          <div className="flex items-center justify-between">
                            <p className="text-sm text-gray-500">{item.label}</p>
                            <item.icon size={16} className="text-blue-600" />
                          </div>
                          <p className="text-xl font-bold text-gray-900 mt-2">{item.value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              </div>
            </div>
          );
    <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg shadow-lg p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Calendar size={32} className="text-purple-600" />
          <h2 className="text-2xl font-bold text-gray-900">AppointmentPro - Scheduling</h2>
        </div>
        <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 flex items-center gap-2">
          <Plus size={18} /> Book Appointment
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Today\'s Appointments', value: '8' },
          { label: 'Completed', value: '6' },
          { label: 'Total Clients', value: '247' },
          { label: 'Avg Rating', value: '4.7★' },
        ].map((stat) => (
          <div key={stat.label} className="bg-white p-4 rounded-lg border-l-4 border-purple-500">
            <div className="text-sm text-gray-600">{stat.label}</div>
            <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Calendar & Appointments */}
      <div className="grid grid-cols-3 gap-6">
        {/* Calendar */}
        <div className="col-span-1 bg-white rounded-lg p-4 border border-gray-200">
          <div className="font-semibold text-gray-900 mb-4">Calendar</div>
          <div className="grid grid-cols-7 gap-1 text-center text-xs">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div key={day} className="font-semibold text-gray-600 py-2">
                {day}
              </div>
            ))}
            {Array.from({ length: 28 }).map((_, i) => (
              <button
                key={i}
                className={`p-2 rounded text-sm ${i + 1 === 16 ? 'bg-purple-600 text-white font-bold' : 'hover:bg-purple-100'}`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Appointments for selected date */}
        <div className="col-span-2 space-y-3">
          {appointments.map((apt) => (
            <div key={apt.id} className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition">
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-bold text-gray-900">{apt.clientName}</div>
                  <div className="text-sm text-gray-600">{apt.service}</div>
                  <div className="text-sm text-gray-600 mt-1">
                    {apt.time} • {apt.duration}
                  </div>
                </div>
                <div className={`px-3 py-1 rounded-full text-sm font-semibold ${apt.status === 'confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                  {apt.status}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ===== 3. TradeBotElite Trial Component =====
export function TradeBotEliteTrialEnvironment() {
  const [portfolio] = useState({
    totalValue: '$125,400.50',
    dayChange: '+$2,340.25 (+1.87%)',
    holdings: [
      { symbol: 'AAPL', shares: 50, value: '$8,450', allocation: '6.7%', change: '+2.3%' },
      { symbol: 'MSFT', shares: 35, value: '$12,880', allocation: '10.3%', change: '+1.8%' },
      { symbol: 'TSLA', shares: 20, value: '$6,200', allocation: '4.9%', change: '-0.5%' },
    ],
  });

  return (
    <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg shadow-lg p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <TrendingUp size={32} className="text-green-600" />
          <h2 className="text-2xl font-bold text-gray-900">TradeBotElite - Trading</h2>
        </div>
        <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2">
          <Plus size={18} /> Create Strategy
        </button>
      </div>

      {/* Portfolio Stats */}
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <div className="text-sm text-gray-600 mb-2">Portfolio Value</div>
        <div className="text-4xl font-bold text-gray-900">{portfolio.totalValue}</div>
        <div className="text-lg text-green-600 font-semibold mt-2">{portfolio.dayChange}</div>
      </div>

      {/* Holdings */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="grid grid-cols-5 gap-4 p-4 border-b border-gray-200 font-semibold text-gray-700 bg-gray-50">
          <div>Symbol</div>
          <div>Shares</div>
          <div>Value</div>
          <div>Allocation</div>
          <div>1D Change</div>
        </div>
        {portfolio.holdings.map((holding) => (
          <div key={holding.symbol} className="grid grid-cols-5 gap-4 p-4 border-b border-gray-100 items-center hover:bg-gray-50">
            <div className="font-bold text-gray-900">{holding.symbol}</div>
            <div className="text-gray-600">{holding.shares}</div>
            <div className="text-gray-900 font-semibold">{holding.value}</div>
            <div className="text-gray-600">{holding.allocation}</div>
            <div className={`font-semibold ${holding.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
              {holding.change}
            </div>
          </div>
        ))}
      </div>

      {/* Active Strategies */}
      <div className="grid grid-cols-2 gap-4">
        {[
          { name: 'Momentum Strategy', winRate: 62.3, trades: 156, profit: '$4,230.50' },
          { name: 'Mean Reversion', winRate: 55.8, trades: 98, profit: '$2,145.75' },
        ].map((strategy) => (
          <div key={strategy.name} className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="font-bold text-gray-900 mb-3">{strategy.name}</div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Win Rate:</span>
                <span className="font-semibold text-gray-900">{strategy.winRate}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Trades:</span>
                <span className="font-semibold text-gray-900">{strategy.trades}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Net Profit:</span>
                <span className="font-semibold text-green-600">{strategy.profit}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ===== 4. CryptoBot Pro Trial Component =====
export function CryptoBotProTrialEnvironment() {
  const [portfolio] = useState({
    totalValue: '$45,230.75',
    dayChange: '+$1,230.50 (+2.78%)',
    holdings: [
      { symbol: 'BTC', amount: 0.75, value: '$32,100', allocation: '70.9%', change: '+3.2%' },
      { symbol: 'ETH', amount: 5.2, value: '$9,880', allocation: '21.8%', change: '+2.1%' },
      { symbol: 'SOL', amount: 50, value: '$2,450', allocation: '5.4%', change: '+1.5%' },
    ],
  });

  return (
    <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-lg shadow-lg p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Coins size={32} className="text-orange-600" />
          <h2 className="text-2xl font-bold text-gray-900">CryptoBot Pro - Crypto Trading</h2>
        </div>
        <button className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 flex items-center gap-2">
          <Plus size={18} /> New Bot
        </button>
      </div>

      {/* Portfolio Overview */}
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <div className="flex justify-between">
          <div>
            <div className="text-sm text-gray-600 mb-2">Total Portfolio Value</div>
            <div className="text-4xl font-bold text-gray-900">{portfolio.totalValue}</div>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-600 mb-2">24h Change</div>
            <div className="text-3xl font-bold text-green-600">{portfolio.dayChange}</div>
          </div>
        </div>
      </div>

      {/* Holdings */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="grid grid-cols-5 gap-4 p-4 border-b border-gray-200 font-semibold text-gray-700 bg-gray-50">
          <div>Asset</div>
          <div>Amount</div>
          <div>Value</div>
          <div>Allocation</div>
          <div>Change</div>
        </div>
        {portfolio.holdings.map((holding) => (
          <div key={holding.symbol} className="grid grid-cols-5 gap-4 p-4 border-b border-gray-100 items-center hover:bg-gray-50">
            <div className="font-bold text-gray-900">{holding.symbol}</div>
            <div className="text-gray-600">{holding.amount}</div>
            <div className="text-gray-900 font-semibold">{holding.value}</div>
            <div className="text-gray-600">{holding.allocation}</div>
            <div className="text-green-600 font-semibold">{holding.change}</div>
          </div>
        ))}
      </div>

      {/* Active Exchange Connections */}
      <div className="grid grid-cols-3 gap-4">
        {['Binance', 'Coinbase', 'Kraken'].map((exchange) => (
          <div key={exchange} className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div className="font-semibold text-gray-900">{exchange}</div>
            </div>
            <div className="text-sm text-gray-600">Connected & Synced</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ===== 5. DataVault Trial Component =====
export function DataVaultTrialEnvironment() {
  const [vaults] = useState([
    { name: 'Production DB', size: '2.3 GB', items: 15234, encryption: 'AES-256', status: 'encrypted' },
    { name: 'API Keys & Credentials', size: '125 MB', items: 342, encryption: 'AES-256', status: 'encrypted' },
    { name: 'Client Contracts', size: '890 MB', items: 567, encryption: 'AES-256', status: 'encrypted' },
  ]);

  return (
    <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-lg shadow-lg p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Lock size={32} className="text-red-600" />
          <h2 className="text-2xl font-bold text-gray-900">DataVault - Secure Storage</h2>
        </div>
        <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 flex items-center gap-2">
          <Plus size={18} /> New Vault
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Total Size', value: '3.3 GB' },
          { label: 'Total Items', value: '16,143' },
          { label: 'Encrypted', value: '100%' },
          { label: 'Status', value: 'Secure' },
        ].map((stat) => (
          <div key={stat.label} className="bg-white p-4 rounded-lg border-l-4 border-red-500">
            <div className="text-sm text-gray-600">{stat.label}</div>
            <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Vaults List */}
      <div className="space-y-3">
        {vaults.map((vault) => (
          <div key={vault.name} className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle size={20} className="text-green-600" />
                  <div className="font-bold text-gray-900">{vault.name}</div>
                </div>
                <div className="grid grid-cols-4 gap-4 text-sm text-gray-600">
                  <div>Size: {vault.size}</div>
                  <div>Items: {vault.items}</div>
                  <div>Encryption: {vault.encryption}</div>
                  <div>Status: {vault.status}</div>
                </div>
              </div>
              <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded text-gray-900 font-medium">
                Access
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Compliance Status */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="flex items-center gap-2">
          <CheckCircle size={20} className="text-green-600" />
          <div>
            <div className="font-bold text-gray-900">Compliance Status</div>
            <div className="text-sm text-gray-600">GDPR + HIPAA Compliant</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ===== 6. InsightHub Trial Component =====
export function InsightHubTrialEnvironment() {
  return (
    <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-lg shadow-lg p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <BarChart3 size={32} className="text-cyan-600" />
          <h2 className="text-2xl font-bold text-gray-900">InsightHub - Business Intelligence</h2>
        </div>
        <button className="bg-cyan-600 text-white px-4 py-2 rounded-lg hover:bg-cyan-700 flex items-center gap-2">
          <Plus size={18} /> Create Dashboard
        </button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Monthly Revenue', value: '$145,230.50', change: '+23.4%' },
          { label: 'Active Customers', value: '1,247', change: '+8.2%' },
          { label: 'Conversion Rate', value: '3.7%', change: '+0.5%' },
        ].map((metric) => (
          <div key={metric.label} className="bg-white p-4 rounded-lg border-l-4 border-cyan-500">
            <div className="text-sm text-gray-600 mb-1">{metric.label}</div>
            <div className="text-3xl font-bold text-gray-900">{metric.value}</div>
            <div className="text-sm text-green-600 font-semibold mt-2">{metric.change}</div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="font-bold text-gray-900 mb-4">Revenue Trend</div>
          <div className="space-y-2">
            {[
              { month: 'Nov', value: 98000 },
              { month: 'Dec', value: 120000 },
              { month: 'Jan', value: 120000 },
              { month: 'Feb', value: 145000 },
            ].map((data) => (
              <div key={data.month} className="flex items-center gap-3">
                <div className="w-12 text-sm font-semibold text-gray-600">{data.month}</div>
                <div className="flex-1 bg-gray-200 rounded-full h-8 overflow-hidden">
                  <div className="bg-cyan-500 h-full rounded-full" style={{ width: `${(data.value / 150000) * 100}%` }}></div>
                </div>
                <div className="w-24 text-right text-sm text-gray-600">${(data.value / 1000).toFixed(0)}K</div>
              </div>
            ))}
          </div>
        </div>

        {/* Customer Source Pie Chart */}
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="font-bold text-gray-900 mb-4">Customer Sources</div>
          <div className="space-y-2">
            {[
              { source: 'Organic', value: 45.3, color: 'bg-cyan-500' },
              { source: 'Paid Ads', value: 32.1, color: 'bg-blue-500' },
              { source: 'Referral', value: 15.2, color: 'bg-indigo-500' },
              { source: 'Direct', value: 7.4, color: 'bg-gray-500' },
            ].map((source) => (
              <div key={source.source} className="flex items-center gap-3">
                <div className={`w-3 h-3 ${source.color} rounded-full`}></div>
                <div className="flex-1">
                  <div className="text-sm text-gray-600">{source.source}</div>
                </div>
                <div className="text-sm font-semibold text-gray-900">{source.value}%</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Continue in next file due to size...
export default {
  AutoFlowTrialEnvironment,
  AppointmentProTrialEnvironment,
  TradeBotEliteTrialEnvironment,
  CryptoBotProTrialEnvironment,
  DataVaultTrialEnvironment,
  InsightHubTrialEnvironment,
};
