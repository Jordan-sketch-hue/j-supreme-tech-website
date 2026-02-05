// Mock database functions - Replace with real DB in production
const DEMO_MODE = true;

// In-memory storage for demo
const users: Record<string, any> = {};
const products: Record<string, any> = {};
const subscriptions: Record<string, any> = {};
const blogPosts: Record<string, any> = {};

// User Operations
export async function findUserByEmail(email: string) {
  if (DEMO_MODE) {
    return Object.values(users).find((u) => u.email === email) || null;
  }
  // TODO: Implement with real database
  return null;
}

export async function findUserById(id: string) {
  if (DEMO_MODE) {
    return users[id] || null;
  }
  // TODO: Implement with real database
  return null;
}

export async function createUser(data: {
  email: string;
  password: string;
  name: string;
}) {
  if (DEMO_MODE) {
    const userId = `user_${Date.now()}`;
    users[userId] = {
      id: userId,
      ...data,
      role: 'user',
      createdAt: new Date(),
    };
    return users[userId];
  }
  // TODO: Implement with real database
  return null;
}

// Product Operations
export async function getAllProducts() {
  if (DEMO_MODE) {
    return Object.values(products);
  }
  // TODO: Implement with real database
  return [];
}

export async function getProductBySlug(slug: string) {
  if (DEMO_MODE) {
    return Object.values(products).find((p) => p.slug === slug) || null;
  }
  // TODO: Implement with real database
  return null;
}

// Subscription Operations
export async function getUserSubscriptions(userId: string) {
  if (DEMO_MODE) {
    return Object.values(subscriptions).filter((s) => s.userId === userId);
  }
  // TODO: Implement with real database
  return [];
}

export async function createSubscription(data: any) {
  if (DEMO_MODE) {
    const subId = `sub_${Date.now()}`;
    subscriptions[subId] = {
      id: subId,
      ...data,
      createdAt: new Date(),
    };
    return subscriptions[subId];
  }
  // TODO: Implement with real database
  return null;
}

// Blog Operations
export async function getAllBlogPosts() {
  if (DEMO_MODE) {
    return Object.values(blogPosts).filter((p) => p.published);
  }
  // TODO: Implement with real database
  return [];
}

export async function getBlogPostBySlug(slug: string) {
  if (DEMO_MODE) {
    return (
      Object.values(blogPosts).find((p) => p.slug === slug && p.published) ||
      null
    );
  }
  // TODO: Implement with real database
  return null;
}

export async function createBlogPost(data: any) {
  if (DEMO_MODE) {
    const postId = `post_${Date.now()}`;
    blogPosts[postId] = {
      id: postId,
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    return blogPosts[postId];
  }
  // TODO: Implement with real database
  return null;
}

// Analytics
export async function recordPageView(page: string, userId?: string) {
  // TODO: Implement with real analytics service
  console.log(`Page view: ${page}${userId ? ` (User: ${userId})` : ''}`);
}

export async function recordConversion(
  type: string,
  userId?: string,
  value?: number
) {
  // TODO: Implement with real analytics service
  console.log(
    `Conversion: ${type}${userId ? ` (User: ${userId})` : ''}${
      value ? ` - $${value}` : ''
    }`
  );
}
