'use client';

import React, { useState } from 'react';
import {
  Activity,
  AlertTriangle,
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  Bell,
  Calendar,
  CheckCircle2,
  Clock,
  Coins,
  Database,
  DollarSign,
  FileSearch,
  Filter,
  Folder,
  Key,
  LineChart,
  Lock,
  MapPin,
  Percent,
  Phone,
  PieChart,
  Plus,
  Search,
  Share2,
  ShieldAlert,
  ShieldCheck,
  TrendingUp,
  Users,
  Zap,
} from 'lucide-react';

// ===== 1. AutoFlow Trial Component =====
export function AutoFlowTrialEnvironment() {
  const [selectedWorkflow, setSelectedWorkflow] = useState<string>('Onboarding Automation');
  const [showNewWorkflow, setShowNewWorkflow] = useState(false);

  const workflows = [
    { id: 1, name: 'Onboarding Automation', status: 'active', steps: 12, successRate: 98.4 },
    { id: 2, name: 'Invoice Reconciliation', status: 'active', steps: 7, successRate: 96.1 },
    { id: 3, name: 'Customer Escalations', status: 'paused', steps: 9, successRate: 94.6 },
    { id: 4, name: 'Quarterly Reporting', status: 'active', steps: 14, successRate: 99.1 },
  ];

  const workflowRuns = [
    { id: 'run-1082', workflow: 'Onboarding Automation', status: 'success', startedAt: '08:12 AM', owner: 'Ops Team', duration: '4m 12s' },
    { id: 'run-1081', workflow: 'Invoice Reconciliation', status: 'success', startedAt: '07:44 AM', owner: 'Finance', duration: '2m 41s' },
    { id: 'run-1080', workflow: 'Customer Escalations', status: 'warning', startedAt: '07:05 AM', owner: 'Support', duration: '6m 03s' },
  ];

  const integrations = [
    { name: 'Salesforce', status: 'healthy', latency: '210ms' },
    { name: 'Slack', status: 'healthy', latency: '120ms' },
    { name: 'Snowflake', status: 'healthy', latency: '320ms' },
    { name: 'ServiceNow', status: 'degraded', latency: '640ms' },
  ];

  const approvals = [
    { id: 'ap-401', workflow: 'Invoice Reconciliation', step: 'Policy exception', owner: 'Finance', time: '15 min ago' },
    { id: 'ap-402', workflow: 'Customer Escalations', step: 'Priority override', owner: 'Support', time: '42 min ago' },
  ];

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg shadow-lg p-6">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-blue-600 text-white flex items-center justify-center">
            <Zap size={18} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">AutoFlow - Workflow Command Center</h2>
            <p className="text-sm text-gray-600">Real-time orchestration, approvals, and SLA tracking.</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="px-3 py-2 rounded-lg border border-gray-300 text-gray-700 text-sm font-semibold hover:bg-gray-50 flex items-center gap-2">
            <Bell size={16} /> Alerts
          </button>
          <button
            onClick={() => setShowNewWorkflow(!showNewWorkflow)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
          >
            <Plus size={18} /> New Workflow
          </button>
        </div>
      </div>

      {showNewWorkflow && (
        <div className="mt-4 bg-white border border-blue-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-gray-900">Drafting new workflow</p>
              <p className="text-sm text-gray-500">Select a template to get started.</p>
            </div>
            <button className="text-sm text-blue-700 font-semibold">Open Builder</button>
          </div>
        </div>
      )}

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
        {workflows.map((workflow) => (
          <button
            key={workflow.id}
            onClick={() => setSelectedWorkflow(workflow.name)}
            className={`grid grid-cols-6 gap-4 p-4 border-t border-gray-100 text-left items-center hover:bg-gray-50 ${
              selectedWorkflow === workflow.name ? 'bg-blue-50' : ''
            }`}
          >
            <div className="col-span-2">
              <p className="font-semibold text-gray-900">{workflow.name}</p>
              <p className="text-xs text-gray-500">Last updated 2 hours ago</p>
            </div>
            <div>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${workflow.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-700'}`}>
                {workflow.status}
              </span>
            </div>
            <div className="text-sm text-gray-600">Operations</div>
            <div className="text-sm text-gray-600">{workflow.steps}</div>
            <div className="text-sm font-semibold text-gray-900">{workflow.successRate}%</div>
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

        <div className="space-y-4">
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Integrations</h3>
              <button className="text-sm text-blue-600 font-semibold">Manage</button>
            </div>
            <div className="space-y-3">
              {integrations.map((integration) => (
                <div key={integration.name} className="flex items-center justify-between border border-gray-100 rounded-lg p-3">
                  <div>
                    <p className="font-semibold text-gray-900">{integration.name}</p>
                    <p className="text-xs text-gray-500">Latency {integration.latency}</p>
                  </div>
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full ${integration.status === 'healthy' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                    {integration.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="font-semibold text-gray-900 mb-3">Approvals Queue</h3>
            <div className="space-y-3">
              {approvals.map((approval) => (
                <div key={approval.id} className="border border-gray-100 rounded-lg p-3">
                  <p className="font-semibold text-gray-900">{approval.workflow}</p>
                  <p className="text-xs text-gray-500">{approval.step}</p>
                  <div className="flex items-center justify-between text-xs text-gray-500 mt-2">
                    <span>{approval.owner}</span>
                    <span>{approval.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ===== 2. AppointmentPro Trial Component =====
export function AppointmentProTrialEnvironment() {
  const appointments = [
    { id: 1, client: 'Samira N.', time: '09:00 AM', service: 'Consultation', status: 'checked-in' },
    { id: 2, client: 'Elijah R.', time: '10:30 AM', service: 'Follow-up', status: 'upcoming' },
    { id: 3, client: 'Ava D.', time: '12:15 PM', service: 'Strategy Review', status: 'upcoming' },
  ];

  const staff = [
    { name: 'Nina Patel', role: 'Senior Specialist', status: 'available' },
    { name: 'Marcus Chen', role: 'Lead Consultant', status: 'with client' },
    { name: 'Olivia Brooks', role: 'Operations', status: 'available' },
  ];

  return (
    <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-lg shadow-lg p-6">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-emerald-600 text-white flex items-center justify-center">
            <Calendar size={18} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">AppointmentPro - Scheduling Console</h2>
            <p className="text-sm text-gray-600">Manage clients, staff availability, and service queues.</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="px-3 py-2 rounded-lg border border-gray-300 text-sm font-semibold text-gray-700 hover:bg-gray-50 flex items-center gap-2">
            <Phone size={16} /> Call Queue
          </button>
          <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 flex items-center gap-2">
            <Plus size={18} /> New Booking
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Today Appointments', value: '18', icon: Calendar, meta: '3 walk-ins' },
          { label: 'Utilization', value: '86%', icon: Percent, meta: 'Target 80%' },
          { label: 'Client NPS', value: '64', icon: Users, meta: 'Top quartile' },
          { label: 'Avg Wait Time', value: '8 min', icon: Clock, meta: 'Goal 10 min' },
        ].map((kpi) => (
          <div key={kpi.label} className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">{kpi.label}</p>
              <kpi.icon size={18} className="text-emerald-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900 mt-2">{kpi.value}</p>
            <p className="text-xs text-gray-500 mt-1">{kpi.meta}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-lg border border-gray-200">
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div>
              <h3 className="font-semibold text-gray-900">Today Schedule</h3>
              <p className="text-sm text-gray-500">Main clinic floor • 3 providers on duty</p>
            </div>
            <button className="text-sm text-emerald-700 font-semibold">Open calendar</button>
          </div>
          <div className="divide-y">
            {appointments.map((appointment) => (
              <div key={appointment.id} className="p-4 flex items-center justify-between hover:bg-gray-50">
                <div>
                  <p className="font-semibold text-gray-900">{appointment.client}</p>
                  <p className="text-xs text-gray-500">{appointment.service}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900">{appointment.time}</p>
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full ${appointment.status === 'checked-in' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                    {appointment.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="font-semibold text-gray-900 mb-3">Provider Availability</h3>
            <div className="space-y-3">
              {staff.map((member) => (
                <div key={member.name} className="border border-gray-100 rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-gray-900">{member.name}</p>
                      <p className="text-xs text-gray-500">{member.role}</p>
                    </div>
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${member.status === 'available' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                      {member.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="font-semibold text-gray-900 mb-3">Service Locations</h3>
            <div className="space-y-3 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-emerald-600" /> Downtown Suite 410
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-emerald-600" /> Riverfront Annex
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-emerald-600" /> Virtual Consultations
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ===== 3. TradeBotElite Trial Component =====
export function TradeBotEliteTrialEnvironment() {
  const strategies = [
    { name: 'Momentum Macro', status: 'running', pnl: '+$12.4K', winRate: '62%' },
    { name: 'Mean Reversion FX', status: 'running', pnl: '+$4.1K', winRate: '58%' },
    { name: 'Equity Breakout', status: 'paused', pnl: '-$1.2K', winRate: '47%' },
  ];

  const positions = [
    { symbol: 'AAPL', side: 'long', size: '420', pnl: '+$2,320', risk: 'low' },
    { symbol: 'TSLA', side: 'short', size: '110', pnl: '-$640', risk: 'medium' },
    { symbol: 'EURUSD', side: 'long', size: '2.1M', pnl: '+$1,040', risk: 'low' },
  ];

  return (
    <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg shadow-lg p-6">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-amber-600 text-white flex items-center justify-center">
            <TrendingUp size={18} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">TradeBotElite - Trading Operations</h2>
            <p className="text-sm text-gray-600">Algorithmic trading, risk governance, and execution analytics.</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="px-3 py-2 rounded-lg border border-gray-300 text-sm font-semibold text-gray-700 hover:bg-gray-50 flex items-center gap-2">
            <ShieldAlert size={16} /> Risk Controls
          </button>
          <button className="bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 flex items-center gap-2">
            <Plus size={18} /> Launch Strategy
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'AUM', value: '$12.8M', icon: DollarSign, meta: '+4.6% MoM' },
          { label: 'Sharpe Ratio', value: '1.84', icon: LineChart, meta: 'Target 1.6' },
          { label: 'Win Rate', value: '58.2%', icon: Percent, meta: '30D window' },
          { label: 'Drawdown', value: '2.4%', icon: ShieldCheck, meta: 'Under limit' },
        ].map((kpi) => (
          <div key={kpi.label} className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">{kpi.label}</p>
              <kpi.icon size={18} className="text-amber-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900 mt-2">{kpi.value}</p>
            <p className="text-xs text-gray-500 mt-1">{kpi.meta}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-lg border border-gray-200">
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div>
              <h3 className="font-semibold text-gray-900">Strategy Desk</h3>
              <p className="text-sm text-gray-500">Live PnL and risk by strategy.</p>
            </div>
            <button className="text-sm text-amber-700 font-semibold">Export blotter</button>
          </div>
          <div className="divide-y">
            {strategies.map((strategy) => (
              <div key={strategy.name} className="p-4 flex items-center justify-between hover:bg-gray-50">
                <div>
                  <p className="font-semibold text-gray-900">{strategy.name}</p>
                  <p className="text-xs text-gray-500">Status {strategy.status}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900">{strategy.pnl}</p>
                  <p className="text-xs text-gray-500">Win rate {strategy.winRate}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="font-semibold text-gray-900 mb-3">Open Positions</h3>
            <div className="space-y-3">
              {positions.map((position) => (
                <div key={position.symbol} className="border border-gray-100 rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-gray-900">{position.symbol}</p>
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${position.side === 'long' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {position.side}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">Size {position.size}</p>
                  <div className="flex items-center justify-between text-xs text-gray-500 mt-2">
                    <span>{position.pnl}</span>
                    <span>{position.risk} risk</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="font-semibold text-gray-900 mb-3">Execution Signals</h3>
            <div className="space-y-3">
              <div className="border border-gray-100 rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-gray-900">Buy signal - NASDAQ 100</p>
                  <ArrowUpRight size={16} className="text-green-600" />
                </div>
                <p className="text-xs text-gray-500">Confidence 74% • 2 min ago</p>
              </div>
              <div className="border border-gray-100 rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-gray-900">Reduce exposure - Energy</p>
                  <ArrowDownRight size={16} className="text-red-600" />
                </div>
                <p className="text-xs text-gray-500">Confidence 62% • 8 min ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ===== 4. CryptoBot Pro Trial Component =====
export function CryptoBotProTrialEnvironment() {
  const bots = [
    { name: 'Arbitrage Alpha', status: 'running', pnl: '+$8.2K', exchanges: 4 },
    { name: 'Trend Scalper', status: 'running', pnl: '+$1.9K', exchanges: 3 },
    { name: 'Market Maker', status: 'paused', pnl: '-$320', exchanges: 2 },
  ];

  const exchanges = [
    { name: 'Binance', status: 'healthy', latency: '88ms' },
    { name: 'Coinbase', status: 'healthy', latency: '110ms' },
    { name: 'Kraken', status: 'degraded', latency: '240ms' },
  ];

  return (
    <div className="bg-gradient-to-br from-purple-50 to-sky-50 rounded-lg shadow-lg p-6">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-purple-600 text-white flex items-center justify-center">
            <Coins size={18} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">CryptoBot Pro - Multi-Exchange Ops</h2>
            <p className="text-sm text-gray-600">Portfolio automation with exchange health and alerting.</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="px-3 py-2 rounded-lg border border-gray-300 text-sm font-semibold text-gray-700 hover:bg-gray-50 flex items-center gap-2">
            <Bell size={16} /> Alerts
          </button>
          <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 flex items-center gap-2">
            <Plus size={18} /> Deploy Bot
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: '24H Volume', value: '$3.1M', icon: Activity, meta: '+12.4%' },
          { label: 'Active Bots', value: '7', icon: Zap, meta: '2 paused' },
          { label: 'Net PnL', value: '+$9.8K', icon: DollarSign, meta: 'Last 7 days' },
          { label: 'Risk Score', value: 'Low', icon: ShieldCheck, meta: 'Within guardrails' },
        ].map((kpi) => (
          <div key={kpi.label} className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">{kpi.label}</p>
              <kpi.icon size={18} className="text-purple-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900 mt-2">{kpi.value}</p>
            <p className="text-xs text-gray-500 mt-1">{kpi.meta}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-lg border border-gray-200">
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div>
              <h3 className="font-semibold text-gray-900">Bot Fleet</h3>
              <p className="text-sm text-gray-500">Strategy coverage across exchanges.</p>
            </div>
            <button className="text-sm text-purple-700 font-semibold">View logs</button>
          </div>
          <div className="divide-y">
            {bots.map((bot) => (
              <div key={bot.name} className="p-4 flex items-center justify-between hover:bg-gray-50">
                <div>
                  <p className="font-semibold text-gray-900">{bot.name}</p>
                  <p className="text-xs text-gray-500">Connected exchanges {bot.exchanges}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900">{bot.pnl}</p>
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full ${bot.status === 'running' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                    {bot.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="font-semibold text-gray-900 mb-3">Exchange Health</h3>
            <div className="space-y-3">
              {exchanges.map((exchange) => (
                <div key={exchange.name} className="border border-gray-100 rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-gray-900">{exchange.name}</p>
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${exchange.status === 'healthy' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                      {exchange.status}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">Latency {exchange.latency}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="font-semibold text-gray-900 mb-3">Risk Alerts</h3>
            <div className="space-y-3">
              <div className="border border-gray-100 rounded-lg p-3 flex items-start gap-3">
                <AlertTriangle size={16} className="text-amber-600 mt-1" />
                <div>
                  <p className="font-semibold text-gray-900">Kraken latency spike</p>
                  <p className="text-xs text-gray-500">API latency above 200ms for 10 min.</p>
                </div>
              </div>
              <div className="border border-gray-100 rounded-lg p-3 flex items-start gap-3">
                <CheckCircle2 size={16} className="text-green-600 mt-1" />
                <div>
                  <p className="font-semibold text-gray-900">Exposure limits OK</p>
                  <p className="text-xs text-gray-500">Portfolio exposure within configured bands.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ===== 5. DataVault Trial Component =====
export function DataVaultTrialEnvironment() {
  const vaults = [
    { name: 'Customer Contracts', size: '1.2 GB', items: 1240, encryption: 'AES-256', status: 'healthy' },
    { name: 'Product IP', size: '840 MB', items: 420, encryption: 'AES-256', status: 'healthy' },
    { name: 'Audit Logs', size: '2.1 GB', items: 3420, encryption: 'AES-256', status: 'healthy' },
  ];

  const compliance = [
    { label: 'SOC2', value: 'Aligned', note: 'Last audit 21 days ago' },
    { label: 'GDPR', value: 'Compliant', note: 'No pending tasks' },
    { label: 'HIPAA', value: 'Monitor', note: 'Quarterly review due' },
  ];

  const accessLogs = [
    { id: 'log-201', user: 'Jared Owens', action: 'Exported contract bundle', time: '12 min ago', status: 'approved' },
    { id: 'log-202', user: 'System', action: 'Rotated master key', time: '54 min ago', status: 'approved' },
    { id: 'log-203', user: 'Unknown IP', action: 'Login attempt blocked', time: '1 hr ago', status: 'blocked' },
  ];

  return (
    <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-lg shadow-lg p-6">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-red-600 text-white flex items-center justify-center">
            <Lock size={18} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">DataVault - Security Operations</h2>
            <p className="text-sm text-gray-600">Encrypted storage, audit trails, and compliance monitoring.</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="px-3 py-2 rounded-lg border border-gray-300 text-sm font-semibold text-gray-700 hover:bg-gray-50 flex items-center gap-2">
            <Key size={16} /> Rotate Keys
          </button>
          <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 flex items-center gap-2">
            <Plus size={18} /> New Vault
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Protected Data', value: '3.3 GB', icon: Database, meta: 'Encrypted at rest' },
          { label: 'Active Vaults', value: '8', icon: Lock, meta: '100% coverage' },
          { label: 'Audit Events', value: '342', icon: FileSearch, meta: 'Last 24 hours' },
          { label: 'Threat Score', value: 'Low', icon: ShieldCheck, meta: 'No incidents' },
        ].map((stat) => (
          <div key={stat.label} className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">{stat.label}</p>
              <stat.icon size={18} className="text-red-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
            <p className="text-xs text-gray-500 mt-1">{stat.meta}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-lg border border-gray-200">
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div>
              <h3 className="font-semibold text-gray-900">Vault Inventory</h3>
              <p className="text-sm text-gray-500">Encrypted assets with retention controls.</p>
            </div>
            <button className="text-sm text-red-700 font-semibold">Export</button>
          </div>
          <div className="grid grid-cols-5 gap-4 p-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">
            <div>Vault</div>
            <div>Size</div>
            <div>Items</div>
            <div>Encryption</div>
            <div>Status</div>
          </div>
          {vaults.map((vault) => (
            <div key={vault.name} className="grid grid-cols-5 gap-4 p-4 border-t border-gray-100 items-center hover:bg-gray-50">
              <div className="font-medium text-gray-900">{vault.name}</div>
              <div className="text-gray-600">{vault.size}</div>
              <div className="text-gray-600">{vault.items.toLocaleString()}</div>
              <div className="text-gray-600">{vault.encryption}</div>
              <div className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800 w-fit">{vault.status}</div>
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="font-semibold text-gray-900 mb-3">Compliance Snapshot</h3>
            <div className="space-y-3">
              {compliance.map((item) => (
                <div key={item.label} className="border border-gray-100 rounded-lg p-3">
                  <p className="text-xs text-gray-500">{item.label}</p>
                  <p className="font-semibold text-gray-900">{item.value}</p>
                  <p className="text-xs text-gray-500 mt-1">{item.note}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="font-semibold text-gray-900 mb-3">Access Activity</h3>
            <div className="space-y-3">
              {accessLogs.map((log) => (
                <div key={log.id} className={`border rounded-lg p-3 ${log.status === 'blocked' ? 'border-amber-200 bg-amber-50' : 'border-gray-100'}`}>
                  <p className="font-medium text-gray-900">{log.user}</p>
                  <p className="text-xs text-gray-500">{log.action}</p>
                  <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
                    <span>{log.time}</span>
                    <span className={`font-semibold ${log.status === 'blocked' ? 'text-amber-700' : 'text-green-700'}`}>{log.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ===== 6. InsightHub Trial Component =====
export function InsightHubTrialEnvironment() {
  const dashboards = [
    { name: 'Executive Overview', updated: '2 hours ago', viewers: 32, owner: 'Exec Team' },
    { name: 'Sales Performance', updated: '30 minutes ago', viewers: 18, owner: 'Revenue Ops' },
    { name: 'Customer Health', updated: '1 day ago', viewers: 12, owner: 'CS' },
    { name: 'Marketing Funnel', updated: '3 hours ago', viewers: 9, owner: 'Growth' },
  ];

  const sources = [
    { name: 'Postgres Warehouse', status: 'connected', latency: '42ms', owner: 'Data Eng' },
    { name: 'Stripe Billing', status: 'connected', latency: '120ms', owner: 'Finance' },
    { name: 'HubSpot CRM', status: 'connected', latency: '88ms', owner: 'RevOps' },
  ];

  return (
    <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-lg shadow-lg p-6">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-cyan-600 text-white flex items-center justify-center">
            <BarChart3 size={18} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">InsightHub - Analytics Command Center</h2>
            <p className="text-sm text-gray-600">Unified metrics, dashboards, and executive reporting.</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="px-3 py-2 rounded-lg border border-gray-300 text-sm font-semibold text-gray-700 hover:bg-gray-50 flex items-center gap-2">
            <Filter size={16} /> Filters
          </button>
          <button className="px-3 py-2 rounded-lg border border-gray-300 text-sm font-semibold text-gray-700 hover:bg-gray-50 flex items-center gap-2">
            <Share2 size={16} /> Share
          </button>
          <button className="bg-cyan-600 text-white px-4 py-2 rounded-lg hover:bg-cyan-700 flex items-center gap-2">
            <Plus size={18} /> Create Dashboard
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Monthly Revenue', value: '$245K', icon: LineChart, meta: 'Up 6.4%' },
          { label: 'Active Users', value: '3.4K', icon: Users, meta: 'Weekly active' },
          { label: 'Conversion Rate', value: '4.8%', icon: BarChart3, meta: 'Goal 5.0%' },
          { label: 'Net Retention', value: '117%', icon: PieChart, meta: 'Target 110%' },
        ].map((kpi) => (
          <div key={kpi.label} className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">{kpi.label}</p>
              <kpi.icon size={18} className="text-cyan-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900 mt-2">{kpi.value}</p>
            <p className="text-xs text-gray-500 mt-1">{kpi.meta}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-lg border border-gray-200">
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div>
              <h3 className="font-semibold text-gray-900">Dashboards</h3>
              <p className="text-sm text-gray-500">Shared views across teams with real-time sync.</p>
            </div>
            <button className="text-sm text-cyan-700 font-semibold">View all</button>
          </div>
          <div className="divide-y">
            {dashboards.map((dash) => (
              <div key={dash.name} className="p-4 flex items-center justify-between hover:bg-gray-50">
                <div>
                  <p className="font-semibold text-gray-900">{dash.name}</p>
                  <p className="text-xs text-gray-500">Owner {dash.owner}</p>
                </div>
                <div className="text-right text-xs text-gray-500">
                  <p>Updated {dash.updated}</p>
                  <p>{dash.viewers} active viewers</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="font-semibold text-gray-900 mb-3">Data Sources</h3>
            <div className="space-y-3">
              {sources.map((source) => (
                <div key={source.name} className="border border-gray-100 rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-gray-900">{source.name}</p>
                    <span className="text-xs font-semibold text-green-700 bg-green-100 px-2 py-1 rounded-full">{source.status}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Owner {source.owner}</p>
                  <p className="text-xs text-gray-500">Latency {source.latency}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="font-semibold text-gray-900 mb-3">Scheduled Reports</h3>
            <div className="space-y-3">
              {[
                { name: 'Weekly Exec Brief', cadence: 'Mon 08:00', status: 'active' },
                { name: 'Sales Pipeline Digest', cadence: 'Daily 17:00', status: 'active' },
                { name: 'Marketing Scorecard', cadence: 'Fri 09:00', status: 'active' },
              ].map((report) => (
                <div key={report.name} className="border border-gray-100 rounded-lg p-3">
                  <p className="font-semibold text-gray-900">{report.name}</p>
                  <p className="text-xs text-gray-500">{report.cadence}</p>
                  <span className="text-xs font-semibold text-green-700">{report.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>    </div>
  );
}

export default {
  AutoFlowTrialEnvironment,
  AppointmentProTrialEnvironment,
  TradeBotEliteTrialEnvironment,
  CryptoBotProTrialEnvironment,
  DataVaultTrialEnvironment,
  InsightHubTrialEnvironment,
};
