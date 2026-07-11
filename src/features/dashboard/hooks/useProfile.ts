"use client"

import { useFetch } from "@/lib/query"

async function fetchProfileClient() {
  const res = await fetch('/api/profile')
  console.log(res)
  if (!res.ok) throw new Error('Failed to fetch profile')
  return res.json()
}

export const profileKeys = {
  all: ['profile'] as const,
  detail: () => ['profile', 'detail'] as const,
}

export const useProfile = () => {
    return useFetch<User>(
        profileKeys.detail(),
        fetchProfileClient
    )
}