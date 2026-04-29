'use client';

import { useRef, useState } from 'react';
import { Bot, Ghost, Rocket, ImagePlus, UserCircle2 } from 'lucide-react';
import { useAvatar } from '@/hooks/useAvatar';
import styles from './AvatarPicker.module.css';

export default function AvatarPicker() {
  const { avatar, changeAvatar } = useAvatar();
  const [isOpen, setIsOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Only accept images and ensure they aren't massive (limit to 1MB to save localStorage)
    if (!file.type.startsWith('image/')) return;
    if (file.size > 1024 * 1024) {
      alert('Image must be less than 1MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      changeAvatar(base64);
      setIsOpen(false);
    };
    reader.readAsDataURL(file);
  };

  const renderCurrentAvatar = () => {
    if (avatar === 'bot') return <Bot size={20} />;
    if (avatar === 'ghost') return <Ghost size={20} />;
    if (avatar === 'rocket') return <Rocket size={20} />;
    if (avatar.startsWith('data:image')) {
      return <img src={avatar} alt="Custom avatar" className={styles.customAvatarImg} />;
    }
    return <UserCircle2 size={20} />;
  };

  return (
    <div className={styles.container}>
      <button 
        className={styles.trigger} 
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Choose Avatar"
        title="Choose Avatar"
      >
        {renderCurrentAvatar()}
      </button>

      {isOpen && (
        <div className={styles.dropdown}>
          <div className={styles.options}>
            <button className={`${styles.option} ${avatar === 'bot' ? styles.active : ''}`} onClick={() => { changeAvatar('bot'); setIsOpen(false); }}>
              <Bot size={18} />
            </button>
            <button className={`${styles.option} ${avatar === 'ghost' ? styles.active : ''}`} onClick={() => { changeAvatar('ghost'); setIsOpen(false); }}>
              <Ghost size={18} />
            </button>
            <button className={`${styles.option} ${avatar === 'rocket' ? styles.active : ''}`} onClick={() => { changeAvatar('rocket'); setIsOpen(false); }}>
              <Rocket size={18} />
            </button>
            <button className={styles.option} onClick={() => fileInputRef.current?.click()} title="Upload custom">
              <ImagePlus size={18} />
            </button>
          </div>
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleUpload} 
            accept="image/*" 
            className={styles.hiddenInput} 
          />
        </div>
      )}
    </div>
  );
}
