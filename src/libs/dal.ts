import 'server-only'
import { cookies } from 'next/headers'
import { cache } from 'react'
import { apiClient } from '@/api'

export const verifySession = cache(async () => {
  const cookieStore = await cookies()
  const token = cookieStore.get('access_token')?.value

  if (!token) {
    return { isAuth: false, user: null }
  }

  const profile = await apiClient.get('/users/profile', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(res => res.data)
    .catch(() => null)


  if (!profile) {
    return { isAuth: false, user: null }
  }

  return { isAuth: true, user: profile }
})
