// Product Trial Environments Part 2: AI, DevOps, Marketing Products
// Components 7-12

'use client';

import React, { useState } from 'react';
import {
  ArrowDownRight,
  ArrowUpRight,
  Bell,
  Filter,
  Megaphone,
  MessageSquare,
  Plus,
  Radio,
  Rocket,
  Search,
  Send,
  Settings,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

// ===== 7. AIAssist Trial Component =====
export function AIAssistTrialEnvironment() {
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, sender: 'user', text: 'Summarize Q1 onboarding drop-off drivers.', time: '09:12 AM' },
    { id: 2, sender: 'ai', text: 'Top drivers: delayed first value (43%), missing integrations (27%), and unclear next steps (18%).', time: '09:13 AM' },
  ]);

  const kpis = [
    { label: 'Active Assistants', value: '6', meta: 'Ops + RevOps' },
    { label: 'Resolution Rate', value: '92%', meta: 'Last 7 days' },
    { label: 'Avg Response', value: '2.1s', meta: 'P95 3.4s' },
    { label: 'Human Handoff', value: '8%', meta: 'Target < 10%' },
  ];

  const playbooks = [
    { name: 'Onboarding Recovery', status: 'live', lastRun: '34 min ago', impact: '+6.2%' },
    { name: 'Pipeline Acceleration', status: 'live', lastRun: '1 hr ago', impact: '+$84K' },
    { name: 'Churn Prevention', status: 'draft', lastRun: '—', impact: '—' },
  ];

  const handleSend = () => {
    if (!inputValue.trim()) return;
    const now = new Date().toLocaleTimeString();
    setMessages((prev) => [...prev, { id: prev.length + 1, sender: 'user', text: inputValue, time: now }]);
    setInputValue('');
    setTimeout(() => {
      setMessages((prev) => [...prev, { id: prev.length + 1, sender: 'ai', text: 'Drafting the report and highlighting key drivers.', time: new Date().toLocaleTimeString() }]);
    }, 450);
  };

  return (
    <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-lg shadow-lg p-6">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-purple-600 text-white flex items-center justify-center">
            <Sparkles size={18} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">AIAssist - Intelligence Hub</h2>
            <p className="text-sm text-gray-600">Unified copilots, playbooks, and analytics workflows.</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="px-3 py-2 rounded-lg border border-gray-300 text-sm font-semibold text-gray-700 hover:bg-gray-50 flex items-center gap-2">
            <Settings size={16} /> Configure
          </button>
          <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 flex items-center gap-2">
            <Plus size={18} /> New Copilot
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {kpis.map((kpi) => (
          <div key={kpi.label} className="bg-white p-4 rounded-lg border border-gray-200">
            <p className="text-sm text-gray-500">{kpi.label}</p>
            <p className="text-2xl font-bold text-gray-900 mt-2">{kpi.value}</p>
            <p className="text-xs text-gray-500 mt-1">{kpi.meta}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-lg border border-gray-200 flex flex-col">
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-gray-900">Executive Chat</h3>
              <p className="text-sm text-gray-500">Ask anything about your operations.</p>
            </div>
            <span className="text-xs font-semibold text-green-700 bg-green-100 px-2 py-1 rounded-full">Live</span>
          </div>
          <div className="flex-1 p-4 space-y-4 max-h-80 overflow-y-auto">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs px-4 py-2 rounded-lg ${msg.sender === 'user' ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-900'}`}>
                  <p className="text-sm">{msg.text}</p>
                  <p className={`text-xs mt-1 ${msg.sender === 'user' ? 'text-purple-100' : 'text-gray-500'}`}>{msg.time}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-200 p-3 flex gap-2">
            <input
              value={inputValue}
              onChange={(event) => setInputValue(event.target.value)}
              placeholder="Ask for insights, forecasts, or action plans"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
              onKeyDown={(event) => event.key === 'Enter' && handleSend()}
            />
            <button onClick={handleSend} className="bg-purple-600 text-white px-3 rounded-lg">
              <Send size={18} />
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="font-semibold text-gray-900 mb-3">Playbooks</h3>
            <div className="space-y-3">
              {playbooks.map((playbook) => (
                <div key={playbook.name} className="border border-gray-100 rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-gray-900">{playbook.name}</p>
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${playbook.status === 'live' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                      {playbook.status}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">Last run {playbook.lastRun}</p>
                  <p className="text-xs text-purple-600">Impact {playbook.impact}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="font-semibold text-gray-900 mb-3">Model Health</h3>
            <div className="space-y-3">
              {[
                { label: 'Accuracy', value: '94.2%', trend: '+1.2%' },
                { label: 'Hallucination Rate', value: '0.8%', trend: '-0.3%' },
                { label: 'Guardrails', value: 'Enabled', trend: 'All regions' },
              ].map((item) => (
                <div key={item.label} className="border border-gray-100 rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-600">{item.label}</p>
                    <p className="text-sm font-semibold text-gray-900">{item.value}</p>
                  </div>
                  <p className="text-xs text-gray-500">{item.trend}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ===== 8. ChatGPT Enterprise Trial Component =====
export function ChatGPTEnterpriseTrialEnvironment() {
  const [selectedDeployment, setSelectedDeployment] = useState('support');

  const deployments = [
    { id: 'support', name: 'Support Automation', users: 523, messagesPerDay: 8234, latency: '234ms', costPerMonth: '$15.2K' },
    { id: 'content', name: 'Content Studio', users: 156, messagesPerDay: 2341, latency: '567ms', costPerMonth: '$8.4K' },
    { id: 'ops', name: 'Ops Copilot', users: 98, messagesPerDay: 1120, latency: '190ms', costPerMonth: '$6.1K' },
  ];

  const selected = deployments.find((dep) => dep.id === selectedDeployment);

  return (
    <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg shadow-lg p-6">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-green-600 text-white flex items-center justify-center">
            <MessageSquare size={18} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">ChatGPT Enterprise - Deployment Console</h2>
            <p className="text-sm text-gray-600">Governed AI experiences with compliance and cost visibility.</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="px-3 py-2 rounded-lg border border-gray-300 text-sm font-semibold text-gray-700 hover:bg-gray-50 flex items-center gap-2">
            <ShieldCheck size={16} /> Policies
          </button>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2">
            <Plus size={18} /> New Deployment
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Messages', value: '125K', meta: '30 day window' },
          { label: 'Avg Satisfaction', value: '4.7', meta: 'CSAT' },
          { label: 'Uptime', value: '99.97%', meta: 'Global' },
          { label: 'Monthly Users', value: '1.2K', meta: 'Active' },
        ].map((stat) => (
          <div key={stat.label} className="bg-white p-4 rounded-lg border border-gray-200">
            <p className="text-sm text-gray-500">{stat.label}</p>
            <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
            <p className="text-xs text-gray-500 mt-1">{stat.meta}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-3">
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

      {selected && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-4">{selected.name} - Performance</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Active Users</p>
                <p className="text-3xl font-bold text-gray-900">{selected.users.toLocaleString()}</p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Messages/Day</p>
                <p className="text-3xl font-bold text-gray-900">{(selected.messagesPerDay / 1000).toFixed(1)}K</p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Avg Latency</p>
                <p className="text-3xl font-bold text-gray-900">{selected.latency}</p>
              </div>
              <div className="p-4 bg-orange-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Monthly Cost</p>
                <p className="text-3xl font-bold text-gray-900">{selected.costPerMonth}</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <h3 className="font-semibold text-gray-900 mb-3">Guardrails</h3>
              <div className="space-y-3">
                {[
                  { label: 'PII Redaction', status: 'Enabled' },
                  { label: 'Prompt Injection', status: 'Blocked' },
                  { label: 'Data Residency', status: 'US + EU' },
                ].map((item) => (
                  <div key={item.label} className="border border-gray-100 rounded-lg p-3">
                    <p className="text-sm text-gray-600">{item.label}</p>
                    <p className="font-semibold text-gray-900">{item.status}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <h3 className="font-semibold text-gray-900 mb-3">Knowledge Bases</h3>
              <div className="space-y-3">
                {[
                  { name: 'Product Docs', status: 'Trained', accuracy: '96%' },
                  { name: 'Support Articles', status: 'Trained', accuracy: '94%' },
                  { name: 'Policy Library', status: 'In Review', accuracy: '91%' },
                ].map((kb) => (
                  <div key={kb.name} className="border border-gray-100 rounded-lg p-3">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-gray-900">{kb.name}</p>
                      <span className={`text-xs font-semibold px-2 py-1 rounded-full ${kb.status === 'Trained' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                        {kb.status}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">Accuracy {kb.accuracy}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ===== 9. CodeDeploy Trial Component =====
export function CodeDeployTrialEnvironment() {
  const [selectedPipeline, setSelectedPipeline] = useState('frontend');

  const pipelines = [
    { id: 'frontend', name: 'Frontend Deploy', status: 'healthy', deployments: 234, successRate: 98.3, avgTime: '3.2 min' },
    { id: 'backend', name: 'Backend API Deploy', status: 'healthy', deployments: 189, successRate: 97.8, avgTime: '5.1 min' },
    { id: 'data', name: 'Data Platform', status: 'degraded', deployments: 82, successRate: 95.4, avgTime: '7.4 min' },
  ];

  const selected = pipelines.find((pipe) => pipe.id === selectedPipeline);

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-lg shadow-lg p-6">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-indigo-600 text-white flex items-center justify-center">
            <Rocket size={18} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">CodeDeploy - Release Orchestration</h2>
            <p className="text-sm text-gray-600">Pipeline governance, approvals, and environment health.</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="px-3 py-2 rounded-lg border border-gray-300 text-sm font-semibold text-gray-700 hover:bg-gray-50 flex items-center gap-2">
            <Filter size={16} /> Filters
          </button>
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 flex items-center gap-2">
            <Plus size={18} /> New Pipeline
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Deployments Today', value: '28', meta: '2 failed' },
          { label: 'Change Failure Rate', value: '1.9%', meta: 'SLO 3%' },
          { label: 'Lead Time', value: '4.2 hrs', meta: 'Last 7 days' },
          { label: 'MTTR', value: '22 min', meta: 'Target 30 min' },
        ].map((stat) => (
          <div key={stat.label} className="bg-white p-4 rounded-lg border border-gray-200">
            <p className="text-sm text-gray-500">{stat.label}</p>
            <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
            <p className="text-xs text-gray-500 mt-1">{stat.meta}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-3">
        {pipelines.map((pipeline) => (
          <button
            key={pipeline.id}
            onClick={() => setSelectedPipeline(pipeline.id)}
            className={`px-4 py-2 rounded-lg font-semibold transition ${selectedPipeline === pipeline.id ? 'bg-indigo-600 text-white' : 'bg-white text-gray-900 border border-gray-300 hover:border-indigo-300'}`}
          >
            {pipeline.name}
          </button>
        ))}
      </div>

      {selected && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-semibold text-gray-900">{selected.name}</h3>
                <p className="text-sm text-gray-500">Last deploy 22 minutes ago</p>
              </div>
              <span className={`text-xs font-semibold px-2 py-1 rounded-full ${selected.status === 'healthy' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                {selected.status}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-green-50 p-3 rounded">
                <p className="text-sm text-gray-600 mb-1">Success Rate</p>
                <p className="text-2xl font-bold text-green-700">{selected.successRate}%</p>
              </div>
              <div className="bg-blue-50 p-3 rounded">
                <p className="text-sm text-gray-600 mb-1">Avg Deploy Time</p>
                <p className="text-2xl font-bold text-blue-700">{selected.avgTime}</p>
              </div>
              <div className="bg-indigo-50 p-3 rounded">
                <p className="text-sm text-gray-600 mb-1">Deployments</p>
                <p className="text-2xl font-bold text-indigo-700">{selected.deployments}</p>
              </div>
              <div className="bg-orange-50 p-3 rounded">
                <p className="text-sm text-gray-600 mb-1">Risk Level</p>
                <p className="text-2xl font-bold text-orange-700">Moderate</p>
              </div>
            </div>
            <div className="mt-6 space-y-3">
              {[
                { stage: 'Build', status: 'passed', time: '4m 12s' },
                { stage: 'Test', status: 'passed', time: '6m 44s' },
                { stage: 'Security', status: 'passed', time: '2m 18s' },
                { stage: 'Deploy', status: 'running', time: '1m 03s' },
              ].map((stage) => (
                <div key={stage.stage} className="flex items-center justify-between border border-gray-100 rounded-lg p-3">
                  <div>
                    <p className="font-semibold text-gray-900">{stage.stage}</p>
                    <p className="text-xs text-gray-500">{stage.time}</p>
                  </div>
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full ${stage.status === 'passed' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                    {stage.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <h3 className="font-semibold text-gray-900 mb-3">Environment Health</h3>
              <div className="space-y-3">
                {[
                  { name: 'Staging', status: 'healthy', latency: '120ms' },
                  { name: 'Production', status: 'healthy', latency: '220ms' },
                  { name: 'Canary', status: 'warning', latency: '410ms' },
                ].map((env) => (
                  <div key={env.name} className="border border-gray-100 rounded-lg p-3">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-gray-900">{env.name}</p>
                      <span className={`text-xs font-semibold px-2 py-1 rounded-full ${env.status === 'healthy' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                        {env.status}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">Latency {env.latency}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <h3 className="font-semibold text-gray-900 mb-3">Release Calendar</h3>
              <div className="space-y-2">
                {[
                  { title: 'Frontend v2.12', time: 'Today 4:00 PM', owner: 'Web Team' },
                  { title: 'API v5.4', time: 'Tomorrow 11:00 AM', owner: 'Platform' },
                  { title: 'Data lake patch', time: 'Fri 9:00 AM', owner: 'Data Eng' },
                ].map((release) => (
                  <div key={release.title} className="border border-gray-100 rounded-lg p-3">
                    <p className="font-semibold text-gray-900">{release.title}</p>
                    <p className="text-xs text-gray-500">{release.time} • {release.owner}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ===== 10. CloudMonitor Trial Component =====
export function CloudMonitorTrialEnvironment() {
  const services = [
    { name: 'API Gateway', status: 'healthy', uptime: '99.95%', latency: '234ms', errorRate: '0.02%' },
    { name: 'Database Cluster', status: 'healthy', uptime: '99.99%', latency: '45ms', errorRate: '0.001%' },
    { name: 'Cache Layer', status: 'healthy', uptime: '99.88%', latency: '2ms', errorRate: '0.05%' },
    { name: 'Queue Workers', status: 'degraded', uptime: '98.40%', latency: '420ms', errorRate: '0.8%' },
  ];

  return (
    <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-lg shadow-lg p-6">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-teal-600 text-white flex items-center justify-center">
            <Radio size={18} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">CloudMonitor - NOC Dashboard</h2>
            <p className="text-sm text-gray-600">Service health, incident response, and alerting.</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="px-3 py-2 rounded-lg border border-gray-300 text-sm font-semibold text-gray-700 hover:bg-gray-50 flex items-center gap-2">
            <Bell size={16} /> On-call
          </button>
          <button className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 flex items-center gap-2">
            <Plus size={18} /> Create Alert
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Healthy Services', value: '18/19', meta: 'One degraded' },
          { label: 'Monthly Uptime', value: '99.94%', meta: 'SLA 99.9%' },
          { label: 'Avg Latency', value: '94ms', meta: 'P95 160ms' },
          { label: 'Open Incidents', value: '2', meta: '1 major' },
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
          <div className="grid grid-cols-5 gap-4 p-4 border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase tracking-wide">
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
                <span className={`h-2 w-2 rounded-full ${service.status === 'healthy' ? 'bg-green-500' : 'bg-amber-500'}`} />
                <span className={`font-semibold ${service.status === 'healthy' ? 'text-green-700' : 'text-amber-700'}`}>
                  {service.status}
                </span>
              </div>
              <div className="text-gray-600">{service.uptime}</div>
              <div className="text-gray-600">{service.latency}</div>
              <div className="text-gray-600">{service.errorRate}</div>
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="font-semibold text-gray-900 mb-3">Active Incidents</h3>
            <div className="space-y-3">
              {[
                { title: 'Queue worker saturation', level: 'major', time: '12 min ago' },
                { title: 'API error spike - EU region', level: 'minor', time: '1 hr ago' },
              ].map((incident) => (
                <div key={incident.title} className="border border-gray-100 rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-gray-900">{incident.title}</p>
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${incident.level === 'major' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'}`}>
                      {incident.level}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">{incident.time}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="font-semibold text-gray-900 mb-3">SLO Performance</h3>
            <div className="space-y-3">
              {[
                { label: 'Availability', value: '99.94%', trend: 'On track' },
                { label: 'Latency', value: '94ms', trend: 'Improving' },
                { label: 'Error Budget', value: '72%', trend: 'Healthy' },
              ].map((slo) => (
                <div key={slo.label} className="border border-gray-100 rounded-lg p-3">
                  <p className="text-sm text-gray-600">{slo.label}</p>
                  <p className="font-semibold text-gray-900">{slo.value}</p>
                  <p className="text-xs text-gray-500">{slo.trend}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ===== 11. MarketingMax Trial Component =====
export function MarketingMaxTrialEnvironment() {
  const campaigns = [
    { name: 'Lifecycle Email Surge', status: 'active', sent: 45234, opened: 12342, clicked: 3456, roi: '342%' },
    { name: 'Paid Social Retargeting', status: 'active', sent: 24, opened: 234000, clicked: 8234, roi: '415%' },
    { name: 'Partner Webinar', status: 'scheduled', sent: 18000, opened: 5400, clicked: 1200, roi: '260%' },
  ];

  return (
    <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-lg shadow-lg p-6">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-pink-600 text-white flex items-center justify-center">
            <Megaphone size={18} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">MarketingMax - Growth Command</h2>
            <p className="text-sm text-gray-600">Campaign orchestration, segmentation, and attribution.</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="px-3 py-2 rounded-lg border border-gray-300 text-sm font-semibold text-gray-700 hover:bg-gray-50 flex items-center gap-2">
            <Filter size={16} /> Segments
          </button>
          <button className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 flex items-center gap-2">
            <Plus size={18} /> New Campaign
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Active Contacts', value: '45K', meta: '+1.4% WoW' },
          { label: 'Pipeline Influenced', value: '$1.2M', meta: '30 days' },
          { label: 'Avg Open Rate', value: '28.3%', meta: 'Target 25%' },
          { label: 'Cost per Lead', value: '$18.20', meta: 'Down 12%' },
        ].map((stat) => (
          <div key={stat.label} className="bg-white p-4 rounded-lg border border-gray-200">
            <p className="text-sm text-gray-500">{stat.label}</p>
            <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
            <p className="text-xs text-gray-500 mt-1">{stat.meta}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {campaigns.map((campaign) => (
            <div key={campaign.name} className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="font-semibold text-gray-900">{campaign.name}</p>
                  <p className="text-xs text-gray-500">Attribution model: Multi-touch</p>
                </div>
                <span className={`text-xs font-semibold px-2 py-1 rounded-full ${campaign.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                  {campaign.status}
                </span>
              </div>
              <div className="grid grid-cols-4 gap-3 text-sm">
                <div className="bg-blue-50 p-2 rounded">
                  <p className="text-gray-600 text-xs">Sent/Posts</p>
                  <p className="font-bold text-gray-900">{campaign.sent.toLocaleString()}</p>
                </div>
                <div className="bg-purple-50 p-2 rounded">
                  <p className="text-gray-600 text-xs">Opened/Impressions</p>
                  <p className="font-bold text-gray-900">{campaign.opened.toLocaleString()}</p>
                </div>
                <div className="bg-orange-50 p-2 rounded">
                  <p className="text-gray-600 text-xs">Clicked/Engaged</p>
                  <p className="font-bold text-gray-900">{campaign.clicked.toLocaleString()}</p>
                </div>
                <div className="bg-green-50 p-2 rounded">
                  <p className="text-gray-600 text-xs">ROI</p>
                  <p className="font-bold text-green-700">{campaign.roi}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="font-semibold text-gray-900 mb-3">Journey Builder</h3>
            <div className="space-y-3 text-sm text-gray-600">
              <div className="flex items-center justify-between">
                <span>Welcome Flow</span>
                <span className="text-green-700 font-semibold">Running</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Pricing Page Follow-up</span>
                <span className="text-green-700 font-semibold">Running</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Renewal Nudges</span>
                <span className="text-amber-700 font-semibold">Draft</span>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="font-semibold text-gray-900 mb-3">Top Segments</h3>
            <div className="space-y-3">
              {[
                { name: 'Trial to Paid', size: '4.8K', lift: '+12%' },
                { name: 'Enterprise Leads', size: '1.2K', lift: '+8%' },
                { name: 'Churn Risk', size: '640', lift: '-4%' },
              ].map((segment) => (
                <div key={segment.name} className="border border-gray-100 rounded-lg p-3">
                  <p className="font-semibold text-gray-900">{segment.name}</p>
                  <p className="text-xs text-gray-500">{segment.size} contacts</p>
                  <p className="text-xs text-pink-600">Lift {segment.lift}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ===== 12. SEO Optimizer Trial Component =====
export function SEOOptimizerTrialEnvironment() {
  return (
    <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg shadow-lg p-6">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-yellow-600 text-white flex items-center justify-center">
            <Search size={18} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">SEO Optimizer - Growth SEO</h2>
            <p className="text-sm text-gray-600">Technical audits, content wins, and SERP visibility.</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="px-3 py-2 rounded-lg border border-gray-300 text-sm font-semibold text-gray-700 hover:bg-gray-50 flex items-center gap-2">
            <Filter size={16} /> Filters
          </button>
          <button className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 flex items-center gap-2">
            <Plus size={18} /> Add Site
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-lg font-semibold text-gray-900">j-supremetech.com</p>
            <p className="text-sm text-gray-500">Overall performance</p>
          </div>
          <div className="text-right">
            <p className="text-4xl font-bold text-yellow-600">94/100</p>
            <p className="text-sm text-gray-600">Health score</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 pt-4 border-t border-gray-200">
          {[
            { label: 'Search Traffic', value: '45K/mo' },
            { label: 'Estimated Value', value: '$125K' },
            { label: 'Indexed Pages', value: '2,342' },
            { label: 'Top 3 Keywords', value: '48' },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="text-xs text-gray-600">{stat.label}</p>
              <p className="font-bold text-gray-900">{stat.value}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="p-4 border-b border-gray-200 font-semibold text-gray-700 bg-gray-50">
            Top Ranking Keywords
          </div>
          <div className="divide-y">
            {[
              { keyword: 'Automation platform', rank: 3, volume: '12K', difficulty: 'Hard', trend: 'Up' },
              { keyword: 'Workflow analytics', rank: 7, volume: '8.9K', difficulty: 'Medium', trend: 'Up' },
              { keyword: 'AI operations suite', rank: 11, volume: '5.6K', difficulty: 'Hard', trend: 'Stable' },
            ].map((kw) => (
              <div key={kw.keyword} className="p-4 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">{kw.keyword}</p>
                    <p className="text-sm text-gray-600">Volume {kw.volume} • Difficulty {kw.difficulty}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900">#{kw.rank}</p>
                    <p className={`text-sm font-semibold ${kw.trend === 'Up' ? 'text-green-600' : 'text-gray-600'}`}>
                      {kw.trend === 'Up' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />} {kw.trend}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="font-semibold text-gray-900 mb-3">Technical Issues</h3>
            <div className="space-y-3">
              {[
                { issue: 'Missing alt tags', pages: 18, severity: 'medium' },
                { issue: 'Slow LCP pages', pages: 6, severity: 'high' },
                { issue: 'Duplicate titles', pages: 4, severity: 'low' },
              ].map((issue) => (
                <div key={issue.issue} className="border border-gray-100 rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-gray-900">{issue.issue}</p>
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${issue.severity === 'high' ? 'bg-red-100 text-red-700' : issue.severity === 'medium' ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'}`}>
                      {issue.severity}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">{issue.pages} pages impacted</p>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="font-semibold text-gray-900 mb-3">Content Wins</h3>
            <div className="space-y-3">
              {[
                { title: 'Pricing page refresh', lift: '+14% CTR' },
                { title: 'Case study cluster', lift: '+9% organic' },
                { title: 'FAQ schema', lift: '+6% impressions' },
              ].map((win) => (
                <div key={win.title} className="border border-gray-100 rounded-lg p-3">
                  <p className="font-semibold text-gray-900">{win.title}</p>
                  <p className="text-xs text-yellow-700">Lift {win.lift}</p>
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
  AIAssistTrialEnvironment,
  ChatGPTEnterpriseTrialEnvironment,
  CodeDeployTrialEnvironment,
  CloudMonitorTrialEnvironment,
  MarketingMaxTrialEnvironment,
  SEOOptimizerTrialEnvironment,
};// Product Trial Environments Part 2: AI, DevOps, Marketing Products
// Components 7-12
