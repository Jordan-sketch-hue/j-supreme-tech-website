'use client';

import React from 'react';
import { AutoFlowTrialEnvironment, AppointmentProTrialEnvironment, TradeBotEliteTrialEnvironment, CryptoBotProTrialEnvironment, DataVaultTrialEnvironment, InsightHubTrialEnvironment } from '@/components/TrialEnvironments1';
import { AIAssistTrialEnvironment, ChatGPTEnterpriseTrialEnvironment, CodeDeployTrialEnvironment, CloudMonitorTrialEnvironment, MarketingMaxTrialEnvironment, SEOOptimizerTrialEnvironment } from '@/components/TrialEnvironments2';
import { FinanceFlowTrialEnvironment, InvestmentAnalyzerTrialEnvironment, CRMSyncTrialEnvironment, SupportHubTrialEnvironment } from '@/components/TrialEnvironments3';

interface TrialEnvironmentConfig {
  component: React.ComponentType;
  name: string;
  category: string;
  description: string;
  icon: string;
}

export const TRIAL_ENVIRONMENT_REGISTRY: Record<string, TrialEnvironmentConfig> = {
  autoflow: { component: AutoFlowTrialEnvironment, name: 'AutoFlow', category: 'Automation', description: 'Workflow Automation Platform', icon: '⚙️' },
  appointmentpro: { component: AppointmentProTrialEnvironment, name: 'AppointmentPro', category: 'Scheduling', description: 'Appointment Scheduling System', icon: '📅' },
  tradebotelite: { component: TradeBotEliteTrialEnvironment, name: 'TradeBotElite', category: 'Trading', description: 'Advanced Trading Bot', icon: '📈' },
  cryptobotpro: { component: CryptoBotProTrialEnvironment, name: 'CryptoBot Pro', category: 'Trading', description: 'Cryptocurrency Trading Automation', icon: '🪙' },
  datavault: { component: DataVaultTrialEnvironment, name: 'DataVault', category: 'Data', description: 'Secure Data Management', icon: '🔒' },
  insighthub: { component: InsightHubTrialEnvironment, name: 'InsightHub', category: 'Data', description: 'Business Intelligence Dashboard', icon: '📊' },
  aiassist: { component: AIAssistTrialEnvironment, name: 'AIAssist', category: 'AI', description: 'AI-Powered Assistant', icon: '🤖' },
  'chatgpt-enterprise': { component: ChatGPTEnterpriseTrialEnvironment, name: 'ChatGPT Enterprise', category: 'AI', description: 'Enterprise Conversational AI', icon: '💬' },
  codedeploy: { component: CodeDeployTrialEnvironment, name: 'CodeDeploy', category: 'DevOps', description: 'Continuous Deployment Pipeline', icon: '🚀' },
  cloudmonitor: { component: CloudMonitorTrialEnvironment, name: 'CloudMonitor', category: 'DevOps', description: 'System Monitoring & Alerts', icon: '📡' },
  marketingmax: { component: MarketingMaxTrialEnvironment, name: 'MarketingMax', category: 'Marketing', description: 'Marketing Automation Platform', icon: '📢' },
  'seo-optimizer': { component: SEOOptimizerTrialEnvironment, name: 'SEO Optimizer', category: 'Marketing', description: 'SEO Analysis & Optimization', icon: '🔍' },
  financeflow: { component: FinanceFlowTrialEnvironment, name: 'FinanceFlow', category: 'Finance', description: 'Accounting & Finance Platform', icon: '💰' },
  investmentanalyzer: { component: InvestmentAnalyzerTrialEnvironment, name: 'InvestmentAnalyzer', category: 'Finance', description: 'Portfolio Analysis Tool', icon: '📊' },
  crmsync: { component: CRMSyncTrialEnvironment, name: 'CRMSync', category: 'CRM', description: 'Customer Relationship Management', icon: '👥' },
  supporthub: { component: SupportHubTrialEnvironment, name: 'SupportHub', category: 'Support', description: 'Customer Support Platform', icon: '🎫' },
};

export function getTrialEnvironment(productSlug: string): TrialEnvironmentConfig | null {
  if (!(productSlug in TRIAL_ENVIRONMENT_REGISTRY)) return null;
  return TRIAL_ENVIRONMENT_REGISTRY[productSlug];
}

export function hasTrialEnvironment(productSlug: string): boolean {
  return productSlug in TRIAL_ENVIRONMENT_REGISTRY;
}

export function getAllTrialEnvironments(): TrialEnvironmentConfig[] {
  return Object.values(TRIAL_ENVIRONMENT_REGISTRY);
}

export function getTrialEnvironmentStats() {
  const byCategory = Object.values(TRIAL_ENVIRONMENT_REGISTRY).reduce((acc: Record<string, number>, env) => {
    acc[env.category] = (acc[env.category] || 0) + 1;
    return acc;
  }, {});
  return {
    totalProducts: Object.keys(TRIAL_ENVIRONMENT_REGISTRY).length,
    totalCategories: Object.keys(byCategory).length,
    byCategory,
    coverage: '100%',
  };
}

export function RenderTrialEnvironment({ productSlug }: { productSlug: string }): React.ReactElement | null {
  const environment = getTrialEnvironment(productSlug);
  if (!environment) return null;
  const Component = environment.component as React.ComponentType;
  return React.createElement(Component);
}
