'use client';

import { useState } from 'react';
import { useCreateCall } from '@/app/hooks/useCalls';
import { WorkflowType } from '@/app/types/call';

export function CallForm() {
  const [formData, setFormData] = useState({
    customerName: '',
    phoneNumber: '',
    workflow: WorkflowType.SUPPORT as WorkflowType,
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const createCall = useCreateCall();

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await createCall.mutateAsync(formData);
      setFormData({
        customerName: '',
        phoneNumber: '',
        workflow: WorkflowType.SUPPORT,
      });
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      // Error handled by mutation
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200/60 p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
          <img src="/icons/plus.svg" alt="Add" className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-slate-900">New Call Request</h2>
          <p className="text-xs text-slate-500">Schedule a new automated call</p>
        </div>
      </div>

      {showSuccess && (
        <div className="mb-4 bg-green-50 border-l-4 border-green-500 text-green-800 px-4 py-3 rounded-lg text-sm animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="flex items-center">
            <img src="/icons/check.svg" alt="Success" className="w-5 h-5 mr-2" />
            Call request created successfully!
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label
            htmlFor="customerName"
            className="block text-sm font-semibold text-slate-700 mb-2"
          >
            Customer Name
          </label>
          <input
            type="text"
            id="customerName"
            required
            value={formData.customerName}
            onChange={(e) =>
              setFormData({ ...formData, customerName: e.target.value })
            }
            className="w-full px-4 py-3 border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all"
            placeholder="John Doe"
          />
        </div>

        <div>
          <label
            htmlFor="phoneNumber"
            className="block text-sm font-semibold text-slate-700 mb-2"
          >
            Phone Number
          </label>
          <input
            type="tel"
            id="phoneNumber"
            required
            value={formData.phoneNumber}
            onChange={(e) =>
              setFormData({ ...formData, phoneNumber: e.target.value })
            }
            className="w-full px-4 py-3 border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all"
            placeholder="+1 (555) 123-4567"
          />
        </div>

        <div>
          <label
            htmlFor="workflow"
            className="block text-sm font-semibold text-slate-700 mb-2"
          >
            Workflow Type
          </label>
          <select
            id="workflow"
            value={formData.workflow}
            onChange={(e) =>
              setFormData({
                ...formData,
                workflow: e.target.value as WorkflowType,
              })
            }
            className="w-full px-4 py-3 border border-slate-300 rounded-xl text-slate-900 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iOCIgdmlld0JveD0iMCAwIDEyIDgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTEgMUwxMSAxTDYgNyIgc3Ryb2tlPSIjNjQ3NDhjIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPjwvc3ZnPg==')] bg-[length:12px] bg-[right_1rem_center] bg-no-repeat"
          >
            <option value={WorkflowType.SUPPORT}>Support</option>
            <option value={WorkflowType.SALES}>Sales</option>
            <option value={WorkflowType.REMINDER}>Reminder</option>
          </select>
        </div>

        {createCall.isError && (
          <div className="bg-red-50 border-l-4 border-red-500 text-red-800 px-4 py-3 rounded-lg text-sm animate-in fade-in duration-200">
            <div className="flex items-center">
              <img src="/icons/error.svg" alt="Error" className="w-5 h-5 mr-2" />
              {createCall.error instanceof Error
                ? createCall.error.message
                : 'Failed to create call. Please try again.'}
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={createCall.isPending}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-xl font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed transition-all shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/30 mt-2"
        >
          {createCall.isPending ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Creating...
            </span>
          ) : (
            'Create Call Request'
          )}
        </button>
      </form>
    </div>
  );
}
