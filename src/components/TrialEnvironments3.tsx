// Product Trial Environments Part 3: Finance, CRM, Support Products
// Components 13-16

'use client';

import React, { useState } from 'react';
import { Plus, DollarSign, TrendingUp, AlertCircle, CheckCircle, Trash2, Eye, PieChart, Users, Headphones } from 'lucide-react';

// ===== 13. FinanceFlow Trial Component =====
export function FinanceFlowTrialEnvironment() {
  const [invoices] = useState([
    { number: 'INV-2024-001', client: 'ABC Corp', amount: '$5,234.50', status: 'paid', dueDate: '2024-02-28' },
    { number: 'INV-2024-002', client: 'XYZ Ltd', amount: '$8,900.00', status: 'pending', dueDate: '2024-02-20' },
  ]);

  const [expenses] = useState([
    { description: 'Office Supplies', amount: '$234.50', date: '2024-02-15', category: 'Supplies' },
    { description: 'Cloud Services', amount: '$500.00', date: '2024-02-14', category: 'IT' },
  ]);

  return (
    <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-lg shadow-lg p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <DollarSign size={32} className="text-green-600" />
          <h2 className="text-2xl font-bold text-gray-900">FinanceFlow - Accounting</h2>
        </div>
        <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2">
          <Plus size={18} /> Create Invoice
        </button>
      </div>

      {/* Financial Summary */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Monthly Revenue', value: '$45,234', color: 'green' },
          { label: 'Monthly Expenses', value: '$12,340', color: 'red' },
          { label: 'Net Income', value: '$32,894', color: 'blue' },
          { label: 'Outstanding', value: '$28,345', color: 'yellow' },
        ].map((stat) => (
          <div key={stat.label} className={`bg-white border-l-4 p-4 rounded-lg ${stat.color === 'green' ? 'border-green-500' : stat.color === 'red' ? 'border-red-500' : stat.color === 'blue' ? 'border-blue-500' : 'border-yellow-500'}`}>
            <div className="text-sm text-gray-600 mb-1">{stat.label}</div>
            <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Invoices */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200 font-semibold text-gray-700 bg-gray-50">
          Recent Invoices
        </div>
        {invoices.map((invoice) => (
          <div key={invoice.number} className="p-4 border-b border-gray-100 hover:bg-gray-50">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-bold text-gray-900">{invoice.number}</div>
                <div className="text-sm text-gray-600">{invoice.client}</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-gray-900">{invoice.amount}</div>
                <div className={`text-xs font-semibold mt-1 px-2 py-1 rounded ${invoice.status === 'paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                  {invoice.status}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Expenses */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200 font-semibold text-gray-700 bg-gray-50">
          Recent Expenses
        </div>
        {expenses.map((expense, idx) => (
          <div key={idx} className="p-4 border-b border-gray-100 hover:bg-gray-50">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-bold text-gray-900">{expense.description}</div>
                <div className="text-sm text-gray-600">{expense.category} • {expense.date}</div>
              </div>
              <div className="font-bold text-gray-900">{expense.amount}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Chart Visualization */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <h3 className="font-bold text-gray-900 mb-4">Cash Flow This Year</h3>
        <div className="space-y-2">
          {[
            { month: 'Jan', income: 42000, expense: 13200 },
            { month: 'Feb', income: 45234, expense: 12340 },
          ].map((data) => (
            <div key={data.month} className="space-y-1">
              <div className="text-sm font-medium text-gray-600">{data.month}</div>
              <div className="flex gap-2 h-6">
                <div className="flex-1 bg-green-200 rounded flex items-center px-2">
                  <span className="text-xs text-green-800 font-bold">${(data.income / 1000).toFixed(0)}K</span>
                </div>
                <div className="flex-1 bg-red-200 rounded flex items-center px-2">
                  <span className="text-xs text-red-800 font-bold">${(data.expense / 1000).toFixed(0)}K</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ===== 14. InvestmentAnalyzer Trial Component =====
export function InvestmentAnalyzerTrialEnvironment() {
  return (
    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg shadow-lg p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <PieChart size={32} className="text-indigo-600" />
          <h2 className="text-2xl font-bold text-gray-900">InvestmentAnalyzer - Portfolio</h2>
        </div>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">Add Asset</button>
      </div>

      {/* Portfolio Overview */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-sm text-gray-600 mb-2">Total Portfolio Value</div>
            <div className="text-4xl font-bold text-gray-900">$450,320.50</div>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-600 mb-2">YTD Return</div>
            <div className="text-3xl font-bold text-green-600">+15.3%</div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200">
          <div>
            <div className="text-xs text-gray-600">Risk Level</div>
            <div className="font-bold text-gray-900">Moderate</div>
          </div>
          <div>
            <div className="text-xs text-gray-600">Sharpe Ratio</div>
            <div className="font-bold text-gray-900">1.34</div>
          </div>
          <div>
            <div className="text-xs text-gray-600">Max Drawdown</div>
            <div className="font-bold text-red-600">-8.5%</div>
          </div>
        </div>
      </div>

      {/* Asset Allocation */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <h3 className="font-bold text-gray-900 mb-4">Asset Allocation</h3>
        <div className="space-y-3">
          {[
            { asset: 'Stocks', allocation: 60, value: '$270,192', color: 'bg-blue-500' },
            { asset: 'Bonds', allocation: 25, value: '$112,580', color: 'bg-green-500' },
            { asset: 'Real Estate', allocation: 10, value: '$45,032', color: 'bg-yellow-500' },
            { asset: 'Crypto', allocation: 5, value: '$22,516', color: 'bg-purple-500' },
          ].map((alloc) => (
            <div key={alloc.asset}>
              <div className="flex items-center justify-between mb-1">
                <div className="font-medium text-gray-900">{alloc.asset}</div>
                <div className="text-gray-600">{alloc.value}</div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                <div className={`h-full ${alloc.color}`} style={{ width: `${alloc.allocation}%` }}></div>
              </div>
              <div className="text-right text-xs text-gray-600 mt-1">{alloc.allocation}%</div>
            </div>
          ))}
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-2 gap-4">
        {[
          { label: 'Annual Return', value: '9.2%', trend: 'up' },
          { label: 'Max Drawdown', value: '-8.5%', trend: 'down' },
          { label: 'Volatility', value: '12.3%', trend: 'neutral' },
          { label: 'Years of Data', value: '10', trend: 'neutral' },
        ].map((metric) => (
          <div key={metric.label} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div className="text-sm text-gray-600 mb-1">{metric.label}</div>
            <div className={`text-2xl font-bold ${metric.trend === 'up' ? 'text-green-600' : metric.trend === 'down' ? 'text-red-600' : 'text-gray-900'}`}>
              {metric.value}
            </div>
          </div>
        ))}
      </div>

      {/* Recommendations */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-bold text-gray-900 mb-3">Recommendations</h3>
        <div className="space-y-2">
          {[
            { action: 'Rebalance', reason: 'Stocks at 62% of portfolio', impact: 'Reduce risk by 2-3%' },
            { action: 'Diversify', reason: 'Tech stocks at 45% of holdings', impact: 'Improve resilience' },
          ].map((rec, idx) => (
            <div key={idx} className="p-3 bg-white rounded border border-blue-100">
              <div className="font-medium text-gray-900">{rec.action}</div>
              <div className="text-sm text-gray-600">{rec.reason}</div>
              <div className="text-xs text-blue-600 mt-1">Expected impact: {rec.impact}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ===== 15. CRMSync Trial Component =====
export function CRMSyncTrialEnvironment() {
  const [contacts] = useState([
    { name: 'John Smith', company: 'Tech Industries', email: 'john@tech.com', status: 'Active', value: '$45,000' },
    { name: 'Sarah Johnson', company: 'Global Solutions', email: 'sarah@global.com', status: 'Active', value: '$78,500' },
  ]);

  return (
    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg shadow-lg p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Users size={32} className="text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-900">CRMSync - Customer Management</h2>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2">
          <Plus size={18} /> Add Contact
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Total Contacts', value: '2,345' },
          { label: 'Active Deals', value: '23' },
          { label: 'Pipeline Value', value: '$2.3M' },
          { label: 'Conversion Rate', value: '34.2%' },
        ].map((stat) => (
          <div key={stat.label} className="bg-white p-3 rounded-lg border border-gray-200 text-center">
            <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
            <div className="text-xs text-gray-600">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Contacts List */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="grid grid-cols-5 gap-4 p-4 border-b border-gray-200 font-semibold text-gray-700 bg-gray-50">
          <div>Name</div>
          <div>Company</div>
          <div>Email</div>
          <div>Status</div>
          <div>Value</div>
        </div>
        {contacts.map((contact) => (
          <div key={contact.name} className="grid grid-cols-5 gap-4 p-4 border-b border-gray-100 items-center hover:bg-gray-50">
            <div className="font-medium text-gray-900">{contact.name}</div>
            <div className="text-gray-600">{contact.company}</div>
            <div className="text-gray-600">{contact.email}</div>
            <div className="px-2 py-1 rounded text-xs font-semibold bg-green-100 text-green-800 w-fit">{contact.status}</div>
            <div className="font-bold text-gray-900">{contact.value}</div>
          </div>
        ))}
      </div>

      {/* Sales Pipeline */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <h3 className="font-bold text-gray-900 mb-4">Sales Pipeline</h3>
        <div className="space-y-3">
          {[
            { stage: 'Prospects', deals: 15, value: '$450K', color: 'bg-blue-500' },
            { stage: 'Qualified', deals: 8, value: '$380K', color: 'bg-cyan-500' },
            { stage: 'Negotiation', deals: 3, value: '$280K', color: 'bg-yellow-500' },
            { stage: 'Won', deals: 7, value: '$790K', color: 'bg-green-500' },
          ].map((stage) => (
            <div key={stage.stage}>
              <div className="flex items-center justify-between mb-1">
                <div className="font-medium text-gray-900">{stage.stage}</div>
                <div className="text-sm text-gray-600">{stage.deals} deals • {stage.value}</div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div className={`h-full ${stage.color}`}></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Active Deals */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <h3 className="font-bold text-gray-900 mb-3">Active Deals</h3>
        <div className="space-y-2">
          {[
            { name: 'Enterprise Software License', value: '$125,000', stage: 'Negotiation', probability: '75%' },
            { name: 'Support Package Deal', value: '$45,200', stage: 'Qualified', probability: '60%' },
          ].map((deal) => (
            <div key={deal.name} className="p-3 bg-gray-50 rounded border border-gray-200 hover:bg-gray-100">
              <div className="flex items-center justify-between mb-2">
                <div className="font-medium text-gray-900">{deal.name}</div>
                <div className="font-bold text-gray-900">{deal.value}</div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="text-gray-600">{deal.stage}</div>
                <div className="text-blue-600 font-semibold">{deal.probability} probability</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ===== 16. SupportHub Trial Component =====
export function SupportHubTrialEnvironment() {
  const [tickets] = useState([
    { id: 'tk_001', title: 'Integration Help Needed', priority: 'High', status: 'open', customer: 'ABC Corp', assignee: 'Maria' },
    { id: 'tk_002', title: 'Feature Request: Dark Mode', priority: 'Low', status: 'open', customer: 'XYZ Ltd', assignee: 'Product Team' },
    { id: 'tk_003', title: 'Login Issues Resolved', priority: 'Medium', status: 'closed', customer: 'Global Inc', assignee: 'John' },
  ]);

  return (
    <div className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-lg shadow-lg p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Headphones size={32} className="text-violet-600" />
          <h2 className="text-2xl font-bold text-gray-900">SupportHub - Customer Support</h2>
        </div>
        <button className="bg-violet-600 text-white px-4 py-2 rounded-lg hover:bg-violet-700 flex items-center gap-2">
          <Plus size={18} /> New Ticket
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Open Tickets', value: '45' },
          { label: 'Avg Resolution', value: '2.4 hrs' },
          { label: 'Satisfaction', value: '4.6★' },
          { label: 'This Month', value: '234' },
        ].map((stat) => (
          <div key={stat.label} className="bg-white p-3 rounded-lg border border-gray-200 text-center">
            <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
            <div className="text-xs text-gray-600">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Tickets List */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="grid grid-cols-6 gap-4 p-4 border-b border-gray-200 font-semibold text-gray-700 bg-gray-50">
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
            <div className={`px-2 py-1 rounded text-xs font-semibold w-fit ${ticket.priority === 'High' ? 'bg-red-100 text-red-800' : ticket.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'}`}>
              {ticket.priority}
            </div>
            <div className={`px-2 py-1 rounded text-xs font-semibold w-fit ${ticket.status === 'open' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
              {ticket.status}
            </div>
            <div className="text-gray-600">{ticket.customer}</div>
            <div className="text-gray-600">{ticket.assignee}</div>
          </div>
        ))}
      </div>

      {/* Queue Overview */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'By Priority', items: [{ name: 'High', count: 12, color: 'red' }, { name: 'Medium', count: 18, color: 'yellow' }, { name: 'Low', count: 15, color: 'blue' }] },
          { label: 'By Status', items: [{ name: 'Open', count: 45, color: 'blue' }, { name: 'In Progress', count: 23, color: 'purple' }, { name: 'Closed', count: 166, color: 'green' }] },
          { label: 'By Team', items: [{ name: 'Support', count: 78, color: 'indigo' }, { name: 'Product', count: 34, color: 'cyan' }, { name: 'Dev', count: 22, color: 'violet' }] },
        ].map((section) => (
          <div key={section.label} className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="font-semibold text-gray-900 mb-3">{section.label}</div>
            <div className="space-y-2">
              {section.items.map((item) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 bg-${item.color}-500 rounded-full`}></div>
                    <span className="text-sm text-gray-600">{item.name}</span>
                  </div>
                  <span className="font-bold text-gray-900">{item.count}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Team Performance */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <h3 className="font-bold text-gray-900 mb-3">Team Performance</h3>
        <div className="space-y-2">
          {[
            { name: 'Maria', resolved: 156, avgTime: '1.8 hrs', satisfaction: 4.8 },
            { name: 'John', resolved: 142, avgTime: '2.1 hrs', satisfaction: 4.5 },
            { name: 'Sarah', resolved: 128, avgTime: '2.6 hrs', satisfaction: 4.3 },
          ].map((agent) => (
            <div key={agent.name} className="p-3 bg-gray-50 rounded border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <div className="font-medium text-gray-900">{agent.name}</div>
                <div className="text-sm text-violet-600 font-semibold">{agent.satisfaction}★</div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="text-gray-600">Resolved: <span className="font-bold text-gray-900">{agent.resolved}</span></div>
                <div className="text-gray-600">Avg time: <span className="font-bold text-gray-900">{agent.avgTime}</span></div>
              </div>
            </div>
          ))}
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
