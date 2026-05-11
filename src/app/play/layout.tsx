import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Play',
  description:
    'Choose from 24 levels, upload a custom tree, or generate a random challenge. Navigate visual folder trees using relative and absolute path commands.',
  openGraph: {
    title: 'PathPilot - Play',
    description:
      'Navigate visual folder trees using path commands. 24 levels of progressive difficulty with fog of war, move limits, and more.',
  },
};

export default function PlayLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
