'use client';

import { useState, useEffect } from 'react';

const AVATAR_KEY = 'pathpilot-avatar';

export function useAvatar() {
  const [avatar, setAvatar] = useState<string>('bot'); // 'bot', 'ghost', 'rocket', or a base64 string

  useEffect(() => {
    const stored = localStorage.getItem(AVATAR_KEY);
    if (stored) {
      setAvatar(stored);
    }
  }, []);

  const changeAvatar = (newAvatar: string) => {
    setAvatar(newAvatar);
    localStorage.setItem(AVATAR_KEY, newAvatar);
    // Dispatch a custom event so other components (like Player) can sync immediately
    window.dispatchEvent(new CustomEvent('avatar-changed', { detail: newAvatar }));
  };

  return { avatar, changeAvatar };
}
