import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { RecapLayout } from '@/features/recap/components/RecapLayout';
import { CONFIG } from '@/config';
import { PaginationDataResponse } from '@/types/response';

async function getRecap(slug: string): Promise<PaginationDataResponse<WeeklyRecap> | null> {
  try {
    const res = await fetch(`${CONFIG.serverApiUrl}/recaps/${slug}`, {
      cache: 'no-store',
    });
    const data = await res.json()
    if (!res.ok) return null;
    
    return data;
  } catch (error) {
    console.error("Failed to fetch public recap:", error);
    return null;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const payload = await getRecap(resolvedParams.slug);

  if (!payload || !payload.data) {
    return {
      title: 'Recap Tidak Ditemukan | Weekly Wrapped',
      description: 'Recap aktivitas mingguan ini tidak ditemukan atau sudah dihapus.',
    };
  }

  const recap = payload.data;
  const stats = recap.stats_snapshot;

  return {
    title: `Minggu ${stats.week_number} Wrapped | Dashboard Aktivitas`,
    description: recap.narrative,
    openGraph: {
      title: `Minggu ${stats.week_number} Wrapped`,
      description: recap.narrative,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `Minggu ${stats.week_number} Wrapped`,
      description: recap.narrative,
    }
  };
}

export default async function PublicRecapViewer({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const payload = await getRecap(resolvedParams.slug);

  if (!payload || !payload.data) {
    notFound(); 
  }

  const recap = payload.data;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-neutral-100 py-12 px-4 sm:px-6">
      <RecapLayout recap={recap} />
      <div className="mt-12 text-center">
        <p className="mb-4 text-sm font-medium text-neutral-500">
          Ingin tahu analitik aktivitas mingguanmu sendiri?
        </p>
        <Link 
          href="/" 
          className="inline-flex items-center justify-center rounded-full bg-neutral-900 px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-neutral-300 transition-transform hover:scale-105 active:scale-95"
        >
          Buat Wrapped Mingguanmu
        </Link>
      </div>
    </div>
  );
}