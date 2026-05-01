'use client';

import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('[ErrorBoundary]', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;

      return (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          background: 'var(--color-bg)',
          color: 'var(--color-text-primary)',
          padding: '2rem',
          textAlign: 'center',
        }}>
          <h1 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--color-error)' }}>
            Something went wrong
          </h1>
          <p style={{ color: 'var(--color-text-secondary)', marginBottom: '1.5rem', maxWidth: '400px' }}>
            {this.state.error?.message || 'An unexpected error occurred'}
          </p>
          <button
            onClick={() => {
              this.setState({ hasError: false, error: null });
              window.location.href = '/';
            }}
            style={{
              padding: '0.5rem 1.5rem',
              background: 'rgba(0, 240, 255, 0.15)',
              color: 'var(--color-primary)',
              border: '1px solid rgba(0, 240, 255, 0.4)',
              borderRadius: 'var(--radius-md)',
              cursor: 'pointer',
              fontSize: 'var(--text-sm)',
              fontWeight: 'var(--font-medium)',
            }}
          >
            Return to Home
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
