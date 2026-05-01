'use client';

import { useState, useCallback } from 'react';

const AVATAR_KEY = 'pathpilot-avatar';

function getStoredAvatar(): string {
  try {
    return localStorage.getItem(AVATAR_KEY) || 'bot';
  } catch {
    return 'bot';
  }
}

export function useAvatar() {
  const [avatar, setAvatar] = useState<string>(getStoredAvatar);

  const changeAvatar = useCallback((newAvatar: string) => {
    setAvatar(newAvatar);
    try {
      localStorage.setItem(AVATAR_KEY, newAvatar);
    } catch {
      /* ignore */
    }
    window.dispatchEvent(new CustomEvent('avatar-changed', { detail: newAvatar }));
  }, []);

  return { avatar, changeAvatar };
}
