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

  const createCall = useCreateCall();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createCall.mutateAsync(formData);
      setFormData({
        customerName: '',
        phoneNumber: '',
        workflow: WorkflowType.SUPPORT,
      });
    } catch (error) {
      // Error handled by mutation
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Create Call Request
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="customerName"
            className="block text-sm font-medium text-gray-700 mb-1"
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
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
            placeholder="Enter customer name"
          />
        </div>

        <div>
          <label
            htmlFor="phoneNumber"
            className="block text-sm font-medium text-gray-700 mb-1"
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
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
            placeholder="Enter phone number"
          />
        </div>

        <div>
          <label
            htmlFor="workflow"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Workflow
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
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
          >
            <option value={WorkflowType.SUPPORT}>Support</option>
            <option value={WorkflowType.SALES}>Sales</option>
            <option value={WorkflowType.REMINDER}>Reminder</option>
          </select>
        </div>

        {createCall.isError && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {createCall.error instanceof Error
              ? createCall.error.message
              : 'Failed to create call. Please try again.'}
          </div>
        )}

        <button
          type="submit"
          disabled={createCall.isPending}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {createCall.isPending ? 'Submitting...' : 'Submit Call Request'}
        </button>
      </form>
    </div>
  );
}

