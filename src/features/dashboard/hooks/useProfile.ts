"use client"

import { APIResponse } from "@/lib/fetch"
import { useFetch } from "@/lib/query"

async function fetchProfileClient() {
  const res = await fetch('/api/profile')
  const data = await res.json()
  if (!res.ok) throw new Error('Failed to fetch profile')

  return data
}

export const profileKeys = {
  all: ['profile'] as const,
  detail: () => ['profile', 'detail'] as const,
}

export const useProfile = () => {
    return useFetch<APIResponse<User>>(
        profileKeys.detail(),
        fetchProfileClient
    )
}