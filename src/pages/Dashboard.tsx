import React from 'react';

export default function Dashboard() {
  const stats = [
    { name: 'Total Vaults', value: '12', change: '+2', trend: 'up' },
    { name: 'Active Secrets', value: '1,234', change: '+15%', trend: 'up' },
    { name: 'Team Members', value: '48', change: '+4', trend: 'up' },
    { name: 'Security Score', value: '94%', change: '+2%', trend: 'up' },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Dashboard</h1>
          <p className="text-slate-400 mt-1">Overview of your organization's security posture.</p>
        </div>
        <div className="flex items-center gap-3">
            <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-sm font-medium rounded-lg border border-slate-700 transition-colors">
                Generate Report
            </button>
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium rounded-lg shadow-lg shadow-blue-900/20 transition-all hover:-translate-y-0.5">
                + New Vault
            </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="relative group overflow-hidden bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl hover:border-white/20 transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10">
                <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-slate-400">{stat.name}</p>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-500/10 text-green-400`}>
                        {stat.change}
                    </span>
                </div>
                <p className="mt-4 text-3xl font-bold text-white tracking-tight">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart Area (Placeholder) */}
        <div className="lg:col-span-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 min-h-[400px]">
          <h3 className="text-lg font-semibold text-white mb-6">Access Trends</h3>
          <div className="h-64 flex items-end justify-between gap-2 px-4">
            {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
                <div key={i} className="w-full bg-blue-500/20 rounded-t-lg hover:bg-blue-500/40 transition-colors relative group" style={{ height: `${h}%` }}>
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                        {h} hits
                    </div>
                </div>
            ))}
          </div>
          <div className="flex justify-between mt-4 text-xs text-slate-500 px-4">
            <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
          </div>
        </div>

        {/* Recent Audit Logs */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-white mb-6">Recent Activity</h3>
          <div className="space-y-6">
            {[
                { user: 'Alice Smith', action: 'accessed', target: 'Marketing Vault', time: '2m ago' },
                { user: 'John Doe', action: 'updated', target: 'Prod Database', time: '15m ago' },
                { user: 'System', action: 'backup', target: 'Daily Snapshot', time: '1h ago' },
                { user: 'Bob Wilson', action: 'failed login', target: 'IP 192.168.1.1', time: '2h ago', alert: true },
            ].map((log, i) => (
                <div key={i} className="flex gap-4 items-start">
                    <div className={`mt-1 w-2 h-2 rounded-full ${log.alert ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]' : 'bg-blue-500'}`} />
                    <div>
                        <p className="text-sm text-slate-300">
                            <span className="font-medium text-white">{log.user}</span> {log.action} <span className="text-blue-400">{log.target}</span>
                        </p>
                        <p className="text-xs text-slate-500 mt-1">{log.time}</p>
                    </div>
                </div>
            ))}
          </div>
          <button className="w-full mt-6 py-2 text-sm text-slate-400 hover:text-white border border-slate-700 hover:border-slate-600 rounded-lg transition-colors">
            View All Logs
          </button>
        </div>
      </div>
    </div>
  );
}
