import 'server-only'
import { QueryClient } from '@tanstack/react-query'
import { createApiForBE } from '@/lib/axios'
import { profileKeys } from '@/features/dashboard/hooks/useProfile'
import { USER_PATH } from '@/constant/services'

export async function getProfile(token?: string) {
  const api = createApiForBE(token)
  const { data } = await api.get(USER_PATH.PROFILE)
  return data
}

export async function prefetchProfile(queryClient: QueryClient, token?: string) {
  await queryClient.prefetchQuery({
    queryKey: profileKeys.detail(),
    queryFn: () => getProfile(token),
  })
}