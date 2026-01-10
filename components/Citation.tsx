'use client';

interface CitationProps {
  cite?: number[];
}

export default function Citation({ cite }: CitationProps) {
  if (!cite || cite.length === 0) return null;

  return (
    <sup className="text-blue-600 font-normal text-sm ml-1">
      [{cite.join(', ')}]
    </sup>
  );
}
