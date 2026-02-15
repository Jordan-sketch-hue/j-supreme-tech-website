// Product Trial Environments Part 2: AI, DevOps, Marketing Products
// Components 7-12

'use client';

import React, { useState } from 'react';
import { Plus, Send, MessageCircle, TrendingUp, AlertCircle, CheckCircle, Zap } from 'lucide-react';

// ===== 7. AIAssist Trial Component =====
export function AIAssistTrialEnvironment() {
  const [messages, setMessages] = useState([
    { id: 1, text: 'How can I optimize my onboarding process?', sender: 'user', timestamp: '2:30 PM' },
    { id: 2, text: 'I recommend implementing a 3-step progressive profiling approach with personalized email sequences. This typically improves conversion by 25-40%.', sender: 'ai', timestamp: '2:31 PM' },
  ]);
  const [inputValue, setInputValue] = useState('');

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      setMessages([...messages, { id: messages.length + 1, text: inputValue, sender: 'user', timestamp: new Date().toLocaleTimeString() }]);
      // Simulate AI response
      setTimeout(() => {
        setMessages((prev) => [...prev, { id: prev.length + 1, text: 'I\'ve analyzed your request. Here are my recommendations...', sender: 'ai', timestamp: new Date().toLocaleTimeString() }]);
      }, 500);
      setInputValue('');
    }
  };

  return (
    <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-lg shadow-lg p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">🤖 AIAssist - AI Assistant</h2>
        <div className="flex gap-2">
          {[
            { label: 'Doc Analysis', accuracy: '94.2%' },
            { label: 'Sentiment', accuracy: '91.5%' },
            { label: 'Generation', accuracy: '88.7%' },
          ].map((cap) => (
            <div key={cap.label} className="bg-white px-3 py-1 rounded-lg text-xs">
              <div className="text-purple-600 font-semibold">{cap.label}</div>
              <div className="text-gray-600">{cap.accuracy}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Conversations', value: '342' },
          { label: 'Avg Resolution', value: '2.4 min' },
          { label: 'User Satisfaction', value: '4.6★' },
          { label: 'Active Users', value: '87' },
        ].map((stat) => (
          <div key={stat.label} className="bg-white p-3 rounded-lg border border-gray-200 text-center">
            <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
            <div className="text-xs text-gray-600">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Chat Interface */}
      <div className="bg-white rounded-lg border border-gray-200 flex flex-col h-96">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xs px-4 py-2 rounded-lg ${msg.sender === 'user' ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-900'}`}>
                <div className="text-sm">{msg.text}</div>
                <div className={`text-xs mt-1 ${msg.sender === 'user' ? 'text-purple-100' : 'text-gray-600'}`}>{msg.timestamp}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="border-t border-gray-200 p-4 flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Ask me anything..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button onClick={handleSendMessage} className="bg-purple-600 text-white p-2 rounded-lg hover:bg-purple-700">
            <Send size={20} />
          </button>
        </div>
      </div>

      {/* Conversation History */}
      <div className="bg-white rounded-lg p-4 border border-gray-200">
        <div className="font-bold text-gray-900 mb-3">Recent Conversations</div>
        <div className="space-y-2">
          {[
            { topic: 'Customer onboarding process optimization', messages: 12, resolved: true },
            { topic: 'Marketing campaign analysis', messages: 8, resolved: false },
          ].map((conv, idx) => (
            <div key={idx} className="p-3 bg-gray-50 rounded flex justify-between items-center">
              <div>
                <div className="font-medium text-gray-900">{conv.topic}</div>
                <div className="text-xs text-gray-600">{conv.messages} messages</div>
              </div>
              <div className={`px-2 py-1 rounded text-xs font-semibold ${conv.resolved ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                {conv.resolved ? 'Resolved' : 'Active'}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ===== 8. ChatGPT Enterprise Trial Component =====
export function ChatGPTEnterpriseTrialEnvironment() {
  const [selectedDeployment, setSelectedDeployment] = useState('support');

  const deployments = [
    { id: 'support', name: 'Support Chat', users: 523, messagesPerDay: 8234, latency: '234ms', costPerMonth: '$1500' },
    { id: 'content', name: 'Content Generation', users: 156, messagesPerDay: 2341, latency: '567ms', costPerMonth: '$800' },
  ];

  const selected = deployments.find((d) => d.id === selectedDeployment);

  return (
    <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg shadow-lg p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">💬 ChatGPT Enterprise - Conversational AI</h2>
        <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2">
          <Plus size={18} /> New Deployment
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Total Messages', value: '125K' },
          { label: 'Avg Satisfaction', value: '4.7★' },
          { label: 'Uptime', value: '99.97%' },
          { label: 'Monthly Users', value: '1.2K' },
        ].map((stat) => (
          <div key={stat.label} className="bg-white p-3 rounded-lg border border-gray-200 text-center">
            <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
            <div className="text-xs text-gray-600">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Deployment Selector */}
      <div className="flex gap-3">
        {deployments.map((dep) => (
          <button
            key={dep.id}
            onClick={() => setSelectedDeployment(dep.id)}
            className={`px-4 py-2 rounded-lg font-semibold transition ${selectedDeployment === dep.id ? 'bg-green-600 text-white' : 'bg-white text-gray-900 border border-gray-300 hover:border-green-300'}`}
          >
            {dep.name}
          </button>
        ))}
      </div>

      {/* Deployment Details */}
      {selected && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="font-bold text-gray-900 mb-4">{selected.name} - Performance</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="text-sm text-gray-600 mb-1">Active Users</div>
              <div className="text-3xl font-bold text-gray-900">{selected.users.toLocaleString()}</div>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="text-sm text-gray-600 mb-1">Messages/Day</div>
              <div className="text-3xl font-bold text-gray-900">{(selected.messagesPerDay / 1000).toFixed(1)}K</div>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <div className="text-sm text-gray-600 mb-1">Avg Latency</div>
              <div className="text-3xl font-bold text-gray-900">{selected.latency}</div>
            </div>
            <div className="p-4 bg-orange-50 rounded-lg">
              <div className="text-sm text-gray-600 mb-1">Monthly Cost</div>
              <div className="text-3xl font-bold text-gray-900">{selected.costPerMonth}</div>
            </div>
          </div>
        </div>
      )}

      {/* Knowledge Base */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="font-bold text-gray-900 mb-3">Knowledge Base Training</div>
        <div className="space-y-2">
          {[
            { name: 'Product Documentation', status: 'trained', accuracy: '96%' },
            { name: 'FAQ Database', status: 'trained', accuracy: '94%' },
            { name: 'Company Policies', status: 'trained', accuracy: '91%' },
          ].map((kb) => (
            <div key={kb.name} className="flex justify-between items-center p-2 bg-gray-50 rounded">
              <div>
                <div className="font-medium text-gray-900">{kb.name}</div>
                <div className="text-xs text-gray-600">{kb.status}</div>
              </div>
              <div className="text-green-600 font-semibold">{kb.accuracy}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ===== 9. CodeDeploy Trial Component =====
export function CodeDeployTrialEnvironment() {
  const [pipelines] = useState([
    { name: 'Frontend Deploy', status: 'active', deployments: 234, successRate: 98.3, avgTime: '3.2 min' },
    { name: 'Backend API Deploy', status: 'active', deployments: 189, successRate: 97.8, avgTime: '5.1 min' },
  ]);

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-lg shadow-lg p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">🚀 CodeDeploy - CI/CD Pipeline</h2>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 flex items-center gap-2">
          <Plus size={18} /> Create Pipeline
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Total Deployments', value: '423' },
          { label: 'Success Rate', value: '98.1%' },
          { label: 'Avg Deploy Time', value: '4.1 min' },
          { label: 'Total Failures', value: '8' },
        ].map((stat) => (
          <div key={stat.label} className="bg-white p-3 rounded-lg border border-gray-200 text-center">
            <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
            <div className="text-xs text-gray-600">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Pipelines */}
      <div className="space-y-4">
        {pipelines.map((pipeline) => (
          <div key={pipeline.name} className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="font-bold text-gray-900">{pipeline.name}</div>
                <div className="text-sm text-gray-600">{pipeline.deployments} deployments</div>
              </div>
              <div className={`px-3 py-1 rounded-full text-sm font-semibold ${pipeline.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                {pipeline.status}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-green-50 p-3 rounded">
                <div className="text-sm text-gray-600 mb-1">Success Rate</div>
                <div className="text-2xl font-bold text-green-600">{pipeline.successRate}%</div>
              </div>
              <div className="bg-blue-50 p-3 rounded">
                <div className="text-sm text-gray-600 mb-1">Avg Deploy Time</div>
                <div className="text-2xl font-bold text-blue-600">{pipeline.avgTime}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Environment Statuses */}
      <div className="grid grid-cols-2 gap-4">
        {[
          { name: 'Staging', status: 'healthy' },
          { name: 'Production', status: 'healthy' },
        ].map((env) => (
          <div key={env.name} className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <div>
                <div className="font-semibold text-gray-900">{env.name}</div>
                <div className="text-sm text-gray-600">{env.status}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ===== 10. CloudMonitor Trial Component =====
export function CloudMonitorTrialEnvironment() {
  const [services] = useState([
    { name: 'Web Server', status: 'healthy', uptime: '99.95%', latency: '234ms', errorRate: '0.02%' },
    { name: 'Database', status: 'healthy', uptime: '99.99%', latency: '45ms', errorRate: '0.001%' },
    { name: 'Cache Layer', status: 'healthy', uptime: '99.88%', latency: '2ms', errorRate: '0.05%' },
  ]);

  return (
    <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-lg shadow-lg p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">📡 CloudMonitor - System Monitoring</h2>
        <button className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700">Configure Alerts</button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Healthy Services', value: '12/12' },
          { label: 'Monthly Uptime', value: '99.94%' },
          { label: 'Avg Latency', value: '94ms' },
          { label: 'Monthly Alerts', value: '34' },
        ].map((stat) => (
          <div key={stat.label} className="bg-white p-3 rounded-lg border border-gray-200 text-center">
            <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
            <div className="text-xs text-gray-600">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Services Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="grid grid-cols-5 gap-4 p-4 border-b border-gray-200 font-semibold text-gray-700 bg-gray-50">
          <div>Service</div>
          <div>Status</div>
          <div>Uptime</div>
          <div>Latency</div>
          <div>Error Rate</div>
        </div>
        {services.map((service) => (
          <div key={service.name} className="grid grid-cols-5 gap-4 p-4 border-b border-gray-100 items-center hover:bg-gray-50">
            <div className="font-medium text-gray-900">{service.name}</div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-green-700 font-semibold">{service.status}</span>
            </div>
            <div className="text-gray-600">{service.uptime}</div>
            <div className="text-gray-600">{service.latency}</div>
            <div className="text-gray-600">{service.errorRate}</div>
          </div>
        ))}
      </div>

      {/* Recent Alerts */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="font-bold text-gray-900 mb-3">Recent Alerts</div>
        <div className="space-y-2">
          {[
            { severity: 'warning', message: 'High memory usage on Server 3', time: '14:10' },
            { severity: 'info', message: 'Maintenance window scheduled', time: '10:00' },
          ].map((alert, idx) => (
            <div key={idx} className={`p-3 rounded flex gap-3 ${alert.severity === 'warning' ? 'bg-yellow-50' : 'bg-blue-50'}`}>
              {alert.severity === 'warning' ? <AlertCircle size={18} className="text-yellow-600" /> : <Zap size={18} className="text-blue-600" />}
              <div className="flex-1">
                <div className={`font-medium ${alert.severity === 'warning' ? 'text-yellow-900' : 'text-blue-900'}`}>{alert.message}</div>
                <div className="text-xs text-gray-600">{alert.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ===== 11. MarketingMax Trial Component =====
export function MarketingMaxTrialEnvironment() {
  const [campaigns] = useState([
    { name: 'Winter Sale - Email', status: 'active', sent: 45234, opened: 12342, clicked: 3456, roi: '342%' },
    { name: 'Social Media Promo', status: 'active', posts: 24, impressions: 234000, engagement: 8234, roi: '415%' },
  ]);

  return (
    <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-lg shadow-lg p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">📢 MarketingMax - Automation</h2>
        <button className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 flex items-center gap-2">
          <Plus size={18} /> New Campaign
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Total Contacts', value: '45K' },
          { label: 'Emails Sent', value: '234K' },
          { label: 'Avg Open Rate', value: '28.3%' },
          { label: 'Avg Click Rate', value: '4.5%' },
        ].map((stat) => (
          <div key={stat.label} className="bg-white p-3 rounded-lg border border-gray-200 text-center">
            <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
            <div className="text-xs text-gray-600">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Campaigns */}
      <div className="space-y-4">
        {campaigns.map((campaign) => (
          <div key={campaign.name} className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <div className="font-bold text-gray-900">{campaign.name}</div>
              </div>
              <div className="px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-800">{campaign.status}</div>
            </div>

            <div className="grid grid-cols-4 gap-3 text-sm">
              <div className="bg-blue-50 p-2 rounded">
                <div className="text-gray-600 text-xs">Sent/Posts</div>
                <div className="font-bold text-gray-900">{campaign.sent?.toLocaleString() || campaign.posts}</div>
              </div>
              <div className="bg-purple-50 p-2 rounded">
                <div className="text-gray-600 text-xs">Opened/Impressions</div>
                <div className="font-bold text-gray-900">{campaign.opened?.toLocaleString() || `${((campaign.impressions ?? 0) / 1000).toFixed(0)}K`}</div>
              </div>
              <div className="bg-orange-50 p-2 rounded">
                <div className="text-gray-600 text-xs">Clicked/Engagement</div>
                <div className="font-bold text-gray-900">{campaign.clicked?.toLocaleString() || campaign.engagement?.toLocaleString()}</div>
              </div>
              <div className="bg-green-50 p-2 rounded">
                <div className="text-gray-600 text-xs">ROI</div>
                <div className="font-bold text-green-600">{campaign.roi}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Contact Lists */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="font-bold text-gray-900 mb-3">Contact Lists</div>
        <div className="grid grid-cols-3 gap-3">
          {[
            { name: 'Active Customers', count: 8234 },
            { name: 'Trial Users', count: 3234 },
            { name: 'Leads', count: 12450 },
          ].map((list) => (
            <div key={list.name} className="bg-gray-50 p-3 rounded">
              <div className="font-medium text-gray-900">{list.name}</div>
              <div className="text-2xl font-bold text-pink-600">{(list.count / 1000).toFixed(1)}K</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ===== 12. SEO Optimizer Trial Component =====
export function SEOOptimizerTrialEnvironment() {
  return (
    <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg shadow-lg p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">🔍 SEO Optimizer - Search Optimization</h2>
        <button className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700">Add Website</button>
      </div>

      {/* Main Site Stats */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-lg font-bold text-gray-900">yoursite.com</div>
            <div className="text-sm text-gray-600">Overall Performance</div>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold text-yellow-600">94/100</div>
            <div className="text-sm text-gray-600">Health Score</div>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-3 pt-4 border-t border-gray-200">
          {[
            { label: 'Search Traffic', value: '45K/month' },
            { label: 'Estimated Value', value: '$125K' },
            { label: 'Indexed Pages', value: '2,342' },
            { label: 'Ranking #1 KWs', value: '12' },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-xs text-gray-600">{stat.label}</div>
              <div className="font-bold text-gray-900">{stat.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Keywords */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200 font-semibold text-gray-700 bg-gray-50">
          Top Ranking Keywords
        </div>
        <div className="divide-y">
          {[
            { keyword: 'Product Management Software', rank: 5, volume: '8.9K', difficulty: 'Hard', trend: 'Up' },
            { keyword: 'Team Collaboration Tools', rank: 12, volume: '5.6K', difficulty: 'Medium', trend: 'Up' },
            { keyword: 'Automation Platform', rank: 8, volume: '12K', difficulty: 'Hard', trend: 'Stable' },
          ].map((kw) => (
            <div key={kw.keyword} className="p-4 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-gray-900">{kw.keyword}</div>
                  <div className="text-sm text-gray-600 mt-1">Volume: {kw.volume} • Difficulty: {kw.difficulty}</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-gray-900">#{kw.rank}</div>
                  <div className={`text-sm font-semibold mt-1 ${kw.trend === 'Up' ? 'text-green-600' : 'text-gray-600'}`}>
                    {kw.trend === 'Up' ? '📈' : '➡️'} {kw.trend}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Backlinks */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <h3 className="font-bold text-gray-900 mb-4">Backlink Profile</h3>
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: 'Total Backlinks', value: '1,234' },
            { label: 'Referring Domains', value: '567' },
            { label: 'Quality Score', value: '7.8/10' },
          ].map((stat) => (
            <div key={stat.label} className="bg-gray-50 p-3 rounded text-center">
              <div className="text-sm text-gray-600">{stat.label}</div>
              <div className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default {
  AIAssistTrialEnvironment,
  ChatGPTEnterpriseTrialEnvironment,
  CodeDeployTrialEnvironment,
  CloudMonitorTrialEnvironment,
  MarketingMaxTrialEnvironment,
  SEOOptimizerTrialEnvironment,
};
