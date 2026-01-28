'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CallForm } from "../components/CallForm";
import { CallList } from "../components/CallList";
import { getToken } from '@/app/lib/api-client';

export default function CallsPage() {
  const router = useRouter();

  useEffect(() => {
    if (!getToken()) {
      router.push('/');
    }
  }, [router]);

  if (!getToken()) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Call Management System
        </h1>

        <CallForm />
        <CallList />
      </div>
    </div>
  );
}

