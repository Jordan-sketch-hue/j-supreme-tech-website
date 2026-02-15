// Product-Specific Trial Environment Components
// Each component provides a realistic, functional trial environment for its product

'use client';

import React, { useState, useEffect } from 'react';
import { ChevronDown, Plus, Edit2, Trash2, Play, Pause, Settings, TrendingUp, AlertCircle, CheckCircle, Cog, Calendar, BarChart3, Lock, Coins } from 'lucide-react';

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
          { label: 'Active', value: '9' },
          { label: 'Success Rate', value: '97.8%' },
          { label: 'Monthly Executions', value: '8.2K' },
        ].map((stat) => (
          <div key={stat.label} className="bg-white p-4 rounded-lg border-l-4 border-blue-500">
            <div className="text-sm text-gray-600">{stat.label}</div>
            <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Workflows List */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="grid grid-cols-5 gap-4 p-4 border-b border-gray-200 font-semibold text-gray-700">
          <div>Workflow Name</div>
          <div>Status</div>
          <div>Steps</div>
          <div>Success Rate</div>
          <div>Actions</div>
        </div>
        {workflows.map((wf) => (
          <div key={wf.id} className="grid grid-cols-5 gap-4 p-4 border-b border-gray-100 items-center hover:bg-gray-50">
            <div className="font-medium text-gray-900">{wf.name}</div>
            <div className={`px-3 py-1 rounded-full text-sm font-semibold w-fit ${wf.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
              {wf.status}
            </div>
            <div className="text-gray-600">{wf.steps}</div>
            <div className="text-gray-900 font-semibold">{wf.successRate}%</div>
            <div className="flex gap-2">
              <button className="p-2 hover:bg-gray-200 rounded" title="Edit">
                <Edit2 size={16} />
              </button>
              <button className="p-2 hover:bg-gray-200 rounded" title={wf.status === 'active' ? 'Pause' : 'Resume'}>
                {wf.status === 'active' ? <Pause size={16} /> : <Play size={16} />}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Executions */}
      <div className="bg-white rounded-lg p-4 border border-gray-200">
        <h3 className="font-bold text-gray-900 mb-4">Recent Executions</h3>
        <div className="space-y-2">
          {[
            { time: '14:32', workflow: 'Invoice Processing', status: 'success', duration: '2.34s' },
            { time: '11:15', workflow: 'Email Campaign', status: 'success', duration: '1.12s' },
            { time: '09:00', workflow: 'Invoice Processing', status: 'success', duration: '2.18s' },
          ].map((log, idx) => (
            <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded">
              <div>
                <div className="font-medium text-gray-900">{log.workflow}</div>
                <div className="text-sm text-gray-600">{log.time}</div>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle size={18} className="text-green-600" />
                <span className="text-sm text-gray-600">{log.duration}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ===== 2. AppointmentPro Trial Component =====
interface Appointment { id: string; clientName: string; service: string; time: string; duration: string; status: 'confirmed' | 'pending' | 'completed' | 'cancelled'; }

export function AppointmentProTrialEnvironment() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    setAppointments([
      { id: 'apt_001', clientName: 'Sarah Johnson', service: 'Initial Consultation', time: '10:00 AM', duration: '60 min', status: 'confirmed' },
      { id: 'apt_002', clientName: 'Michael Chen', service: 'Follow-up Visit', time: '2:00 PM', duration: '30 min', status: 'confirmed' },
      { id: 'apt_003', clientName: 'Emma Wilson', service: 'Procedure', time: '11:30 AM', duration: '90 min', status: 'pending' },
    ]);
  }, []);

  return (
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
