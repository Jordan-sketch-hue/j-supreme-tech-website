'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    gtag?: (command: string, action: string, params: Record<string, unknown>) => void;
  }
}

// Track page view conversion
export function PageViewConversion() {
  useEffect(() => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'conversion', {
        'send_to': 'AW-11161550773/CX_XCNHA584YELX_nsop',
        'value': 0.0,
        'currency': 'USD'
      });
    }
  }, []);

  return null;
}

// Track add to cart (when someone shows interest in a service/product)
export function AddToCartConversion() {
  useEffect(() => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'conversion', {
        'send_to': 'AW-11161550773/zDX5CNrA584YELX_nsop',
        'value': 0.0,
        'currency': 'USD'
      });
    }
  }, []);

  return null;
}

// Track add payment info (when someone submits contact/consultation form)
export function AddPaymentInfoConversion() {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'conversion', {
      'send_to': 'AW-11161550773/lZ6XCPbB584YELX_nsop',
      'value': 0.0,
      'currency': 'USD'
    });
  }
}

// Track purchase (when someone completes a paid transaction)
export function PurchaseConversion(transactionId: string = '', value: number = 0.0) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'conversion', {
      'send_to': 'AW-11161550773/uCMaCM7A584YELX_nsop',
      'value': value,
      'currency': 'USD',
      'transaction_id': transactionId
    });
  }
}

// Manual trigger for button clicks
export function trackAddToCart() {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'conversion', {
      'send_to': 'AW-11161550773/zDX5CNrA584YELX_nsop',
      'value': 0.0,
      'currency': 'USD'
    });
  }
}
