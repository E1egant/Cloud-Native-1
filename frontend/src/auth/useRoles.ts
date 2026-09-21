import { useEffect, useState } from 'react'
import { useMsal } from '@azure/msal-react'
import { api } from '../api/client'

/**
 * Devuelve los roles del usuario autenticado. Primero intenta con el ID token;
 * si no trae roles, consulta `/api/bff/me` (que los lee del access token).
 */
export function useRoles(): string[] {
  const { accounts } = useMsal()
  const account = accounts[0]
  const [roles, setRoles] = useState<string[]>([])

  useEffect(() => {
    if (!account) {
      setRoles([])
      return
    }
    const idTokenRoles = (account.idTokenClaims?.roles as string[] | undefined) ?? []
    if (idTokenRoles.length > 0) {
      setRoles(idTokenRoles)
      return
    }
    api
      .me()
      .then((me) => setRoles(me.roles))
      .catch(() => setRoles([]))
  }, [account])

  return roles
}
