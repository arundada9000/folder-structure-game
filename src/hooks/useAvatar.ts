'use client';

import { useState, useEffect, useCallback } from 'react';

const AVATAR_KEY = 'pathpilot-avatar';

export function useAvatar() {
  const [avatar, setAvatar] = useState<string>('bot');

  /* Read from localStorage on mount */
  useEffect(() => {
    const stored = localStorage.getItem(AVATAR_KEY);
    if (stored) {
      setAvatar(stored);
    }
  }, []);

  /* Listen for cross-component sync events */
  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<string>).detail;
      setAvatar(detail);
    };
    window.addEventListener('avatar-changed', handler);
    return () => window.removeEventListener('avatar-changed', handler);
  }, []);

  const changeAvatar = useCallback((newAvatar: string) => {
    setAvatar(newAvatar);
    localStorage.setItem(AVATAR_KEY, newAvatar);
    window.dispatchEvent(new CustomEvent('avatar-changed', { detail: newAvatar }));
  }, []);

  return { avatar, changeAvatar };
}
