'use client';

import { useEffect, useState } from 'react';
import { useSession, signOut } from 'next-auth/react';

interface DashboardData {
  timestamp: string;
  memory: {
    total: number;
    byPriority: Record<string, number>;
    recent: Array<{
      id: string;
      content: string;
      priority: string;
      created: string;
    }>;
  };
  tokens: {
    spent: number;
    budget: number;
    percent: number;
    status: string;
    requests: number;
    byModel: Record<string, { cost: number; requests: number }>;
  };
  system: {
    lastActive: string | null;
    activeTasks: string[];
    recentCompletedTasks: string[];
  };
}

export default function Dashboard() {
  const { data: session } = useSession();
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/status');
        if (!response.ok) {
          throw new Error('Failed to fetch dashboard data');
        }
        const json = await response.json();
        setData(json);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 30000); // Refresh every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const statusColors = {
    OK: 'bg-green-500',
    WARNING: 'bg-yellow-500',
    CRITICAL: 'bg-red-500',
    'NO DATA': 'bg-gray-500'
  };

  const priorityColors = {
    URGENT: 'bg-red-600',
    DAILY: 'bg-blue-600',
    WEEKLY: 'bg-purple-600',
    ARCHIVE: 'bg-gray-600'
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-slate-200 text-xl">Loading dashboard...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-red-500 text-xl">Error: {error}</div>
      </div>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <span className="text-4xl">🤖</span>
            TeleClaude Dashboard
          </h1>
          <div className="flex items-center gap-4">
            <span className="text-slate-400 text-sm">
              {session?.user?.email}
            </span>
            <button
              onClick={() => signOut({ callbackUrl: '/auth/signin' })}
              className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-4 py-2 rounded-lg transition-colors text-sm"
            >
              Sign out
            </button>
          </div>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Token Usage Card */}
          <div className="bg-slate-900 rounded-xl p-6 border border-slate-800 lg:col-span-2">
            <h2 className="text-lg text-slate-400 mb-4 flex items-center gap-2">
              💰 Token Usage (Today)
            </h2>
            <div className="text-4xl font-bold mb-2">${data.tokens.spent.toFixed(4)}</div>
            <div className="text-slate-400 mb-4">of ${data.tokens.budget.toFixed(2)} daily budget</div>

            {/* Progress Bar */}
            <div className="h-3 bg-slate-800 rounded-full overflow-hidden mb-4">
              <div
                className={`h-full ${statusColors[data.tokens.status as keyof typeof statusColors]} transition-all`}
                style={{ width: `${Math.min(data.tokens.percent, 100)}%` }}
              />
            </div>

            <div className="flex justify-between items-center mb-4">
              <span>{data.tokens.percent.toFixed(1)}% used</span>
              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${statusColors[data.tokens.status as keyof typeof statusColors]}`}>
                {data.tokens.status}
              </span>
            </div>

            <div className="text-slate-400 mb-4">
              {data.tokens.requests} requests today
            </div>

            {/* By Model */}
            {Object.keys(data.tokens.byModel).length > 0 && (
              <div>
                <div className="text-sm text-slate-500 mb-2">By Model:</div>
                <div className="space-y-2">
                  {Object.entries(data.tokens.byModel).map(([model, modelData]) => (
                    <div key={model} className="flex justify-between text-sm">
                      <span>{model}</span>
                      <span>${modelData.cost.toFixed(4)} ({modelData.requests})</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Memory Status Card */}
          <div className="bg-slate-900 rounded-xl p-6 border border-slate-800 lg:col-span-2">
            <h2 className="text-lg text-slate-400 mb-4 flex items-center gap-2">
              🧠 Memory System
            </h2>
            <div className="text-4xl font-bold mb-2">{data.memory.total}</div>
            <div className="text-slate-400 mb-4">active memories</div>

            <div className="flex flex-wrap gap-2 mb-4">
              {Object.entries(data.memory.byPriority).map(([priority, count]) => (
                <span
                  key={priority}
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${priorityColors[priority as keyof typeof priorityColors]}`}
                >
                  {priority}: {count}
                </span>
              ))}
            </div>

            {data.memory.recent.length > 0 && (
              <div>
                <div className="text-sm text-slate-500 mb-2">Recent:</div>
                <div className="space-y-2">
                  {data.memory.recent.map((mem) => (
                    <div key={mem.id} className="bg-slate-800 p-3 rounded-lg text-sm">
                      <span className={`px-2 py-1 rounded text-xs font-semibold mr-2 ${priorityColors[mem.priority as keyof typeof priorityColors]}`}>
                        {mem.priority}
                      </span>
                      {mem.content}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* System Status Card */}
          <div className="bg-slate-900 rounded-xl p-6 border border-slate-800 lg:col-span-2">
            <h2 className="text-lg text-slate-400 mb-4 flex items-center gap-2">
              ⚡ System Status
            </h2>
            <div className="mb-4">
              <span className="text-green-500 text-2xl mr-2">●</span>
              <span className="text-xl">Online</span>
            </div>

            <div className="space-y-2 text-slate-400">
              <div>Platform: Discord Bridge</div>
              <div>Model: Claude Opus 4.5</div>
              {data.system.lastActive && (
                <div>Last Active: {new Date(data.system.lastActive).toLocaleString()}</div>
              )}
            </div>

            {data.system.activeTasks && data.system.activeTasks.length > 0 ? (
              <div className="mt-4">
                <div className="text-yellow-500 text-sm mb-2">Active Tasks:</div>
                <div className="space-y-2">
                  {data.system.activeTasks.map((task, idx) => (
                    <div key={idx} className="bg-slate-800 p-3 rounded-lg text-sm">
                      {task}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="mt-4 text-slate-500">No active background tasks</div>
            )}
          </div>

          {/* Quick Stats Card */}
          <div className="bg-slate-900 rounded-xl p-6 border border-slate-800 lg:col-span-2">
            <h2 className="text-lg text-slate-400 mb-4 flex items-center gap-2">
              📊 Quick Stats
            </h2>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <div className="text-3xl font-bold text-red-500">
                  {data.memory.byPriority.URGENT || 0}
                </div>
                <div className="text-sm text-slate-400">Urgent Items</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-500">
                  {data.memory.byPriority.DAILY || 0}
                </div>
                <div className="text-sm text-slate-400">Daily Tasks</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-slate-400">
                  {data.tokens.requests}
                </div>
                <div className="text-sm text-slate-400">API Calls Today</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-500">
                  ${(data.tokens.budget - data.tokens.spent).toFixed(2)}
                </div>
                <div className="text-sm text-slate-400">Budget Left</div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center space-y-2">
          <p className="text-slate-500 text-sm">
            Last updated: {new Date(data.timestamp).toLocaleString()}
          </p>
          <p className="text-slate-600 text-xs">
            Auto-refreshes every 30 seconds
          </p>
        </div>
      </div>
    </div>
  );
}
