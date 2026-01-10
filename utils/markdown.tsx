import React from 'react';

export function parseMarkdown(text: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let keyCounter = 0;

  // マーカーのパターン: **太字**, [cite: 数字], [cite_start]（引用は削除のみ）
  const combinedRegex = /\*\*(.+?)\*\*|\[cite:\s*([\d,\s]+)\]|\[cite_start\]/gi;
  let match;

  const segments: Array<{
    start: number;
    end: number;
    text?: string;
    type: 'bold' | 'cite' | 'cite_start';
  }> = [];

  while ((match = combinedRegex.exec(text)) !== null) {
    if (match[0].startsWith('**')) {
      // 太字
      segments.push({
        start: match.index,
        end: match.index + match[0].length,
        text: match[1],
        type: 'bold',
      });
    } else if (match[0].match(/\[cite:/i)) {
      // 引用番号（表示せずに削除のみ）
      segments.push({
        start: match.index,
        end: match.index + match[0].length,
        type: 'cite',
      });
    } else if (match[0].match(/\[cite_start\]/i)) {
      // cite_startマーカー（削除するだけ）
      segments.push({
        start: match.index,
        end: match.index + match[0].length,
        type: 'cite_start',
      });
    }
  }

  // テキストを分割して処理
  segments.sort((a, b) => a.start - b.start);

  segments.forEach((segment) => {
    if (segment.start > lastIndex) {
      const plainText = text.substring(lastIndex, segment.start);
      if (plainText) {
        parts.push(plainText);
      }
    }

    if (segment.type === 'bold') {
      parts.push(
        <strong key={`bold-${keyCounter++}`} className="font-bold">
          {segment.text}
        </strong>
      );
    }
    // cite と cite_start は何も追加しない（削除するだけ）

    lastIndex = segment.end;
  });

  if (lastIndex < text.length) {
    const remaining = text.substring(lastIndex);
    if (remaining) {
      parts.push(remaining);
    }
  }

  return parts.length > 0 ? parts : [text];
}

export function cleanCitationMarkers(text: string): string {
  return text
    .replace(/^\[cite_start\]\s*/i, '')
    .replace(/\[cite:\s*[\d,\s]+\]/gi, '')
    .trim();
}

export function extractCitationNumbers(text: string): number[] | undefined {
  const match = text.match(/\[cite:\s*([\d,\s]+)\]/i);
  if (!match) return undefined;
  return match[1].split(',').map((n) => parseInt(n.trim()));
}

export function hasCiteStart(text: string): boolean {
  return /^\[cite_start\]/i.test(text);
}
