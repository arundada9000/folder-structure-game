import Link from 'next/link';
import { Home, FolderSearch } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <div className="mb-6 flex justify-center">
          <div className="w-20 h-20 rounded-full bg-[var(--color-bg-secondary)] border border-[var(--color-border)] flex items-center justify-center">
            <FolderSearch size={36} style={{ color: 'var(--color-primary)' }} />
          </div>
        </div>

        <h1 className="text-6xl font-extrabold mb-2" style={{ color: 'var(--color-primary)' }}>
          404
        </h1>

        <h2 className="text-xl font-semibold mb-3" style={{ color: 'var(--color-text-primary)' }}>
          Directory Not Found
        </h2>

        <p className="mb-8" style={{ color: 'var(--color-text-secondary)' }}>
          The path you&apos;re looking for doesn&apos;t exist in this file system.
          Maybe it was moved, deleted, or never created.
        </p>

        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 hover:scale-105"
          style={{
            background: 'var(--color-primary)',
            color: 'var(--color-text-inverse)',
          }}
        >
          <Home size={18} />
          Return to Home
        </Link>
      </div>
    </main>
  );
}
