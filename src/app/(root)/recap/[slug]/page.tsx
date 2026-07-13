'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { RecapLayout } from '@/features/recap/components/RecapLayout';
import { Copy, Check, ArrowLeft } from 'lucide-react';
import axios from 'axios'; // Or use your existing API instance
import { useRecap } from '@/features/recap/hooks/useRecap';

export default function PrivateRecapViewer() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  
  const [copied, setCopied] = useState(false);

  const { data: response, isLoading, isError } = useRecap(slug);
  const recap = response?.data;

  const handleCopyLink = () => {
    const publicUrl = `${window.location.origin}/w/${slug}`;
    navigator.clipboard.writeText(publicUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center space-y-4">
        <div className="size-8 animate-spin rounded-full border-4 border-neutral-200 border-t-neutral-900" />
        <p className="text-sm font-medium text-neutral-500">Menyusun recap mingguanmu...</p>
      </div>
    );
  }

  if (isError || !recap) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center">
        <p className="mb-4 font-medium text-neutral-500">Recap tidak ditemukan atau terjadi kesalahan.</p>
        <button 
          onClick={() => router.push('/')}
          className="rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-neutral-800"
        >
          Kembali ke Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center py-12 px-4 sm:px-6">
      
      <div className="mb-8 w-full max-w-md">
        <button 
          onClick={() => router.push('/')}
          className="flex items-center gap-2 text-sm font-medium text-neutral-500 transition-colors hover:text-neutral-900"
        >
          <ArrowLeft className="size-4" /> Kembali ke Dashboard
        </button>
      </div>
      <RecapLayout recap={recap} />
      <div className="mt-8 flex w-full max-w-md flex-col gap-3">
        <button
          onClick={handleCopyLink}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-neutral-900 p-4 font-semibold text-white transition-all hover:bg-neutral-800 active:scale-[0.98]"
        >
          {copied ? <Check className="size-5 text-emerald-400" /> : <Copy className="size-5" />}
          {copied ? 'Link berhasil disalin!' : 'Copy Public Link'}
        </button>
        <p className="mt-2 text-center text-xs text-neutral-500">
          Bagikan link ini ke teman-temanmu. Tenang, mereka tidak butuh akun untuk melihatnya!
        </p>
      </div>

    </div>
  );
}