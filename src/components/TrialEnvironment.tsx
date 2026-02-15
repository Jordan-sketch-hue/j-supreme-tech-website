'use client';

import { useState, useEffect } from 'react';

export interface TrialEnvironmentProps {
  trialId: string;
  productSlug: string;
  productName: string;
  productIcon: string;
}

export function TrialSecurityWrapper({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Prevent right-click (disable context menu)
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      return false;
    };

    // Prevent keyboard shortcuts for developer tools
    const handleKeyDown = (e: KeyboardEvent) => {
      // F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C
      if (
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C')) ||
        (e.ctrlKey && e.key === 'u')
      ) {
        e.preventDefault();
        return false;
      }
    };

    // Prevent console access
    const originalLog = console.log;
    const originalError = console.error;
    const originalWarn = console.warn;

    console.log = () => {};
    console.error = () => {};
    console.warn = () => {};

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
      console.log = originalLog;
      console.error = originalError;
      console.warn = originalWarn;
    };
  }, []);

  return <>{children}</>;
}

export function TrialEnvironmentHeader({
  productName,
  productIcon,
  trialDaysLeft,
}: {
  productName: string;
  productIcon: string;
  trialDaysLeft: number;
}) {
  return (
    <div className="bg-linear-to-r from-blue-600 to-indigo-600 text-white p-6 rounded-lg shadow-lg mb-8">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <span className="text-4xl mr-4">{productIcon}</span>
          <div>
            <h1 className="text-3xl font-bold">{productName} Trial</h1>
            <p className="text-blue-100">Interactive Trial Environment</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm text-blue-100">Days Remaining</p>
          <p className="text-3xl font-bold">{trialDaysLeft}</p>
        </div>
      </div>
    </div>
  );
}

export function TrialFeatureCard({
  title,
  description,
  icon,
  onClick,
}: {
  title: string;
  description: string;
  icon: string;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow text-left cursor-pointer hover:bg-blue-50"
    >
      <div className="text-3xl mb-3">{icon}</div>
      <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </button>
  );
}

export function TrialUsageMetrics({
  logins,
  hoursUsed,
  featuresAccessed,
  actionsCompleted,
}: {
  logins: number;
  hoursUsed: number;
  featuresAccessed: number;
  actionsCompleted: number;
}) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      <div className="bg-blue-50 p-4 rounded-lg">
        <p className="text-xs text-blue-600 uppercase tracking-wide font-semibold">Logins</p>
        <p className="text-3xl font-bold text-gray-900">{logins}</p>
      </div>
      <div className="bg-indigo-50 p-4 rounded-lg">
        <p className="text-xs text-indigo-600 uppercase tracking-wide font-semibold">Hours Used</p>
        <p className="text-3xl font-bold text-gray-900">{hoursUsed.toFixed(1)}</p>
      </div>
      <div className="bg-purple-50 p-4 rounded-lg">
        <p className="text-xs text-purple-600 uppercase tracking-wide font-semibold">Features</p>
        <p className="text-3xl font-bold text-gray-900">{featuresAccessed}</p>
      </div>
      <div className="bg-pink-50 p-4 rounded-lg">
        <p className="text-xs text-pink-600 uppercase tracking-wide font-semibold">Actions</p>
        <p className="text-3xl font-bold text-gray-900">{actionsCompleted}</p>
      </div>
    </div>
  );
}

export function AIAssistantWidget() {
  const [isOpen, setIsOpen] = useState(false);

  const suggestions = [
    '💡 Try creating your first project to explore core features',
    '📚 Check out the documentation for advanced features',
    '🎯 Set up your dashboard to track progress',
    '⚙️ Configure settings for your use case',
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-blue-600 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg hover:bg-blue-700 transition-colors text-2xl"
      >
        🤖
      </button>

      {isOpen && (
        <div className="absolute bottom-20 right-0 bg-white rounded-lg shadow-xl p-6 w-80 border-2 border-blue-600">
          <h3 className="font-bold text-gray-900 mb-4 flex items-center">
            <span className="mr-2">🤖</span> AI Assistant
          </h3>
          <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
            {suggestions.map((suggestion, i) => (
              <div
                key={i}
                className="p-3 bg-blue-50 rounded-lg text-sm text-gray-700 cursor-pointer hover:bg-blue-100 transition-colors"
              >
                {suggestion}
              </div>
            ))}
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="w-full text-sm text-gray-600 hover:text-gray-900 font-semibold py-2 border-t"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}

export function TrialLimitationBanner() {
  return (
    <div className="bg-amber-50 border-l-4 border-amber-600 p-4 rounded mb-6 flex items-start">
      <span className="text-2xl mr-3">⚠️</span>
      <div>
        <h3 className="font-bold text-amber-900">Trial Limitations</h3>
        <p className="text-amber-800 text-sm mt-1">
          This trial environment has feature limitations and data size limits. Full features available in paid plans.
        </p>
      </div>
    </div>
  );
}

export function TrialExportBlocker() {
  useEffect(() => {
    // Intercept clipboard copy
    const handleCopy = (e: ClipboardEvent) => {
      // Allow copy but could add watermark or disable for code
      e.preventDefault();
      const text = (e.target as HTMLInputElement | HTMLTextAreaElement)?.value || '';
      if (text?.includes('function ') || text?.includes('const ') || text?.includes('import ')) {
        // This looks like code, prevent copy
        e.clipboardData?.setData('text', '⚠️ Code export is disabled in trial');
      }
    };

    document.addEventListener('copy', handleCopy);
    return () => {
      document.removeEventListener('copy', handleCopy);
    };
  }, []);

  return null;
}
