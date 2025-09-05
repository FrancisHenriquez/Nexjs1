import { getSession } from 'next-auth/react'
import { authOptions } from './authOptions'

export const getSessionUser = async () => {
  try {
    const session = await getSession(authOptions)
    if (!session || !session.user) {
      return null
    }
    return {
      user: session.user,
      userId: session.user.id
    }
  } catch (error) {
    console.log(error)
    return null
  }
}
