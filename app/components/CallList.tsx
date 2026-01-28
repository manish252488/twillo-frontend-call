'use client';

import { useCalls } from '@/app/hooks/useCalls';
import { CallStatus } from '@/app/types/call';

const getStatusColor = (status: CallStatus) => {
  switch (status) {
    case CallStatus.COMPLETED:
      return 'bg-emerald-50 text-emerald-700 border border-emerald-200';
    case CallStatus.FAILED:
      return 'bg-rose-50 text-rose-700 border border-rose-200';
    case CallStatus.PENDING:
      return 'bg-amber-50 text-amber-700 border border-amber-200';
    default:
      return 'bg-slate-50 text-slate-700 border border-slate-200';
  }
};

export function CallList() {
  const { data: calls, isLoading, error } = useCalls();

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl border border-slate-200/60 p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-slate-100 animate-pulse"></div>
          <div className="flex-1">
            <div className="h-5 bg-slate-200 rounded w-32 mb-2 animate-pulse"></div>
            <div className="h-3 bg-slate-200 rounded w-24 animate-pulse"></div>
          </div>
        </div>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-12 bg-slate-100 rounded-lg animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-xl border border-slate-200/60 p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center">
            <img src="/icons/list.svg" alt="List" className="w-5 h-5 text-slate-400" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">Call History</h2>
            <p className="text-xs text-slate-500">View all your call requests</p>
          </div>
        </div>
        <div className="bg-red-50 border-l-4 border-red-500 text-red-800 px-4 py-3 rounded-lg text-sm">
          <div className="flex items-center">
            <img src="/icons/error.svg" alt="Error" className="w-5 h-5 mr-2" />
            {error instanceof Error ? error.message : 'Failed to load calls'}
          </div>
        </div>
      </div>
    );
  }

  if (!calls || calls.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-slate-200/60 p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center">
            <img src="/icons/list.svg" alt="List" className="w-5 h-5 text-slate-400" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">Call History</h2>
            <p className="text-xs text-slate-500">View all your call requests</p>
          </div>
        </div>
        <div className="text-center py-12">
          <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
            <img src="/icons/phone.svg" alt="Phone" className="w-8 h-8 text-slate-400" />
          </div>
          <p className="text-sm font-medium text-slate-900 mb-1">No calls yet</p>
          <p className="text-xs text-slate-500">Create your first call request to get started</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200/60 p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center">
            <img src="/icons/list.svg" alt="List" className="w-5 h-5 text-slate-400" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">Call History</h2>
            <p className="text-xs text-slate-500">{calls.length} {calls.length === 1 ? 'call' : 'calls'}</p>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto -mx-6 px-6">
        <table className="min-w-full divide-y divide-slate-200">
          <thead>
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Customer
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Phone
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Workflow
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Status
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Date
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {calls.map((call) => (
              <tr key={call.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-4 py-3.5 whitespace-nowrap">
                  <div className="text-sm font-semibold text-slate-900">{call.customerName}</div>
                </td>
                <td className="px-4 py-3.5 whitespace-nowrap">
                  <div className="text-sm text-slate-600">{call.phoneNumber}</div>
                </td>
                <td className="px-4 py-3.5 whitespace-nowrap">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-700">
                    {call.workflow}
                  </span>
                </td>
                <td className="px-4 py-3.5 whitespace-nowrap">
                  <span className={`px-2.5 py-1 inline-flex items-center text-xs font-semibold rounded-lg ${getStatusColor(call.status)}`}>
                    {call.status}
                  </span>
                </td>
                <td className="px-4 py-3.5 whitespace-nowrap">
                  <div className="text-sm text-slate-600">
                    {new Date(call.createdAt).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

