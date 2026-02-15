import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

// Simulated in-memory database (use real DB in production)
const trialDatabase = new Map();

interface ValidationError {
  field: string;
  message: string;
}

interface TrialRequestBody {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  industry: string;
  productSlugs: string[];
  useCases: Record<string, string>;
  agreeToTerms: boolean;
}

function validateTrialRequest(body: TrialRequestBody): ValidationError[] {
  const errors: ValidationError[] = [];

  if (!body.firstName?.trim()) errors.push({ field: 'firstName', message: 'First name required' });
  if (!body.lastName?.trim()) errors.push({ field: 'lastName', message: 'Last name required' });
  if (!body.email?.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
    errors.push({ field: 'email', message: 'Valid email required' });
  }
  if (!body.company?.trim()) errors.push({ field: 'company', message: 'Company required' });
  if (!body.industry) errors.push({ field: 'industry', message: 'Industry required' });
  if (!Array.isArray(body.productSlugs) || body.productSlugs.length === 0) {
    errors.push({ field: 'products', message: 'At least one product required' });
  }
  if (!body.agreeToTerms) errors.push({ field: 'terms', message: 'Terms agreement required' });

  return errors;
}

function generateAccessToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

function generateTrialId(): string {
  return `trial_${Date.now()}_${crypto.randomBytes(8).toString('hex')}`;
}

export async function POST(request: NextRequest) {
  try {
    const body: TrialRequestBody = await request.json();

    // Validate input
    const validationErrors = validateTrialRequest(body);
    if (validationErrors.length > 0) {
      return NextResponse.json(
        { errors: validationErrors },
        { status: 400 }
      );
    }

    // Check for duplicate email
    const existingTrial = Array.from(trialDatabase.values()).find(
      (trial) => (trial as { email: string }).email === body.email
    );

    if (existingTrial && existingTrial.status === 'active') {
      return NextResponse.json(
        {
          error: 'You already have an active trial',
          existingTrialId: existingTrial.id,
        },
        { status: 409 }
      );
    }

    const trialId = generateTrialId();
    const startDate = new Date();
    const expiryDate = new Date(startDate.getTime() + 14 * 24 * 60 * 60 * 1000); // 14 days

    // Create trial request
    const trialRequest = {
      id: trialId,
      email: body.email,
      firstName: body.firstName,
      lastName: body.lastName,
      company: body.company,
      industry: body.industry,
      productSlugs: body.productSlugs,
      useCases: body.useCases || {},
      status: 'active',
      createdAt: startDate,
      expiresAt: expiryDate,
      startedAt: startDate,
      environments: {},
    };

    // Create trial environments for each product
    for (const productSlug of body.productSlugs) {
      const env = {
        id: `env_${trialId}_${productSlug}`,
        trialRequestId: trialId,
        productSlug,
        accessToken: generateAccessToken(),
        demoData: {},
        settings: {
          theme: 'light',
          language: 'en',
          timezone: 'UTC',
          dataLimit: 50, // MB
          featureLimit: 10,
          customizations: {},
        },
        usageMetrics: {
          logins: 0,
          hoursUsed: 0,
          featuresAccessed: [],
          dataProcessed: 0,
          actionsCompleted: 0,
        },
        createdAt: startDate,
        expiresAt: expiryDate,
      };

      trialRequest.environments = {
        ...trialRequest.environments,
        [productSlug]: env,
      };
    }

    // Store in database
    trialDatabase.set(trialId, trialRequest);

    return NextResponse.json(
      {
        success: true,
        trialId,
        email: body.email,
        expiresAt: expiryDate,
        message: 'Trial request created successfully',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Trial request error:', error);
    return NextResponse.json(
      { error: 'Failed to process trial request' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const trialId = request.nextUrl.searchParams.get('trialId');
    const email = request.nextUrl.searchParams.get('email');

    if (trialId) {
      const trial = trialDatabase.get(trialId);
      if (!trial) {
        return NextResponse.json({ error: 'Trial not found' }, { status: 404 });
      }

      // Check expiry
      if (new Date() > trial.expiresAt) {
        trial.status = 'expired';
      }

      return NextResponse.json(trial);
    }

    if (email) {
      const trials = Array.from(trialDatabase.values()).filter(
        (trial) => (trial as { email: string }).email === email
      );
      return NextResponse.json(trials);
    }

    return NextResponse.json(
      { error: 'Provide trialId or email' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Get trial error:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve trial' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { trialId, action, data } = body;

    const trial = trialDatabase.get(trialId);
    if (!trial) {
      return NextResponse.json({ error: 'Trial not found' }, { status: 404 });
    }

    if (action === 'updateSettings') {
      const { productSlug, settings } = data;
      if (trial.environments[productSlug]) {
        trial.environments[productSlug].settings = {
          ...trial.environments[productSlug].settings,
          ...settings,
        };
      }
    }

    if (action === 'logMetric') {
      const { productSlug, metric, value } = data;
      if (trial.environments[productSlug]) {
        const env = trial.environments[productSlug];
        if (metric === 'login') env.usageMetrics.logins += 1;
        if (metric === 'hoursUsed') env.usageMetrics.hoursUsed += value;
        if (metric === 'featureAccess') {
          env.usageMetrics.featuresAccessed.push(value);
        }
        if (metric === 'actionCompleted') env.usageMetrics.actionsCompleted += 1;
        env.usageMetrics.lastLogin = new Date();
      }
    }

    trialDatabase.set(trialId, trial);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Update trial error:', error);
    return NextResponse.json(
      { error: 'Failed to update trial' },
      { status: 500 }
    );
  }
}
