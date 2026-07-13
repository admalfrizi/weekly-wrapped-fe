'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { RecapLayout } from '@/features/recap/components/RecapLayout';
import { Copy, Check, ArrowLeft } from 'lucide-react';
import axios from 'axios'; // Or use your existing API instance

export default function PrivateRecapViewer() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  
  const [recap, setRecap] = useState<WeeklyRecap | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  // Fetch the recap data (In a real app, use React Query or SWR here)
  useEffect(() => {
    const fetchRecap = async () => {
      try {
        // Since we are viewing our own, we can use the public endpoint 
        // or a specific private one if you prefer.
        const res = await axios.get<RecapResponse>(`http://localhost:8080/api/v1/recaps/${slug}`);
        setRecap(res.data.data);
      } catch (error) {
        console.error("Failed to fetch recap", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    if (slug) fetchRecap();
  }, [slug]);

  const handleCopyLink = () => {
    // Generate the public URL based on the current origin
    const publicUrl = `${window.location.origin}/w/${slug}`;
    navigator.clipboard.writeText(publicUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (isLoading) {
    return <div className="flex min-h-[60vh] items-center justify-center text-neutral-500">Menganalisa minggumu...</div>;
  }

  if (!recap) {
    return <div className="text-center mt-20">Recap tidak ditemukan.</div>;
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-neutral-100 py-12 px-4 sm:px-6">
      
      {/* Back Button */}
      <button 
        onClick={() => router.push('/')}
        className="mb-8 flex items-center gap-2 text-sm font-medium text-neutral-500 hover:text-neutral-900 transition-colors"
      >
        <ArrowLeft className="size-4" /> Kembali ke Dashboard
      </button>

      {/* The Visual Poster */}
      <RecapLayout recap={recap} />

      {/* Action Buttons (Only visible to the owner in this private view) */}
      <div className="mt-8 flex w-full max-w-md flex-col gap-3">
        <button
          onClick={handleCopyLink}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-neutral-900 p-4 font-semibold text-white transition-all hover:bg-neutral-800 active:scale-[0.98]"
        >
          {copied ? <Check className="size-5 text-emerald-400" /> : <Copy className="size-5" />}
          {copied ? 'Link berhasil disalin!' : 'Copy Public Link'}
        </button>
        <p className="text-center text-xs text-neutral-500">
          Bagikan link ini ke teman-temanmu. Tenang, mereka tidak butuh akun untuk melihatnya!
        </p>
      </div>

    </div>
  );
}