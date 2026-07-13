"use client"

import { fetchProfileClient } from "@/api/auth_api"
import { APIResponse } from "@/lib/fetch"
import { useFetch } from "@/lib/query"

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