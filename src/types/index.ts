// User Types
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthToken {
  token: string;
  refreshToken: string;
  expiresIn: number;
}

// Product Types
export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  features: string[];
  category: string;
  icon?: string;
  demoUrl?: string;
  status: 'active' | 'beta' | 'coming-soon';
  createdAt: Date;
}

export interface PricingTier {
  id: string;
  name: string;
  monthlyPrice: number;
  yearlyPrice: number;
  features: string[];
  productId: string;
  stripePriceId?: string;
}

// Subscription Types
export interface Subscription {
  id: string;
  userId: string;
  productId: string;
  tierId: string;
  stripeSubscriptionId?: string;
  status: 'active' | 'paused' | 'cancelled' | 'trialing';
  trialEndsAt?: Date;
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
  createdAt: Date;
}

export interface TrialAccess {
  id: string;
  userId: string;
  productId: string;
  startsAt: Date;
  endsAt: Date;
  daysRemaining: number;
}

// Blog Types
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  author: string;
  category: string;
  tags: string[];
  coverImage?: string;
  published: boolean;
  views: number;
  createdAt: Date;
  updatedAt: Date;
}

// Service Types
export interface Service {
  id: string;
  name: string;
  slug: string;
  description: string;
  features: string[];
  timeline?: string;
  basePrice?: number;
  icon?: string;
  createdAt: Date;
}

// Pricing Types
export interface PricingPlan {
  id: string;
  name: string;
  monthlyPrice: number;
  yearlyPrice: number;
  features: string[];
  highlighted: boolean;
  stripePriceId?: string;
}

// Analytics Types
export interface PageView {
  id: string;
  page: string;
  userId?: string;
  referrer?: string;
  timestamp: Date;
}

export interface Conversion {
  id: string;
  type: 'signup' | 'trial_start' | 'subscription' | 'contact';
  userId?: string;
  value?: number;
  timestamp: Date;
}
