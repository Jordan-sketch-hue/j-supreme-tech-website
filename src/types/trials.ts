// Trial Request Types
export interface TrialRequest {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  company: string;
  industry: string;
  productSlugs: string[]; // Array of products they're trialing
  useCases: Record<string, string>; // { productSlug: useCaseId }
  status: 'pending' | 'approved' | 'active' | 'expired' | 'completed';
  createdAt: Date;
  expiresAt: Date;
  startedAt?: Date;
  completedAt?: Date;
}

export interface TrialEnvironment {
  id: string;
  trialRequestId: string;
  productSlug: string;
  accessToken: string;
  demoData: Record<string, unknown>;
  settings: TrialSettings;
  usageMetrics: TrialMetrics;
  createdAt: Date;
  expiresAt: Date;
}

export interface TrialSettings {
  theme: 'light' | 'dark';
  language: 'en' | 'es' | 'fr' | 'de';
  timezone: string;
  dataLimit: number; // MB
  featureLimit: number; // max features enabled
  customizations: Record<string, unknown>;
}

export interface TrialMetrics {
  logins: number;
  lastLogin?: Date;
  hoursUsed: number;
  featuresAccessed: string[];
  dataProcessed: number;
  actionsCompleted: number;
}

export interface UseCase {
  id: string;
  productSlug: string;
  name: string;
  description: string;
  industry: string;
  demoDataTemplate: Record<string, unknown>;
  suggestedFeatures: string[];
  complexity: 'simple' | 'intermediate' | 'advanced';
  estimatedTime: number; // minutes
}

export interface ProductTrialConfig {
  slug: string;
  name: string;
  trialDays: number;
  maxUsers: number;
  maxDataPoints: number;
  includedFeatures: string[];
  limitedFeatures: string[];
  disabledFeatures: string[];
  useCases: UseCase[];
  demoDataGenerator: (useCase: UseCase) => Record<string, unknown>;
}

export interface TrialAnalytics {
  trialId: string;
  productSlug: string;
  eventType: 'login' | 'feature_access' | 'data_upload' | 'action_completed' | 'error' | 'export_attempt';
  timestamp: Date;
  metadata?: Record<string, unknown>;
}

// Security Types
export interface SecurityConfig {
  enableCodeBlocker: boolean;
  preventScreenshot: boolean;
  preventConsole: boolean;
  enableAuditLog: boolean;
  encryptionEnabled: boolean;
  rateLimitPerMinute: number;
  sessionTimeout: number; // minutes
}

// AI Suggestion Types
export interface AISuggestion {
  id: string;
  trialId: string;
  productSlug: string;
  type: 'onboarding' | 'feature' | 'best_practice' | 'help';
  title: string;
  description: string;
  action?: string;
  priority: 'low' | 'medium' | 'high';
  dismissed: boolean;
}
