// Product Trial Environments Part 3: Finance, CRM, Support Products
// Components 13-16

'use client';

import React from 'react';
import {
  Bell,
  Calendar,
  DollarSign,
  Filter,
  Headphones,
  PieChart,
  Plus,
  ShieldCheck,
  Users,
} from 'lucide-react';

// ===== 13. FinanceFlow Trial Component =====
export function FinanceFlowTrialEnvironment() {
  const invoices = [
    { number: 'INV-2026-041', client: 'Atlas Cloud', amount: '$52,340', status: 'paid', dueDate: '2026-02-20' },
    { number: 'INV-2026-042', client: 'Nova Health', amount: '$18,900', status: 'pending', dueDate: '2026-02-28' },
    { number: 'INV-2026-043', client: 'Keystone Energy', amount: '$9,450', status: 'overdue', dueDate: '2026-02-10' },
  ];

  const cashflow = [
    { month: 'Dec', income: 182000, expense: 64000 },
    { month: 'Jan', income: 195000, expense: 71000 },
    { month: 'Feb', income: 206000, expense: 78000 },
  ];

  return (
    <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-lg shadow-lg p-6">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-emerald-600 text-white flex items-center justify-center">
            <DollarSign size={18} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">FinanceFlow - CFO Dashboard</h2>
            <p className="text-sm text-gray-600">Cash visibility, collections, and forecast control.</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="px-3 py-2 rounded-lg border border-gray-300 text-sm font-semibold text-gray-700 hover:bg-gray-50 flex items-center gap-2">
            <Calendar size={16} /> Close Calendar
          </button>
          <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 flex items-center gap-2">
            <Plus size={18} /> Create Invoice
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Monthly Revenue', value: '$206K', meta: '+6.1% MoM' },
          { label: 'Operating Margin', value: '28%', meta: 'Target 25%' },
          { label: 'Cash Runway', value: '14.2 mo', meta: 'Healthy' },
          { label: 'Receivables', value: '$118K', meta: '12 overdue' },
        ].map((stat) => (
          <div key={stat.label} className="bg-white p-4 rounded-lg border border-gray-200">
            <p className="text-sm text-gray-500">{stat.label}</p>
            <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
            <p className="text-xs text-gray-500 mt-1">{stat.meta}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-lg border border-gray-200">
          <div className="p-4 border-b border-gray-200">
            <h3 className="font-semibold text-gray-900">Recent Invoices</h3>
            <p className="text-sm text-gray-500">Collections prioritized by risk.</p>
          </div>
          <div className="grid grid-cols-5 gap-4 p-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">
            <div>Invoice</div>
            <div>Client</div>
            <div>Amount</div>
            <div>Due</div>
            <div>Status</div>
          </div>
          {invoices.map((invoice) => (
            <div key={invoice.number} className="grid grid-cols-5 gap-4 p-4 border-t border-gray-100 items-center hover:bg-gray-50">
              <div className="font-medium text-gray-900">{invoice.number}</div>
              <div className="text-gray-600">{invoice.client}</div>
              <div className="text-gray-900 font-semibold">{invoice.amount}</div>
              <div className="text-gray-600">{invoice.dueDate}</div>
              <div>
                <span className={`text-xs font-semibold px-2 py-1 rounded-full ${invoice.status === 'paid' ? 'bg-green-100 text-green-700' : invoice.status === 'pending' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'}`}>
                  {invoice.status}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="font-semibold text-gray-900 mb-3">Cash Flow</h3>
            <div className="space-y-3">
              {cashflow.map((row) => (
                <div key={row.month} className="space-y-2">
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>{row.month}</span>
                    <span>Net ${(row.income - row.expense) / 1000}K</span>
                  </div>
                  <div className="flex gap-2">
                    <div className="flex-1 bg-green-200 rounded h-3" style={{ width: '60%' }}></div>
                    <div className="flex-1 bg-red-200 rounded h-3" style={{ width: '40%' }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="font-semibold text-gray-900 mb-3">Close Tasks</h3>
            <div className="space-y-2">
              {[
                { task: 'Reconcile revenue (Stripe)', status: 'in review' },
                { task: 'Approve vendor batch', status: 'pending' },
                { task: 'Update forecast', status: 'complete' },
              ].map((task) => (
                <div key={task.task} className="border border-gray-100 rounded-lg p-3">
                  <p className="font-semibold text-gray-900">{task.task}</p>
                  <p className="text-xs text-gray-500">{task.status}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ===== 14. InvestmentAnalyzer Trial Component =====
export function InvestmentAnalyzerTrialEnvironment() {
  const holdings = [
    { asset: 'US Equities', allocation: 46, value: '$207,820', change: '+4.2%' },
    { asset: 'Global Bonds', allocation: 24, value: '$108,530', change: '+1.1%' },
    { asset: 'Alternatives', allocation: 18, value: '$80,450', change: '+2.8%' },
    { asset: 'Cash', allocation: 12, value: '$53,520', change: '+0.2%' },
  ];

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg shadow-lg p-6">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-indigo-600 text-white flex items-center justify-center">
            <PieChart size={18} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">InvestmentAnalyzer - Portfolio Analytics</h2>
            <p className="text-sm text-gray-600">Risk, allocation, and scenario-based forecasting.</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="px-3 py-2 rounded-lg border border-gray-300 text-sm font-semibold text-gray-700 hover:bg-gray-50 flex items-center gap-2">
            <ShieldCheck size={16} /> Risk Report
          </button>
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
            Add Asset
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Portfolio Value', value: '$450K', meta: '+2.3% MTD' },
          { label: 'YTD Return', value: '15.3%', meta: 'Benchmark 12.1%' },
          { label: 'Sharpe Ratio', value: '1.34', meta: 'Target 1.2' },
          { label: 'Max Drawdown', value: '-8.5%', meta: 'Within limits' },
        ].map((stat) => (
          <div key={stat.label} className="bg-white p-4 rounded-lg border border-gray-200">
            <p className="text-sm text-gray-500">{stat.label}</p>
            <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
            <p className="text-xs text-gray-500 mt-1">{stat.meta}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-lg border border-gray-200 p-4">
          <h3 className="font-semibold text-gray-900 mb-4">Allocation Breakdown</h3>
          <div className="space-y-4">
            {holdings.map((holding) => (
              <div key={holding.asset}>
                <div className="flex items-center justify-between mb-1">
                  <p className="font-medium text-gray-900">{holding.asset}</p>
                  <p className="text-sm text-gray-600">{holding.value}</p>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div className="h-full bg-indigo-500" style={{ width: `${holding.allocation}%` }}></div>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-500 mt-1">
                  <span>{holding.allocation}%</span>
                  <span>{holding.change}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="font-semibold text-gray-900 mb-3">Scenario Tests</h3>
            <div className="space-y-3">
              {[
                { scenario: 'Rate hike +200bps', impact: '-3.2%' },
                { scenario: 'Equity drawdown -10%', impact: '-6.7%' },
                { scenario: 'FX volatility spike', impact: '-1.4%' },
              ].map((scenario) => (
                <div key={scenario.scenario} className="border border-gray-100 rounded-lg p-3">
                  <p className="font-semibold text-gray-900">{scenario.scenario}</p>
                  <p className="text-xs text-indigo-600">Impact {scenario.impact}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="font-semibold text-gray-900 mb-3">Recommendations</h3>
            <div className="space-y-3">
              {[
                { action: 'Rebalance', note: 'Reduce tech exposure by 4%' },
                { action: 'Increase cash buffer', note: 'Target 15% for Q2' },
                { action: 'Add hedging', note: 'Consider FX swaps' },
              ].map((rec) => (
                <div key={rec.action} className="border border-gray-100 rounded-lg p-3">
                  <p className="font-semibold text-gray-900">{rec.action}</p>
                  <p className="text-xs text-gray-500">{rec.note}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ===== 15. CRMSync Trial Component =====
export function CRMSyncTrialEnvironment() {
  const contacts = [
    { name: 'John Smith', company: 'Tech Industries', status: 'Active', value: '$45,000' },
    { name: 'Sarah Johnson', company: 'Global Solutions', status: 'Active', value: '$78,500' },
    { name: 'Michael Lee', company: 'Northwind', status: 'At Risk', value: '$32,200' },
  ];

  return (
    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg shadow-lg p-6">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-blue-600 text-white flex items-center justify-center">
            <Users size={18} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">CRMSync - Revenue Workspace</h2>
            <p className="text-sm text-gray-600">Pipeline visibility, account health, and activity tracking.</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="px-3 py-2 rounded-lg border border-gray-300 text-sm font-semibold text-gray-700 hover:bg-gray-50 flex items-center gap-2">
            <Filter size={16} /> Filters
          </button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2">
            <Plus size={18} /> Add Contact
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Contacts', value: '2,345', meta: '+3.2% MoM' },
          { label: 'Active Deals', value: '23', meta: '8 closing' },
          { label: 'Pipeline Value', value: '$2.3M', meta: 'Q1 goal' },
          { label: 'Conversion Rate', value: '34.2%', meta: 'Up 2.1%' },
        ].map((stat) => (
          <div key={stat.label} className="bg-white p-4 rounded-lg border border-gray-200">
            <p className="text-sm text-gray-500">{stat.label}</p>
            <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
            <p className="text-xs text-gray-500 mt-1">{stat.meta}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-lg border border-gray-200">
          <div className="grid grid-cols-4 gap-4 p-4 border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase tracking-wide">
            <div>Account</div>
            <div>Company</div>
            <div>Status</div>
            <div>Value</div>
          </div>
          {contacts.map((contact) => (
            <div key={contact.name} className="grid grid-cols-4 gap-4 p-4 border-b border-gray-100 items-center hover:bg-gray-50">
              <div className="font-medium text-gray-900">{contact.name}</div>
              <div className="text-gray-600">{contact.company}</div>
              <div>
                <span className={`text-xs font-semibold px-2 py-1 rounded-full ${contact.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                  {contact.status}
                </span>
              </div>
              <div className="font-semibold text-gray-900">{contact.value}</div>
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="font-semibold text-gray-900 mb-3">Sales Pipeline</h3>
            <div className="space-y-3">
              {[
                { stage: 'Prospects', deals: 15, value: '$450K' },
                { stage: 'Qualified', deals: 8, value: '$380K' },
                { stage: 'Negotiation', deals: 3, value: '$280K' },
                { stage: 'Won', deals: 7, value: '$790K' },
              ].map((stage) => (
                <div key={stage.stage} className="border border-gray-100 rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-gray-900">{stage.stage}</p>
                    <p className="text-sm text-gray-600">{stage.deals} deals</p>
                  </div>
                  <p className="text-xs text-gray-500">Value {stage.value}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="font-semibold text-gray-900 mb-3">Next Steps</h3>
            <div className="space-y-3">
              {[
                { task: 'Prep QBR deck', owner: 'Ava', due: 'Today' },
                { task: 'Send renewal proposal', owner: 'Luis', due: 'Tomorrow' },
                { task: 'Schedule exec call', owner: 'Morgan', due: 'Fri' },
              ].map((task) => (
                <div key={task.task} className="border border-gray-100 rounded-lg p-3">
                  <p className="font-semibold text-gray-900">{task.task}</p>
                  <p className="text-xs text-gray-500">{task.owner} • {task.due}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ===== 16. SupportHub Trial Component =====
export function SupportHubTrialEnvironment() {
  const tickets = [
    { id: 'tk_301', title: 'Integration Help Needed', priority: 'High', status: 'open', customer: 'ABC Corp', assignee: 'Maria' },
    { id: 'tk_302', title: 'Feature Request: SSO', priority: 'Medium', status: 'open', customer: 'XYZ Ltd', assignee: 'Product Team' },
    { id: 'tk_303', title: 'Billing update completed', priority: 'Low', status: 'closed', customer: 'Global Inc', assignee: 'John' },
  ];

  const priorityColors: Record<string, string> = {
    High: 'bg-red-100 text-red-700',
    Medium: 'bg-amber-100 text-amber-700',
    Low: 'bg-blue-100 text-blue-700',
  };

  const statusColors: Record<string, string> = {
    open: 'bg-blue-100 text-blue-700',
    closed: 'bg-green-100 text-green-700',
  };

  return (
    <div className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-lg shadow-lg p-6">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-violet-600 text-white flex items-center justify-center">
            <Headphones size={18} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">SupportHub - Service Operations</h2>
            <p className="text-sm text-gray-600">Queue management, SLAs, and customer satisfaction.</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="px-3 py-2 rounded-lg border border-gray-300 text-sm font-semibold text-gray-700 hover:bg-gray-50 flex items-center gap-2">
            <Bell size={16} /> On-call
          </button>
          <button className="bg-violet-600 text-white px-4 py-2 rounded-lg hover:bg-violet-700 flex items-center gap-2">
            <Plus size={18} /> New Ticket
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Open Tickets', value: '45', meta: '7 SLA risk' },
          { label: 'Avg Resolution', value: '2.4 hrs', meta: 'Goal 3 hrs' },
          { label: 'CSAT', value: '4.6', meta: 'Last 30 days' },
          { label: 'Backlog', value: '234', meta: 'All teams' },
        ].map((stat) => (
          <div key={stat.label} className="bg-white p-4 rounded-lg border border-gray-200">
            <p className="text-sm text-gray-500">{stat.label}</p>
            <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
            <p className="text-xs text-gray-500 mt-1">{stat.meta}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-lg border border-gray-200">
          <div className="grid grid-cols-6 gap-4 p-4 border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase tracking-wide">
            <div>ID</div>
            <div>Title</div>
            <div>Priority</div>
            <div>Status</div>
            <div>Customer</div>
            <div>Assignee</div>
          </div>
          {tickets.map((ticket) => (
            <div key={ticket.id} className="grid grid-cols-6 gap-4 p-4 border-b border-gray-100 items-center hover:bg-gray-50">
              <div className="font-mono text-sm text-gray-600">{ticket.id}</div>
              <div className="font-medium text-gray-900">{ticket.title}</div>
              <div>
                <span className={`text-xs font-semibold px-2 py-1 rounded-full ${priorityColors[ticket.priority]}`}>
                  {ticket.priority}
                </span>
              </div>
              <div>
                <span className={`text-xs font-semibold px-2 py-1 rounded-full ${statusColors[ticket.status]}`}>
                  {ticket.status}
                </span>
              </div>
              <div className="text-gray-600">{ticket.customer}</div>
              <div className="text-gray-600">{ticket.assignee}</div>
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="font-semibold text-gray-900 mb-3">Queue Overview</h3>
            <div className="space-y-3">
              {[
                { label: 'High Priority', value: 12, status: 'risk' },
                { label: 'In Progress', value: 23, status: 'active' },
                { label: 'Resolved Today', value: 32, status: 'good' },
              ].map((row) => (
                <div key={row.label} className="border border-gray-100 rounded-lg p-3 flex items-center justify-between">
                  <p className="text-sm text-gray-600">{row.label}</p>
                  <p className={`font-semibold ${row.status === 'risk' ? 'text-red-700' : row.status === 'active' ? 'text-blue-700' : 'text-green-700'}`}>
                    {row.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="font-semibold text-gray-900 mb-3">Team Performance</h3>
            <div className="space-y-3">
              {[
                { name: 'Maria', resolved: 156, avgTime: '1.8 hrs', satisfaction: 4.8 },
                { name: 'John', resolved: 142, avgTime: '2.1 hrs', satisfaction: 4.5 },
                { name: 'Sarah', resolved: 128, avgTime: '2.6 hrs', satisfaction: 4.3 },
              ].map((agent) => (
                <div key={agent.name} className="border border-gray-100 rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-gray-900">{agent.name}</p>
                    <p className="text-sm text-violet-600">{agent.satisfaction}★</p>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs text-gray-500 mt-2">
                    <span>Resolved {agent.resolved}</span>
                    <span>Avg {agent.avgTime}</span>
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

export default {
  FinanceFlowTrialEnvironment,
  InvestmentAnalyzerTrialEnvironment,
  CRMSyncTrialEnvironment,
  SupportHubTrialEnvironment,
};
