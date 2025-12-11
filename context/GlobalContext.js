'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { getUnreadMessageCount } from '@/app/actions/getUnreadMessageCount';

// Create Context
const GlobalContext = createContext();

// Create Provider

export function GlobalProvider({ children }) {
  const [unreadCount, setUnreadCount] = useState(0);

  const { data: session } = useSession();

  useEffect(() => {
    if (!session?.user) {
      setUnreadCount(0);
      return;
    }

    getUnreadMessageCount()
      .then((res) => setUnreadCount(res?.count ?? 0))
      .catch(() => setUnreadCount(0));
  }, [session]);

  return (
    <GlobalContext.Provider
      value={{
        unreadCount,
        setUnreadCount
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export function useGlobalContext() {
  return useContext(GlobalContext);
}
