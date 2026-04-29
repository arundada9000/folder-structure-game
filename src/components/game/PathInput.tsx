'use client';

/**
 * PATH INPUT
 *
 * Terminal-style input with:
 *  - Tab autocomplete from available child folders
 *  - Up/Down arrow command history
 *  - Keyboard-navigable suggestion dropdown
 *  - Shake animation on error
 */

import { useState, useRef, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Terminal, ArrowRight, CornerDownLeft, ChevronRight, Folder } from 'lucide-react';
import type { TreeNode } from '@/types';
import { resolvePath, getNodeByPath } from '@/lib/pathParser';
import { getParentPath } from '@/lib/treeUtils';
import styles from './PathInput.module.css';

interface PathInputProps {
  currentPath: string;
  tree: TreeNode;
  onSubmit: (path: string) => void;
  onPreview?: (path: string) => void;
  disabled: boolean;
  hasError: boolean;
}

/* --------------------------------------------------------
   AUTOCOMPLETE HELPERS
   -------------------------------------------------------- */

/** Get folder name suggestions for the current input */
function getSuggestions(tree: TreeNode, currentPath: string, input: string): string[] {
  if (!tree || !currentPath) return [];
  const trimmed = input;
  if (!trimmed) {
    /* Empty input: show children of current node + '..' */
    const node = getNodeByPath(tree, currentPath);
    if (!node) return [];
    const names = node.children.map((c) => c.name);
    if (getParentPath(currentPath)) names.unshift('..');
    return names;
  }

  const lastSlashIdx = trimmed.lastIndexOf('/');
  let resolvedDirPath: string;
  let prefix: string;

  if (lastSlashIdx === -1) {
    /* No slash — filter children of current dir */
    resolvedDirPath = currentPath;
    prefix = trimmed;
  } else if (trimmed.startsWith('/') && lastSlashIdx === 0) {
    /* Just "/" — suggest root name */
    resolvedDirPath = `/${tree.name}`;
    prefix = trimmed.substring(1);
  } else {
    /* Has slash — resolve path up to last slash */
    const dirPart = trimmed.substring(0, lastSlashIdx);
    prefix = trimmed.substring(lastSlashIdx + 1);
    if (!dirPart || dirPart === '.') {
      resolvedDirPath = currentPath;
    } else {
      const result = resolvePath(tree, currentPath, dirPart);
      if (!result.success) return [];
      resolvedDirPath = result.finalPath;
    }
  }

  const node = getNodeByPath(tree, resolvedDirPath);
  if (!node) return [];

  const suggestions = node.children
    .map((c) => c.name)
    .filter((name) => name.toLowerCase().startsWith(prefix.toLowerCase()));

  /* Add '..' if at root of input and it matches */
  if (lastSlashIdx === -1 && getParentPath(resolvedDirPath) && '..'.startsWith(prefix)) {
    suggestions.unshift('..');
  }

  return suggestions;
}

/** Replace the last segment of input with the selected suggestion */
function applySuggestion(input: string, suggestion: string): string {
  const lastSlashIdx = input.lastIndexOf('/');
  const base = lastSlashIdx === -1 ? '' : input.substring(0, lastSlashIdx + 1);
  return base + suggestion + '/';
}

/* --------------------------------------------------------
   COMPONENT
   -------------------------------------------------------- */

export default function PathInput({
  currentPath,
  tree,
  onSubmit,
  onPreview,
  disabled,
  hasError,
}: PathInputProps) {
  const [value, setValue] = useState('');
  const [shaking, setShaking] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIdx, setSelectedIdx] = useState(-1);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);

  /* Compute suggestions reactively */
  const suggestions = useMemo(() => {
    if (disabled) return [];
    return getSuggestions(tree, currentPath, value);
  }, [tree, currentPath, value, disabled]);

  /* Show/hide dropdown */
  useEffect(() => {
    setShowSuggestions(suggestions.length > 0);
    setSelectedIdx(-1);
  }, [suggestions]);

  /* Shake on error */
  useEffect(() => {
    if (hasError) {
      setShaking(true);
      const t = setTimeout(() => setShaking(false), 500);
      return () => clearTimeout(t);
    }
  }, [hasError]);

  /* Auto-focus */
  useEffect(() => {
    if (!disabled && inputRef.current) inputRef.current.focus();
  }, [disabled]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = value.trim().replace(/\/+$/, ''); /* strip trailing slash */
    if (!trimmed || disabled) return;
    setHistory((prev) => [...prev.filter((h) => h !== trimmed), trimmed]);
    setHistoryIdx(-1);
    onSubmit(trimmed);
    setValue('');
    setShowSuggestions(false);
  }

  function handleSelectSuggestion(suggestion: string) {
    const newVal = applySuggestion(value, suggestion);
    setValue(newVal);
    setShowSuggestions(false);
    inputRef.current?.focus();
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    /* Tab → autocomplete */
    if (e.key === 'Tab' && suggestions.length > 0) {
      e.preventDefault();
      const idx = selectedIdx >= 0 ? selectedIdx : 0;
      handleSelectSuggestion(suggestions[idx]);
      return;
    }

    /* Navigate suggestions */
    if (showSuggestions && suggestions.length > 0) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIdx((prev) => Math.min(prev + 1, suggestions.length - 1));
        return;
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIdx((prev) => Math.max(prev - 1, -1));
        return;
      }
      if (e.key === 'Escape') {
        setShowSuggestions(false);
        return;
      }
      /* Enter on a selected suggestion → apply it instead of submitting */
      if (e.key === 'Enter' && selectedIdx >= 0) {
        e.preventDefault();
        handleSelectSuggestion(suggestions[selectedIdx]);
        return;
      }
    }

    /* Command history (when no suggestions active) */
    if (!showSuggestions || suggestions.length === 0) {
      if (e.key === 'ArrowUp' && history.length > 0) {
        e.preventDefault();
        const newIdx = historyIdx < history.length - 1 ? historyIdx + 1 : historyIdx;
        setHistoryIdx(newIdx);
        const nextVal = history[history.length - 1 - newIdx];
        setValue(nextVal);
        onPreview?.(nextVal);
        return;
      }
      if (e.key === 'ArrowDown' && historyIdx >= 0) {
        e.preventDefault();
        const newIdx = historyIdx - 1;
        setHistoryIdx(newIdx);
        const nextVal = newIdx >= 0 ? history[history.length - 1 - newIdx] : '';
        setValue(nextVal);
        onPreview?.(nextVal);
        return;
      }
    }
  }

  return (
    <div className={styles.wrapper}>
      <motion.form
        className={styles.form}
        onSubmit={handleSubmit}
        animate={shaking ? { x: [0, -6, 6, -4, 4, 0] } : { x: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Current path prompt */}
        <div className={styles.prompt}>
          <Terminal size={14} className={styles.promptIcon} />
          <span className={styles.promptPath}>{currentPath}</span>
          <ArrowRight size={12} className={styles.promptArrow} />
        </div>

        {/* Input + autocomplete dropdown */}
        <div className={styles.inputWrapper}>
          <input
            ref={inputRef}
            type="text"
            className={styles.input}
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              setHistoryIdx(-1);
              onPreview?.(e.target.value);
            }}
            onKeyDown={handleKeyDown}
            onFocus={() => value.length === 0 && setShowSuggestions(suggestions.length > 0)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            placeholder="Type a path... (Tab to autocomplete)"
            disabled={disabled}
            autoComplete="off"
            spellCheck={false}
            aria-label="Path input"
            id="path-input"
          />

          {showSuggestions && (
            <div className={styles.suggestions} role="listbox">
              {suggestions.map((s, idx) => (
                <button
                  key={s}
                  type="button"
                  role="option"
                  aria-selected={idx === selectedIdx}
                  className={`${styles.suggestionItem} ${idx === selectedIdx ? styles.suggestionSelected : ''}`}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    handleSelectSuggestion(s);
                  }}
                  onMouseEnter={() => setSelectedIdx(idx)}
                >
                  {s === '..' ? (
                    <ArrowRight size={12} className={styles.suggestionIcon} style={{ transform: 'rotate(180deg)' }} />
                  ) : (
                    <Folder size={12} className={styles.suggestionIcon} />
                  )}
                  <span className={styles.suggestionName}>{s}</span>
                  {s === '..' && <span className={styles.suggestionHint}>parent dir</span>}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className={styles.submitBtn}
          disabled={disabled || !value.trim()}
          aria-label="Execute path"
        >
          <CornerDownLeft size={16} />
        </button>
      </motion.form>

      <div className={styles.hint}>
        <kbd className={styles.kbd}>Tab</kbd> autocomplete
        <span className={styles.hintSep}>&middot;</span>
        <kbd className={styles.kbd}>&uarr;&darr;</kbd> history
        <span className={styles.hintSep}>&middot;</span>
        <kbd className={styles.kbd}>Enter</kbd> navigate
      </div>
    </div>
  );
}
