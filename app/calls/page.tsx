'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { CallForm } from "../components/CallForm";
import { CallList } from "../components/CallList";
import { getToken } from '@/app/lib/api-client';

export default function CallsPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      router.push('/');
    } else {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Call Management System
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <CallForm />
          <CallList />
        </div>
      </div>
    </div>
  );
}

